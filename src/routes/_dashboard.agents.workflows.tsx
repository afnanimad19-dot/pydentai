import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart3,
  GitBranch,
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

const STATS = [
  ["0", "Workflows"],
  ["0", "Active"],
  ["0", "Published"],
  ["0", "Agents"],
  ["0", "Total Nodes"],
  ["0", "Avg Nodes"],
  ["0%", "Complexity"],
  ["0%", "Health"],
];

function WorkflowsPage() {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("All");

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
                0 workflows
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
        {STATS.map(([v, l], i) => (
          <div
            key={l}
            className={`flex items-center px-5 ${
              i === 0 ? "pl-0" : "border-l border-[#1C1C34]"
            }`}
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
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]"
          />
          <input
            placeholder="Search workflows by name, agent, or description..."
            className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
          />
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {["All", "Active", "Inactive", "Published"].map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                filter === p
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs">
          Recent
        </button>
        <div className="ml-auto flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white">
            <LayoutGrid size={14} />
          </button>
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white">
            <List size={14} />
          </button>
        </div>
      </div>

      {/* Empty state */}
      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl flex flex-col items-center justify-center py-24">
          <div className="w-[72px] h-[72px] rounded-2xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center mx-auto mb-6">
            <GitBranch size={36} className="text-[#7B5CFC]" />
          </div>
          <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">
            Build Your First Workflow
          </div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Create visual automation flows with drag-and-drop nodes,
            conditional logic, AI processing, and multi-channel actions.
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
      </div>

      {modal && <NewWorkflowModal onClose={() => setModal(false)} />}
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

function NewWorkflowModal({ onClose }: { onClose: () => void }) {
  const TEMPLATES = [
    "Appointment Flow",
    "FAQ Flow",
    "Lead Qualification",
    "Blank",
  ];
  const [tpl, setTpl] = useState("Blank");
  const [name, setName] = useState("Untitled Workflow");
  const navigate = useNavigate();

  const create = () => {
    navigate({
      to: "/agents/workflows/canvas",
      search: { name: name || "Untitled Workflow", template: tpl },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[480px] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <div className="text-white font-semibold">New Workflow</div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
              Name
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Untitled Workflow"
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
            />
          </div>
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
              Agent
            </div>
            <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm">
              <option>Dental Assistant</option>
              <option>Sarah</option>
            </select>
          </div>
          <div>
            <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-2">
              Template
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTpl(t)}
                  className={`bg-[#06060F] border rounded-lg p-3 text-left text-sm ${
                    tpl === t
                      ? "border-[#7B5CFC] text-white"
                      : "border-[#1C1C34] text-[#8B8FA8] hover:border-[#7B5CFC]/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
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
            onClick={create}
            className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-1"
          >
            <Play size={12} />
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
