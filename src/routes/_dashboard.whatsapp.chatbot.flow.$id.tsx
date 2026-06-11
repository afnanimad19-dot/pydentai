import { createFileRoute, Link, useParams, useSearch } from "@tanstack/react-router";
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
import { toast } from "sonner";
import {
  ArrowLeft, Braces, Maximize2, RefreshCw, Play, Eye, Search,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/chatbot/flow/$id")({
  validateSearch: (s: Record<string, unknown>) => ({ blank: s.blank === true || s.blank === "true" }),
  component: ChatbotFlow,
});

const CATEGORIES: { name: string; color: string; items: { label: string; sub: string }[] }[] = [
  {
    name: "MESSAGES", color: "text-[#00D4AA]", items: [
      { label: "Send Message", sub: "Text with buttons or menu" },
      { label: "Send Media", sub: "Image, video, or document" },
      { label: "List Message", sub: "Interactive list selector" },
      { label: "Send Location", sub: "Share a location" },
      { label: "Send Template", sub: "Approved WhatsApp template" },
    ],
  },
  {
    name: "INPUT & DATA", color: "text-[#3B82F6]", items: [
      { label: "Collect Input", sub: "Name, email, phone, etc." },
      { label: "Request Location", sub: "Ask for user location" },
      { label: "Await Reply", sub: "Wait for response" },
      { label: "Save to Lead", sub: "Create/update CRM lead" },
      { label: "Set Variable", sub: "Store data for later" },
    ],
  },
  {
    name: "LOGIC & FLOW", color: "text-[#F59E0B]", items: [
      { label: "Condition", sub: "If/else branching" },
      { label: "Random Split", sub: "A/B testing paths" },
      { label: "Delay", sub: "Wait before continuing" },
      { label: "Schedule", sub: "Send at specific time" },
      { label: "Go to Flow", sub: "Jump to another flow" },
    ],
  },
  {
    name: "ACTIONS", color: "text-[#7B5CFC]", items: [
      { label: "AI Response", sub: "GPT-powered reply" },
      { label: "HTTP Request", sub: "Call external API" },
      { label: "Assign Tag", sub: "Tag the contact" },
      { label: "Add to Group", sub: "Add contact to group" },
      { label: "Notify Team", sub: "Alert via Slack/email" },
      { label: "Transfer to Human", sub: "Handoff to live agent" },
    ],
  },
  {
    name: "END", color: "text-[#FF4D6D]", items: [
      { label: "End Flow", sub: "Terminate conversation" },
    ],
  },
];

const AI_TEMPLATE_NODES: Node[] = [
  { id: "start", position: { x: 60, y: 220 }, data: { label: "Start" }, style: nodeStyle("#00D4AA") },
  { id: "n1", position: { x: 240, y: 220 }, data: { label: "Greeting" }, style: nodeStyle("#00D4AA") },
  { id: "n2", position: { x: 420, y: 220 }, data: { label: "Collect Input" }, style: nodeStyle("#3B82F6") },
  { id: "n3", position: { x: 600, y: 220 }, data: { label: "Condition" }, style: nodeStyle("#F59E0B") },
  { id: "n4", position: { x: 780, y: 220 }, data: { label: "AI Response" }, style: nodeStyle("#7B5CFC") },
  { id: "n5", position: { x: 960, y: 220 }, data: { label: "End Flow" }, style: nodeStyle("#FF4D6D") },
];
const AI_TEMPLATE_EDGES: Edge[] = [
  { id: "e1", source: "start", target: "n1", animated: true, style: { stroke: "#00D4AA" } },
  { id: "e2", source: "n1", target: "n2", animated: true, style: { stroke: "#00D4AA" } },
  { id: "e3", source: "n2", target: "n3", animated: true, style: { stroke: "#00D4AA" } },
  { id: "e4", source: "n3", target: "n4", animated: true, style: { stroke: "#00D4AA" } },
  { id: "e5", source: "n4", target: "n5", animated: true, style: { stroke: "#00D4AA" } },
];

function nodeStyle(color: string): React.CSSProperties {
  return {
    background: "#0B0B1A",
    border: `1px solid ${color}`,
    color: "white",
    borderRadius: 12,
    padding: 10,
    width: 150,
    fontSize: 12,
  };
}

