// Lovable AI-powered WhatsApp chatbot reply.
// Receives: { agent_id, conversation_id?, contact_id?, message, history? }
// Streams the assistant reply, then persists user + assistant messages to the
// `messages` table (creating a conversation row if one didn't exist).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Body = {
  agent_id: string;
  conversation_id?: string;
  contact_id?: string;
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) {
      return json({ error: "Unauthorized" }, 401);
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY missing" }, 500);

    // Auth client to identify caller + workspace
    const authClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "", {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await authClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const body = (await req.json()) as Body;
    if (!body?.agent_id || !body?.message?.trim()) {
      return json({ error: "agent_id and message are required" }, 400);
    }

    // Load agent (verify caller is in its workspace)
    const { data: agent, error: agentErr } = await admin
      .from("ai_agents")
      .select("id, workspace_id, name, system_prompt, config")
      .eq("id", body.agent_id)
      .maybeSingle();
    if (agentErr || !agent) return json({ error: "Agent not found" }, 404);

    const { data: membership } = await admin
      .from("workspace_members")
      .select("user_id")
      .eq("workspace_id", agent.workspace_id)
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (!membership) return json({ error: "Forbidden" }, 403);

    // Load active knowledge entries
    const { data: knowledge } = await admin
      .from("knowledge_entries")
      .select("title, content")
      .eq("agent_id", agent.id)
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    const kbBlock = (knowledge ?? []).length
      ? (knowledge ?? []).map((k) => `### ${k.title}\n${k.content}`).join("\n\n")
      : "(No knowledge entries provided.)";

    const greeting = (agent.config as any)?.greeting_message ?? "";
    const persona = agent.system_prompt?.trim() ||
      "You are a helpful WhatsApp assistant for a business.";

    const systemPrompt = `${persona}

You are responding on WhatsApp. Be concise, warm, and use short paragraphs suitable for chat.

Answer ONLY using the knowledge base below. If the answer isn't there, politely say you don't have that information and offer to connect the user to a staff member.

KNOWLEDGE BASE:
${kbBlock}`;

    // Ensure conversation
    let conversationId = body.conversation_id;
    if (!conversationId) {
      let contactId = body.contact_id;
      if (!contactId) {
        const { data: c } = await admin
          .from("contacts")
          .insert({
            workspace_id: agent.workspace_id,
            name: "Test Chat",
            source_channel: "whatsapp",
            status: "new",
          })
          .select("id")
          .single();
        contactId = c?.id;
      }
      const { data: conv, error: convErr } = await admin
        .from("conversations")
        .insert({
          workspace_id: agent.workspace_id,
          contact_id: contactId,
          channel: "whatsapp",
          status: "open",
          agent_id: agent.id,
        })
        .select("id")
        .single();
      if (convErr || !conv) return json({ error: "Could not create conversation" }, 500);
      conversationId = conv.id;
    }

    // Persist inbound user message
    await admin.from("messages").insert({
      conversation_id: conversationId,
      workspace_id: agent.workspace_id,
      direction: "inbound",
      sender_type: "contact",
      content_type: "text",
      content: { text: body.message },
      status: "received",
    });

    // Build chat messages
    const history = body.history ?? [];
    const chatMessages = [
      { role: "system", content: systemPrompt },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: body.message },
    ];

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: chatMessages,
        stream: true,
      }),
    });

    if (!aiRes.ok || !aiRes.body) {
      const text = await aiRes.text().catch(() => "");
      if (aiRes.status === 429) return json({ error: "Rate limit exceeded. Please try again shortly." }, 429);
      if (aiRes.status === 402) return json({ error: "AI credits exhausted. Add credits in workspace settings." }, 402);
      return json({ error: `AI gateway error: ${aiRes.status} ${text.slice(0, 200)}` }, 502);
    }

    // Stream SSE to client while accumulating full text for DB persistence
    let assistantText = "";
    const stream = new ReadableStream({
      async start(controller) {
        const reader = aiRes.body!.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = "";
        try {
          // first frame: meta
          controller.enqueue(encoder.encode(`event: meta\ndata: ${JSON.stringify({ conversation_id: conversationId })}\n\n`));
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") continue;
              try {
                const obj = JSON.parse(data);
                const delta = obj?.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length) {
                  assistantText += delta;
                  controller.enqueue(encoder.encode(`event: delta\ndata: ${JSON.stringify({ text: delta })}\n\n`));
                }
              } catch { /* ignore non-JSON keepalives */ }
            }
          }
          // persist assistant message
          if (assistantText.trim()) {
            await admin.from("messages").insert({
              conversation_id: conversationId,
              workspace_id: agent.workspace_id,
              direction: "outbound",
              sender_type: "agent",
              content_type: "text",
              content: { text: assistantText, greeting_used: !history.length ? greeting : undefined },
              status: "sent",
            });
            await admin.from("conversations")
              .update({ updated_at: new Date().toISOString() })
              .eq("id", conversationId);
          }
          controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ ok: true })}\n\n`));
        } catch (err) {
          controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: String(err) })}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...CORS,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("chatbot-reply error", err);
    return json({ error: String(err) }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
