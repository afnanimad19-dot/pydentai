import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar,
  Camera,
  Clock,
  Mail,
  MessageCircle,
  Phone,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/intelligence/autopilot")({
  component: AutopilotPage,
});

const TABS = ["Channels (4)", "Revenue Mode", "AI Pipeline", "Safety & Rules (6)"];

const CHANNELS = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "text-[#22C55E]",
    bg: "bg-[#22C55E]/15",
    sub: "342 conversations · 87% success",
    stats: [
      { v: "1.8s", l: "Response" },
      { v: "89", l: "Leads" },
      { v: "82%", l: "Sentiment" },
      { v: "87%", l: "Success" },
    ],
  },
  {
    name: "Instagram",
    icon: Camera,
    color: "text-pink-400",
    bg: "bg-pink-500/15",
    sub: "156 conversations · 72% success",
    stats: [
      { v: "2.4s", l: "Response" },
      { v: "34", l: "Leads" },
      { v: "76%", l: "Sentiment" },
      { v: "72%", l: "Success" },
    ],
  },
  {
    name: "Email",
    icon: Mail,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
    sub: "89 conversations · 65% success",
    stats: [
      { v: "3.1s", l: "Response" },
      { v: "21", l: "Leads" },
      { v: "71%", l: "Sentiment" },
      { v: "65%", l: "Success" },
    ],
  },
  {
    name: "Voice Calls",
    icon: Phone,
    color: "text-[#00D4AA]",
    bg: "bg-[#00D4AA]/15",
    sub: "45 conversations · 91% success",
    stats: [
      { v: "0.8s", l: "Response" },
      { v: "18", l: "Leads" },
      { v: "88%", l: "Sentiment" },
      { v: "91%", l: "Success" },
    ],
  },
];

const FEATURES = [
  { icon: Zap, color: "text-[#F59E0B]", name: "Auto Reply", desc: "Smart automated responses" },
  { icon: Target, color: "text-[#7B5CFC]", name: "Auto Qualify", desc: "Lead scoring & qualification" },
  { icon: Clock, color: "text-blue-400", name: "Auto Follow-Up", desc: "Scheduled sequences" },
  { icon: Calendar, color: "text-[#22C55E]", name: "Auto Book", desc: "Calendar appointments" },
];

function Toggle({ on = false, size = "md" }: { on?: boolean; size?: "sm" | "md" }) {
  const w = size === "sm" ? "w-9 h-5" : "w-10 h-5";
  return (
    <div className={`${w} rounded-full flex-shrink-0 ${on ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"} relative transition-colors`}>
      <div className={`absolute top-0.5 ${on ? "right-0.5" : "left-0.5"} w-4 h-4 rounded-full bg-white transition-all`} />
    </div>
  );
}

function AutopilotPage() {
  const [tab, setTab] = useState(TABS[0]);

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
                <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                  AI Autopilot
                </div>
                <span className="bg-[#F59E0B]/12 border border-[#F59E0B]/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium">
                  Standby
                </span>
              </div>
              <div className="text-[#4A4A6A] text-sm">
                Full AI automation — reply, qualify, follow-up, and close
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#4A4A6A]" />
              <span className="text-[#4A4A6A]">Status</span>
              <span className="text-amber-400 font-medium">Standby</span>
            </div>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">0/4 Channels</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">632 Conversations</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#22C55E]">79% Success</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">162 Leads</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#00D4AA]">79% Sentiment</span>
          </div>
        </div>
        <div className="bg-[#06060F] border border-[#1C1C34] text-[#8B8FA8] px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
          <span>OFF</span>
          <div className="w-16 h-8 rounded-full bg-[#1C1C34] relative">
            <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[#0B0B1A]" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 h-10 text-sm font-medium border-b-2 transition-colors ${
              tab === t
                ? "text-white border-[#7B5CFC]"
                : "text-[#8B8FA8] border-transparent hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Channels grid */}
      <div className="px-6 pb-8 grid grid-cols-2 gap-4">
        {CHANNELS.map((c) => {
          const I = c.icon;
          return (
            <div
              key={c.name}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden hover:border-[#7B5CFC]/20 transition-all"
            >
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
                <Toggle />
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
                  return (
                    <div key={f.name} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 flex justify-between items-start">
                      <div className="flex items-start gap-2.5">
                        <FI size={16} className={f.color} />
                        <div>
                          <div className="text-white text-sm font-medium">{f.name}</div>
                          <div className="text-[#4A4A6A] text-[11px] mt-1 leading-relaxed">{f.desc}</div>
                        </div>
                      </div>
                      <Toggle size="sm" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
