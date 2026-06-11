import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  GitBranch, Search, Layers, CheckCircle, Zap, Network, Link2, Activity,
  Plus, Sparkles, Loader2, Trash2, ExternalLink, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";

export const Route = createFileRoute("/_dashboard/whatsapp/chatbot/")({ component: ChatbotIndex });

const SUPABASE_URL = "https://gsjxwhklnlazwuznpdlk.supabase.co";

type Flow = {
  id: string;
  workspace_id: string;
  name: string;
  status: "draft" | "live";
  nodes: any[];
  edges: any[];
  variables: any[];
  updated_at: string;
};

function ChatbotIndex() {
  const { workspaceId } = useWorkspace();
  const navigate = useNavigate();
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Live" | "Draft">("All");
  const [aiOpen, setAiOpen] = useState(false);

  const reload = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("chatbot_flows")
      .select("*")
      .eq("workspace_id", workspaceId)
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setFlows(((data ?? []) as any[]).map((f) => ({
      ...f,
      nodes: Array.isArray(f.nodes) ? f.nodes : [],
      edges: Array.isArray(f.edges) ? f.edges : [],
      variables: Array.isArray(f.variables) ? f.variables : [],
    })) as Flow[]);
    setLoading(false);
  }, [workspaceId]);

  useEffect(() => { reload(); }, [reload]);

  const filtered = useMemo(() => flows.filter((f) => {
    if (filter === "Live" && f.status !== "live") return false;
    if (filter === "Draft" && f.status !== "draft") return false;
    if (query && !f.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [flows, filter, query]);

  const total = flows.length;
  const liveCount = flows.filter((f) => f.status === "live").length;
  const triggers = flows.length; // 1 trigger per flow
  const totalNodes = flows.reduce((s, f) => s + (f.nodes?.length ?? 0), 0);
  const totalEdges = flows.reduce((s, f) => s + (f.edges?.length ?? 0), 0);
  const avgComplexity = total ? Math.round((totalNodes / total) * 10) / 10 : 0;
  const readiness = total === 0 ? 0 : Math.round((liveCount / total) * 100);

  const createBlank = async () => {
    if (!workspaceId) return toast.error("No workspace");
    const { data, error } = await supabase
      .from("chatbot_flows")
      .insert({ workspace_id: workspaceId, name: "Untitled Flow" })
      .select("id").single();
    if (error || !data) return toast.error(error?.message ?? "Failed");
    navigate({ to: "/whatsapp/chatbot/flow/$id", params: { id: data.id } });
  };

  const deleteFlow = async (id: string) => {
    if (!confirm("Delete this flow?")) return;
    const { error } = await supabase.from("chatbot_flows").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setFlows((fs) => fs.filter((f) => f.id !== id));
    toast.success("Flow deleted");
  };

  const METRICS = [
    { label: "Total Flows", value: total, icon: GitBranch, color: "#00D4AA" },
    { label: "Live", value: liveCount, icon: CheckCircle, color: "#22C55E" },
    { label: "Triggers", value: triggers, icon: Zap, color: "#F59E0B" },
    { label: "Nodes", value: totalNodes, icon: Layers, color: "#3B82F6" },
    { label: "Connections", value: totalEdges, icon: Link2, color: "#7B5CFC" },
    { label: "Avg Complexity", value: avgComplexity, icon: Network, color: "#FF4D6D" },
  ];

  return (
    <div className="font-sans p-6 bg-[#06060F] min-h-[calc(100vh-56px)] text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GitBranch className="text-[#00D4AA]" size={22} /> Flow Command Center
          </h1>
          <p className="text-[#8B8FA8] text-sm mt-1">Design visual chatbot flows for WhatsApp.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setAiOpen(true)} className="h-9 px-3 rounded-lg bg-[#7B5CFC]/15 border border-[#7B5CFC]/40 text-[#B4A0FF] hover:bg-[#7B5CFC]/25 text-sm font-medium flex items-center gap-2">
            <Sparkles size={14} /> Generate with AI
          </button>
          <button onClick={createBlank} className="h-9 px-3 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-sm font-semibold flex items-center gap-2">
            <Plus size={14} /> New Flow
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8B8FA8] text-xs">{m.label}</span>
              <m.icon size={14} style={{ color: m.color }} />
            </div>
            <div className="text-2xl font-bold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-[#00D4AA]" />
            <span className="text-sm font-medium">Automation Readiness</span>
          </div>
          <span className="text-[#00D4AA] font-bold text-sm">{readiness}%</span>
        </div>
        <div className="h-2 bg-[#1C1C34] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00D4AA] to-[#7B5CFC]" style={{ width: `${readiness}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {(["All","Live","Draft"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`h-8 px-3 rounded-lg text-xs font-medium ${filter===f ? "bg-[#00D4AA] text-black" : "bg-[#1C1C34] text-[#8B8FA8] hover:text-white"}`}>{f}</button>
          ))}
        </div>
        <div className="relative w-64">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search flows..." className="w-full h-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-md text-white text-xs pl-7 pr-2 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-[#8B8FA8]"><Loader2 className="animate-spin mr-2" size={16} /> Loading flows...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0B0B1A] border border-dashed border-[#1C1C34] rounded-xl py-16 text-center">
          <GitBranch className="mx-auto text-[#4A4A6A] mb-3" size={32} />
          <div className="text-white font-semibold mb-1">No flows yet</div>
          <div className="text-[#8B8FA8] text-sm mb-4">Build your first visual chatbot flow.</div>
          <button onClick={createBlank} className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-sm font-semibold inline-flex items-center gap-2">
            <Plus size={14} /> New Flow
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((f) => (
            <div key={f.id} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 hover:border-[#00D4AA]/40 transition group">
              <div className="flex items-start justify-between mb-2">
                <div className="font-semibold truncate">{f.name}</div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${f.status === "live" ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>
                  {f.status === "live" ? "● LIVE" : "○ DRAFT"}
                </span>
              </div>
              <div className="flex gap-3 text-[11px] text-[#8B8FA8] mb-4">
                <span>{f.nodes?.length ?? 0} nodes</span>
                <span>·</span>
                <span>{f.edges?.length ?? 0} edges</span>
                <span>·</span>
                <span>{new Date(f.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate({ to: "/whatsapp/chatbot/flow/$id", params: { id: f.id } })} className="flex-1 h-8 rounded-lg bg-[#1C1C34] hover:bg-[#262644] text-white text-xs font-medium flex items-center justify-center gap-1">
                  <ExternalLink size={12} /> Open
                </button>
                <button onClick={() => deleteFlow(f.id)} className="h-8 w-8 rounded-lg bg-[#1C1C34] hover:bg-[#FF4D6D]/20 text-[#FF4D6D] flex items-center justify-center"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {aiOpen && <AiGenerateModal onClose={() => setAiOpen(false)} workspaceId={workspaceId ?? null} onCreated={(id) => navigate({ to: "/whatsapp/chatbot/flow/$id", params: { id } })} />}
    </div>
  );
}

function AiGenerateModal({ onClose, workspaceId, onCreated }: { onClose: () => void; workspaceId: string | null; onCreated: (id: string) => void }) {
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!workspaceId) return toast.error("No workspace");
    if (!desc.trim()) return toast.error("Describe the flow first");
    setLoading(true);
    try {
      const { data: sess } = await supabase.auth.getSession();
      const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-chatbot-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sess.session?.access_token ?? ""}` },
        body: JSON.stringify({ workspace_id: workspaceId, description: desc, name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Failed");
      toast.success("Flow generated");
      onCreated(json.flow_id);
    } catch (e: any) {
      toast.error(e.message ?? "Generate failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Sparkles className="text-[#7B5CFC]" size={18} /><h2 className="font-bold">Generate Flow with AI</h2></div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
        </div>
        <label className="text-xs text-[#8B8FA8] mb-1 block">Flow name (optional)</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Lead capture bot" className="w-full h-9 mb-3 bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-sm px-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
        <label className="text-xs text-[#8B8FA8] mb-1 block">Describe what the chatbot should do</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={5} placeholder="When a customer messages, greet them, ask for their name and email, then offer to book a demo or chat with sales..." className="w-full bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-sm p-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="h-9 px-3 rounded-lg bg-[#1C1C34] text-white text-sm">Cancel</button>
          <button onClick={generate} disabled={loading} className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6A47F0] text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} />} Generate
          </button>
        </div>
      </div>
    </div>
  );
}
