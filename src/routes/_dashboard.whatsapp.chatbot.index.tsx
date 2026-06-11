import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  GitBranch, Search, Layers, CheckCircle, Zap, Network, Link2, Activity,
  X, Plus, Send, Trash2, Edit3, BookOpen, MessageCircle, Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";

export const Route = createFileRoute("/_dashboard/whatsapp/chatbot/")({ component: Chatbot });

type Agent = {
  id: string;
  workspace_id: string;
  name: string;
  status: string;
  system_prompt: string | null;
  config: Record<string, any> | null;
};

type Entry = {
  id: string;
  agent_id: string | null;
  title: string;
  content: string;
  is_active: boolean;
  source_type: string;
};

type ChatMsg = { role: "user" | "assistant"; content: string };

const SUPABASE_URL = "https://gsjxwhklnlazwuznpdlk.supabase.co";
const FN_URL = `${SUPABASE_URL}/functions/v1/chatbot-reply`;

function Chatbot() {
  const { workspaceId } = useWorkspace();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Active" | "Draft">("All");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"knowledge" | "chat">("knowledge");

  const [createOpen, setCreateOpen] = useState(false);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);

  // ---- Data ----
  const reload = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    const [{ data: a }, { data: e }] = await Promise.all([
      supabase.from("ai_agents").select("*").eq("workspace_id", workspaceId).eq("type", "whatsapp_chatbot").order("created_at", { ascending: false }),
      supabase.from("knowledge_entries").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false }),
    ]);
    setAgents((a ?? []) as Agent[]);
    setEntries((e ?? []) as Entry[]);
    setLoading(false);
    if (a && a.length && !selectedId) setSelectedId(a[0].id);
  }, [workspaceId, selectedId]);

  useEffect(() => { reload(); }, [reload]);

  const selected = useMemo(() => agents.find((x) => x.id === selectedId) ?? null, [agents, selectedId]);
  const agentEntries = useMemo(() => entries.filter((e) => e.agent_id === selectedId), [entries, selectedId]);

  // ---- Metrics (real) ----
  const totalAgents = agents.length;
  const activeAgents = agents.filter((a) => a.status === "active").length;
  const draftAgents = agents.filter((a) => a.status !== "active").length;
  const totalEntries = entries.length;
  const activeEntries = entries.filter((e) => e.is_active).length;
  const avgEntries = totalAgents ? Math.round((totalEntries / totalAgents) * 10) / 10 : 0;
  const readiness = totalAgents === 0 ? 0 : Math.round(((activeAgents * 0.6 + Math.min(activeEntries / Math.max(totalAgents, 1) / 5, 1) * 0.4)) * 100);

  const METRICS = [
    { icon: Layers, color: "text-[#7B5CFC]", value: String(totalAgents), label: "TOTAL AGENTS", sub: `${draftAgents} drafts` },
    { icon: CheckCircle, color: "text-[#00D4AA]", value: String(activeAgents), label: "ACTIVE", sub: totalAgents ? `${Math.round((activeAgents / totalAgents) * 100)}% of total` : "0% of total" },
    { icon: Zap, color: "text-[#F59E0B]", value: String(draftAgents), label: "DRAFTS", sub: "pending activation" },
    { icon: Network, color: "text-[#3B82F6]", value: String(totalEntries), label: "KNOWLEDGE", sub: `${activeEntries} active` },
    { icon: Link2, color: "text-[#22C55E]", value: String(activeEntries), label: "ACTIVE ENTRIES", sub: "used by agents" },
    { icon: Activity, color: "text-[#FF4D6D]", value: String(avgEntries), label: "AVG / AGENT", sub: "knowledge density" },
  ];

  const filtered = agents.filter((a) => {
    if (filter === "Active" && a.status !== "active") return false;
    if (filter === "Draft" && a.status === "active") return false;
    if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  // ---- Agent actions ----
  const toggleStatus = async (a: Agent) => {
    const next = a.status === "active" ? "inactive" : "active";
    const { error } = await supabase.from("ai_agents").update({ status: next }).eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success(`Agent ${next === "active" ? "activated" : "paused"}`);
    reload();
  };

  const deleteAgent = async (a: Agent) => {
    if (!confirm(`Delete agent "${a.name}"? This also removes its knowledge entries.`)) return;
    const { error } = await supabase.from("ai_agents").delete().eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success("Agent deleted");
    if (selectedId === a.id) setSelectedId(null);
    reload();
  };

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <GitBranch size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Flow Command Center</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">AI-Powered</span>
              <span className="text-[#4A4A6A] text-xs ml-3">{totalAgents} agents · {activeAgents} active · {totalEntries} knowledge entries</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Design and deploy WhatsApp chatbot automation agents</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCreateOpen(true)} className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-sm font-semibold">+ New Agent</button>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold text-lg">{readiness}%</span>
              <span className="text-[#8B8FA8] text-sm">Automation Readiness</span>
              <span className="text-[#4A4A6A] text-xs ml-3">{totalAgents === 0 ? "Get started by creating your first agent." : "Add knowledge entries and activate agents to improve readiness."}</span>
            </div>
            <div className="flex gap-6">
              <span className="text-[#8B8FA8] text-xs">{totalAgents ? Math.round((activeAgents / totalAgents) * 100) : 0}% ACTIVE RATE</span>
              <span className="text-[#8B8FA8] text-xs">{totalEntries} ENTRIES</span>
            </div>
          </div>
          <div className="h-1.5 bg-[#1C1C34] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00D4AA] to-[#7B5CFC] transition-all" style={{ width: `${readiness}%` }} />
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <m.icon size={16} className={m.color} />
            </div>
            <div className="text-white font-bold text-[26px] tracking-[-0.03em] mt-2">{m.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1">{m.label}</div>
            <div className="text-[#4A4A6A] text-[10px] mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search agents by name..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-8 pr-3 text-[#8B8FA8] text-xs" />
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["All", "Active", "Draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-md text-xs font-medium ${filter === f ? "bg-[#00D4AA] text-black" : "text-[#8B8FA8] hover:text-white"}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6 grid grid-cols-12 gap-4">
        {/* Agents list */}
        <div className="col-span-4 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-3 min-h-[480px]">
          <div className="flex items-center justify-between px-2 py-2 mb-2">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Agents</span>
            <span className="text-[#4A4A6A] text-[10px]">{filtered.length}</span>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-40 text-[#4A4A6A] text-sm">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-14 h-14 bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-2xl flex items-center justify-center mb-4">
                <GitBranch size={26} className="text-[#00D4AA]/50" />
              </div>
              <div className="text-white text-sm font-semibold mb-1">No agents yet</div>
              <div className="text-[#4A4A6A] text-xs max-w-[220px] mb-4">Create a chatbot agent to start answering WhatsApp messages automatically.</div>
              <button onClick={() => setCreateOpen(true)} className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-xs font-semibold">+ New Agent</button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filtered.map((a) => {
                const count = entries.filter((e) => e.agent_id === a.id).length;
                const active = a.id === selectedId;
                return (
                  <button key={a.id} onClick={() => setSelectedId(a.id)} className={`text-left rounded-lg px-3 py-3 border transition-all ${active ? "bg-[#1C1C28] border-[#00D4AA]/40" : "bg-[#06060F] border-[#1C1C34] hover:border-[#2C2C44]"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white text-sm font-semibold truncate">{a.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.status === "active" ? "bg-[#00D4AA]/15 text-[#00D4AA]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>{a.status}</span>
                    </div>
                    <div className="text-[#4A4A6A] text-[11px] truncate">{a.system_prompt?.slice(0, 60) || "No persona set"}</div>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-[#8B8FA8]">
                      <BookOpen size={11} /> {count} entries
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="col-span-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl min-h-[480px] flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-[#4A4A6A] text-sm">Select an agent to manage its knowledge base and test it.</div>
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1C1C34]">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-white font-bold text-lg">{selected.name}</h2>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${selected.status === "active" ? "bg-[#00D4AA]/15 text-[#00D4AA]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>{selected.status}</span>
                  </div>
                  <div className="text-[#4A4A6A] text-xs mt-0.5">{(selected.config as any)?.language ?? "English"} · {(selected.config as any)?.greeting_message ? "Greeting set" : "No greeting"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleStatus(selected)} className="h-8 px-3 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-xs">
                    {selected.status === "active" ? "Pause" : "Activate"}
                  </button>
                  <button onClick={() => setEditAgent(selected)} className="h-8 px-3 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-xs flex items-center gap-1.5"><Edit3 size={12} /> Edit</button>
                  <button onClick={() => deleteAgent(selected)} className="h-8 w-8 rounded-lg border border-[#1C1C34] hover:bg-[#FF4D6D]/10 hover:border-[#FF4D6D]/40 text-[#FF4D6D] flex items-center justify-center"><Trash2 size={12} /></button>
                </div>
              </div>

              <div className="flex border-b border-[#1C1C34] px-5">
                {([
                  { id: "knowledge", label: "Knowledge Base", count: agentEntries.length, icon: BookOpen },
                  { id: "chat", label: "Test Chat", count: null, icon: MessageCircle },
                ] as const).map((t) => (
                  <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-xs font-medium border-b-2 transition-colors ${tab === t.id ? "border-[#00D4AA] text-white" : "border-transparent text-[#8B8FA8] hover:text-white"}`}>
                    <t.icon size={13} /> {t.label} {t.count != null && <span className="text-[#4A4A6A]">({t.count})</span>}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-hidden">
                {tab === "knowledge" ? (
                  <KnowledgePanel agent={selected} entries={agentEntries} onChange={reload} workspaceId={workspaceId!} />
                ) : (
                  <TestChatPanel agent={selected} />
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {createOpen && (
        <AgentModal
          workspaceId={workspaceId!}
          onClose={() => setCreateOpen(false)}
          onSaved={(id) => { setCreateOpen(false); reload(); setSelectedId(id); }}
        />
      )}
      {editAgent && (
        <AgentModal
          workspaceId={workspaceId!}
          existing={editAgent}
          onClose={() => setEditAgent(null)}
          onSaved={() => { setEditAgent(null); reload(); }}
        />
      )}
    </div>
  );
}

// ---------- Knowledge Panel ----------

function KnowledgePanel({ agent, entries, onChange, workspaceId }: { agent: Agent; entries: Entry[]; onChange: () => void; workspaceId: string }) {
  const [editing, setEditing] = useState<Entry | null>(null);
  const [open, setOpen] = useState(false);

  const remove = async (id: string) => {
    if (!confirm("Delete this knowledge entry?")) return;
    const { error } = await supabase.from("knowledge_entries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Entry deleted");
    onChange();
  };

  const toggle = async (e: Entry) => {
    const { error } = await supabase.from("knowledge_entries").update({ is_active: !e.is_active }).eq("id", e.id);
    if (error) return toast.error(error.message);
    onChange();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#1C1C34]">
        <div className="text-[#8B8FA8] text-xs">Entries the agent uses to answer questions. Active entries are sent to the AI.</div>
        <button onClick={() => { setEditing(null); setOpen(true); }} className="h-8 px-3 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-xs font-semibold flex items-center gap-1.5"><Plus size={12} /> Add Entry</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen size={28} className="text-[#1C1C34] mb-3" />
            <div className="text-white text-sm font-semibold mb-1">No knowledge entries yet</div>
            <div className="text-[#4A4A6A] text-xs max-w-xs">Add services, prices, opening hours and FAQs so the agent can answer customers.</div>
          </div>
        ) : entries.map((e) => (
          <div key={e.id} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white text-sm font-semibold truncate">{e.title}</span>
                  {!e.is_active && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1C1C34] text-[#4A4A6A]">disabled</span>}
                </div>
                <div className="text-[#8B8FA8] text-xs whitespace-pre-wrap line-clamp-3">{e.content}</div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button onClick={() => toggle(e)} className="h-7 px-2 rounded text-[10px] border border-[#1C1C34] text-[#8B8FA8] hover:bg-[#1C1C34]">{e.is_active ? "Disable" : "Enable"}</button>
                <button onClick={() => { setEditing(e); setOpen(true); }} className="h-7 w-7 rounded border border-[#1C1C34] text-[#8B8FA8] hover:bg-[#1C1C34] flex items-center justify-center"><Edit3 size={11} /></button>
                <button onClick={() => remove(e.id)} className="h-7 w-7 rounded border border-[#1C1C34] text-[#FF4D6D] hover:bg-[#FF4D6D]/10 flex items-center justify-center"><Trash2 size={11} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <EntryModal
          workspaceId={workspaceId}
          agentId={agent.id}
          existing={editing}
          onClose={() => setOpen(false)}
          onSaved={() => { setOpen(false); onChange(); }}
        />
      )}
    </div>
  );
}

function EntryModal({ workspaceId, agentId, existing, onClose, onSaved }: { workspaceId: string; agentId: string; existing: Entry | null; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(existing?.title ?? "");
  const [content, setContent] = useState(existing?.content ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!title.trim() || !content.trim()) return toast.error("Title and content are required");
    setSaving(true);
    const payload = { workspace_id: workspaceId, agent_id: agentId, title: title.trim(), content: content.trim(), source_type: "manual", is_active: true };
    const { error } = existing
      ? await supabase.from("knowledge_entries").update({ title: payload.title, content: payload.content }).eq("id", existing.id)
      : await supabase.from("knowledge_entries").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(existing ? "Entry updated" : "Entry added");
    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
          <h2 className="text-white font-semibold text-base">{existing ? "Edit Knowledge Entry" : "Add Knowledge Entry"}</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="text-[#8B8FA8] text-xs mb-1 block">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Opening hours" className="w-full h-10 bg-[#06060F] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40" />
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs mb-1 block">Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="Provide the information the agent should use to answer questions on this topic..." className="w-full bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">Cancel</button>
          <button onClick={save} disabled={saving} className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-xs font-semibold disabled:opacity-60">{saving ? "Saving..." : existing ? "Save Changes" : "Add Entry"}</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Agent Modal ----------

function AgentModal({ workspaceId, existing, onClose, onSaved }: { workspaceId: string; existing?: Agent; onClose: () => void; onSaved: (id: string) => void }) {
  const [name, setName] = useState(existing?.name ?? "");
  const [persona, setPersona] = useState(existing?.system_prompt ?? "");
  const [greeting, setGreeting] = useState((existing?.config as any)?.greeting_message ?? "Hi! 👋 How can I help you today?");
  const [language, setLanguage] = useState((existing?.config as any)?.language ?? "English");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name.trim()) return toast.error("Name is required");
    setSaving(true);
    const config = { ...(existing?.config ?? {}), greeting_message: greeting, language, channel: "whatsapp" };
    if (existing) {
      const { error } = await supabase.from("ai_agents")
        .update({ name: name.trim(), system_prompt: persona, config })
        .eq("id", existing.id);
      setSaving(false);
      if (error) return toast.error(error.message);
      toast.success("Agent updated");
      onSaved(existing.id);
    } else {
      const { data, error } = await supabase.from("ai_agents").insert({
        workspace_id: workspaceId,
        name: name.trim(),
        type: "whatsapp_chatbot",
        status: "inactive",
        system_prompt: persona,
        channels: ["whatsapp"],
        config,
      }).select("id").single();
      setSaving(false);
      if (error || !data) return toast.error(error?.message ?? "Could not create agent");
      toast.success("Agent created");
      onSaved(data.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
          <h2 className="text-white font-semibold text-base">{existing ? "Edit Agent" : "Create Chatbot Agent"}</h2>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="text-[#8B8FA8] text-xs mb-1 block">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Reception Bot" className="w-full h-10 bg-[#06060F] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#8B8FA8] text-xs mb-1 block">Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full h-10 bg-[#06060F] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm">
                <option>English</option><option>Spanish</option><option>Portuguese</option><option>French</option><option>German</option><option>Italian</option><option>Arabic</option>
              </select>
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs mb-1 block">Channel</label>
              <input disabled value="WhatsApp" className="w-full h-10 bg-[#06060F] border border-[#1E1E2E] rounded-lg px-3 text-[#8B8FA8] text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs mb-1 block">Greeting Message</label>
            <input value={greeting} onChange={(e) => setGreeting(e.target.value)} className="w-full h-10 bg-[#06060F] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40" />
            <p className="text-[#4A4A6A] text-[11px] mt-1">Sent as the first message in a new conversation.</p>
          </div>
          <div>
            <label className="text-[#8B8FA8] text-xs mb-1 block">Persona / System Prompt</label>
            <textarea value={persona} onChange={(e) => setPersona(e.target.value)} rows={6} placeholder="You are the friendly assistant for Smile Dental Clinic. Be warm, concise and helpful..." className="w-full bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40 resize-none" />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">Cancel</button>
          <button onClick={save} disabled={saving} className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-xs font-semibold disabled:opacity-60">{saving ? "Saving..." : existing ? "Save Changes" : "Create Agent"}</button>
        </div>
      </div>
    </div>
  );
}

// ---------- Test Chat Panel ----------

function TestChatPanel({ agent }: { agent: Agent }) {
  const greeting = (agent.config as any)?.greeting_message as string | undefined;
  const [messages, setMessages] = useState<ChatMsg[]>(() => greeting ? [{ role: "assistant", content: greeting }] : []);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Reset when agent changes
  useEffect(() => {
    setMessages(greeting ? [{ role: "assistant", content: greeting }] : []);
    setConversationId(null);
    setInput("");
  }, [agent.id, greeting]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const history = messages.filter((m) => m.role !== "assistant" || m.content !== greeting);
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setSending(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token ?? ""}`,
        },
        body: JSON.stringify({
          agent_id: agent.id,
          conversation_id: conversationId,
          message: text,
          history,
        }),
      });

      if (!res.ok || !res.body) {
        let msg = `Request failed (${res.status})`;
        try { const j = await res.json(); if (j?.error) msg = j.error; } catch {}
        if (res.status === 429) msg = "Rate limit exceeded. Please retry shortly.";
        if (res.status === 402) msg = "AI credits exhausted. Add credits in workspace settings.";
        toast.error(msg);
        setMessages((m) => m.slice(0, -1));
        setSending(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const block of parts) {
          const evtLine = block.split("\n").find((l) => l.startsWith("event:"));
          const dataLine = block.split("\n").find((l) => l.startsWith("data:"));
          if (!dataLine) continue;
          const event = evtLine?.slice(6).trim() ?? "message";
          let data: any = null;
          try { data = JSON.parse(dataLine.slice(5).trim()); } catch {}
          if (event === "meta" && data?.conversation_id) setConversationId(data.conversation_id);
          if (event === "delta" && data?.text) {
            acc += data.text;
            setMessages((m) => {
              const next = [...m];
              next[next.length - 1] = { role: "assistant", content: acc };
              return next;
            });
          }
          if (event === "error" && data?.error) toast.error(data.error);
        }
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Could not contact AI");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#06060F]">
      <div className="px-5 py-3 border-b border-[#1C1C34] flex items-center justify-between">
        <div className="text-[#8B8FA8] text-xs">Test the agent live. Messages are saved and appear in your WhatsApp Inbox.</div>
        <button onClick={() => { setMessages(greeting ? [{ role: "assistant", content: greeting }] : []); setConversationId(null); }} className="text-[#8B8FA8] hover:text-white text-xs">Reset</button>
      </div>
      <div ref={scrollerRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-[300px]">
        {messages.length === 0 && (
          <div className="text-[#4A4A6A] text-xs text-center mt-10">Start a conversation below.</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "user" ? (
              <div className="bg-[#7C5CFC]/15 border border-[#7C5CFC]/20 rounded-xl rounded-tr-sm max-w-[75%] px-4 py-2.5">
                <div className="text-white text-sm whitespace-pre-wrap">{m.content}</div>
              </div>
            ) : (
              <div className="bg-[#16161F] border border-[#1E1E2E] rounded-xl rounded-tl-sm max-w-[75%] px-4 py-2.5">
                <div className="text-white text-sm whitespace-pre-wrap">
                  {m.content || <span className="inline-flex items-center gap-1.5 text-[#8B8FA8] text-xs"><Loader2 size={12} className="animate-spin" /> thinking…</span>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-[#1C1C34] px-4 py-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Type a message to test the agent..."
          disabled={sending}
          className="flex-1 h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#00D4AA]/40 disabled:opacity-60"
        />
        <button onClick={send} disabled={sending || !input.trim()} className="h-10 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Send
        </button>
      </div>
    </div>
  );
}
