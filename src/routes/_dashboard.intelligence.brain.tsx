import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  BrainCircuit,
  CheckCircle,
  Clock,
  Cpu,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/intelligence/brain")({
  component: BrainPage,
});

const STATS = [
  { icon: TrendingUp, color: "#7B5CFC", value: "0", label: "Predictions Generated" },
  { icon: Target, color: "#00D4AA", value: "0%", label: "Confidence Average" },
  { icon: Zap, color: "#F59E0B", value: "0", label: "Pending Actions" },
  { icon: CheckCircle, color: "#22C55E", value: "0%", label: "Success Rate" },
  { icon: Activity, color: "#3B82F6", value: "0", label: "Operations Total" },
  { icon: Cpu, color: "#FF4D6D", value: "0", label: "Tokens Used" },
];

const TABS = ["Predictions", "Recommendations", "Channels", "Activity"];

function BrainPage() {
  const [tab, setTab] = useState("Predictions");

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
              <BrainCircuit size={22} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                AI Brain
              </div>
              <div className="text-[#4A4A6A] text-sm">
                Predictive intelligence · Cross-channel analytics · Smart recommendations
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#22C55E]" />
              <span className="text-[#4A4A6A]">Status</span>
              <span className="text-[#22C55E] font-medium">Active</span>
            </div>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">0 Predictions</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">0% Confidence</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">0 Actions</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#22C55E] text-xs">Live</span>
          </div>
          <button className="h-10 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
            <Sparkles size={14} /> Run AI Analysis
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {STATS.map((s) => {
          const I = s.icon;
          return (
            <div
              key={s.label}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4"
            >
              <I size={16} style={{ color: s.color }} />
              <div className="text-white font-bold text-xl mt-2">{s.value}</div>
              <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-6">
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

      <div className="px-6 pb-8">
        {tab === "Predictions" && (
          <>
            <div className="flex items-center gap-2 mb-5">
              <BrainCircuit size={16} className="text-[#7B5CFC]" />
              <span className="text-white font-semibold text-[15px]">
                AI Predictions
              </span>
            </div>
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center px-6">
              <div className="w-[72px] h-[72px] rounded-2xl bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 flex items-center justify-center mb-6">
                <BrainCircuit size={36} className="text-[#7B5CFC]/50" />
              </div>
              <div className="text-white text-lg font-semibold mb-2">
                No predictions yet
              </div>
              <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">
                Run AI analysis to generate intelligent forecasts and insights.
              </div>
              <button className="h-11 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
                <Sparkles size={16} /> Run AI Analysis
              </button>
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-[#1C1C34] w-full justify-center">
                {[
                  "Connect channels & agents",
                  "Run AI analysis",
                  "Get predictions & recommendations",
                ].map((label, i) => (
                  <div key={i} className="flex items-center gap-8">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="w-8 h-8 rounded-full bg-[#7B5CFC]/15 text-[#7B5CFC] font-bold text-sm flex items-center justify-center">
                        {i + 1}
                      </div>
                      <div className="text-[#4A4A6A] text-xs max-w-[100px] leading-relaxed">
                        {label}
                      </div>
                    </div>
                    {i < 2 && <span className="text-[#1C1C34] text-lg">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "Recommendations" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center mb-6">
              <Lightbulb size={36} className="text-[#F59E0B]/60" />
            </div>
            <div className="text-white text-lg font-semibold mb-2">
              No recommendations yet
            </div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">
              AI-powered recommendations will appear here after analysis.
            </div>
            <button className="h-11 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
              <Sparkles size={16} /> Run AI Analysis
            </button>
          </div>
        )}

        {tab === "Channels" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="grid grid-cols-6 px-5 h-11 items-center text-[#4A4A6A] text-[10px] uppercase tracking-wider border-b border-[#1C1C34] bg-[#06060F]">
              <span>Channel</span>
              <span>Conversations</span>
              <span>Sentiment</span>
              <span>Leads</span>
              <span>Success Rate</span>
              <span>Status</span>
            </div>
            {["WhatsApp", "Instagram", "Email", "SMS", "Voice"].map((c) => (
              <div
                key={c}
                className="grid grid-cols-6 px-5 h-14 items-center text-sm border-b border-[#1C1C34] last:border-0"
              >
                <span className="text-white font-medium">{c}</span>
                <span className="text-[#4A4A6A]">—</span>
                <span className="text-[#4A4A6A]">—</span>
                <span className="text-[#4A4A6A]">—</span>
                <span className="text-[#4A4A6A]">—</span>
                <span>
                  <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">
                    Not configured
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "Activity" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] rounded-2xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center mb-6">
              <Clock size={36} className="text-[#3B82F6]/60" />
            </div>
            <div className="text-white text-lg font-semibold mb-2">
              No activity yet
            </div>
            <div className="text-[#4A4A6A] text-sm">
              Recent AI operations will appear here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
