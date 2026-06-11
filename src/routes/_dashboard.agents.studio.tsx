import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  Bot,
  Zap,
  FileText,
  HelpCircle,
  PhoneCall,
  Search,
  RefreshCw,
  LayoutGrid,
  List,
  Edit3,
  MoreHorizontal,
  X,
  Check,
  CheckCircle,
  MessageSquare,
  Phone,
  TrendingUp,
  Headphones,
  Calendar,
  Settings,
  Brain,
  Sparkles,
  ChevronRight,
  Mail,
  MessageCircle,
  Globe,
  Camera,
  Upload,
  Copy,
  Trash2,
  Play,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/studio")({
  component: AgentStudioPage,
});

// ----------------------- Types & seed data -----------------------

type AgentType = "voice" | "chat" | "omnichannel";
type AgentStatus = "active" | "inactive";

interface Agent {
  id: string;
  name: string;
  sub: string;
  type: AgentType;
  status: AgentStatus;
  readiness: number;
  channels: string[];
  language: string;
  docs: number;
  faqs: number;
  calls: number;
  updatedAt: string;
  model?: string;
}

type DbAgent = {
  id: string;
  workspace_id: string;
  name: string;
  type: string;
  status: string;
  system_prompt: string | null;
  channels: string[] | null;
  config: Record<string, any> | null;
  updated_at: string;
};

