import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/studio")({
  component: AgentStudioPage,
});

const AGENTS = [
  {
    id: "dental-assistant",
    name: "Dental Assistant",
    sub: "Persona & Tone Guidelines...",
    type: "Both",
    typeTone: "bg-amber-500/12 text-amber-400",
    status: "Live",
    readiness: 95,
    channels: "—",
    lang: "EN",
    docs: 52,
    faqs: 0,
    calls: 0,
    updated: "1d ago",
  },
  {
    id: "sarah",
    name: "Sarah",
    sub: "Front-desk chat persona",
    type: "Chat",
    typeTone: "bg-blue-500/12 text-blue-400",
    status: "Live",
    readiness: 100,
    channels: "Web",
    lang: "EN",
    docs: 1,
    faqs: 68,
    calls: 0,
    updated: "12h ago",
  },
];

function Stat({
  icon: Icon,
  tone,
  value,
  label,
}: {
  icon: LucideIcon;
  tone: string;
  value: string;
  label: string;
}) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-4">
      <Icon size={20} className={tone} />
      <div>
        <div className="text-white font-bold text-[20px] leading-none">
          {value}
        </div>
        <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
          {label}
        </div>
      </div>
    </div>
  );
}

function AgentStudioPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [tabType, setTabType] = useState<"All" | "Voice" | "Chat">("All");
  const [tabStatus, setTabStatus] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Bot size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em] leading-tight">
              Agent Studio
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Build, configure, and deploy your dental AI agents
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-sm transition-colors">
            Setup Wizard
          </button>
          <button
            onClick={() => setWizardOpen(true)}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold transition-colors"
          >
            + New Agent
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-5 grid grid-cols-5 gap-3">
        <Stat
          icon={Bot}
          tone="text-[#7B5CFC]"
          value="2"
          label="Total Agents"
        />
        <Stat icon={Zap} tone="text-[#22C55E]" value="2" label="Live" />
        <Stat
          icon={FileText}
          tone="text-blue-400"
          value="53"
          label="Documents"
        />
        <Stat
          icon={HelpCircle}
          tone="text-amber-400"
          value="68"
          label="FAQs"
        />
        <Stat
          icon={PhoneCall}
          tone="text-[#00D4AA]"
          value="0"
          label="Total Calls"
        />
      </div>

      {/* Toolbar */}
      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="relative w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]"
          />
          <input
            placeholder="Search agents..."
            className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
          />
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["All", "Voice", "Chat"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setTabType(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                tabType === p
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["All", "Active", "Inactive"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setTabStatus(p)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                tabStatus === p
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white">
            <LayoutGrid size={14} />
          </button>
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white">
            <List size={14} />
          </button>
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mx-6 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
        <div className="bg-[#06060F] h-11 grid grid-cols-[40px_2fr_80px_90px_140px_80px_60px_60px_60px_60px_80px_80px] items-center text-[10px] uppercase tracking-wider text-[#4A4A6A]">
          <div className="px-4">
            <input type="checkbox" className="accent-[#7B5CFC]" />
          </div>
          <div>Name</div>
          <div>Type</div>
          <div>Status</div>
          <div>Readiness</div>
          <div>Channels</div>
          <div>Lang</div>
          <div>Docs</div>
          <div>FAQs</div>
          <div>Calls</div>
          <div>Updated</div>
          <div>Actions</div>
        </div>
        {AGENTS.map((a) => (
          <Link
            key={a.id}
            to="/agents/studio/$id"
            params={{ id: a.id }}
            className="grid grid-cols-[40px_2fr_80px_90px_140px_80px_60px_60px_60px_60px_80px_80px] items-center h-14 border-b border-[#1C1C34]/60 hover:bg-white/[0.02] cursor-pointer"
          >
            <div className="px-4" onClick={(e) => e.preventDefault()}>
              <input type="checkbox" className="accent-[#7B5CFC]" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#7B5CFC]/20 flex items-center justify-center">
                <Bot size={14} className="text-[#7B5CFC]" />
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">
                  {a.name}
                </div>
                <div className="text-[#4A4A6A] text-xs truncate">{a.sub}</div>
              </div>
            </div>
            <div>
              <span
                className={`${a.typeTone} text-xs px-2 py-0.5 rounded-full`}
              >
                {a.type}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              <span className="text-[#22C55E] text-xs">{a.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-20 bg-[#1C1C34] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] rounded-full"
                  style={{ width: `${a.readiness}%` }}
                />
              </div>
              <span className="text-white text-xs">{a.readiness}%</span>
            </div>
            <div className="text-[#4A4A6A] text-xs">{a.channels}</div>
            <div className="text-[#8B8FA8] text-xs">{a.lang}</div>
            <div className="text-white text-sm font-medium">{a.docs}</div>
            <div className="text-[#4A4A6A] text-sm">{a.faqs}</div>
            <div className="text-[#4A4A6A] text-sm">{a.calls}</div>
            <div className="text-[#4A4A6A] text-xs">{a.updated}</div>
            <div
              className="flex items-center gap-1"
              onClick={(e) => e.preventDefault()}
            >
              <button className="h-7 px-2 rounded-md text-[#8B8FA8] hover:text-white hover:bg-white/5 text-xs flex items-center gap-1">
                <Edit3 size={12} />
                Edit
              </button>
              <button className="h-7 w-7 rounded-md text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center justify-center">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </Link>
        ))}
      </div>

      <div className="h-10" />

      {wizardOpen && <Wizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

// ============================ WIZARD ============================

const STEPS = [
  "Agent Type",
  "Intelligence",
  "Identity",
  "Behavior",
  "Voice & Channel",
  "Review",
];

function Wizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<"chat" | "voice" | "omni" | null>("chat");
  const [preset, setPreset] = useState<string | null>(null);
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [channels, setChannels] = useState<string[]>(["WhatsApp"]);

  const stepIcons = [Bot, Brain, Sparkles, Settings, Phone, CheckCircle];
  const StepIcon = stepIcons[step];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[680px] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1C1C34] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
              <StepIcon size={16} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white font-semibold text-base">
                Create New Agent
              </div>
              <div className="text-[#4A4A6A] text-xs">
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white hover:bg-white/5 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4 border-b border-[#1C1C34]">
          <div className="flex items-center gap-0">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-semibold ${
                      i < step
                        ? "bg-[#22C55E] text-white"
                        : i === step
                        ? "bg-[#7B5CFC] text-white"
                        : "bg-[#1C1C34] text-[#4A4A6A]"
                    }`}
                  >
                    {i < step ? <Check size={12} /> : i + 1}
                  </div>
                  <div
                    className={`text-[9px] uppercase tracking-wider hidden md:block whitespace-nowrap ${
                      i === step ? "text-white" : "text-[#4A4A6A]"
                    }`}
                  >
                    {label}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 ${
                      i < step ? "bg-[#22C55E]" : "bg-[#1C1C34]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 min-h-[360px] max-h-[60vh] overflow-y-auto">
          {step === 0 && (
            <>
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-4">
                Channel Type
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <TypeCard
                  selected={type === "chat"}
                  onClick={() => setType("chat")}
                  icon={MessageSquare}
                  tone="bg-[#7B5CFC]/15 text-[#7B5CFC]"
                  name="Chat Agent"
                  desc="Instagram, WhatsApp, Web"
                />
                <TypeCard
                  selected={type === "voice"}
                  onClick={() => setType("voice")}
                  icon={Phone}
                  tone="bg-[#00D4AA]/15 text-[#00D4AA]"
                  name="Voice Agent"
                  desc="Phone calls & telephony"
                  features={[
                    "Inbound + outbound",
                    "Real-time transcription",
                    "Voice cloning",
                  ]}
                />
                <TypeCard
                  selected={type === "omni"}
                  onClick={() => setType("omni")}
                  icon={Zap}
                  tone="bg-amber-500/15 text-amber-400"
                  name="Omnichannel"
                  desc="Voice + Chat combined"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                  Quick Start Preset
                </div>
                <span className="bg-[#1C1C34] text-[#8B8FA8] text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Optional
                </span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                    id: "sales",
                    name: "Sales Agent",
                    desc: "Close deals fast",
                    icon: TrendingUp,
                    tone: "bg-[#22C55E]/15 text-[#22C55E]",
                  },
                  {
                    id: "support",
                    name: "Support Agent",
                    desc: "Resolve tickets",
                    icon: Headphones,
                    tone: "bg-blue-500/15 text-blue-400",
                  },
                  {
                    id: "appt",
                    name: "Appointment Setter",
                    desc: "Book meetings",
                    icon: Calendar,
                    tone: "bg-[#7B5CFC]/15 text-[#7B5CFC]",
                  },
                  {
                    id: "custom",
                    name: "Custom Agent",
                    desc: "Build your own",
                    icon: Settings,
                    tone: "bg-amber-500/15 text-amber-400",
                  },
                ].map((p) => (
                  <PresetCard
                    key={p.id}
                    selected={preset === p.id}
                    onClick={() => setPreset(p.id)}
                    {...p}
                  />
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">
                AI Model
              </div>
              <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
                  <Brain size={16} className="text-[#7B5CFC]" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">
                    Claude Sonnet (claude-sonnet-4-6)
                  </div>
                  <div className="text-[#4A4A6A] text-xs">
                    Recommended — best balance of speed and accuracy
                  </div>
                </div>
                <CheckCircle size={18} className="text-[#22C55E]" />
              </div>

              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mt-5 mb-2">
                System Prompt
              </div>
              <textarea
                className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 min-h-[120px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60"
                placeholder="You are a helpful dental clinic AI assistant for {clinic_name}..."
              />
              <div className="flex items-center justify-between mt-2">
                <button className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs flex items-center gap-1">
                  <Sparkles size={12} />
                  Generate with AI
                </button>
                <span className="text-[#4A4A6A] text-xs">0 / 2000</span>
              </div>

              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mt-4 mb-2">
                Language
              </div>
              <div className="flex gap-2">
                {(["EN", "AR"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
                      lang === l
                        ? "bg-[#7B5CFC] text-white"
                        : "bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Agent Name" placeholder="Dental Assistant" />
                <Field label="Role / Title" placeholder="Patient Advisor" />
                <Field label="Organization" placeholder="Dubai Smile Clinic" />
                <Field label="Language" placeholder="English" />
              </div>

              <div className="flex items-center justify-between mt-4 mb-2">
                <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                  Opening Message
                </div>
                <span className="text-[#4A4A6A] text-xs">0 / 300</span>
              </div>
              <textarea
                className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 min-h-[80px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60"
                placeholder="Hi! I'm [Name], your virtual assistant at [Clinic]. How can I help you today?"
              />
              <button className="mt-2 text-[#7B5CFC] text-xs flex items-center gap-1">
                <Sparkles size={12} />
                Generate with AI ✨
              </button>

              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mt-4 mb-2">
                Persona Description
              </div>
              <textarea
                className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 min-h-[60px] text-white text-sm placeholder:text-[#4A4A6A] resize-none focus:outline-none focus:border-[#7B5CFC]/60"
                placeholder="Friendly, professional, knowledgeable about dental procedures..."
              />
            </>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <BehaviorRow
                label="Escalation Rules"
                desc="Hand off to human when confidence < threshold"
                control={
                  <select className="bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60">
                    <option>70%</option>
                    <option>80%</option>
                    <option>90%</option>
                  </select>
                }
              />
              <BehaviorRow
                label="Response Timeout"
                desc="Max time before fallback response"
                control={
                  <input
                    defaultValue="30 seconds"
                    className="bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm w-32 focus:outline-none focus:border-[#7B5CFC]/60"
                  />
                }
              />
              <BehaviorRow
                label="Silence Handling"
                desc="Action when no input received"
                control={
                  <select className="bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60">
                    <option>Re-prompt</option>
                    <option>End session</option>
                    <option>Transfer</option>
                  </select>
                }
              />
            </div>
          )}

          {step === 4 && (
            <>
              {type === "voice" ? (
                <>
                  <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">
                    Voice Provider
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {["Vapi.ai", "Retell AI"].map((p, i) => (
                      <div
                        key={p}
                        className={`bg-[#06060F] border rounded-xl p-4 cursor-pointer ${
                          i === 0
                            ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]"
                            : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                        }`}
                      >
                        <div className="text-white text-sm font-semibold">
                          {p}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Field
                    label="Phone Number"
                    placeholder="+971 XX XXX XXXX"
                  />
                  <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mt-4 mb-2">
                    Voice Profile
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Aria", "Marcus", "Luna", "James"].map((v) => (
                      <div
                        key={v}
                        className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex items-center gap-3"
                      >
                        <button className="w-8 h-8 rounded-full bg-[#7B5CFC]/15 text-[#7B5CFC] flex items-center justify-center">
                          ▶
                        </button>
                        <div className="text-white text-sm">{v}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">
                    Assign Channels
                  </div>
                  <div className="space-y-2">
                    {[
                      { name: "WhatsApp", icon: MessageCircle },
                      { name: "Instagram", icon: Camera },
                      { name: "SMS", icon: MessageSquare },
                      { name: "Website Chat", icon: Globe },
                      { name: "Email", icon: Mail },
                    ].map((c) => {
                      const selected = channels.includes(c.name);
                      const Icon = c.icon;
                      return (
                        <div
                          key={c.name}
                          onClick={() =>
                            setChannels((cs) =>
                              cs.includes(c.name)
                                ? cs.filter((x) => x !== c.name)
                                : [...cs, c.name]
                            )
                          }
                          className={`bg-[#06060F] border rounded-lg p-3 flex items-center gap-3 cursor-pointer ${
                            selected
                              ? "border-[#22C55E]"
                              : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                          }`}
                        >
                          <Icon size={16} className="text-[#7B5CFC]" />
                          <div className="text-white text-sm flex-1">
                            {c.name}
                          </div>
                          {selected && (
                            <Check size={14} className="text-[#22C55E]" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </>
          )}

          {step === 5 && (
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5 space-y-3">
              <div className="text-white text-lg font-bold">New Agent</div>
              <SumRow k="Type" v={type ?? "—"} />
              <SumRow k="Preset" v={preset ?? "Custom"} />
              <SumRow k="Language" v={lang} />
              <SumRow k="Channels" v={channels.join(", ") || "—"} />
              <div className="border-t border-[#1C1C34] pt-3 flex gap-3">
                <Badge label="Identity" />
                <Badge label="Intelligence" />
                <Badge label="Channels" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1C1C34] flex justify-between">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => {
                if (step < STEPS.length - 1) setStep((s) => s + 1);
                else onClose();
              }}
              className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-1"
            >
              {step === STEPS.length - 1 ? "Create Agent" : "Continue"}
              {step < STEPS.length - 1 && <ChevronRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  icon: Icon,
  tone,
  name,
  desc,
  features,
}: {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  tone: string;
  name: string;
  desc: string;
  features?: string[];
}) {
  return (
    <div
      onClick={onClick}
      className={`relative bg-[#06060F] border rounded-xl p-5 cursor-pointer transition-all ${
        selected
          ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]"
          : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
      }`}
    >
      {selected && (
        <CheckCircle
          size={16}
          className="absolute top-2 right-2 text-[#7B5CFC]"
        />
      )}
      <div
        className={`w-12 h-12 rounded-full ${tone} flex items-center justify-center mx-auto mb-3`}
      >
        <Icon size={22} />
      </div>
      <div className="text-white text-sm font-semibold text-center">{name}</div>
      <div className="text-[#4A4A6A] text-xs text-center mt-1">{desc}</div>
      {selected && features && (
        <ul className="mt-3 space-y-1">
          {features.map((f) => (
            <li
              key={f}
              className="text-[#22C55E] text-xs flex items-center gap-1"
            >
              <Check size={10} />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PresetCard({
  selected,
  onClick,
  icon: Icon,
  tone,
  name,
  desc,
}: {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  tone: string;
  name: string;
  desc: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#06060F] border rounded-xl p-4 cursor-pointer text-center transition-all ${
        selected
          ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]"
          : "border-[#1C1C34] hover:border-[#7B5CFC]/30"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full ${tone} flex items-center justify-center mx-auto mb-2`}
      >
        <Icon size={16} />
      </div>
      <div className="text-white text-xs font-semibold">{name}</div>
      <div className="text-[#4A4A6A] text-[11px]">{desc}</div>
    </div>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <input
        placeholder={placeholder}
        className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/60"
      />
    </div>
  );
}

function BehaviorRow({
  label,
  desc,
  control,
}: {
  label: string;
  desc: string;
  control: React.ReactNode;
}) {
  return (
    <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex justify-between items-start gap-4">
      <div>
        <div className="text-white text-sm font-medium">{label}</div>
        <div className="text-[#4A4A6A] text-xs mt-1">{desc}</div>
      </div>
      {control}
    </div>
  );
}

function SumRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[#8B8FA8]">{k}</span>
      <span className="text-white font-medium">{v}</span>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <div className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-1 rounded flex items-center gap-1">
      <Check size={12} />
      {label}
    </div>
  );
}
