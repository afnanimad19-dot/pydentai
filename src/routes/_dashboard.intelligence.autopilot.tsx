import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Calendar,
  Camera,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/intelligence/autopilot")({
  component: AutopilotPage,
});

const TABS = [
  { id: "channels", label: "Channels (4)" },
  { id: "revenue", label: "Revenue Mode" },
  { id: "pipeline", label: "AI Pipeline" },
  { id: "safety", label: "Safety & Rules (6)" },
];

const CHANNELS = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-[#22C55E]", bg: "bg-[#22C55E]/15", sub: "342 conversations · 87% success",
    stats: [{ v: "1.8s", l: "Response" }, { v: "89", l: "Leads" }, { v: "82%", l: "Sentiment" }, { v: "87%", l: "Success" }] },
  { name: "Instagram", icon: Camera, color: "text-pink-400", bg: "bg-pink-500/15", sub: "156 conversations · 72% success",
    stats: [{ v: "2.4s", l: "Response" }, { v: "34", l: "Leads" }, { v: "76%", l: "Sentiment" }, { v: "72%", l: "Success" }] },
  { name: "Email", icon: Mail, color: "text-blue-400", bg: "bg-blue-500/15", sub: "89 conversations · 65% success",
    stats: [{ v: "3.1s", l: "Response" }, { v: "21", l: "Leads" }, { v: "71%", l: "Sentiment" }, { v: "65%", l: "Success" }] },
  { name: "Voice Calls", icon: Phone, color: "text-[#00D4AA]", bg: "bg-[#00D4AA]/15", sub: "45 conversations · 91% success",
    stats: [{ v: "0.8s", l: "Response" }, { v: "18", l: "Leads" }, { v: "88%", l: "Sentiment" }, { v: "91%", l: "Success" }] },
];

const FEATURES = [
  { icon: Zap, color: "text-[#F59E0B]", name: "Auto Reply", desc: "Smart automated responses" },
  { icon: Target, color: "text-[#7B5CFC]", name: "Auto Qualify", desc: "Lead scoring & qualification" },
  { icon: Clock, color: "text-blue-400", name: "Auto Follow-Up", desc: "Scheduled sequences" },
  { icon: Calendar, color: "text-[#22C55E]", name: "Auto Book", desc: "Calendar appointments" },
];

const REVENUE_MODES = [
  { name: "Upsell at checkout", desc: "Suggest higher-tier plans when intent is high" },
  { name: "Win-back inactive leads", desc: "Re-engage after 14 days of silence" },
  { name: "Discount on objection", desc: "Auto-trigger ≤15% discount on price objection" },
  { name: "Cross-channel handoff", desc: "Escalate stuck deals from chat → voice" },
];

const PIPELINE_STAGES = [
  { name: "New leads", default: "Round-robin" },
  { name: "Qualified", default: "Top closer" },
  { name: "Negotiation", default: "AI assist" },
];

const SAFETY_RULES = [
  "Block profanity in outbound messages",
  "Escalate when sentiment drops below 30%",
  "Pause AI after 3 consecutive failed replies",
  "Never quote prices below floor",
  "Require human approval for refunds",
  "Halt on regulated-industry keywords",
];

function Toggle({ on, onClick, size = "md" }: { on: boolean; onClick?: () => void; size?: "sm" | "md" }) {
  const w = size === "sm" ? "w-9 h-5" : "w-10 h-5";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${w} rounded-full flex-shrink-0 ${on ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"} relative transition-colors`}
    >
      <div className={`absolute top-0.5 ${on ? "right-0.5" : "left-0.5"} w-4 h-4 rounded-full bg-white transition-all`} />
    </button>
  );
}

