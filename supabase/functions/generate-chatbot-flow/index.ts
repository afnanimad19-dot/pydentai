// Generates a chatbot flow (nodes + edges) from a natural-language description
// using Lovable AI, then persists it as a draft in chatbot_flows.
// Returns: { flow_id }
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const NODE_TYPES = [
  "Send Message","Send Media","List Message","Send Location","Send Template",
  "Collect Input","Request Location","Await Reply","Save to Lead","Set Variable",
  "Condition","Random Split","Delay","Schedule","Go to Flow",
  "AI Response","HTTP Request","Assign Tag","Add to Group","Notify Team","Transfer to Human",
  "End Flow",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY missing" }, 500);

    const authClient = createClient(
      SUPABASE_URL,
      Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userErr } = await authClient.auth.getUser();
    if (userErr || !userData.user) return json({ error: "Unauthorized" }, 401);

    const { workspace_id, description, name } = await req.json();
    if (!workspace_id || !description) return json({ error: "workspace_id and description required" }, 400);

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: member } = await admin
      .from("workspace_members")
      .select("user_id")
      .eq("workspace_id", workspace_id)
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (!member) return json({ error: "Forbidden" }, 403);

    const sys = `You design WhatsApp chatbot flows as a node graph.
Return STRICT JSON: { "name": string, "nodes": [{ "id": string, "type": string, "label": string, "config": object }], "edges": [{ "id": string, "source": string, "target": string }] }.
Allowed node types: ${NODE_TYPES.join(", ")}.
Always start with a "trigger" node id "trigger" and type "Trigger" (label "When message received").
End every path with an "End Flow" node. Keep 4-10 nodes. Use concise labels. config can include text, buttons, condition, variable_name, url, method, etc.
No prose, no markdown, JSON only.`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: description },
        ],
        response_format: { type: "json_object" },
      }),
    });
    if (!aiRes.ok) {
      const t = await aiRes.text().catch(() => "");
      if (aiRes.status === 429) return json({ error: "Rate limit exceeded" }, 429);
      if (aiRes.status === 402) return json({ error: "AI credits exhausted" }, 402);
      return json({ error: `AI gateway error: ${aiRes.status} ${t.slice(0,200)}` }, 502);
    }
    const aiBody = await aiRes.json();
    const raw = aiBody?.choices?.[0]?.message?.content ?? "{}";
    let parsed: any;
    try { parsed = JSON.parse(raw); } catch { return json({ error: "AI returned invalid JSON" }, 502); }

    // Position nodes left-to-right
    const nodes = Array.isArray(parsed.nodes) ? parsed.nodes : [];
    const edges = Array.isArray(parsed.edges) ? parsed.edges : [];
    const positioned = nodes.map((n: any, i: number) => ({
      id: String(n.id ?? `n_${i}`),
      type: "flowNode",
      position: { x: 80 + (i % 6) * 220, y: 120 + Math.floor(i / 6) * 160 },
      data: { label: n.label ?? n.type ?? "Node", nodeType: n.type ?? "Send Message", config: n.config ?? {} },
    }));
    const safeEdges = edges.map((e: any, i: number) => ({
      id: String(e.id ?? `e_${i}`),
      source: String(e.source),
      target: String(e.target),
      animated: true,
      style: { stroke: "#00D4AA" },
    }));

    const { data: flow, error: insErr } = await admin
      .from("chatbot_flows")
      .insert({
        workspace_id,
        name: name || parsed.name || "AI Generated Flow",
        status: "draft",
        nodes: positioned,
        edges: safeEdges,
        created_by: userData.user.id,
      })
      .select("id")
      .single();
    if (insErr || !flow) return json({ error: insErr?.message ?? "insert failed" }, 500);

    return json({ flow_id: flow.id });
  } catch (e) {
    console.error("generate-chatbot-flow error", e);
    return json({ error: String(e) }, 500);
  }
});

function json(p: unknown, status = 200) {
  return new Response(JSON.stringify(p), { status, headers: { ...CORS, "Content-Type": "application/json" } });
}
