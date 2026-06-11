import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Lock,
  Maximize2,
  MoreHorizontal,
  Play,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/workflows/$id")({
  component: WorkflowCanvasPage,
});

const CATEGORIES: { name: string; items: string[] }[] = [
  { name: "TRIGGERS", items: ["Start", "Inbound Call", "Inbound Message", "Schedule", "Webhook"] },
  {
    name: "CONVERSATION",
    items: ["Greeting", "Ask Question", "Collect Data", "AI Response", "Play Audio"],
  },
  {
    name: "LOGIC & FLOW",
    items: ["Condition", "AI Decision", "Sentiment Check", "A/B Test", "Delay", "Loop"],
  },
  {
    name: "ACTIONS",
    items: [
      "Update CRM",
      "Tag Lead",
      "Schedule Meeting",
      "Send Email",
      "Send SMS",
      "API Call",
      "Notify Team",
    ],
  },
  { name: "CHANNELS", items: ["Transfer Call", "Agent Handoff", "Channel Switch"] },
  {
    name: "ADVANCED",
    items: ["Memory Read", "Memory Write", "Custom Code", "Analytics Log", "End"],
  },
];

const initialNodes: Node[] = [
  {
    id: "start",
    type: "default",
    position: { x: 250, y: 200 },
    data: { label: "Start" },
    style: {
      background: "#0B0B1A",
      border: "1px solid #7B5CFC",
      color: "white",
      borderRadius: 12,
      padding: 12,
      width: 160,
    },
  },
];

function WorkflowCanvasPage() {
  const { id } = useParams({ from: "/_dashboard/agents/workflows/$id" });
  const [name, setName] = useState("Untitled Workflow");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<"draft" | "active">("draft");
  const [toast, setToast] = useState<string | null>(null);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState<Record<string, boolean>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.name, true]))
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`workflow_${id}`);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.name) setName(data.name);
        if (data.nodes) setNodes(data.nodes);
        if (data.edges) setEdges(data.edges);
        if (data.status) setStatus(data.status);
      }
    } catch {
      /* noop */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#7B5CFC" } }, eds));
      setDirty(true);
    },
    [setEdges]
  );

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const addNode = (label: string) => {
    const newId = `n_${Date.now()}`;
    setNodes((ns) => [
      ...ns,
      {
        id: newId,
        type: "default",
        position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 200 },
        data: { label },
        style: {
          background: "#0B0B1A",
          border: "1px solid #1C1C34",
          color: "white",
          borderRadius: 12,
          padding: 12,
          width: 160,
        },
      } as Node,
    ]);
    setDirty(true);
  };

  const save = () => {
    try {
      localStorage.setItem(
        `workflow_${id}`,
        JSON.stringify({ name, nodes, edges, status })
      );
      setDirty(false);
      flash("Workflow saved");
    } catch {
      flash("Save failed");
    }
  };

  const publish = () => {
    setStatus("active");
    setConfirmPublish(false);
    try {
      localStorage.setItem(
        `workflow_${id}`,
        JSON.stringify({ name, nodes, edges, status: "active" })
      );
    } catch {
      /* noop */
    }
    flash("Workflow published");
  };

  const typeCount = useMemo(() => new Set(nodes.map((n) => n.data?.label)).size, [nodes]);

  const filteredCats = CATEGORIES.map((c) => ({
    ...c,
    items: c.items.filter((i) => i.toLowerCase().includes(search.toLowerCase())),
  })).filter((c) => c.items.length > 0);

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden bg-[#08081A]">
      {/* Top bar */}
      <div className="h-14 bg-[#111118] border-b border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
        <Link to="/agents/workflows" className="text-[#8B8FA8] hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft size={14} /> Workflows
        </Link>
        <div className="h-5 w-px bg-[#1C1C34]" />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setDirty(true);
          }}
          className="bg-transparent text-white font-semibold text-sm outline-none border-b border-transparent focus:border-[#7B5CFC]/40 px-1"
        />
        <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-0.5 rounded-full">Agent</span>
        {dirty && (
          <span className="bg-[#F59E0B]/15 text-[#F59E0B] text-xs px-2 py-0.5 rounded-full">
            Unsaved
          </span>
        )}

        <div className="mx-auto flex items-center gap-2">
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">
            {nodes.length} nodes
          </span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">
            {edges.length} edges
          </span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">
            {typeCount} types
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <HelpCircle size={14} />
          </button>
          <button className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <MoreHorizontal size={14} />
          </button>
          <button
            onClick={save}
            className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs"
          >
            Save
          </button>
          <button
            onClick={() => setConfirmPublish(true)}
            className="h-8 px-3 rounded-lg bg-[#7C5CFC] hover:bg-[#6047DB] text-white text-xs font-semibold"
          >
            {status === "active" ? "● Published" : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            style={{ background: "#08081A" }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1C1C34" />
            <Controls className="!bg-[#111118] !border-[#1C1C34]" />
          </ReactFlow>

          {/* Bottom toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111118] border border-[#1E1E2E] rounded-2xl px-3 py-2 flex items-center gap-2 shadow-xl">
            <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">
              {nodes.length} nodes
            </span>
            <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">
              {edges.length} edges
            </span>
            <div className="h-5 w-px bg-[#1C1C34] mx-1" />
            <button className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-white flex items-center justify-center">
              <ZoomOut size={14} />
            </button>
            <button className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-white flex items-center justify-center">
              <ZoomIn size={14} />
            </button>
            <button className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-white flex items-center justify-center">
              <Maximize2 size={14} />
            </button>
            <button className="w-7 h-7 rounded-md text-[#8B8FA8] hover:text-white flex items-center justify-center">
              <Lock size={14} />
            </button>
            <div className="h-5 w-px bg-[#1C1C34] mx-1" />
            <button className="h-7 px-3 rounded-md bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold flex items-center gap-1">
              <Play size={12} /> Execute <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-[280px] flex-shrink-0 bg-[#111118] border-l border-[#1C1C34] overflow-y-auto">
          <div className="px-4 pt-4 pb-2 text-white font-semibold text-sm">
            What happens next?
          </div>
          <div className="px-3 pb-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search nodes..."
                className="w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
              />
            </div>
          </div>
          <div className="px-2 pb-6 space-y-1">
            {filteredCats.map((c) => {
              const open = openCats[c.name] ?? true;
              return (
                <div key={c.name}>
                  <button
                    onClick={() => setOpenCats((s) => ({ ...s, [c.name]: !open }))}
                    className="w-full flex items-center gap-1.5 px-2 py-2 text-[10px] uppercase tracking-wider text-[#4A4A6A] hover:text-white"
                  >
                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    <span>{c.name}</span>
                    <span className="ml-auto bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-1.5 rounded-full">
                      {c.items.length}
                    </span>
                  </button>
                  {open && (
                    <div className="space-y-0.5 pl-2">
                      {c.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => addNode(item)}
                          className="w-full text-left px-3 py-1.5 rounded-md text-sm text-[#8B8FA8] hover:text-white hover:bg-[#1C1C34]/60"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {confirmPublish && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[400px] p-5">
            <div className="text-white font-semibold mb-2">Publish workflow?</div>
            <div className="text-[#8B8FA8] text-sm mb-5">
              This will set the workflow status to active and make it available to your agents.
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmPublish(false)}
                className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm"
              >
                Cancel
              </button>
              <button
                onClick={publish}
                className="h-9 px-5 rounded-lg bg-[#7C5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#0B0B1A] border border-[#22C55E]/40 text-white text-sm px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 z-50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
          {toast}
          <button onClick={() => setToast(null)} className="ml-2 text-[#4A4A6A] hover:text-white">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