function AutopilotPage() {
  const [tab, setTab] = useState("channels");
  const [masterOn, setMasterOn] = useState(false);
  const [channelOn, setChannelOn] = useState<Record<string, boolean>>({});
  const [featureOn, setFeatureOn] = useState<Record<string, boolean>>({});
  const [revOn, setRevOn] = useState<Record<number, boolean>>({});
  const [safetyOn, setSafetyOn] = useState<Record<number, boolean>>(() =>
    Object.fromEntries(SAFETY_RULES.map((_, i) => [i, i < 3]))
  );
  const [pipelineRules, setPipelineRules] = useState<Record<number, string>>(() =>
    Object.fromEntries(PIPELINE_STAGES.map((s, i) => [i, s.default]))
  );

  const toggleMaster = () => {
    const next = !masterOn;
    setMasterOn(next);
    toast(next ? "Autopilot enabled" : "Autopilot disabled");
  };

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center">
              <Zap size={22} className="text-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="text-white font-bold text-[22px] tracking-[-0.03em]">AI Autopilot</div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${
                  masterOn ? "bg-[#22C55E]/12 border-[#22C55E]/20 text-[#22C55E]" : "bg-[#F59E0B]/12 border-[#F59E0B]/20 text-amber-400"
                }`}>
                  {masterOn ? "Active" : "Standby"}
                </span>
              </div>
              <div className="text-[#4A4A6A] text-sm">Full AI automation — reply, qualify, follow-up, and close</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#4A4A6A]" />
              <span className="text-[#4A4A6A]">Status</span>
              <span className={masterOn ? "text-[#22C55E] font-medium" : "text-amber-400 font-medium"}>
                {masterOn ? "Active" : "Standby"}
              </span>
            </div>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">{Object.values(channelOn).filter(Boolean).length}/4 Channels</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">632 Conversations</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#22C55E]">79% Success</span>
          </div>
        </div>
        <button
          onClick={toggleMaster}
          className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 border ${
            masterOn ? "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]" : "border-[#1C1C34] bg-[#06060F] text-[#8B8FA8]"
          }`}
        >
          <span>{masterOn ? "ON" : "OFF"}</span>
          <div className={`w-16 h-8 rounded-full relative transition-colors ${masterOn ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`}>
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-[#0B0B1A] transition-all ${masterOn ? "right-1" : "left-1"}`} />
          </div>
        </button>
      </div>

      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 h-10 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id ? "text-white border-[#7B5CFC]" : "text-[#8B8FA8] border-transparent hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "channels" && (
        <div className="px-6 pb-8 grid grid-cols-2 gap-4">
          {CHANNELS.map((c) => {
            const I = c.icon;
            return (
              <div key={c.name} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden hover:border-[#7B5CFC]/20 transition-all">
                <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${c.bg}`}>
                      <I size={16} className={c.color} />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-[15px]">{c.name}</div>
                      <div className="text-[#4A4A6A] text-xs">{c.sub}</div>
                    </div>
                  </div>
                  <Toggle on={!!channelOn[c.name]} onClick={() => setChannelOn((s) => ({ ...s, [c.name]: !s[c.name] }))} />
                </div>
                <div className="px-5 py-3 border-b border-[#1C1C34] grid grid-cols-4 divide-x divide-[#1C1C34]">
                  {c.stats.map((s) => (
                    <div key={s.l} className="px-4 text-center">
                      <div className="text-white font-bold text-base">{s.v}</div>
                      <div className="text-[#4A4A6A] text-[10px] uppercase">{s.l}</div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 grid grid-cols-2 gap-3">
                  {FEATURES.map((f) => {
                    const FI = f.icon;
                    const key = `${c.name}-${f.name}`;
                    return (
                      <div key={f.name} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex justify-between items-start">
                        <div className="flex items-start gap-2.5">
                          <FI size={16} className={f.color} />
                          <div>
                            <div className="text-white text-sm font-medium">{f.name}</div>
                            <div className="text-[#4A4A6A] text-[11px] mt-1 leading-relaxed">{f.desc}</div>
                          </div>
                        </div>
                        <Toggle size="sm" on={!!featureOn[key]} onClick={() => setFeatureOn((s) => ({ ...s, [key]: !s[key] }))} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "revenue" && (
        <div className="px-6 pb-8 space-y-3">
          {REVENUE_MODES.map((m, i) => (
            <div key={i} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#22C55E]/15 flex items-center justify-center">
                <TrendingUp size={16} className="text-[#22C55E]" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">{m.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-0.5">{m.desc}</div>
              </div>
              <Toggle on={!!revOn[i]} onClick={() => setRevOn((s) => ({ ...s, [i]: !s[i] }))} />
            </div>
          ))}
        </div>
      )}

      {tab === "pipeline" && (
        <div className="px-6 pb-8 space-y-3">
          {PIPELINE_STAGES.map((s, i) => (
            <div key={i} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center text-[#9B84FF] text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">{s.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-0.5">Routing rule for this stage</div>
              </div>
              <select
                value={pipelineRules[i]}
                onChange={(e) => setPipelineRules((p) => ({ ...p, [i]: e.target.value }))}
                className="bg-[#06060F] border border-[#1C1C34] text-white text-xs rounded-lg px-3 h-9 focus:outline-none focus:border-[#7B5CFC]"
              >
                <option>Round-robin</option>
                <option>Top closer</option>
                <option>AI assist</option>
                <option>Manual review</option>
              </select>
            </div>
          ))}
        </div>
      )}

      {tab === "safety" && (
        <div className="px-6 pb-8 space-y-3">
          {SAFETY_RULES.map((r, i) => (
            <div key={i} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#FF4D6D]/15 flex items-center justify-center">
                <Shield size={16} className="text-[#FF4D6D]" />
              </div>
              <div className="flex-1 text-white text-sm">{r}</div>
              <Toggle on={!!safetyOn[i]} onClick={() => setSafetyOn((s) => ({ ...s, [i]: !s[i] }))} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
