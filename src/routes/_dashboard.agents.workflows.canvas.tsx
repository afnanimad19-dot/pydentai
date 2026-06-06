import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  Bot,
  Brain,
  Clock,
  Database,
  GitBranch,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Play,
  Plus,
  Save,
  Sparkles,
  Tag,
  Trash2,
  Webhook,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/workflows/canvas")({
  validateSearch: (s: Record<string, unknown>) => ({
    name: (s.name as string) ?? "Untitled Workflow",
    template: (s.template as string) ?? "Blank",
  }),
  component: WorkflowCanvasPage,
});

type NodeKind =
  | "trigger"
  | "ai"
  | "whatsapp"
  | "sms"
  | "email"
  | "call"
  | "delay"
  | "condition"
  | "tag"
  | "data"
  | "webhook";

type CanvasNode = {
  id: string;
  kind: NodeKind;
  label: string;
  x: number;
  y: number;
};

const PALETTE: { kind: NodeKind; label: string; icon: LucideIcon; tone: string }[] = [
  { kind: "trigger", label: "Trigger", icon: Zap, tone: "text-[#F59E0B]" },
  { kind: "ai", label: "AI Step", icon: Brain, tone: "text-[#7B5CFC]" },
  { kind: "whatsapp", label: "WhatsApp", icon: MessageCircle, tone: "text-[#22C55E]" },
  { kind: "sms", label: "SMS", icon: MessageSquare, tone: "text-[#3B82F6]" },
  { kind: "email", label: "Email", icon: Mail, tone: "text-[#00D4AA]" },
  { kind: "call", label: "Call", icon: Phone, tone: "text-pink-400" },
  { kind: "delay", label: "Delay", icon: Clock, tone: "text-[#8B8FA8]" },
  { kind: "condition", label: "Condition", icon: GitBranch, tone: "text-amber-400" },
  { kind: "tag", label: "Tag Lead", icon: Tag, tone: "text-[#9B84FF]" },
  { kind: "data", label: "Update Data", icon: Database, tone: "text-[#00D4AA]" },
  { kind: "webhook", label: "Webhook", icon: Webhook, tone: "text-[#FF4D6D]" },
];

const TEMPLATE_NODES: Record<string, CanvasNode[]> = {
  Blank: [],
  "Appointment Flow": [
    { id: "n1", kind: "trigger", label: "New WhatsApp Message", x: 80, y: 120 },
    { id: "n2", kind: "ai", label: "Detect Booking Intent", x: 340, y: 120 },
    { id: "n3", kind: "whatsapp", label: "Ask Date & Time", x: 600, y: 120 },
    { id: "n4", kind: "data", label: "Save Booking", x: 860, y: 120 },
  ],
  "FAQ Flow": [
    { id: "n1", kind: "trigger", label: "Inbound Question", x: 80, y: 120 },
    { id: "n2", kind: "ai", label: "Match FAQ", x: 340, y: 120 },
    { id: "n3", kind: "whatsapp", label: "Send Answer", x: 600, y: 120 },
  ],
  "Lead Qualification": [
    { id: "n1", kind: "trigger", label: "New Lead", x: 80, y: 120 },
    { id: "n2", kind: "ai", label: "Score Lead", x: 340, y: 120 },
    { id: "n3", kind: "condition", label: "Score > 70?", x: 600, y: 120 },
    { id: "n4", kind: "tag", label: "Tag Qualified", x: 860, y: 60 },
    { id: "n5", kind: "email", label: "Nurture Email", x: 860, y: 200 },
  ],
};

function nodeMeta(kind: NodeKind) {
  return PALETTE.find((p) => p.kind === kind)!;
}

