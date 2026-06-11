import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  Bot,
  ChevronDown,
  HelpCircle,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/knowledge")({
  component: KnowledgePage,
});

type Agent = { id: string; name: string };

type Entry = {
  id: string;
  agent_id: string | null;
  title: string;
  content: string;
  is_active: boolean;
  source_type: string;
  created_at: string;
};

function KnowledgePage() {
  const navigate = useNavigate();
  const { workspaceId } = useWorkspace();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agentMenuOpen, setAgentMenuOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<{ mode: "create" | "edit"; entry?: Entry } | null>(null);

  // load agents
  useEffect(() => {
    if (!workspaceId) return;
    supabase
      .from("ai_agents")
      .select("id,name")
      .eq("workspace_id", workspaceId)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          toast.error(error.message);
          return;
        }
        const list = (data ?? []) as Agent[];
        setAgents(list);
        if (list[0] && !agentId) setAgentId(list[0].id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const reloadEntries = async () => {
    if (!workspaceId || !agentId) {
      setEntries([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("knowledge_entries")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("agent_id", agentId)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setEntries((data ?? []) as Entry[]);
  };

  useEffect(() => {
    reloadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, agentId]);

  const stats = useMemo(() => {
    const active = entries.filter((e) => e.is_active).length;
    const chars = entries.reduce((s, e) => s + (e.content?.length ?? 0), 0);
    const score = Math.min(100, Math.round((active / Math.max(5, entries.length || 5)) * 100));
    return { total: entries.length, active, chars, score };
  }, [entries]);

  const onDelete = async (e: Entry) => {
    if (!confirm(`Delete "${e.title}"?`)) return;
    const { error } = await supabase.from("knowledge_entries").delete().eq("id", e.id);
    if (error) return toast.error(error.message);
    toast.success("Entry deleted");
    reloadEntries();
  };

  const onToggle = async (e: Entry) => {
    const next = !e.is_active;
    setEntries((es) => es.map((x) => (x.id === e.id ? { ...x, is_active: next } : x)));
    const { error } = await supabase
      .from("knowledge_entries")
      .update({ is_active: next })
      .eq("id", e.id);
    if (error) {
      toast.error(error.message);
      reloadEntries();
    }
  };

  const currentAgent = agents.find((a) => a.id === agentId) || null;

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Sparkles size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                Knowledge Base
              </div>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-xs px-2 py-0.5 rounded-full">
                AI-Powered
              </span>
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Train your agents with custom knowledge entries
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <button
            onClick={() => setAgentMenuOpen((o) => !o)}
            className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 flex items-center gap-2 text-sm"
          >
            <Bot size={14} className="text-[#22C55E]" />
            <span className="text-white">
              {currentAgent?.name ?? (agents.length ? "Select agent" : "No agents")}
            </span>
            <ChevronDown size={14} className="text-[#4A4A6A]" />
          </button>
          {agentMenuOpen && (
            <div className="absolute right-[180px] top-11 z-20 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg shadow-xl py-1 min-w-[220px] max-h-72 overflow-auto">
              {agents.length === 0 && (
                <div className="px-3 py-2 text-xs text-[#4A4A6A]">No agents yet</div>
              )}
              {agents.map((a) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAgentId(a.id);
                    setAgentMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/[0.04] flex items-center gap-2"
                >
                  <Bot size={14} className="text-[#7B5CFC]" />
                  {a.name}
                </button>
              ))}
              <div className="border-t border-[#1C1C34] mt-1 pt-1">
                <button
                  onClick={() => {
                    setAgentMenuOpen(false);
                    navigate({ to: "/agents/studio" });
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#7B5CFC]"
                >
                  + Create agent in Studio
                </button>
              </div>
            </div>
          )}
          <button
            onClick={reloadEntries}
            className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => {
              if (!agentId) {
                toast.error("Select or create an agent first");
                return;
              }
              setModal({ mode: "create" });
            }}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2"
          >
            <Plus size={14} />
            Add Entry
          </button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-3">
        <SmallStat value={`${stats.score}/100`} label="Score" tone="text-amber-400" />
        <SmallStat value={String(stats.total)} label="Entries" tone="text-[#7B5CFC]" />
        <SmallStat value={String(stats.active)} label="Active" tone="text-[#22C55E]" />
        <SmallStat
          value={stats.chars >= 1000 ? `${(stats.chars / 1000).toFixed(1)}K` : String(stats.chars)}
          label="Content Size"
          tone="text-blue-400"
        />
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-[#8B8FA8] text-xs">Knowledge completeness</span>
            <span className="text-white text-xs font-semibold">{stats.score}%</span>
          </div>
          <div className="h-2 bg-[#1C1C34] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#7B5CFC] to-[#00D4AA]"
              style={{ width: `${stats.score}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-2">
        {!agentId && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-12 text-center text-[#4A4A6A] text-sm">
            Create or select an agent to manage its knowledge.
          </div>
        )}
        {agentId && !loading && entries.length === 0 && (
          <div className="bg-[#0B0B1A] border border-dashed border-[#1C1C34] rounded-xl px-5 py-12 text-center">
            <HelpCircle size={32} className="text-[#7B5CFC]/40 mx-auto mb-3" />
            <div className="text-white text-sm font-semibold mb-1">No knowledge yet</div>
            <div className="text-[#4A4A6A] text-xs mb-4">
              Add Q&A pairs, policies, or domain facts so your agent can answer accurately.
            </div>
            <button
              onClick={() => setModal({ mode: "create" })}
              className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold inline-flex items-center gap-2"
            >
              <Plus size={14} />
              Add first entry
            </button>
          </div>
        )}
        {entries.map((e) => (
          <EntryRow
            key={e.id}
            entry={e}
            onEdit={() => setModal({ mode: "edit", entry: e })}
            onDelete={() => onDelete(e)}
            onToggle={() => onToggle(e)}
          />
        ))}
      </div>

      {modal && agentId && workspaceId && (
        <EntryModal
          mode={modal.mode}
          entry={modal.entry}
          workspaceId={workspaceId}
          agentId={agentId}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            reloadEntries();
          }}
        />
      )}
    </div>
  );
}

function SmallStat({
  value,
  label,
  tone,
}: {
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
      <div className={`text-[20px] font-bold leading-none ${tone}`}>{value}</div>
      <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
        {label}
      </div>
    </div>
  );
}

function EntryRow({
  entry,
  onEdit,
  onDelete,
  onToggle,
}: {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 hover:border-[#7B5CFC]/30">
      <div className="flex items-start gap-3">
        <HelpCircle size={16} className="text-[#7B5CFC] flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0" onClick={() => setOpen((o) => !o)}>
          <div className="text-white text-sm font-medium cursor-pointer">{entry.title}</div>
          {open && (
            <div className="text-[#8B8FA8] text-xs mt-1.5 whitespace-pre-wrap">
              {entry.content}
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className={`text-[10px] px-2 py-0.5 rounded-full ${
            entry.is_active
              ? "bg-[#22C55E]/12 text-[#22C55E]"
              : "bg-[#1C1C34] text-[#8B8FA8]"
          }`}
        >
          {entry.is_active ? "Active" : "Inactive"}
        </button>
        <button
          onClick={onEdit}
          className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-white hover:bg-white/[0.04] flex items-center justify-center"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={onDelete}
          className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-red-400 hover:bg-white/[0.04] flex items-center justify-center"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function EntryModal({
  mode,
  entry,
  workspaceId,
  agentId,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  entry?: Entry;
  workspaceId: string;
  agentId: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(entry?.title ?? "");
  const [content, setContent] = useState(entry?.content ?? "");
  const [active, setActive] = useState(entry?.is_active ?? true);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }
    setSaving(true);
    try {
      if (mode === "create") {
        const { error } = await supabase.from("knowledge_entries").insert({
          workspace_id: workspaceId,
          agent_id: agentId,
          title: title.trim(),
          content: content.trim(),
          source_type: "manual",
          is_active: active,
        });
        if (error) throw error;
        toast.success("Entry added");
      } else if (entry) {
        const { error } = await supabase
          .from("knowledge_entries")
          .update({
            title: title.trim(),
            content: content.trim(),
            is_active: active,
          })
          .eq("id", entry.id);
        if (error) throw error;
        toast.success("Entry updated");
      }
      onSaved();
    } catch (err: any) {
      toast.error(err?.message ?? "Could not save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] max-w-[95vw] bg-[#111118] border border-[#1E1E2E] rounded-xl z-50 shadow-2xl">
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#1E1E2E]">
          <div className="text-white font-semibold">
            {mode === "create" ? "Add Knowledge Entry" : "Edit Knowledge Entry"}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
              Title / Question
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. What are your opening hours?"
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
            />
          </div>
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
              Content / Answer
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide the answer or fact the agent should know…"
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 min-h-[160px] text-white text-sm resize-none focus:outline-none focus:border-[#7B5CFC]/60"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-[#8B8FA8] cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="accent-[#7B5CFC]"
            />
            Active — include this entry in agent responses
          </label>
        </div>
        <div className="px-5 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold disabled:opacity-50"
          >
            {saving ? "Saving…" : mode === "create" ? "Add Entry" : "Save"}
          </button>
        </div>
      </div>
    </>
  );
}