function colorForLabel(label: string): string {
  for (const c of CATEGORIES) {
    if (c.items.some((i) => i.label === label)) {
      const m = c.color.match(/#([0-9A-Fa-f]{6})/);
      return m ? `#${m[1]}` : "#7B5CFC";
    }
  }
  return "#7B5CFC";
}

function ChatbotFlow() {
  const { id } = useParams({ from: "/_dashboard/whatsapp/chatbot/flow/$id" });
  const { blank } = useSearch({ from: "/_dashboard/whatsapp/chatbot/flow/$id" });

  const [name, setName] = useState("Untitled Flow");
  const [live, setLive] = useState(false);
  const [search, setSearch] = useState("");
  const [density, setDensity] = useState(50);

  const initial: { nodes: Node[]; edges: Edge[] } = useMemo(() => {
    if (blank) {
      return {
        nodes: [{ id: "start", position: { x: 300, y: 220 }, data: { label: "Start" }, style: nodeStyle("#00D4AA") }],
        edges: [],
      };
    }
    return { nodes: AI_TEMPLATE_NODES, edges: AI_TEMPLATE_EDGES };
  }, [blank]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`wa_flow_${id}`);
      if (raw) {
        const data = JSON.parse(raw);
        if (data.name) setName(data.name);
        if (data.nodes) setNodes(data.nodes);
        if (data.edges) setEdges(data.edges);
        if (typeof data.live === "boolean") setLive(data.live);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#00D4AA" } }, eds)),
    [setEdges]
  );

  const addNode = (label: string) => {
    const newId = `n_${Date.now()}`;
    setNodes((ns) => [
      ...ns,
      {
        id: newId,
        position: { x: 300 + Math.random() * 200, y: 180 + Math.random() * 200 },
        data: { label },
        style: nodeStyle(colorForLabel(label)),
      } as Node,
    ]);
  };

  const save = () => {
    try {
      localStorage.setItem(`wa_flow_${id}`, JSON.stringify({ name, nodes, edges, live }));
      toast.success("Flow saved");
    } catch {
      toast.error("Save failed");
    }
  };

  const publish = () => {
    setLive(true);
    save();
    toast.success("Flow published");
  };

  const filteredCats = CATEGORIES.map((c) => ({
    ...c,
    items: c.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
  })).filter((c) => c.items.length > 0);

  const totalCount = CATEGORIES.reduce((s, c) => s + c.items.length, 0);
  const visibleCount = filteredCats.reduce((s, c) => s + c.items.length, 0);

  const densityPct = Math.min(100, Math.round((nodes.length / 20) * 100));

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden bg-[#08081A]">
      {/* Top bar */}
      <div className="h-14 bg-[#111118] border-b border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
        <Link to="/whatsapp/chatbot" className="text-[#8B8FA8] hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft size={14} /> Back
        </Link>
        <div className="h-5 w-px bg-[#1C1C34]" />
        <input value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent text-white font-semibold text-sm outline-none border-b border-transparent focus:border-[#00D4AA]/40 px-1" />
        <button
          onClick={() => setLive((v) => !v)}
          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${live ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}
        >
          {live ? "● LIVE" : "○ OFF"}
        </button>
        <span className="bg-[#00D4AA]/15 text-[#00D4AA] text-[10px] px-2 py-0.5 rounded-full">Health 98%</span>

        <div className="mx-auto flex items-center gap-2">
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">{nodes.length} nodes</span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">{edges.length} edges</span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">0 vars</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center" title="Variables"><Braces size={14} /></button>
          <button className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center" title="Refresh"><RefreshCw size={14} /></button>
          <button className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center" title="Fullscreen"><Maximize2 size={14} /></button>
          <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1"><Eye size={12} /> Preview</button>
          <button onClick={save} className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs">Test</button>
          <button onClick={publish} className="h-8 px-3 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold">Publish</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left panel */}
        <div className="w-[220px] flex-shrink-0 bg-[#111118] border-r border-[#1C1C34] overflow-y-auto">
          <div className="px-3 pt-3 pb-1 flex items-center justify-between">
            <span className="text-white text-xs font-semibold uppercase tracking-wider">Components</span>
            <span className="text-[#4A4A6A] text-[10px]">{visibleCount}/{totalCount}</span>
          </div>
          <div className="px-3 pb-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search nodes..." className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-xs pl-7 pr-2 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
            </div>
          </div>
          <div className="px-2 pb-6">
            {filteredCats.map((c) => (
              <div key={c.name} className="mb-3">
                <div className={`px-2 py-1 text-[10px] uppercase tracking-wider ${c.color} font-semibold`}>{c.name}</div>
                <div className="space-y-0.5">
                  {c.items.map((item) => (
                    <button key={item.label} onClick={() => addNode(item.label)} className="w-full text-left px-2 py-1.5 rounded-md hover:bg-[#1C1C34]/60 group">
                      <div className="text-white text-xs font-medium">{item.label}</div>
                      <div className="text-[#4A4A6A] text-[10px] truncate">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

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

          {/* Bottom status bar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111118] border border-[#1E1E2E] rounded-2xl px-4 py-2 flex items-center gap-3 shadow-xl">
            <span className="text-[#8B8FA8] text-xs">{nodes.length} nodes</span>
            <span className="text-[#4A4A6A]">·</span>
            <span className="text-[#8B8FA8] text-xs">{edges.length} edges</span>
            <span className="text-[#4A4A6A]">·</span>
            <span className="text-[#8B8FA8] text-xs">{densityPct}% Density</span>
            <input type="range" min={0} max={100} value={density} onChange={(e) => setDensity(Number(e.target.value))} className="w-24 accent-[#00D4AA]" />
            <button className="h-7 px-3 rounded-md bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold flex items-center gap-1"><Play size={12} /> Execute</button>
          </div>
        </div>
      </div>
    </div>
  );
}
