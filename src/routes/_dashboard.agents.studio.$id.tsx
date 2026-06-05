import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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

function AgentDetailPage() {
  const { id } = Route.useParams();
  const [tab, setTab] = useState("Identity");
  const [preset, setPreset] = useState("sales");
  const [active, setActive] = useState(true);

  return (
    <div className="font-sans">
      {/* Top Bar */}
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
          <div className="text-white font-semibold text-lg leading-tight capitalize">
            {id.replace(/-/g, " ")}
          </div>
          <div className="text-[#4A4A6A] text-xs">Updated today</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setActive((a) => !a)}
            className={`h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-2 ${
              active
                ? "bg-[#22C55E]/12 text-[#22C55E]"
                : "bg-[#1C1C34] text-[#8B8FA8]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                active ? "bg-[#22C55E]" : "bg-[#4A4A6A]"
              }`}
            />
            {active ? "Active" : "Inactive"}
          </button>
          {["Sync", "Test", "History"].map((b) => (
            <button
              key={b}
              className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs"
            >
              {b}
            </button>
          ))}
          <button className="w-8 h-8 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 grid grid-cols-4 gap-4 border-b border-[#1C1C34]">
        {/* Readiness */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em]">
            Readiness
          </div>
          <div className="text-[#22C55E] font-extrabold text-[32px] leading-none mt-1">
            100%
          </div>
          <div className="h-1.5 w-full bg-[#1C1C34] rounded-full mt-3 overflow-hidden">
            <div className="h-full w-full bg-[#22C55E] rounded-full" />
          </div>
          <ul className="mt-3 space-y-1.5">
            {["Name", "Persona", "Opening", "Instructions", "Voice"].map((c) => (
              <li
                key={c}
                className="text-xs text-[#8B8FA8] flex items-center gap-1.5"
              >
                <Check size={12} className="text-[#22C55E]" />
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Statistics */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Statistics
          </div>
          <div className="space-y-3">
            <StatLine icon={PhoneCall} label="Calls" value="0" />
            <StatLine icon={FileText} label="Docs" value="52" />
            <StatLine icon={HelpCircle} label="FAQs" value="0" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Quick Actions
          </div>
          <div className="space-y-2">
            {["Generate Persona", "Copy Instructions", "Document Library"].map(
              (b) => (
                <button
                  key={b}
                  className="w-full h-8 rounded-lg bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/40 text-xs"
                >
                  {b}
                </button>
              )
            )}
          </div>
        </div>

        {/* Details */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mb-3">
            Details
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">Created</span>
              <span className="text-white">Nov 4, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">Modified</span>
              <span className="text-white">Today</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A6A]">ID</span>
              <span className="text-white font-mono truncate max-w-[120px]">
                {id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Identity Tab */}
      {tab === "Identity" && (
        <div className="px-6 py-6">
          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1">
            Basic Information
          </div>
          <div className="text-[#4A4A6A] text-xs mb-4">
            Core identity details for your agent
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Agent Name" defaultValue="Dental Assistant" />
            <Input label="Role / Title" defaultValue="Patient Advisor" />
            <Input label="Organization" defaultValue="Dubai Smile Clinic" />
            <Input label="Language" defaultValue="EN English + AR Arabic" />
          </div>

          {/* Opening Message */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                Opening Message
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#4A4A6A] text-xs">95 / 300</span>
                <button className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs flex items-center gap-1">
                  <Sparkles size={12} />
                  Generate
                </button>
              </div>
            </div>
            <textarea
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 min-h-[90px] text-white text-sm resize-none focus:outline-none focus:border-[#7B5CFC]/60"
              defaultValue="Hi! I'm your dental AI assistant at Dubai Smile Clinic. How can I help you today?"
            />
            <div className="mt-2 bg-[#7B5CFC]/[0.06] border border-[#7B5CFC]/15 rounded-lg px-3 py-2 text-[#8B8FA8] text-xs">
              Keep it under 5 seconds. A personalized greeting with the caller's
              name increases engagement by 35%.
            </div>
          </div>

          {/* Preset */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider">
                Agent Type Preset
              </div>
              <button className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs">
                View Preset Details →
              </button>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPreset(p.id)}
                  className={`bg-[#06060F] border rounded-lg p-3 text-center transition-all ${
                    preset === p.id
                      ? "border-blue-500 bg-blue-500/[0.06]"
                      : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                  }`}
                >
                  <Bot
                    size={18}
                    className={`mx-auto mb-1.5 ${
                      preset === p.id ? "text-blue-400" : "text-[#8B8FA8]"
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
              <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm">
                <option>Dental</option>
                <option>Healthcare</option>
                <option>Beauty</option>
              </select>
            </div>
            <div>
              <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
                Priority Level
              </div>
              <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">
              Discard
            </button>
            <button className="h-9 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
              Save Changes
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
  defaultValue,
}: {
  label: string;
  defaultValue: string;
}) {
  return (
    <div>
      <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-1.5">
        {label}
      </div>
      <input
        defaultValue={defaultValue}
        className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
      />
    </div>
  );
}