function relTime(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function dbToAgent(r: DbAgent, knowledgeCount = 0): Agent {
  const t: AgentType = r.type === "voice" || r.type === "omnichannel" ? r.type : "chat";
  const channels = (r.channels ?? []).map((c) =>
    c === "whatsapp" ? "WhatsApp" : c === "instagram" ? "Instagram" : c === "website-chat" || c === "website_chat" ? "Website Chat" : c === "sms" ? "SMS" : c === "email" ? "Email" : c === "voice" ? "Voice" : c
  );
  const cfg = r.config ?? {};
  return {
    id: r.id,
    name: r.name,
    sub: cfg.role || (r.system_prompt?.slice(0, 60) ?? "AI Agent"),
    type: t,
    status: r.status === "active" ? "active" : "inactive",
    readiness: typeof cfg.readiness === "number" ? cfg.readiness : (r.system_prompt ? 60 : 20),
    channels,
    language: cfg.language || "English",
    docs: 0,
    faqs: knowledgeCount,
    calls: 0,
    updatedAt: relTime(r.updated_at),
    model: cfg.model,
  };
}

// ----------------------- Languages -----------------------

const LANGUAGES = [
  { code: "en-US", name: "English (US)", native: "English", flag: "🇺🇸" },
  { code: "en-GB", name: "English (UK)", native: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇦🇪" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "Chinese", native: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", native: "日本語", flag: "🇯🇵" },
  { code: "pt", name: "Portuguese", native: "Português", flag: "🇵🇹" },
  { code: "tl", name: "Tagalog", native: "Tagalog", flag: "🇵🇭" },
  { code: "ur", name: "Urdu", native: "اردو", flag: "🇵🇰" },
  { code: "ru", name: "Russian", native: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Turkish", native: "Türkçe", flag: "🇹🇷" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", native: "Nederlands", flag: "🇳🇱" },
  { code: "ko", name: "Korean", native: "한국어", flag: "🇰🇷" },
  { code: "vi", name: "Vietnamese", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "bn", name: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "fa", name: "Persian", native: "فارسی", flag: "🇮🇷" },
  { code: "sw", name: "Swahili", native: "Kiswahili", flag: "🇰🇪" },
  { code: "pl", name: "Polish", native: "Polski", flag: "🇵🇱" },
  { code: "uk", name: "Ukrainian", native: "Українська", flag: "🇺🇦" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "th", name: "Thai", native: "ไทย", flag: "🇹🇭" },
  { code: "el", name: "Greek", native: "Ελληνικά", flag: "🇬🇷" },
  { code: "he", name: "Hebrew", native: "עברית", flag: "🇮🇱" },
  { code: "sv", name: "Swedish", native: "Svenska", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", native: "Norsk", flag: "🇳🇴" },
  { code: "da", name: "Danish", native: "Dansk", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", native: "Suomi", flag: "🇫🇮" },
  { code: "cs", name: "Czech", native: "Čeština", flag: "🇨🇿" },
  { code: "ro", name: "Romanian", native: "Română", flag: "🇷🇴" },
  { code: "hu", name: "Hungarian", native: "Magyar", flag: "🇭🇺" },
  { code: "sk", name: "Slovak", native: "Slovenčina", flag: "🇸🇰" },
  { code: "bg", name: "Bulgarian", native: "Български", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", native: "Hrvatski", flag: "🇭🇷" },
  { code: "sr", name: "Serbian", native: "Српски", flag: "🇷🇸" },
  { code: "ca", name: "Catalan", native: "Català", flag: "🇪🇸" },
  { code: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "am", name: "Amharic", native: "አማርኛ", flag: "🇪🇹" },
  { code: "my", name: "Burmese", native: "မြန်မာ", flag: "🇲🇲" },
  { code: "km", name: "Khmer", native: "ខ្មែរ", flag: "🇰🇭" },
  { code: "lo", name: "Lao", native: "ລາວ", flag: "🇱🇦" },
  { code: "si", name: "Sinhala", native: "සිංහල", flag: "🇱🇰" },
  { code: "ne", name: "Nepali", native: "नेपाली", flag: "🇳🇵" },
  { code: "az", name: "Azerbaijani", native: "Azərbaycan", flag: "🇦🇿" },
  { code: "kk", name: "Kazakh", native: "Қазақша", flag: "🇰🇿" },
  { code: "uz", name: "Uzbek", native: "Oʻzbek", flag: "🇺🇿" },
  { code: "hy", name: "Armenian", native: "Հայերեն", flag: "🇦🇲" },
  { code: "ka", name: "Georgian", native: "ქართული", flag: "🇬🇪" },
];

// ----------------------- Templates -----------------------

const TEMPLATES = [
  { id: "dental", name: "Dental Reception", desc: "Answer patient calls, book appointments, handle FAQs", icon: PhoneCall, tone: "bg-[#00D4AA]/15 text-[#00D4AA]", border: "border-[#00D4AA]/30" },
  { id: "sales", name: "Sales Agent", desc: "Qualify leads, pitch services, close deals", icon: TrendingUp, tone: "bg-[#7B5CFC]/15 text-[#7B5CFC]", border: "border-[#7B5CFC]/30" },
  { id: "support", name: "Support Agent", desc: "Handle queries, resolve issues, escalate when needed", icon: Headphones, tone: "bg-blue-500/15 text-blue-400", border: "border-blue-500/30" },
  { id: "appointment", name: "Appointment Setter", desc: "Schedule, confirm, and remind appointments automatically", icon: Calendar, tone: "bg-amber-500/15 text-amber-400", border: "border-amber-500/30" },
  { id: "lead", name: "Lead Qualifier", desc: "Score and qualify inbound leads from all channels", icon: Sparkles, tone: "bg-[#22C55E]/15 text-[#22C55E]", border: "border-[#22C55E]/30" },
  { id: "custom", name: "Custom Agent", desc: "Build from scratch with full control", icon: Settings, tone: "bg-[#1C1C34] text-[#8B8FA8]", border: "border-[#1C1C34]" },
];

// ----------------------- Models -----------------------

const MODEL_GROUPS = [
  { label: "ANTHROPIC", models: ["claude-opus-4", "claude-sonnet-4-5", "claude-haiku-3-5"] },
  { label: "OPENAI", models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"] },
  { label: "GOOGLE", models: ["gemini-1.5-pro", "gemini-1.5-flash"] },
  { label: "META", models: ["llama-3.1-70b", "llama-3.1-8b"] },
  { label: "MISTRAL", models: ["mistral-large", "mistral-medium"] },
];

// ----------------------- Stat card -----------------------

function Stat({
  icon: Icon, tone, value, label,
}: { icon: LucideIcon; tone: string; value: string; label: string }) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-4">
      <Icon size={20} className={tone} />
      <div>
        <div className="text-white font-bold text-[20px] leading-none">{value}</div>
        <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">{label}</div>
      </div>
    </div>
  );
}

// ----------------------- Main page -----------------------

function AgentStudioPage() {
  const navigate = useNavigate();
  const { workspaceId } = useWorkspace();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [setupOpen, setSetupOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardTemplate, setWizardTemplate] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | "Voice" | "Chat" | "Active" | "Inactive">("All");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"list" | "grid">("list");
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Agent | null>(null);

  const reload = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    const [{ data: rows, error }, { data: kb }] = await Promise.all([
      supabase.from("ai_agents").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false }),
      supabase.from("knowledge_entries").select("agent_id").eq("workspace_id", workspaceId),
    ]);
    if (error) toast.error(error.message);
    const counts = new Map<string, number>();
    (kb ?? []).forEach((k: any) => { if (k.agent_id) counts.set(k.agent_id, (counts.get(k.agent_id) ?? 0) + 1); });
    setAgents(((rows ?? []) as DbAgent[]).map((r) => dbToAgent(r, counts.get(r.id) ?? 0)));
    setLoading(false);
  }, [workspaceId]);

  useEffect(() => { reload(); }, [reload]);

  const counts = useMemo(() => ({
    All: agents.length,
    Voice: agents.filter((a) => a.type === "voice" || a.type === "omnichannel").length,
    Chat: agents.filter((a) => a.type === "chat" || a.type === "omnichannel").length,
    Active: agents.filter((a) => a.status === "active").length,
    Inactive: agents.filter((a) => a.status === "inactive").length,
  }), [agents]);

  const filtered = useMemo(() => {
    let list = agents;
    if (filter === "Voice") list = list.filter((a) => a.type === "voice" || a.type === "omnichannel");
    else if (filter === "Chat") list = list.filter((a) => a.type === "chat" || a.type === "omnichannel");
    else if (filter === "Active") list = list.filter((a) => a.status === "active");
    else if (filter === "Inactive") list = list.filter((a) => a.status === "inactive");
    if (query.trim()) list = list.filter((a) => a.name.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [agents, filter, query]);

  const onRefresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
    toast.success("Refreshed");
  };

  const channelToDb = (label: string) =>
    label === "WhatsApp" ? "whatsapp" : label === "Instagram" ? "instagram" : label === "Website Chat" ? "website-chat" : label === "SMS" ? "sms" : label === "Email" ? "email" : label.toLowerCase();

  const onCreateFromWizard = async (s: WizardState) => {
    if (!workspaceId) { toast.error("Workspace not ready"); return; }
    if (!s.agentName.trim()) { toast.error("Agent name required"); return; }
    const systemPrompt = [
      s.persona && `Persona: ${s.persona}`,
      s.systemInstructions && `Instructions:\n${s.systemInstructions}`,
      `Safety: ${Object.entries(s.safety).filter(([, v]) => v).map(([k]) => k).join(", ") || "none"}`,
    ].filter(Boolean).join("\n\n");
    const config = {
      identity: { name: s.agentName, role: s.role, organization: s.organization, website: s.website },
      preset: s.preset,
      language: s.language,
      greeting_message: s.openingMessage,
      safety: s.safety,
      voice: s.channelType === "voice" || s.channelType === "omnichannel" ? { provider: s.voiceProvider, voice: s.voice, stability: s.stability, speed: s.speed, testCallVoice: s.testCallVoice } : null,
      model: s.model,
      readiness: 45,
    };
    try {
      const { data, error } = await supabase.from("ai_agents").insert({
        workspace_id: workspaceId,
        name: s.agentName.trim(),
        type: s.channelType ?? "chat",
        status: "inactive",
        system_prompt: systemPrompt || null,
        channels: s.channels.map(channelToDb),
        config,
      }).select("id").single();
      if (error) throw error;
      toast.success("Agent created");
      setWizardOpen(false);
      reload();
      if (data) navigate({ to: "/agents/studio/$id", params: { id: data.id } });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not create agent");
    }
  };

  const onDuplicate = async (a: Agent) => {
    setMenuOpenFor(null);
    if (!workspaceId) { toast.error("Workspace not ready"); return; }
    const { data: src, error: srcErr } = await supabase.from("ai_agents").select("*").eq("id", a.id).maybeSingle();
    if (srcErr || !src) { toast.error(srcErr?.message ?? "Original not found"); return; }
    const { error } = await supabase.from("ai_agents").insert({
      workspace_id: workspaceId,
      name: `${src.name} (Copy)`,
      type: src.type, status: "inactive",
      system_prompt: src.system_prompt, channels: src.channels, config: src.config, model: src.model,
    });
    if (error) return toast.error(error.message);
    toast.success("Agent duplicated");
    reload();
  };

  const onDelete = async (a: Agent) => {
    const { error } = await supabase.from("ai_agents").delete().eq("id", a.id);
    setConfirmDelete(null);
    if (error) return toast.error(error.message);
    toast.success("Agent deleted");
    reload();
  };

  const goToDetail = (id: string) => navigate({ to: "/agents/studio/$id", params: { id } });

  const typeBadge = (t: AgentType) => {
    if (t === "voice") return { label: "Voice", cls: "bg-[#00D4AA]/12 text-[#00D4AA]" };
    if (t === "chat") return { label: "Chat", cls: "bg-blue-500/12 text-blue-400" };
    return { label: "Omni", cls: "bg-amber-500/12 text-amber-400" };
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Bot size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em] leading-tight">Agent Studio</div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">Build, configure, and deploy your dental AI agents</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSetupOpen(true)}
            className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-sm transition-colors"
          >
            Setup Wizard
          </button>
          <button
            onClick={() => { setWizardTemplate(null); setWizardOpen(true); }}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold transition-colors"
          >
            + New Agent
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-5 grid grid-cols-5 gap-3">
        <Stat icon={Bot} tone="text-[#7B5CFC]" value={String(counts.All)} label="Total Agents" />
        <Stat icon={Zap} tone="text-[#22C55E]" value={String(counts.Active)} label="Active" />
        <Stat icon={FileText} tone="text-blue-400" value={String(agents.reduce((s, a) => s + a.docs, 0))} label="Documents" />
        <Stat icon={HelpCircle} tone="text-amber-400" value={String(agents.reduce((s, a) => s + a.faqs, 0))} label="FAQs" />
        <Stat icon={PhoneCall} tone="text-[#00D4AA]" value={String(agents.reduce((s, a) => s + a.calls, 0))} label="Total Calls" />
      </div>

      {/* Toolbar */}
      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="relative w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents..."
            className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
          />
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["All", "Voice", "Chat", "Active", "Inactive"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filter === p ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {p}
              <span className={`text-[10px] px-1.5 rounded-full ${filter === p ? "bg-white/20" : "bg-[#1C1C34]"}`}>{counts[p]}</span>
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`h-9 w-9 rounded-lg bg-[#0B0B1A] border ${view === "grid" ? "border-[#7B5CFC] text-[#7B5CFC]" : "border-[#1C1C34] text-[#8B8FA8] hover:text-white"} flex items-center justify-center`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`h-9 w-9 rounded-lg bg-[#0B0B1A] border ${view === "list" ? "border-[#7B5CFC] text-[#7B5CFC]" : "border-[#1C1C34] text-[#8B8FA8] hover:text-white"} flex items-center justify-center`}
          >
            <List size={14} />
          </button>
          <button
            onClick={onRefresh}
            className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="mx-6 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-visible">
          <div className="bg-[#06060F] h-11 grid grid-cols-[40px_2fr_80px_90px_140px_120px_80px_60px_60px_60px_80px_90px] items-center text-[10px] uppercase tracking-wider text-[#4A4A6A]">
            <div className="px-4"><input type="checkbox" className="accent-[#7B5CFC]" /></div>
            <div>Name</div><div>Type</div><div>Status</div><div>Readiness</div>
            <div>Channels</div><div>Lang</div><div>Docs</div><div>FAQs</div>
            <div>Calls</div><div>Updated</div><div>Actions</div>
          </div>
          {filtered.length === 0 && (
            <div className="py-14 text-center text-[#4A4A6A] text-sm">No agents match your filters.</div>
          )}
          {filtered.map((a) => {
            const tb = typeBadge(a.type);
            return (
              <div
                key={a.id}
                onClick={() => goToDetail(a.id)}
                className="grid grid-cols-[40px_2fr_80px_90px_140px_120px_80px_60px_60px_60px_80px_90px] items-center h-14 border-b border-[#1C1C34]/60 hover:bg-white/[0.02] cursor-pointer"
              >
                <div className="px-4" onClick={(e) => e.stopPropagation()}><input type="checkbox" className="accent-[#7B5CFC]" /></div>
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <div className="w-7 h-7 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center"><Bot size={14} className="text-[#7B5CFC]" /></div>
                  <div className="min-w-0">
                    <div className="text-white text-sm font-medium truncate">{a.name}</div>
                    <div className="text-[#4A4A6A] text-xs truncate">{a.sub}</div>
                  </div>
                </div>
                <div><span className={`${tb.cls} text-xs px-2 py-0.5 rounded-full`}>{tb.label}</span></div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${a.status === "active" ? "bg-[#22C55E]" : "bg-[#4A4A6A]"}`} />
                  <span className={`text-xs ${a.status === "active" ? "text-[#22C55E]" : "text-[#8B8FA8]"}`}>{a.status === "active" ? "Active" : "Inactive"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 bg-[#1C1C34] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${a.readiness}%` }} />
                  </div>
                  <span className="text-white text-xs">{a.readiness}%</span>
                </div>
                <div className="text-[#8B8FA8] text-xs truncate pr-2">{a.channels.join(", ") || "—"}</div>
                <div className="text-[#8B8FA8] text-xs truncate pr-2">{a.language.split(" ")[0]}</div>
                <div className="text-white text-sm font-medium">{a.docs}</div>
                <div className="text-[#4A4A6A] text-sm">{a.faqs}</div>
                <div className="text-[#4A4A6A] text-sm">{a.calls}</div>
                <div className="text-[#4A4A6A] text-xs">{a.updatedAt}</div>
                <div className="flex items-center gap-1 relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => goToDetail(a.id)}
                    className="h-7 px-2 rounded-md text-[#8B8FA8] hover:text-white hover:bg-white/5 text-xs flex items-center gap-1"
                  >
                    <Edit3 size={12} />Edit
                  </button>
                  <button
                    onClick={() => setMenuOpenFor(menuOpenFor === a.id ? null : a.id)}
                    className="h-7 w-7 rounded-md text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center justify-center"
                  >
                    <MoreHorizontal size={14} />
                  </button>
                  {menuOpenFor === a.id && (
                    <RowMenu
                      onEdit={() => { setMenuOpenFor(null); goToDetail(a.id); }}
                      onDuplicate={() => onDuplicate(a)}
                      onDelete={() => { setMenuOpenFor(null); setConfirmDelete(a); }}
                      onClose={() => setMenuOpenFor(null)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="px-6 grid grid-cols-3 gap-4">
          {filtered.length === 0 && (
            <div className="col-span-3 py-14 text-center text-[#4A4A6A] text-sm bg-[#0B0B1A] border border-[#1C1C34] rounded-xl">
              No agents match your filters.
            </div>
          )}
          {filtered.map((a) => {
            const tb = typeBadge(a.type);
            return (
              <div key={a.id} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 hover:border-[#7B5CFC]/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center"><Bot size={18} className="text-[#7B5CFC]" /></div>
                  <div className="flex items-center gap-1.5">
                    <span className={`${tb.cls} text-[10px] px-2 py-0.5 rounded-full`}>{tb.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.status === "active" ? "bg-[#22C55E]/12 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>
                      {a.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="text-white text-base font-semibold">{a.name}</div>
                <div className="text-[#4A4A6A] text-xs mb-3">{a.sub}</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 flex-1 bg-[#1C1C34] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${a.readiness}%` }} />
                  </div>
                  <span className="text-white text-xs">{a.readiness}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4 min-h-[22px]">
                  {a.channels.map((c) => (
                    <span key={c} className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">{c}</span>
                  ))}
                </div>
                <button
                  onClick={() => goToDetail(a.id)}
                  className="w-full h-8 rounded-lg border border-[#1C1C34] hover:border-[#7B5CFC]/40 text-[#8B8FA8] hover:text-white text-xs flex items-center justify-center gap-1"
                >
                  Edit <ArrowRight size={12} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="h-10" />

      {/* Modals */}
      {setupOpen && (
        <SetupWizardModal
          onClose={() => setSetupOpen(false)}
          onPick={(id) => {
            setSetupOpen(false);
            setWizardTemplate(id);
            setWizardOpen(true);
          }}
          onBlank={() => {
            setSetupOpen(false);
            setWizardTemplate(null);
            setWizardOpen(true);
          }}
        />
      )}
      {wizardOpen && (
        <Wizard
          template={wizardTemplate}
          onClose={() => setWizardOpen(false)}
          onCreate={(s) => onCreateFromWizard(s)}
        />
      )}
      {confirmDelete && (
        <ConfirmDelete
          agent={confirmDelete}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => onDelete(confirmDelete)}
        />
      )}
    </div>
  );
}

// ----------------------- Row menu -----------------------

function RowMenu({
  onEdit, onDuplicate, onDelete, onClose,
}: { onEdit: () => void; onDuplicate: () => void; onDelete: () => void; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute right-0 top-9 z-30 w-44 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg shadow-xl py-1">
      <button onClick={onEdit} className="w-full text-left px-3 py-2 text-xs text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center gap-2"><Edit3 size={12} />Edit Agent</button>
      <button onClick={onDuplicate} className="w-full text-left px-3 py-2 text-xs text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center gap-2"><Copy size={12} />Duplicate Agent</button>
      <div className="border-t border-[#1C1C34] my-1" />
      <button onClick={onDelete} className="w-full text-left px-3 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 flex items-center gap-2"><Trash2 size={12} />Delete Agent</button>
    </div>
  );
}

// ----------------------- Confirm delete -----------------------

function ConfirmDelete({ agent, onCancel, onConfirm }: { agent: Agent; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#EF4444]/15 flex items-center justify-center"><Trash2 size={18} className="text-[#EF4444]" /></div>
          <div>
            <div className="text-white font-semibold">Delete Agent</div>
            <div className="text-[#4A4A6A] text-xs">This action cannot be undone</div>
          </div>
        </div>
        <p className="text-[#8B8FA8] text-sm mb-5">Are you sure you want to delete <span className="text-white font-medium">{agent.name}</span>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
          <button onClick={onConfirm} className="h-9 px-5 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-sm font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}

// ----------------------- Setup Wizard (templates) -----------------------

function SetupWizardModal({
  onClose, onPick, onBlank,
}: { onClose: () => void; onPick: (id: string) => void; onBlank: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-[#1C1C34] flex items-center justify-between">
          <div>
            <div className="text-white font-semibold text-base">Quick Setup Templates</div>
            <div className="text-[#4A4A6A] text-xs mt-0.5">Choose a pre-configured agent to get started fast</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="px-6 py-6 grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onPick(t.id)}
              className={`bg-[#06060F] border ${t.border} rounded-xl p-4 text-left hover:bg-white/[0.03] transition-colors`}
            >
              <div className={`w-10 h-10 rounded-full ${t.tone} flex items-center justify-center mb-3`}>
                <t.icon size={18} />
              </div>
              <div className="text-white text-sm font-semibold">{t.name}</div>
              <div className="text-[#4A4A6A] text-xs mt-1 leading-snug">{t.desc}</div>
            </button>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#1C1C34] flex justify-between items-center">
          <button onClick={onBlank} className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs">Build from Scratch →</button>
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ----------------------- Wizard -----------------------

const STEP_LABELS = ["Agent Type", "Intelligence", "Identity", "Behavior", "Voice & Channel", "Review"];
const STEP_ICONS: LucideIcon[] = [Bot, Brain, Sparkles, Settings, Phone, CheckCircle];

interface WizardState {
  channelType: AgentType | null;
  preset: string | null;
  agentName: string;
  website: string;
  hasDocument: boolean;
  readiness: number;
  role: string;
  organization: string;
  language: string;
  persona: string;
  openingMessage: string;
  systemInstructions: string;
  safety: { content: boolean; escalation: boolean; pii: boolean; topics: boolean };
  voiceProvider: "OIS" | "Voice.ai";
  voice: string;
  stability: number;
  speed: number;
  testCallVoice: string;
  channels: string[];
  model: string;
}

function templateDefaults(id: string | null): Partial<WizardState> {
  switch (id) {
    case "dental":
      return { channelType: "omnichannel", preset: "appt", agentName: "Dental Reception", role: "Patient Advisor", persona: "Friendly, professional dental front-desk persona." };
    case "sales":
      return { channelType: "voice", preset: "sales", agentName: "Sales Agent", role: "Sales Representative", persona: "Confident, persuasive, value-focused." };
    case "support":
      return { channelType: "chat", preset: "support", agentName: "Support Agent", role: "Support Specialist", persona: "Patient, empathetic, solution-oriented." };
    case "appointment":
      return { channelType: "voice", preset: "appt", agentName: "Appointment Setter", role: "Scheduler", persona: "Polite and efficient at booking time slots." };
    case "lead":
      return { channelType: "chat", preset: "sales", agentName: "Lead Qualifier", role: "Lead Qualifier", persona: "Curious, asks great qualifying questions." };
    case "custom":
    default:
      return {};
  }
}

function Wizard({
  template, onClose, onCreate,
}: { template: string | null; onClose: () => void; onCreate: (s: WizardState) => void | Promise<void> }) {
  const defaults = templateDefaults(template);
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [s, setS] = useState<WizardState>({
    channelType: null, preset: null,
    agentName: "", website: "", hasDocument: false, readiness: 0,
    role: "", organization: "", language: "English (US)", persona: "",
    openingMessage: "", systemInstructions: "",
    safety: { content: true, escalation: true, pii: false, topics: false },
    voiceProvider: "OIS", voice: "Sophia", stability: 70, speed: 100, testCallVoice: "Alloy",
    channels: [], model: "claude-sonnet-4-5",
    ...defaults,
  });

  const update = <K extends keyof WizardState>(k: K, v: WizardState[K]) => setS((p) => ({ ...p, [k]: v }));

  const showVoice = s.channelType === "voice" || s.channelType === "omnichannel";
  const showChat = s.channelType === "chat" || s.channelType === "omnichannel";

  const canContinue = () => {
    if (step === 0) return !!s.channelType;
    if (step === 1) return true;
    if (step === 2) return s.agentName.trim().length > 0 && s.persona.trim().length > 0;
    if (step === 3) return s.openingMessage.trim().length > 0;
    return true;
  };

  const StepIcon = STEP_ICONS[step];

  const handleCreate = async () => {
    if (saving) return;
    setSaving(true);
    try { await onCreate(s); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[680px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1C1C34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
              <StepIcon size={16} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">Create New Agent</div>
              <div className="text-[#4A4A6A] text-xs">Step {step + 1} of {STEP_LABELS.length} · {STEP_LABELS[step]}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center justify-center"><X size={16} /></button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-[#1C1C34]">
          <div className="flex items-center gap-0">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-semibold ${
                    i < step ? "bg-[#22C55E] text-white" : i === step ? "bg-[#7B5CFC] text-white" : "bg-[#1C1C34] text-[#4A4A6A]"
                  }`}>
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <div className={`text-[9px] uppercase tracking-wider hidden md:block whitespace-nowrap ${i === step ? "text-white" : "text-[#4A4A6A]"}`}>{label}</div>
                </div>
                {i < STEP_LABELS.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 min-h-[360px] max-h-[60vh] overflow-y-auto">
          {step === 0 && <StepAgentType s={s} update={update} />}
          {step === 1 && <StepIntelligence s={s} update={update} />}
          {step === 2 && <StepIdentity s={s} update={update} />}
          {step === 3 && <StepBehavior s={s} update={update} />}
          {step === 4 && <StepVoiceChannel s={s} update={update} showVoice={showVoice} showChat={showChat} />}
          {step === 5 && <StepReview s={s} update={update} onJump={(i) => setStep(i)} />}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1C1C34] flex justify-between">
          <button onClick={onClose} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Cancel</button>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep((x) => x - 1)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm">← Back</button>
            )}
            {step < STEP_LABELS.length - 1 ? (
              <button
                onClick={() => canContinue() && setStep((x) => x + 1)}
                disabled={!canContinue()}
                className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step === STEP_LABELS.length - 2 ? "Review" : "Continue"} <ChevronRight size={14} />
              </button>
            ) : (
              <button onClick={handleCreate} className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">Create Agent</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------- Step components -----------------------

function StepAgentType({ s, update }: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void }) {
  return (
    <>
      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-4">Channel Type</div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <TypeCard selected={s.channelType === "chat"} onClick={() => update("channelType", "chat")}
          icon={MessageSquare} tone="bg-[#7B5CFC]/15 text-[#7B5CFC]" name="Chat Agent" desc="Instagram, WhatsApp, Web" />
        <TypeCard selected={s.channelType === "voice"} onClick={() => update("channelType", "voice")}
          icon={Phone} tone="bg-[#00D4AA]/15 text-[#00D4AA]" name="Voice Agent" desc="Phone calls & telephony"
          features={["Natural voice", "Real-time transcription", "Call routing"]} />
        <TypeCard selected={s.channelType === "omnichannel"} onClick={() => update("channelType", "omnichannel")}
          icon={Zap} tone="bg-amber-500/15 text-amber-400" name="Omnichannel" desc="Voice + Chat combined" />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">Quick Start Preset</div>
        <span className="bg-[#1C1C34] text-[#8B8FA8] text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">Optional</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[
          { id: "sales", name: "Sales", icon: TrendingUp, tone: "bg-[#22C55E]/15 text-[#22C55E]" },
          { id: "support", name: "Support", icon: Headphones, tone: "bg-blue-500/15 text-blue-400" },
          { id: "appt", name: "Appointment Setter", icon: Calendar, tone: "bg-[#7B5CFC]/15 text-[#7B5CFC]" },
          { id: "custom", name: "Custom", icon: Settings, tone: "bg-amber-500/15 text-amber-400" },
        ].map((p) => (
          <button key={p.id} onClick={() => update("preset", p.id)}
            className={`bg-[#06060F] border rounded-xl p-4 text-center transition-all ${
              s.preset === p.id ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]" : "border-[#1C1C34] hover:border-[#7B5CFC]/30"
            }`}>
            <div className={`w-8 h-8 rounded-full ${p.tone} flex items-center justify-center mx-auto mb-2`}><p.icon size={16} /></div>
            <div className="text-white text-xs font-semibold">{p.name}</div>
          </button>
        ))}
      </div>
    </>
  );
}

function StepIntelligence({ s, update }: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void }) {
  const [analyzing, setAnalyzing] = useState(false);
  const run = () => {
    if (!s.agentName.trim()) { toast.error("Enter an agent name first"); return; }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      update("readiness", 80);
      if (!s.role) update("role", "AI Assistant");
      if (!s.organization) update("organization", s.agentName);
      if (!s.persona) update("persona", `Friendly, knowledgeable AI assistant for ${s.agentName}.`);
      toast.success("Analysis complete");
    }, 2000);
  };
  return (
    <>
      <div className="text-white font-semibold text-base">Company Intelligence</div>
      <p className="text-[#4A4A6A] text-xs mt-1 mb-5">Provide your details and AI will auto-generate persona, opening message, and instructions.</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">Agent Name <span className="text-[#EF4444]">*</span></div>
          <span className="text-[#4A4A6A] text-xs">{s.agentName.length}/60</span>
        </div>
        <input maxLength={60} value={s.agentName} onChange={(e) => update("agentName", e.target.value)}
          placeholder="e.g. Dental Reception"
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60" />
      </div>

      <div className="mb-4">
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">Company Website</div>
        <input disabled={!s.agentName.trim()} value={s.website} onChange={(e) => update("website", e.target.value)}
          placeholder="https://yourcompany.com"
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60 disabled:opacity-50 disabled:cursor-not-allowed" />
      </div>

      <div className="mb-4">
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">Company Document <span className="text-[#4A4A6A] normal-case">(optional)</span></div>
        <label className="block bg-[#06060F] border border-dashed border-[#1C1C34] rounded-xl p-5 text-center cursor-pointer hover:border-[#7B5CFC]/40">
          <Upload size={18} className="mx-auto text-[#7B5CFC] mb-2" />
          <div className="text-white text-xs">{s.hasDocument ? "Document attached" : "Drop file or click to upload"}</div>
          <div className="text-[#4A4A6A] text-[10px] mt-1">TXT up to 10MB</div>
          <input type="file" accept=".txt" className="hidden" onChange={(e) => update("hasDocument", !!e.target.files?.length)} />
        </label>
      </div>

      <button onClick={run} disabled={analyzing}
        className="w-full h-10 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
        {analyzing && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        {analyzing ? "Analyzing..." : "Analyze & Auto-Generate"}
      </button>

      {s.readiness > 0 && (
        <div className="mt-3 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg px-3 py-2 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle size={12} /> Readiness {s.readiness}% — identity pre-filled
        </div>
      )}

      <div className="text-center mt-3">
        <button className="text-[#8B8FA8] hover:text-white text-xs underline">skip and configure manually</button>
      </div>
    </>
  );
}

function StepIdentity({ s, update }: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FieldLbl label="Agent Name *">
          <input value={s.agentName} onChange={(e) => update("agentName", e.target.value)}
            className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60"
            placeholder="Dental Assistant" />
        </FieldLbl>
        <FieldLbl label="Role / Title">
          <input value={s.role} onChange={(e) => update("role", e.target.value)}
            className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60"
            placeholder="Patient Advisor" />
        </FieldLbl>
        <FieldLbl label="Organization / Company">
          <input value={s.organization} onChange={(e) => update("organization", e.target.value)}
            className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60"
            placeholder="Dubai Smile Clinic" />
        </FieldLbl>
        <FieldLbl label="Language">
          <LanguageDropdown value={s.language} onChange={(v) => update("language", v)} />
        </FieldLbl>
      </div>

      <FieldLbl label="Persona & Personality *">
        <textarea value={s.persona} onChange={(e) => update("persona", e.target.value)}
          placeholder="Describe personality, expertise, communication style..."
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 min-h-[90px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60" />
        <div className="text-[#4A4A6A] text-[11px] mt-1">Define how your agent thinks, speaks, and interacts</div>
      </FieldLbl>

      {/* Live preview */}
      <div className="mt-5 bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center"><Bot size={22} className="text-[#7B5CFC]" /></div>
        <div className="flex-1">
          <div className="text-white text-sm font-semibold">{s.agentName || "Your Agent"}</div>
          <div className="text-[#4A4A6A] text-xs">{s.role || "AI Assistant"}{s.organization ? ` · ${s.organization}` : ""}</div>
        </div>
        <span className="bg-[#7B5CFC]/15 text-[#7B5CFC] text-[10px] px-2 py-1 rounded-full">{s.language}</span>
      </div>
    </>
  );
}

function LanguageDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const list = LANGUAGES.filter((l) => l.name.toLowerCase().includes(q.toLowerCase()) || l.native.toLowerCase().includes(q.toLowerCase()));
  const current = LANGUAGES.find((l) => l.name === value) ?? LANGUAGES[0];
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)}
        className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm flex items-center gap-2 hover:border-[#7B5CFC]/40">
        <Globe size={14} className="text-[#7B5CFC]" />
        <span className="flex-1 text-left">{current.flag} {current.name}</span>
        <ChevronRight size={12} className={`transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-40 mt-1 w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg shadow-xl overflow-hidden">
          <div className="p-2 border-b border-[#1C1C34]">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search languages..."
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-md px-2 py-1.5 text-white text-xs placeholder:text-[#4A4A6A] focus:outline-none" />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {list.map((l) => (
              <button key={l.code} onClick={() => { onChange(l.name); setOpen(false); setQ(""); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#8B8FA8] hover:text-white hover:bg-white/5">
                <span>{l.flag}</span>
                <span className="text-white">{l.name}</span>
                <span className="text-[#4A4A6A] ml-auto">{l.native}</span>
              </button>
            ))}
            {list.length === 0 && <div className="px-3 py-4 text-center text-[#4A4A6A] text-xs">No matches</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function StepBehavior({ s, update }: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void }) {
  const safety = s.safety;
  const toggle = (k: keyof WizardState["safety"]) => update("safety", { ...safety, [k]: !safety[k] });
  return (
    <>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">Opening Message *</div>
          <span className="text-[#4A4A6A] text-xs">{s.openingMessage.length}/300</span>
        </div>
        <textarea maxLength={300} value={s.openingMessage} onChange={(e) => update("openingMessage", e.target.value)}
          placeholder="Hi, I'm [name], your AI assistant at [clinic]. How can I help you today?"
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 min-h-[80px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60" />
        <div className="text-[#4A4A6A] text-[11px] mt-1">First message when starting a call or conversation</div>
      </div>

      <div className="mb-4">
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">System Instructions</div>
        <textarea value={s.systemInstructions} onChange={(e) => update("systemInstructions", e.target.value)}
          placeholder="You are [name], a [role] for [company]..."
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 min-h-[140px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60" />
        <div className="text-[#4A4A6A] text-[11px] mt-1">Advanced instructions for fine-tuning responses</div>
      </div>

      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-2">Safety & Guardrails</div>
      <div className="grid grid-cols-2 gap-3">
        <SafetyRow label="Content Filtering" on={safety.content} onToggle={() => toggle("content")} />
        <SafetyRow label="Human Escalation" on={safety.escalation} onToggle={() => toggle("escalation")} />
        <SafetyRow label="PII Protection" on={safety.pii} onToggle={() => toggle("pii")} />
        <SafetyRow label="Topic Boundaries" on={safety.topics} onToggle={() => toggle("topics")} />
      </div>
    </>
  );
}

function SafetyRow({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex items-center justify-between">
      <div className="text-white text-sm">{label}</div>
      <button onClick={onToggle} className={`w-10 h-6 rounded-full relative transition-colors ${on ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function StepVoiceChannel({
  s, update, showVoice, showChat,
}: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void; showVoice: boolean; showChat: boolean }) {
  return (
    <div className="space-y-6">
      {showVoice && (
        <div>
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">Voice Provider</div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(["OIS", "Voice.ai"] as const).map((p) => (
              <button key={p} onClick={() => update("voiceProvider", p)}
                className={`bg-[#06060F] border rounded-xl p-3 text-left cursor-pointer ${
                  s.voiceProvider === p ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]" : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                }`}>
                <div className="text-white text-sm font-semibold">{p}</div>
                <div className="text-[#4A4A6A] text-xs">{p === "OIS" ? "Default — high quality" : "Alternative provider"}</div>
              </button>
            ))}
          </div>

          <FieldLbl label="Select Voice">
            <div className="flex gap-2">
              <select value={s.voice} onChange={(e) => update("voice", e.target.value)}
                className="flex-1 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60">
                {["Sophia", "Sarah", "Alex", "Jordan"].map((v) => <option key={v}>{v}</option>)}
              </select>
              <button className="h-9 w-9 rounded-lg bg-[#7B5CFC]/15 text-[#7B5CFC] hover:bg-[#7B5CFC]/25 flex items-center justify-center">
                <Play size={14} />
              </button>
            </div>
          </FieldLbl>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <FieldLbl label={`Stability ${s.stability}%`}>
              <input type="range" min={0} max={100} value={s.stability} onChange={(e) => update("stability", +e.target.value)} className="w-full accent-[#7B5CFC]" />
            </FieldLbl>
            <FieldLbl label={`Speed ${s.speed}%`}>
              <input type="range" min={50} max={150} value={s.speed} onChange={(e) => update("speed", +e.target.value)} className="w-full accent-[#7B5CFC]" />
            </FieldLbl>
          </div>

          <FieldLbl label="Test Call Voice">
            <select value={s.testCallVoice} onChange={(e) => update("testCallVoice", e.target.value)}
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60">
              {["Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer"].map((v) => <option key={v}>{v}</option>)}
            </select>
          </FieldLbl>
        </div>
      )}

      {showChat && (
        <div>
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">Assign Channels</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "WhatsApp", icon: MessageCircle },
              { name: "Instagram", icon: Camera },
              { name: "Website Chat", icon: Globe },
              { name: "SMS", icon: MessageSquare },
              { name: "Email", icon: Mail },
            ].map((c) => {
              const checked = s.channels.includes(c.name);
              return (
                <label key={c.name}
                  className={`bg-[#06060F] border rounded-lg p-3 flex items-center gap-3 cursor-pointer ${
                    checked ? "border-[#22C55E]" : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                  }`}>
                  <input type="checkbox" checked={checked} onChange={() =>
                    update("channels", checked ? s.channels.filter((x) => x !== c.name) : [...s.channels, c.name])
                  } className="accent-[#7B5CFC]" />
                  <c.icon size={14} className="text-[#7B5CFC]" />
                  <span className="text-white text-sm">{c.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StepReview({
  s, update, onJump,
}: { s: WizardState; update: <K extends keyof WizardState>(k: K, v: WizardState[K]) => void; onJump: (i: number) => void }) {
  return (
    <div className="space-y-3">
      <SummaryCard title="Agent Type" onEdit={() => onJump(0)}>
        <div className="text-white text-sm">{s.channelType ?? "—"}{s.preset ? ` · ${s.preset}` : ""}</div>
      </SummaryCard>
      <SummaryCard title="Identity" onEdit={() => onJump(2)}>
        <div className="text-white text-sm">{s.agentName || "—"}</div>
        <div className="text-[#8B8FA8] text-xs">{s.role}{s.organization ? ` · ${s.organization}` : ""} · {s.language}</div>
      </SummaryCard>
      <SummaryCard title="Behavior" onEdit={() => onJump(3)}>
        <div className="text-[#8B8FA8] text-xs line-clamp-2">{s.openingMessage || "No opening message"}</div>
      </SummaryCard>
      <SummaryCard title="Voice & Channel" onEdit={() => onJump(4)}>
        <div className="text-[#8B8FA8] text-xs">
          {(s.channelType === "voice" || s.channelType === "omnichannel") && <span>{s.voiceProvider} · {s.voice}</span>}
          {(s.channelType === "chat" || s.channelType === "omnichannel") && (
            <span>{s.channelType === "omnichannel" ? " · " : ""}{s.channels.join(", ") || "No channels"}</span>
          )}
        </div>
      </SummaryCard>

      <div>
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">AI Model</div>
        <select value={s.model} onChange={(e) => update("model", e.target.value)}
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60">
          {MODEL_GROUPS.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.models.map((m) => <option key={m} value={m}>{m}</option>)}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}

function SummaryCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">{title}</div>
        <button onClick={onEdit} className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs">Edit</button>
      </div>
      {children}
    </div>
  );
}

// ----------------------- Type card -----------------------

function TypeCard({
  selected, onClick, icon: Icon, tone, name, desc, features,
}: { selected: boolean; onClick: () => void; icon: LucideIcon; tone: string; name: string; desc: string; features?: string[] }) {
  return (
    <div onClick={onClick}
      className={`relative bg-[#06060F] border rounded-xl p-5 cursor-pointer transition-all ${
        selected ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.08]" : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
      }`}>
      {selected && <CheckCircle size={16} className="absolute top-2 right-2 text-[#7B5CFC]" />}
      <div className={`w-12 h-12 rounded-full ${tone} flex items-center justify-center mx-auto mb-3`}><Icon size={22} /></div>
      <div className="text-white text-sm font-semibold text-center">{name}</div>
      <div className="text-[#4A4A6A] text-xs text-center mt-1">{desc}</div>
      {selected && features && (
        <ul className="mt-3 space-y-1">
          {features.map((f) => (
            <li key={f} className="text-[#22C55E] text-xs flex items-center gap-1"><Check size={10} />{f}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FieldLbl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">{label}</div>
      {children}
    </div>
  );
}
