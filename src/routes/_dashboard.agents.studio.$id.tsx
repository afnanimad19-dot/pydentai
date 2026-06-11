import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Bot,
  Check,
  FileText,
  HelpCircle,
  MoreHorizontal,
  PhoneCall,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/studio/$id")({
  component: AgentDetailPage,
});

const TABS = [
  "Identity",
  "Behavior",
  "Conversation",
  "Voice",
  "Intelligence",
  "Memory",
  "Handoff",
  "Analytics",
  "Training",
  "Post-Call",
  "Advanced",
];

const PRESETS = [
  { id: "sales", name: "Sales" },
  { id: "support", name: "Support" },
  { id: "scheduler", name: "Scheduler" },
  { id: "survey", name: "Survey" },
  { id: "lead", name: "Lead Qualifier" },
  { id: "custom", name: "Custom" },
];

type DbAgent = {
  id: string;
  workspace_id: string;
  name: string;
  type: string;
  status: string;
  system_prompt: string | null;
  channels: string[] | null;
  config: Record<string, any> | null;
  created_at: string;
  updated_at: string;
};

type FormState = {
  name: string;
  role: string;
  organization: string;
  language: string;
  greeting: string;
  preset: string;
  industry: string;
  priority: string;
};

function emptyForm(): FormState {
  return {
    name: "",
    role: "",
    organization: "",
    language: "EN English",
    greeting: "",
    preset: "support",
    industry: "Dental",
    priority: "Medium",
  };
}

function AgentDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("Identity");
  const [agent, setAgent] = useState<DbAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [original, setOriginal] = useState<FormState>(emptyForm());
  const [active, setActive] = useState(true);
  const [faqCount, setFaqCount] = useState(0);

  useEffect(() => {
    let cancel = false;
    setLoading(true);
    (async () => {
      const { data, error } = await supabase
        .from("ai_agents")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (cancel) return;
      if (error || !data) {
        toast.error(error?.message ?? "Agent not found");
        setLoading(false);
        return;
      }
      const a = data as DbAgent;
      const cfg = a.config ?? {};
      const ident = cfg.identity ?? {};
      const next: FormState = {
        name: a.name,
        role: ident.role ?? "",
        organization: ident.organization ?? "",
        language: cfg.language ?? "EN English",
        greeting: cfg.greeting_message ?? "",
        preset: cfg.preset ?? "support",
        industry: cfg.industry ?? "Dental",
        priority: cfg.priority ?? "Medium",
      };
      setAgent(a);
      setForm(next);
      setOriginal(next);
      setActive(a.status === "active");
      const { count } = await supabase
        .from("knowledge_entries")
        .select("id", { count: "exact", head: true })
        .eq("agent_id", id);
      if (!cancel) setFaqCount(count ?? 0);
      setLoading(false);
    })();
    return () => {
      cancel = true;
    };
  }, [id]);

  const dirty = JSON.stringify(form) !== JSON.stringify(original);
  const readiness =
    [form.name, form.role, form.greeting, agent?.system_prompt, form.language].filter(
      (v) => v && String(v).trim()
    ).length * 20;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSave = async () => {
    if (!agent) return;
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    const nextConfig = {
      ...(agent.config ?? {}),
      identity: {
        ...((agent.config ?? {}).identity ?? {}),
        name: form.name,
        role: form.role,
        organization: form.organization,
      },
      language: form.language,
      greeting_message: form.greeting,
      preset: form.preset,
      industry: form.industry,
      priority: form.priority,
    };
    const { error } = await supabase
      .from("ai_agents")
      .update({
        name: form.name.trim(),
        config: nextConfig,
      })
      .eq("id", agent.id);
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Changes saved");
    setOriginal(form);
    setAgent({ ...agent, name: form.name.trim(), config: nextConfig });
  };

  const onToggleActive = async () => {
    if (!agent) return;
    const next = active ? "inactive" : "active";
    const prev = active;
    setActive(!prev);
    const { error } = await supabase
      .from("ai_agents")
      .update({ status: next })
      .eq("id", agent.id);
    if (error) {
      setActive(prev);
      toast.error(error.message);
      return;
    }
    toast.success(next === "active" ? "Agent activated" : "Agent deactivated");
  };

  if (loading) {
    return (
      <div className="px-6 py-16 text-center text-[#4A4A6A] text-sm">Loading agent…</div>
    );
  }

  if (!agent) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="text-white font-semibold mb-2">Agent not found</div>
        <button
          onClick={() => navigate({ to: "/agents/studio" })}
          className="text-[#7B5CFC] text-sm"
        >
          Back to Agent Studio →
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <div className="px-6 py-4 border-b border-[#1C1C34] flex items-center gap-4">
        <Link
          to="/agents/studio"
          className="text-[#8B8FA8] hover:text-white text-sm flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Agent Studio
        </Link>
        <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center">
          <Bot size={18} className="text-[#7B5CFC]" />
        </div>
        <div>
          <div className="text-white font-semibold text-lg leading-tight">{agent.name}</div>
          <div className="text-[#4A4A6A] text-xs">
            Updated {new Date(agent.updated_at).toLocaleDateString()}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onToggleActive}
            className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
              active ? "bg-[#22C55E]/12 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#22C55E]" : "bg-[#4A4A6A]"}`}
            />
            {active ? "Active" : "Inactive"}
          </button>
          <button className="w-8 h-8 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-4 gap-4 border-b border-[#1C1C34]">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em]">Readiness</div>
          <div className="text-[#22C55E] font-extrabold text-[32px] leading-none mt-1">
            {readiness}%
          </div>
          <div className="h-1.5 w-full bg-[#1C1C34] rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${readiness}%` }} />
          </div>
          <ul className="mt-3 space-y-1.5">
            {[
              ["Name", !!form.name],
              ["Role", !!form.role],
              ["Greeting", !!form.greeting],
              ["Instructions", !!agent.system_prompt],
              ["Language", !!form.language],
            ].map(([label, ok]) => (
              <li
                key={String(label)}
                className="text-xs text-[#8B8FA8] flex items-center gap-1.5"
              >
                <Check size={12} className={ok ? "text-[#22C55E]" : "text-[#4A4A6A]"} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Statistics
          </div>
          <div className="space-y-3">
            <StatLine icon={PhoneCall} label="Calls" value="0" />
            <StatLine icon={FileText} label="Docs" value="0" />
            <StatLine icon={HelpCircle} label="FAQs" value={String(faqCount)} />
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Quick Actions
          </div>
          <div className="space-y-2">
            <button
              onClick={() => navigate({ to: "/agents/knowledge" })}
              className="w-full h-8 rounded-lg bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-xs"
            >
              Manage Knowledge
            </button>
            <button
              onClick={() => navigate({ to: "/agents/documents" })}
              className="w-full h-8 rounded-lg bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-xs"
            >
              Document Library
            </button>
            <button
              onClick={() => navigate({ to: "/agents/messaging-lab" })}
              className="w-full h-8 rounded-lg bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-xs"
            >
              Open Messaging Lab
            </button>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Details
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">Created</span>
              <span className="text-white">
                {new Date(agent.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">Type</span>
              <span className="text-white capitalize">{agent.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">ID</span>
              <span className="text-white font-mono truncate max-w-[120px]">{agent.id}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 border-b border-[#1C1C34] flex gap-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm whitespace-nowrap ${
              tab === t
                ? "text-white border-b-2 border-[#7B5CFC] font-medium"
                : "text-[#4A4A6A] hover:text-[#8B8FA8]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Identity" && (
        <div className="px-6 py-6">
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1">
            Basic Information
          </div>
          <div className="text-[#4A4A6A] text-xs mb-4">
            Core identity details for your agent
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Agent Name"
              value={form.name}
              onChange={(v) => update("name", v)}
            />
            <Input
              label="Role / Title"
              value={form.role}
              onChange={(v) => update("role", v)}
            />
            <Input
              label="Organization"
              value={form.organization}
              onChange={(v) => update("organization", v)}
            />
            <Input
              label="Language"
              value={form.language}
              onChange={(v) => update("language", v)}
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                Opening Message
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#4A4A6A] text-xs">
                  {form.greeting.length} / 300
                </span>
                <span className="text-[#7B5CFC] text-xs flex items-center gap-1">
                  <Sparkles size={12} />
                  Tips below
                </span>
              </div>
            </div>
            <textarea
              value={form.greeting}
              onChange={(e) => update("greeting", e.target.value.slice(0, 300))}
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 min-h-[90px] text-white text-sm resize-none focus:outline-none focus:border-[#7B5CFC]/60"
              placeholder="Hi! I'm your AI assistant. How can I help you today?"
            />
            <div className="mt-2 bg-[#7B5CFC]/[0.06] border border-[#7B5CFC]/15 rounded-lg px-3 py-2 text-[#8B8FA8] text-xs">
              Keep it under 5 seconds. A personalized greeting with the caller's name
              increases engagement by 35%.
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                Agent Type Preset
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => update("preset", p.id)}
                  className={`bg-[#06060F] border rounded-lg p-3 text-center transition-all ${
                    form.preset === p.id
                      ? "border-blue-500 bg-blue-500/[0.06]"
                      : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                  }`}
                >
                  <Bot
                    size={18}
                    className={`mx-auto mb-1.5 ${
                      form.preset === p.id ? "text-blue-400" : "text-[#8B8FA8]"
                    }`}
                  />
                  <div className="text-white text-xs">{p.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
                Industry
              </div>
              <select
                value={form.industry}
                onChange={(e) => update("industry", e.target.value)}
                className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm"
              >
                <option>Dental</option>
                <option>Healthcare</option>
                <option>Beauty</option>
                <option>Real Estate</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
                Priority Level
              </div>
              <select
                value={form.priority}
                onChange={(e) => update("priority", e.target.value)}
                className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setForm(original)}
              disabled={!dirty || saving}
              className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm disabled:opacity-40"
            >
              Discard
            </button>
            <button
              onClick={onSave}
              disabled={!dirty || saving}
              className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {tab !== "Identity" && (
        <div className="px-6 py-16 text-center text-[#4A4A6A] text-sm">
          {tab} settings coming soon.
        </div>
      )}
    </div>
  );
}

function StatLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bot;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#7B5CFC]" />
      <span className="text-[#8B8FA8] text-xs flex-1">{label}</span>
      <span className="text-white text-sm font-semibold">{value}</span>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
      />
    </div>
  );
}
