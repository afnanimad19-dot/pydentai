import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BarChart3,
  Bot,
  GitBranch,
  Globe,
  LayoutGrid,
  List,
  Play,
  Search,
  Sparkles,
  TestTube2,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/workflows")({
  component: WorkflowsPage,
});

type Workflow = {
  id: string;
  name: string;
  agentId: string;
  agentName: string;
  status: "active" | "inactive" | "published";
  nodes: number;
};

type Agent = {
  id: string;
  name: string;
  type: string;
  status: "Active" | "Inactive";
};

const AGENTS: Agent[] = [
  { id: "a1", name: "Dental Assistant", type: "Voice Agent", status: "Active" },
  { id: "a2", name: "Sarah - Sales", type: "Chat Agent", status: "Active" },
  { id: "a3", name: "Support Bot", type: "Chat Agent", status: "Inactive" },
  { id: "a4", name: "Booking Concierge", type: "Voice Agent", status: "Active" },
];

function WorkflowsPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [wfFilter, setWfFilter] = useState<"All" | "Active" | "Inactive" | "Published">("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const filtered = useMemo(() => {
    return workflows.filter((w) => {
      if (wfFilter === "Active" && w.status !== "active") return false;
      if (wfFilter === "Inactive" && w.status !== "inactive") return false;
      if (wfFilter === "Published" && w.status !== "published") return false;
      if (query && !w.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [workflows, wfFilter, query]);

  const totalNodes = workflows.reduce((s, w) => s + w.nodes, 0);
  const stats: [string, string][] = [
    [String(workflows.length), "Workflows"],
    [String(workflows.filter((w) => w.status === "active").length), "Active"],
    [String(workflows.filter((w) => w.status === "published").length), "Published"],
    [String(new Set(workflows.map((w) => w.agentId)).size), "Agents"],
    [String(totalNodes), "Total Nodes"],
    [workflows.length ? String(Math.round(totalNodes / workflows.length)) : "0", "Avg Nodes"],
    [workflows.length ? `${Math.min(100, totalNodes * 5)}%` : "0%", "Complexity"],
    [workflows.length ? "98%" : "0%", "Health"],
  ];

  const create = (agent: Agent) => {
    const id = `wf_${Date.now()}`;
    const wf: Workflow = {
      id,
      name: "Untitled Workflow",
      agentId: agent.id,
      agentName: agent.name,
      status: "inactive",
      nodes: 1,
    };
    setWorkflows((ws) => [wf, ...ws]);
    setModal(false);
    navigate({ to: "/agents/workflows/$id", params: { id } });
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pt-6 pb-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <GitBranch size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                Workflow Builder
              </div>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-0.5 rounded-full">
                {workflows.length} workflows
              </span>
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Design, build & deploy automation flows across your AI agents
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
            <BarChart3 size={14} />
            Analytics
          </button>
          <button
            onClick={() => setModal(true)}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
          >
            + New Workflow
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="px-6 py-5 flex items-center border-b border-[#1C1C34] flex-wrap">
        {stats.map(([v, l], i) => (
          <div
            key={l}
            className={`flex items-center px-5 ${i === 0 ? "pl-0" : "border-l border-[#1C1C34]"}`}
          >
            <span className="text-white font-bold text-lg">{v}</span>
            <span className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] ml-1.5">
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="px-6 py-4 flex items-center gap-3">
        <div className="relative w-80">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workflows by name, agent, or description..."
            className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
          />
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["All", "Active", "Inactive", "Published"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setWfFilter(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                wfFilter === p ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`h-9 w-9 rounded-lg bg-[#0B0B1A] border flex items-center justify-center ${
              view === "grid" ? "border-[#7B5CFC] text-white" : "border-[#1C1C34] text-[#8B8FA8] hover:text-white"
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`h-9 w-9 rounded-lg bg-[#0B0B1A] border flex items-center justify-center ${
              view === "list" ? "border-[#7B5CFC] text-white" : "border-[#1C1C34] text-[#8B8FA8] hover:text-white"
            }`}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl flex flex-col items-center justify-center py-24">
            <div className="w-[72px] h-[72px] rounded-2xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center mx-auto mb-6">
              <GitBranch size={36} className="text-[#7B5CFC]" />
            </div>
            <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">
              Build Your First Workflow
            </div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
              Create visual automation flows with drag-and-drop nodes, conditional logic, AI
              processing, and multi-channel actions.
            </div>
            <button
              onClick={() => setModal(true)}
              className="h-11 px-6 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
            >
              + Create First Workflow
            </button>
            <div className="flex items-center gap-3 mt-8 flex-wrap justify-center">
              <Pill icon={Sparkles} text="30+ Node Types" tone="text-[#7B5CFC]" />
              <Pill icon={GitBranch} text="Drag & Drop Canvas" tone="text-[#00D4AA]" />
              <Pill icon={TestTube2} text="Test Before Publish" tone="text-[#22C55E]" />
            </div>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((w) => (
              <button
                key={w.id}
                onClick={() => navigate({ to: "/agents/workflows/$id", params: { id: w.id } })}
                className="bg-[#0B0B1A] border border-[#1C1C34] hover:border-[#7B5CFC]/40 rounded-xl p-4 text-left"
              >
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch size={16} className="text-[#7B5CFC]" />
                  <span className="text-white font-semibold text-sm truncate">{w.name}</span>
                </div>
                <div className="text-[#4A4A6A] text-xs mb-3">{w.agentName}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8B8FA8] text-xs">{w.nodes} nodes</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      w.status === "active"
                        ? "bg-[#22C55E]/15 text-[#22C55E]"
                        : w.status === "published"
                        ? "bg-[#7B5CFC]/15 text-[#7B5CFC]"
                        : "bg-[#1C1C34] text-[#8B8FA8]"
                    }`}
                  >
                    {w.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            {filtered.map((w, i) => (
              <button
                key={w.id}
                onClick={() => navigate({ to: "/agents/workflows/$id", params: { id: w.id } })}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1C1C34]/40 text-left ${
                  i > 0 ? "border-t border-[#1C1C34]" : ""
                }`}
              >
                <GitBranch size={16} className="text-[#7B5CFC]" />
                <span className="text-white font-semibold text-sm flex-1 truncate">{w.name}</span>
                <span className="text-[#8B8FA8] text-xs">{w.agentName}</span>
                <span className="text-[#4A4A6A] text-xs">{w.nodes} nodes</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    w.status === "active"
                      ? "bg-[#22C55E]/15 text-[#22C55E]"
                      : w.status === "published"
                      ? "bg-[#7B5CFC]/15 text-[#7B5CFC]"
                      : "bg-[#1C1C34] text-[#8B8FA8]"
                  }`}
                >
                  {w.status}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {modal && <CreateWorkflowModal onClose={() => setModal(false)} onCreate={create} />}
    </div>
  );
}

function Pill({
  icon: Icon,
  text,
  tone,
}: {
  icon: typeof GitBranch;
  text: string;
  tone: string;
}) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-full px-4 py-2 flex items-center gap-2">
      <Icon size={14} className={tone} />
      <span className="text-[#8B8FA8] text-xs">{text}</span>
    </div>
  );
}

function CreateWorkflowModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (a: Agent) => void;
}) {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const list = AGENTS.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  const selectedAgent = AGENTS.find((a) => a.id === selected);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[520px] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-start justify-between">
          <div>
            <div className="text-white font-semibold">Create New Workflow</div>
            <div className="text-[#4A4A6A] text-xs mt-1">
              Select an AI agent to build a visual automation flow with drag-and-drop nodes
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-4 space-y-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search agents..."
              className="w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
            />
          </div>
          <div className="max-h-[280px] overflow-y-auto space-y-1.5">
            {list.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border ${
                  selected === a.id
                    ? "border-[#7C5CFC] bg-[#7B5CFC]/5"
                    : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#1C1C34] flex items-center justify-center">
                  {a.type.includes("Voice") ? (
                    <Globe size={14} className="text-[#7B5CFC]" />
                  ) : (
                    <Bot size={14} className="text-[#00D4AA]" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white text-sm font-semibold">{a.name}</div>
                  <div className="text-[#4A4A6A] text-xs">{a.type}</div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    a.status === "Active"
                      ? "bg-[#22C55E]/15 text-[#22C55E]"
                      : "bg-[#1C1C34] text-[#8B8FA8]"
                  }`}
                >
                  {a.status}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="px-5 py-4 border-t border-[#1C1C34] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm"
          >
            Cancel
          </button>
          <button
            disabled={!selectedAgent}
            onClick={() => selectedAgent && onCreate(selectedAgent)}
            className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold flex items-center gap-1"
          >
            <Play size={12} />
            Create Workflow
          </button>
        </div>
      </div>
    </div>
  );
}