function WorkflowCanvasPage() {
  const { name, template } = useSearch({ from: "/_dashboard/agents/workflows/canvas" });
  const [title, setTitle] = useState(name);
  const [nodes, setNodes] = useState<CanvasNode[]>(TEMPLATE_NODES[template] ?? []);
  const [selected, setSelected] = useState<string | null>(null);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const dragRef = useRef<{ id: string; dx: number; dy: number } | null>(null);

  const addNode = (kind: NodeKind) => {
    const meta = nodeMeta(kind);
    const id = `n${Date.now()}`;
    setNodes((ns) => [
      ...ns,
      { id, kind, label: meta.label, x: 120 + (ns.length * 40) % 600, y: 320 + (ns.length * 20) % 200 },
    ]);
    setSelected(id);
  };

  const onMouseDown = (e: React.MouseEvent, n: CanvasNode) => {
    setSelected(n.id);
    dragRef.current = { id: n.id, dx: e.clientX - n.x, dy: e.clientY - n.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragRef.current;
    if (!d) return;
    setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: e.clientX - d.dx, y: e.clientY - d.dy } : n)));
  };
  const onMouseUp = () => (dragRef.current = null);

  const deleteSelected = () => {
    if (!selected) return;
    setNodes((ns) => ns.filter((n) => n.id !== selected));
    setSelected(null);
  };

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const sel = nodes.find((n) => n.id === selected);

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden bg-[#06060F]">
      {/* Toolbar */}
      <div className="h-14 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
        <Link to="/agents/workflows" className="text-[#8B8FA8] hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft size={14} /> Workflows
        </Link>
        <div className="h-5 w-px bg-[#1C1C34]" />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent text-white font-semibold text-sm outline-none border-b border-transparent focus:border-[#7B5CFC]/40 px-1"
        />
        <span className="text-[#4A4A6A] text-xs">· {template}</span>
        <span className="text-[#4A4A6A] text-xs">· {nodes.length} nodes</span>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setPublished((p) => !p)}
            className={`h-8 px-3 rounded-lg text-xs font-semibold ${
              published ? "bg-[#22C55E] text-white" : "border border-[#1C1C34] text-[#8B8FA8] hover:text-white"
            }`}
          >
            {published ? "● Active" : "Draft"}
          </button>
          <button
            onClick={() => flash("Test run complete · 0 errors")}
            className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1"
          >
            <Play size={12} /> Test
          </button>
          <button
            onClick={() => flash("Workflow saved")}
            className="h-8 px-3 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-xs font-semibold flex items-center gap-1"
          >
            <Save size={12} /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Palette */}
        <div className="w-[200px] flex-shrink-0 border-r border-[#1C1C34] bg-[#0B0B1A] overflow-y-auto">
          <div className="px-4 pt-4 pb-2 text-[10px] uppercase tracking-wider text-[#4A4A6A]">Nodes</div>
          <div className="px-2 pb-4 space-y-1">
            {PALETTE.map((p) => (
              <button
                key={p.kind}
                onClick={() => addNode(p.kind)}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1C1C34]/60 text-left"
              >
                <p.icon size={14} className={p.tone} />
                <span className="text-[#8B8FA8] text-sm">{p.label}</span>
                <Plus size={12} className="ml-auto text-[#4A4A6A]" />
              </button>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 relative overflow-auto"
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onClick={() => setSelected(null)}
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(28,28,52,0.6) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {nodes.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Sparkles size={36} className="text-[#1C1C34] mb-3" />
              <div className="text-white font-semibold">Empty canvas</div>
              <div className="text-[#4A4A6A] text-sm mt-1">Click a node on the left to add it</div>
            </div>
          )}

          {/* Connector lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.slice(0, -1).map((n, i) => {
              const next = nodes[i + 1];
              return (
                <line
                  key={n.id}
                  x1={n.x + 200}
                  y1={n.y + 32}
                  x2={next.x}
                  y2={next.y + 32}
                  stroke="#7B5CFC"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              );
            })}
          </svg>

          {nodes.map((n) => {
            const meta = nodeMeta(n.kind);
            const Icon = meta.icon;
            const active = selected === n.id;
            return (
              <div
                key={n.id}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  onMouseDown(e, n);
                }}
                onClick={(e) => e.stopPropagation()}
                className={`absolute w-[200px] bg-[#0B0B1A] border rounded-xl px-3 py-3 cursor-grab active:cursor-grabbing ${
                  active ? "border-[#7B5CFC] shadow-[0_0_0_3px_rgba(123,92,252,0.15)]" : "border-[#1C1C34]"
                }`}
                style={{ left: n.x, top: n.y }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className={meta.tone} />
                  <span className="text-[10px] uppercase tracking-wider text-[#4A4A6A]">{meta.label}</span>
                </div>
                <div className="text-white text-sm font-medium truncate">{n.label}</div>
              </div>
            );
          })}
        </div>

        {/* Inspector */}
        <div className="w-[260px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] overflow-y-auto">
          <div className="px-4 pt-4 pb-2 text-[10px] uppercase tracking-wider text-[#4A4A6A]">Inspector</div>
          {sel ? (
            <div className="px-4 py-3 space-y-3">
              <div>
                <div className="text-[#4A4A6A] text-[10px] uppercase mb-1">Label</div>
                <input
                  value={sel.label}
                  onChange={(e) =>
                    setNodes((ns) => ns.map((n) => (n.id === sel.id ? { ...n, label: e.target.value } : n)))
                  }
                  className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/40"
                />
              </div>
              <div>
                <div className="text-[#4A4A6A] text-[10px] uppercase mb-1">Type</div>
                <div className="text-white text-sm capitalize">{sel.kind}</div>
              </div>
              <button
                onClick={deleteSelected}
                className="w-full h-9 rounded-lg border border-[#FF4D6D]/30 text-[#FF4D6D] text-sm flex items-center justify-center gap-2 hover:bg-[#FF4D6D]/5"
              >
                <Trash2 size={12} /> Delete node
              </button>
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <Bot size={24} className="text-[#1C1C34] mx-auto mb-2" />
              <div className="text-[#4A4A6A] text-xs">Select a node to edit</div>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0B0B1A] border border-[#22C55E]/40 text-white text-sm px-4 py-2 rounded-lg shadow-xl flex items-center gap-2">
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
