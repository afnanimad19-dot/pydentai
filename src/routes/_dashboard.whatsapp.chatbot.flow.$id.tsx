import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactFlow, {
  addEdge, Background, BackgroundVariant, Controls, MiniMap,
  useEdgesState, useNodesState, Handle, Position,
  type Connection, type Edge, type Node, type NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";
import {
  ArrowLeft, Search, Maximize2, Play, Eye, Loader2, Save, X, Send, Bot, Trash2,
} from "lucide-react";
import { supabase as supabaseTyped } from "@/integrations/supabase/client";
const supabase = supabaseTyped as any;

const SUPABASE_URL = "https://gsjxwhklnlazwuznpdlk.supabase.co";

export const Route = createFileRoute("/_dashboard/whatsapp/chatbot/flow/$id")({
  component: FlowEditor,
});

// ---------- Categories & node metadata ----------
type Cat = { name: string; color: string; items: { label: string; sub: string }[] };
const CATEGORIES: Cat[] = [
  { name: "MESSAGES", color: "#00D4AA", items: [
    { label: "Send Message", sub: "Text with buttons or menu" },
    { label: "Send Media", sub: "Image, video, or document" },
    { label: "List Message", sub: "Interactive list selector" },
    { label: "Send Location", sub: "Share a location" },
    { label: "Send Template", sub: "Approved WhatsApp template" },
  ]},
  { name: "INPUT & DATA", color: "#F59E0B", items: [
    { label: "Collect Input", sub: "Name, email, phone, etc." },
    { label: "Request Location", sub: "Ask for user location" },
    { label: "Await Reply", sub: "Wait for response" },
    { label: "Save to Lead", sub: "Create/update CRM contact" },
    { label: "Set Variable", sub: "Store data for later" },
  ]},
  { name: "LOGIC & FLOW", color: "#3B82F6", items: [
    { label: "Condition", sub: "If/else branching" },
    { label: "Random Split", sub: "A/B testing paths" },
    { label: "Delay", sub: "Wait before continuing" },
    { label: "Schedule", sub: "Send at specific time" },
    { label: "Go to Flow", sub: "Jump to another flow" },
  ]},
  { name: "ACTIONS", color: "#7B5CFC", items: [
    { label: "AI Response", sub: "AI-powered reply" },
    { label: "HTTP Request", sub: "Call external API" },
    { label: "Assign Tag", sub: "Tag the contact" },
    { label: "Add to Group", sub: "Add contact to group" },
    { label: "Notify Team", sub: "Alert via Slack/email" },
    { label: "Transfer to Human", sub: "Handoff to live agent" },
  ]},
  { name: "END", color: "#FF4D6D", items: [
    { label: "End Flow", sub: "Terminate conversation" },
  ]},
];

function colorForType(type: string): string {
  if (type === "Trigger") return "#00D4AA";
  for (const c of CATEGORIES) if (c.items.some((i) => i.label === type)) return c.color;
  return "#7B5CFC";
}

// ---------- Custom node ----------
function FlowNode({ data, selected }: NodeProps<{ label: string; nodeType: string; config: any }>) {
  const color = colorForType(data.nodeType);
  return (
    <div style={{ borderColor: color, boxShadow: selected ? `0 0 0 2px ${color}` : "none" }}
      className="bg-[#0B0B1A] border rounded-xl px-3 py-2 min-w-[160px]">
      <Handle type="target" position={Position.Left} style={{ background: color, border: "none" }} />
      <div className="text-[9px] uppercase tracking-wider font-semibold" style={{ color }}>{data.nodeType}</div>
      <div className="text-white text-xs font-medium mt-0.5 truncate">{data.label}</div>
      <Handle type="source" position={Position.Right} style={{ background: color, border: "none" }} />
    </div>
  );
}

const nodeTypes = { flowNode: FlowNode };

// ---------- Editor ----------
type FlowRow = {
  id: string; workspace_id: string; name: string; status: "draft" | "live";
  nodes: any[]; edges: any[]; variables: any[];
};

function FlowEditor() {
  const { id } = useParams({ from: "/_dashboard/whatsapp/chatbot/flow/$id" });
  const navigate = useNavigate();
  const [flow, setFlow] = useState<FlowRow | null>(null);
  const [name, setName] = useState("Untitled Flow");
  const [status, setStatus] = useState<"draft" | "live">("draft");
  const [search, setSearch] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [testOpen, setTestOpen] = useState(false);
  const skipAutosave = useRef(true);

  // Load flow
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("chatbot_flows").select("*").eq("id", id).maybeSingle();
      if (error || !data) { toast.error(error?.message ?? "Flow not found"); return; }
      const f = data as FlowRow;
      setFlow(f);
      setName(f.name);
      setStatus(f.status);
      let ns: Node[] = Array.isArray(f.nodes) ? (f.nodes as any) : [];
      const es: Edge[] = Array.isArray(f.edges) ? (f.edges as any) : [];
      if (ns.length === 0) {
        ns = [{
          id: "trigger", type: "flowNode",
          position: { x: 80, y: 200 },
          data: { label: "When message received", nodeType: "Trigger", config: {} },
        }];
      }
      // Ensure nodes have flowNode type
      ns = ns.map((n) => ({ ...n, type: "flowNode" }));
      setNodes(ns);
      setEdges(es);
      skipAutosave.current = true;
      setTimeout(() => { skipAutosave.current = false; }, 200);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Autosave (debounced)
  useEffect(() => {
    if (skipAutosave.current || !flow) return;
    const t = setTimeout(async () => {
      setSaving(true);
      const { error } = await supabase.from("chatbot_flows")
        .update({ name, status, nodes, edges }).eq("id", flow.id);
      setSaving(false);
      if (error) toast.error(error.message);
      else setLastSavedAt(new Date());
    }, 800);
    return () => clearTimeout(t);
  }, [name, status, nodes, edges, flow]);

  const onConnect = useCallback((p: Connection) =>
    setEdges((eds) => addEdge({ ...p, animated: true, style: { stroke: "#00D4AA" } }, eds)),
  [setEdges]);

  const addNode = (label: string) => {
    const newId = `n_${Date.now()}`;
    setNodes((ns) => [...ns, {
      id: newId, type: "flowNode",
      position: { x: 200 + Math.random() * 300, y: 150 + Math.random() * 250 },
      data: { label, nodeType: label, config: {} },
    }]);
  };

  const updateNode = (nodeId: string, patch: Partial<{ label: string; config: any }>) => {
    setNodes((ns) => ns.map((n) => n.id === nodeId ? {
      ...n, data: { ...n.data, ...patch, config: patch.config ?? n.data.config }
    } : n));
  };

  const deleteNode = (nodeId: string) => {
    setNodes((ns) => ns.filter((n) => n.id !== nodeId));
    setEdges((es) => es.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setSelectedNodeId(null);
  };

  const selectedNode = useMemo(() => nodes.find((n) => n.id === selectedNodeId) ?? null, [nodes, selectedNodeId]);

  // Health score
  const health = useMemo(() => {
    if (nodes.length === 0) return 0;
    const triggerConnected = edges.some((e) => e.source === "trigger");
    const hasEnd = nodes.some((n) => (n.data as any).nodeType === "End Flow");
    const orphans = nodes.filter((n) => n.id !== "trigger" &&
      !edges.some((e) => e.target === n.id)).length;
    const configured = nodes.filter((n) => {
      const t = (n.data as any).nodeType;
      const cfg = (n.data as any).config ?? {};
      if (t === "Trigger" || t === "End Flow") return true;
      return Object.keys(cfg).length > 0;
    }).length;
    const score = (
      (triggerConnected ? 30 : 0) +
      (hasEnd ? 20 : 0) +
      (orphans === 0 ? 20 : Math.max(0, 20 - orphans * 5)) +
      Math.round((configured / nodes.length) * 30)
    );
    return Math.min(100, Math.max(0, score));
  }, [nodes, edges]);

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!nodes.some((n) => n.id === "trigger")) errs.push("Missing trigger node");
    if (!edges.some((e) => e.source === "trigger")) errs.push("Trigger is not connected");
    if (!nodes.some((n) => (n.data as any).nodeType === "End Flow")) errs.push("Flow has no End Flow node");
    const orphans = nodes.filter((n) => n.id !== "trigger" && !edges.some((e) => e.target === n.id));
    if (orphans.length) errs.push(`${orphans.length} orphan node(s)`);
    return errs;
  };

  const saveNow = async () => {
    if (!flow) return;
    setSaving(true);
    const { error } = await supabase.from("chatbot_flows")
      .update({ name, status, nodes, edges }).eq("id", flow.id);
    setSaving(false);
    if (error) toast.error(error.message); else { setLastSavedAt(new Date()); toast.success("Saved"); }
  };

  const publish = async () => {
    const errs = validate();
    if (errs.length) { toast.error(`Cannot publish: ${errs.join(" · ")}`); return; }
    setStatus("live");
    toast.success("Flow published");
  };

  const filteredCats = CATEGORIES.map((c) => ({
    ...c, items: c.items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
  })).filter((c) => c.items.length > 0);

  if (!flow) {
    return <div className="h-[calc(100vh-56px)] flex items-center justify-center bg-[#06060F] text-[#8B8FA8]">
      <Loader2 className="animate-spin mr-2" size={16} /> Loading flow...
    </div>;
  }

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden bg-[#06060F]">
      {/* Top bar */}
      <div className="h-14 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
        <button onClick={() => navigate({ to: "/whatsapp/chatbot" })} className="text-[#8B8FA8] hover:text-white flex items-center gap-1 text-sm">
          <ArrowLeft size={14} /> Back
        </button>
        <div className="h-5 w-px bg-[#1C1C34]" />
        <input value={name} onChange={(e) => setName(e.target.value)}
          className="bg-transparent text-white font-semibold text-sm outline-none border-b border-transparent focus:border-[#00D4AA]/40 px-1 min-w-[180px]" />
        <button onClick={() => setStatus((s) => s === "live" ? "draft" : "live")}
          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${status === "live" ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>
          {status === "live" ? "● LIVE" : "○ DRAFT"}
        </button>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${health >= 80 ? "bg-[#00D4AA]/15 text-[#00D4AA]" : health >= 50 ? "bg-[#F59E0B]/15 text-[#F59E0B]" : "bg-[#FF4D6D]/15 text-[#FF4D6D]"}`}>
          Health {health}%
        </span>

        <div className="mx-auto flex items-center gap-2">
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">{nodes.length} nodes</span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">{edges.length} edges</span>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-1 rounded-md">{(flow.variables ?? []).length} vars</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {saving ? <span className="text-[10px] text-[#8B8FA8] flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Saving…</span>
            : lastSavedAt ? <span className="text-[10px] text-[#4A4A6A]">Saved {lastSavedAt.toLocaleTimeString()}</span> : null}
          <button onClick={() => setTestOpen(true)} className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1"><Eye size={12} /> Preview</button>
          <button onClick={saveNow} className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1"><Save size={12} /> Save</button>
          <button onClick={publish} className="h-8 px-3 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold">Publish</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar */}
        <div className="w-[230px] flex-shrink-0 bg-[#0B0B1A] border-r border-[#1C1C34] overflow-y-auto">
          <div className="px-3 pt-3 pb-1 text-white text-xs font-semibold uppercase tracking-wider">Components</div>
          <div className="px-3 pb-2">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search nodes..."
                className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-xs pl-7 pr-2 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
            </div>
          </div>
          <div className="px-2 pb-6">
            {filteredCats.map((c) => (
              <div key={c.name} className="mb-3">
                <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold" style={{ color: c.color }}>{c.name}</div>
                <div className="space-y-0.5">
                  {c.items.map((item) => (
                    <button key={item.label} onClick={() => addNode(item.label)}
                      className="w-full text-left px-2 py-1.5 rounded-md hover:bg-[#1C1C34]/60">
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
            nodes={nodes} edges={edges} nodeTypes={nodeTypes}
            onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}
            onNodeClick={(_, n) => setSelectedNodeId(n.id)}
            onPaneClick={() => setSelectedNodeId(null)}
            fitView style={{ background: "#06060F" }}
            deleteKeyCode={["Delete", "Backspace"]}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1C1C34" />
            <Controls className="!bg-[#0B0B1A] !border-[#1C1C34]" />
            <MiniMap maskColor="rgba(0,0,0,0.6)" nodeColor={(n) => colorForType((n.data as any).nodeType)} style={{ background: "#0B0B1A", border: "1px solid #1C1C34" }} />
          </ReactFlow>

          <div className="absolute bottom-4 left-4 bg-[#0B0B1A] border border-[#1E1E2E] rounded-2xl px-4 py-2 flex items-center gap-3 shadow-xl">
            <span className="text-[#8B8FA8] text-xs">{nodes.length} nodes</span>
            <span className="text-[#4A4A6A]">·</span>
            <span className="text-[#8B8FA8] text-xs">{edges.length} edges</span>
            <span className="text-[#4A4A6A]">·</span>
            <span className="text-[#8B8FA8] text-xs">Density {Math.min(100, Math.round((edges.length / Math.max(1, nodes.length)) * 100))}%</span>
          </div>
        </div>

        {/* Right config panel */}
        {selectedNode && (
          <NodeConfigPanel node={selectedNode} onUpdate={(p) => updateNode(selectedNode.id, p)} onDelete={() => deleteNode(selectedNode.id)} onClose={() => setSelectedNodeId(null)} workspaceId={flow.workspace_id} />
        )}
      </div>

      {testOpen && <TestPanel flow={{ ...flow, name, nodes, edges }} onClose={() => setTestOpen(false)} />}
    </div>
  );
}

// ---------- Config panel ----------
function NodeConfigPanel({ node, onUpdate, onDelete, onClose, workspaceId }: {
  node: Node; onUpdate: (p: Partial<{ label: string; config: any }>) => void; onDelete: () => void; onClose: () => void; workspaceId: string;
}) {
  const data = node.data as { label: string; nodeType: string; config: any };
  const cfg = data.config ?? {};
  const color = colorForType(data.nodeType);
  const setCfg = (patch: any) => onUpdate({ config: { ...cfg, ...patch } });
  const isTrigger = data.nodeType === "Trigger";

  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);
  useEffect(() => {
    if (data.nodeType !== "AI Response") return;
    supabase.from("ai_agents").select("id, name").eq("workspace_id", workspaceId)
      .then(({ data: d }: any) => setAgents(d ?? []));
  }, [data.nodeType, workspaceId]);

  return (
    <div className="w-[320px] flex-shrink-0 bg-[#0B0B1A] border-l border-[#1C1C34] overflow-y-auto">
      <div className="p-4 border-b border-[#1C1C34] flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color }}>{data.nodeType}</div>
          <input value={data.label} onChange={(e) => onUpdate({ label: e.target.value })}
            className="bg-transparent text-white font-semibold text-sm outline-none mt-1 w-full border-b border-transparent focus:border-[#00D4AA]/40" />
        </div>
        <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={14} /></button>
      </div>

      <div className="p-4 space-y-3">
        {isTrigger && <Field label="Trigger type"><select value={cfg.type ?? "message_received"} onChange={(e) => setCfg({ type: e.target.value })} className={inputCls}>
          <option value="message_received">Message received</option><option value="keyword">Keyword match</option><option value="referral">WhatsApp ad referral</option>
        </select></Field>}

        {(data.nodeType === "Send Message" || data.nodeType === "Await Reply") && <>
          <Field label="Message text"><textarea value={cfg.text ?? ""} onChange={(e) => setCfg({ text: e.target.value })} rows={4} className={inputCls} placeholder="Hello! How can I help?" /></Field>
          <Field label="Buttons (comma separated, optional)"><input value={cfg.buttons ?? ""} onChange={(e) => setCfg({ buttons: e.target.value })} className={inputCls} placeholder="Yes, No, Maybe" /></Field>
        </>}

        {data.nodeType === "Send Media" && <>
          <Field label="Media type"><select value={cfg.media_type ?? "image"} onChange={(e) => setCfg({ media_type: e.target.value })} className={inputCls}><option>image</option><option>video</option><option>document</option></select></Field>
          <Field label="Media URL"><input value={cfg.url ?? ""} onChange={(e) => setCfg({ url: e.target.value })} className={inputCls} placeholder="https://..." /></Field>
          <Field label="Caption"><input value={cfg.caption ?? ""} onChange={(e) => setCfg({ caption: e.target.value })} className={inputCls} /></Field>
        </>}

        {data.nodeType === "List Message" && <>
          <Field label="Header"><input value={cfg.header ?? ""} onChange={(e) => setCfg({ header: e.target.value })} className={inputCls} /></Field>
          <Field label="Options (one per line)"><textarea value={cfg.options ?? ""} onChange={(e) => setCfg({ options: e.target.value })} rows={4} className={inputCls} placeholder="Pricing&#10;Demo&#10;Support" /></Field>
        </>}

        {data.nodeType === "Send Location" && <>
          <Field label="Latitude"><input value={cfg.lat ?? ""} onChange={(e) => setCfg({ lat: e.target.value })} className={inputCls} /></Field>
          <Field label="Longitude"><input value={cfg.lng ?? ""} onChange={(e) => setCfg({ lng: e.target.value })} className={inputCls} /></Field>
        </>}

        {data.nodeType === "Send Template" && <Field label="Template name"><input value={cfg.template ?? ""} onChange={(e) => setCfg({ template: e.target.value })} className={inputCls} /></Field>}

        {data.nodeType === "Collect Input" && <>
          <Field label="Prompt"><input value={cfg.prompt ?? ""} onChange={(e) => setCfg({ prompt: e.target.value })} className={inputCls} placeholder="What's your email?" /></Field>
          <Field label="Variable name"><input value={cfg.variable ?? ""} onChange={(e) => setCfg({ variable: e.target.value })} className={inputCls} placeholder="email" /></Field>
          <Field label="Validation"><select value={cfg.validation ?? "any"} onChange={(e) => setCfg({ validation: e.target.value })} className={inputCls}><option value="any">Any text</option><option value="email">Email</option><option value="phone">Phone</option><option value="number">Number</option></select></Field>
        </>}

        {data.nodeType === "Set Variable" && <>
          <Field label="Name"><input value={cfg.variable ?? ""} onChange={(e) => setCfg({ variable: e.target.value })} className={inputCls} /></Field>
          <Field label="Value"><input value={cfg.value ?? ""} onChange={(e) => setCfg({ value: e.target.value })} className={inputCls} /></Field>
        </>}

        {data.nodeType === "Condition" && <>
          <Field label="Variable"><input value={cfg.variable ?? ""} onChange={(e) => setCfg({ variable: e.target.value })} className={inputCls} /></Field>
          <Field label="Operator"><select value={cfg.op ?? "equals"} onChange={(e) => setCfg({ op: e.target.value })} className={inputCls}><option value="equals">equals</option><option value="contains">contains</option><option value="not_equals">not equals</option><option value="greater">greater than</option></select></Field>
          <Field label="Value"><input value={cfg.value ?? ""} onChange={(e) => setCfg({ value: e.target.value })} className={inputCls} /></Field>
          <div className="text-[10px] text-[#8B8FA8]">Connect TRUE branch first, FALSE branch second.</div>
        </>}

        {data.nodeType === "Random Split" && <Field label="Split ratio (A / 100)"><input type="number" min={0} max={100} value={cfg.ratio ?? 50} onChange={(e) => setCfg({ ratio: Number(e.target.value) })} className={inputCls} /></Field>}

        {data.nodeType === "Delay" && <Field label="Delay (seconds)"><input type="number" value={cfg.seconds ?? 5} onChange={(e) => setCfg({ seconds: Number(e.target.value) })} className={inputCls} /></Field>}

        {data.nodeType === "AI Response" && <>
          <Field label="Agent"><select value={cfg.agent_id ?? ""} onChange={(e) => setCfg({ agent_id: e.target.value })} className={inputCls}>
            <option value="">Select agent...</option>
            {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select></Field>
          <div className="text-[10px] text-[#8B8FA8]">Uses the agent's knowledge base to answer in context.</div>
        </>}

        {data.nodeType === "HTTP Request" && <>
          <Field label="Method"><select value={cfg.method ?? "GET"} onChange={(e) => setCfg({ method: e.target.value })} className={inputCls}><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select></Field>
          <Field label="URL"><input value={cfg.url ?? ""} onChange={(e) => setCfg({ url: e.target.value })} className={inputCls} placeholder="https://api.example.com/endpoint" /></Field>
          <Field label="Headers (JSON)"><textarea value={cfg.headers ?? ""} onChange={(e) => setCfg({ headers: e.target.value })} rows={2} className={inputCls} placeholder='{"Authorization":"Bearer ..."}' /></Field>
          <Field label="Body (JSON)"><textarea value={cfg.body ?? ""} onChange={(e) => setCfg({ body: e.target.value })} rows={3} className={inputCls} /></Field>
          <Field label="Save response to variable"><input value={cfg.response_var ?? ""} onChange={(e) => setCfg({ response_var: e.target.value })} className={inputCls} /></Field>
        </>}

        {data.nodeType === "Assign Tag" && <Field label="Tag"><input value={cfg.tag ?? ""} onChange={(e) => setCfg({ tag: e.target.value })} className={inputCls} /></Field>}
        {data.nodeType === "Add to Group" && <Field label="Group name"><input value={cfg.group ?? ""} onChange={(e) => setCfg({ group: e.target.value })} className={inputCls} /></Field>}
        {data.nodeType === "Notify Team" && <Field label="Channel / email"><input value={cfg.target ?? ""} onChange={(e) => setCfg({ target: e.target.value })} className={inputCls} /></Field>}
        {data.nodeType === "Transfer to Human" && <Field label="Agent / queue"><input value={cfg.queue ?? ""} onChange={(e) => setCfg({ queue: e.target.value })} className={inputCls} /></Field>}
        {data.nodeType === "Go to Flow" && <Field label="Target flow ID"><input value={cfg.target_flow ?? ""} onChange={(e) => setCfg({ target_flow: e.target.value })} className={inputCls} /></Field>}
        {data.nodeType === "Save to Lead" && <>
          <Field label="Name variable"><input value={cfg.name_var ?? ""} onChange={(e) => setCfg({ name_var: e.target.value })} className={inputCls} placeholder="name" /></Field>
          <Field label="Email variable"><input value={cfg.email_var ?? ""} onChange={(e) => setCfg({ email_var: e.target.value })} className={inputCls} placeholder="email" /></Field>
          <Field label="Phone variable"><input value={cfg.phone_var ?? ""} onChange={(e) => setCfg({ phone_var: e.target.value })} className={inputCls} placeholder="phone" /></Field>
        </>}

        {!isTrigger && (
          <button onClick={onDelete} className="w-full h-9 mt-4 rounded-lg bg-[#FF4D6D]/10 hover:bg-[#FF4D6D]/20 text-[#FF4D6D] text-xs font-semibold flex items-center justify-center gap-2">
            <Trash2 size={12} /> Delete node
          </button>
        )}
      </div>
    </div>
  );
}

const inputCls = "w-full bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-xs px-2 py-1.5 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-[10px] uppercase tracking-wider text-[#8B8FA8] mb-1 block">{label}</label>{children}</div>;
}

// ---------- Test runner (slide-over WhatsApp preview) ----------
type TestMsg = { from: "bot" | "user"; text: string; buttons?: string[] };

function TestPanel({ flow, onClose }: { flow: { id: string; name: string; nodes: Node[]; edges: Edge[]; workspace_id: string }; onClose: () => void; }) {
  const [msgs, setMsgs] = useState<TestMsg[]>([]);
  const [input, setInput] = useState("");
  const varsRef = useRef<Record<string, string>>({});
  const waitingRef = useRef<{ resolve: (v: string) => void } | null>(null);
  const [running, setRunning] = useState(false);

  const findNext = useCallback((fromId: string, branchIdx = 0): Node | null => {
    const outgoing = flow.edges.filter((e) => e.source === fromId);
    if (!outgoing.length) return null;
    const target = outgoing[branchIdx] ?? outgoing[0];
    return flow.nodes.find((n) => n.id === target.target) ?? null;
  }, [flow]);

  const interp = (s: string) => (s ?? "").replace(/\{\{(\w+)\}\}/g, (_, k) => varsRef.current[k] ?? `{{${k}}}`);

  const awaitUser = () => new Promise<string>((resolve) => { waitingRef.current = { resolve }; });

  const runNode = useCallback(async (node: Node | null): Promise<void> => {
    if (!node) { setMsgs((m) => [...m, { from: "bot", text: "— end —" }]); return; }
    const d = node.data as any;
    const t = d.nodeType as string;
    const cfg = d.config ?? {};

    if (t === "Trigger") return runNode(findNext(node.id));

    if (t === "Send Message" || t === "Await Reply") {
      const btns = (cfg.buttons ?? "").split(",").map((s: string) => s.trim()).filter(Boolean);
      setMsgs((m) => [...m, { from: "bot", text: interp(cfg.text || "(no message)"), buttons: btns.length ? btns : undefined }]);
      if (t === "Await Reply") await awaitUser();
      return runNode(findNext(node.id));
    }
    if (t === "Send Media") { setMsgs((m) => [...m, { from: "bot", text: `📎 ${cfg.media_type ?? "media"}: ${cfg.url ?? ""}${cfg.caption ? "\n" + interp(cfg.caption) : ""}` }]); return runNode(findNext(node.id)); }
    if (t === "List Message") { setMsgs((m) => [...m, { from: "bot", text: (cfg.header ?? "Choose one:") + "\n" + (cfg.options ?? "") }]); return runNode(findNext(node.id)); }
    if (t === "Send Location") { setMsgs((m) => [...m, { from: "bot", text: `📍 ${cfg.lat}, ${cfg.lng}` }]); return runNode(findNext(node.id)); }
    if (t === "Send Template") { setMsgs((m) => [...m, { from: "bot", text: `[Template: ${cfg.template ?? "?"}]` }]); return runNode(findNext(node.id)); }

    if (t === "Collect Input") {
      setMsgs((m) => [...m, { from: "bot", text: interp(cfg.prompt || "Enter value:") }]);
      const v = await awaitUser();
      if (cfg.variable) varsRef.current[cfg.variable] = v;
      return runNode(findNext(node.id));
    }
    if (t === "Request Location") { setMsgs((m) => [...m, { from: "bot", text: "Please share your location 📍" }]); await awaitUser(); return runNode(findNext(node.id)); }

    if (t === "Set Variable") { if (cfg.variable) varsRef.current[cfg.variable] = interp(cfg.value ?? ""); return runNode(findNext(node.id)); }

    if (t === "Condition") {
      const v = varsRef.current[cfg.variable] ?? "";
      const target = String(cfg.value ?? "");
      let pass = false;
      switch (cfg.op) {
        case "contains": pass = v.includes(target); break;
        case "not_equals": pass = v !== target; break;
        case "greater": pass = Number(v) > Number(target); break;
        default: pass = v === target;
      }
      return runNode(findNext(node.id, pass ? 0 : 1));
    }
    if (t === "Random Split") {
      const a = Number(cfg.ratio ?? 50);
      return runNode(findNext(node.id, Math.random() * 100 < a ? 0 : 1));
    }
    if (t === "Delay") { await new Promise((r) => setTimeout(r, Math.min(2000, Number(cfg.seconds ?? 1) * 200))); return runNode(findNext(node.id)); }
    if (t === "Schedule") { setMsgs((m) => [...m, { from: "bot", text: "(scheduled — skipped in preview)" }]); return runNode(findNext(node.id)); }
    if (t === "Go to Flow") { setMsgs((m) => [...m, { from: "bot", text: `↪ Go to flow ${cfg.target_flow ?? ""}` }]); return; }

    if (t === "AI Response") {
      if (!cfg.agent_id) { setMsgs((m) => [...m, { from: "bot", text: "(AI Response: no agent configured)" }]); return runNode(findNext(node.id)); }
      try {
        const { data: sess } = await supabase.auth.getSession();
        const lastUserMsg = [...msgs].reverse().find((m) => m.from === "user")?.text ?? "Hello";
        const res = await fetch(`${SUPABASE_URL}/functions/v1/chatbot-reply`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${sess.session?.access_token ?? ""}` },
          body: JSON.stringify({ agent_id: cfg.agent_id, message: lastUserMsg, history: [] }),
        });
        if (!res.ok || !res.body) { setMsgs((m) => [...m, { from: "bot", text: "(AI error)" }]); return runNode(findNext(node.id)); }
        const reader = res.body.getReader(); const dec = new TextDecoder(); let buf = ""; let acc = "";
        // Insert placeholder message we update progressively
        setMsgs((m) => [...m, { from: "bot", text: "" }]);
        while (true) {
          const { done, value } = await reader.read(); if (done) break;
          buf += dec.decode(value, { stream: true });
          const lines = buf.split("\n"); buf = lines.pop() ?? "";
          for (const line of lines) {
            const tr = line.trim(); if (!tr.startsWith("data:")) continue;
            const j = tr.slice(5).trim(); if (!j) continue;
            try { const obj = JSON.parse(j); if (obj.text) { acc += obj.text; setMsgs((m) => { const copy = [...m]; copy[copy.length - 1] = { from: "bot", text: acc }; return copy; }); } } catch {}
          }
        }
      } catch (e) { setMsgs((m) => [...m, { from: "bot", text: `(AI error: ${String(e)})` }]); }
      return runNode(findNext(node.id));
    }

    if (t === "HTTP Request") {
      try {
        const r = await fetch(interp(cfg.url ?? ""), {
          method: cfg.method ?? "GET",
          headers: cfg.headers ? JSON.parse(cfg.headers) : undefined,
          body: cfg.body && cfg.method !== "GET" ? cfg.body : undefined,
        });
        const txt = await r.text();
        if (cfg.response_var) varsRef.current[cfg.response_var] = txt.slice(0, 500);
        setMsgs((m) => [...m, { from: "bot", text: `HTTP ${r.status} (${txt.length} bytes)` }]);
      } catch (e) { setMsgs((m) => [...m, { from: "bot", text: `HTTP error: ${String(e)}` }]); }
      return runNode(findNext(node.id));
    }

    if (t === "Assign Tag" || t === "Add to Group" || t === "Notify Team" || t === "Transfer to Human" || t === "Save to Lead") {
      setMsgs((m) => [...m, { from: "bot", text: `✓ ${t}` }]); return runNode(findNext(node.id));
    }

    if (t === "End Flow") { setMsgs((m) => [...m, { from: "bot", text: "— end of flow —" }]); return; }

    return runNode(findNext(node.id));
  }, [findNext, msgs]);

  const start = () => {
    setMsgs([]); varsRef.current = {}; setRunning(true);
    const trigger = flow.nodes.find((n) => n.id === "trigger") ?? flow.nodes[0];
    runNode(trigger).finally(() => setRunning(false));
  };

  const sendUser = () => {
    if (!input.trim()) return;
    const v = input.trim();
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setInput("");
    if (waitingRef.current) { const w = waitingRef.current; waitingRef.current = null; w.resolve(v); }
  };

  const clickButton = (b: string) => {
    setMsgs((m) => [...m, { from: "user", text: b }]);
    if (waitingRef.current) { const w = waitingRef.current; waitingRef.current = null; w.resolve(b); }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md h-full bg-[#0B0B1A] border-l border-[#1C1C34] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#1C1C34]">
          <div className="flex items-center gap-2"><Bot size={16} className="text-[#00D4AA]" /><div className="font-semibold text-white text-sm">Test: {flow.name}</div></div>
          <div className="flex items-center gap-2">
            <button onClick={start} className="h-8 px-3 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-xs font-semibold flex items-center gap-1"><Play size={12} /> {running ? "Restart" : "Start"}</button>
            <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={16} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#06060F]">
          {msgs.length === 0 && <div className="text-center text-[#4A4A6A] text-xs mt-10">Click Start to simulate the flow.</div>}
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs whitespace-pre-wrap ${m.from === "user" ? "bg-[#00D4AA] text-black" : "bg-[#1C1C34] text-white"}`}>
                {m.text}
                {m.buttons && <div className="flex flex-wrap gap-1 mt-2">
                  {m.buttons.map((b) => <button key={b} onClick={() => clickButton(b)} className="text-[10px] px-2 py-1 rounded-md bg-[#0B0B1A] text-[#00D4AA] border border-[#00D4AA]/30">{b}</button>)}
                </div>}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-[#1C1C34] flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendUser()}
            placeholder="Type a reply..." className="flex-1 h-9 bg-[#06060F] border border-[#1C1C34] rounded-md text-white text-xs px-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#00D4AA]/40" />
          <button onClick={sendUser} className="h-9 w-9 rounded-md bg-[#00D4AA] text-black flex items-center justify-center"><Send size={14} /></button>
        </div>
      </div>
    </div>
  );
}
