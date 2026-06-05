import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  DollarSign,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/_dashboard/intelligence/deal-closer")({
  component: DealCloserPage,
});

const STATS = [
  { icon: TrendingUp, color: "#22C55E", value: "0", label: "Active Deals" },
  { icon: Target, color: "#F59E0B", value: "0%", label: "Close Rate" },
  { icon: Clock, color: "#3B82F6", value: "0", label: "Avg Days to Close" },
  { icon: DollarSign, color: "#00D4AA", value: "AED 0", label: "Pipeline Value" },
];

const STAGES = [
  { label: "Leads", color: "#7B5CFC", h: 100 },
  { label: "Contacted", color: "#00D4AA", h: 70 },
  { label: "Qualified", color: "#F59E0B", h: 45 },
  { label: "Proposal", color: "#3B82F6", h: 25 },
  { label: "Closed", color: "#22C55E", h: 15 },
];

const TIPS = [
  { icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-500/15", t: "Follow up within 2 hours", d: "Leads that receive follow-up within 2h close 7x more often." },
  { icon: Target, color: "text-[#22C55E]", bg: "bg-[#22C55E]/15", t: "Personalize your opener", d: "Use the patient's name and reference their specific dental concern." },
  { icon: Zap, color: "text-[#7B5CFC]", bg: "bg-[#7B5CFC]/15", t: "Send pricing early", d: "Patients who receive pricing in message 1 convert at 34% higher rates." },
];

function DealCloserPage() {
  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <TrendingUp size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Deal Closer
            </div>
            <div className="text-[#4A4A6A] text-sm">
              AI-powered deal acceleration · Identify hot leads · Close faster
            </div>
          </div>
        </div>
        <button className="h-10 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
          <Sparkles size={14} /> Run Deal Analysis
        </button>
      </div>

      <div className="px-6 mb-6 grid grid-cols-4 gap-4">
        {STATS.map((s) => {
          const I = s.icon;
          return (
            <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-5">
              <I size={16} style={{ color: s.color }} />
              <div className="text-white font-bold text-xl mt-2">{s.value}</div>
              <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="px-6 pb-8 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold text-[15px]">Deal Pipeline</div>
              <div className="text-[#4A4A6A] text-xs">This month</div>
            </div>
            <div className="flex items-end gap-2 mt-5 h-[160px]">
              {STAGES.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full rounded-t-lg"
                    style={{ background: s.color, height: `${s.h}%` }}
                  />
                  <div className="text-white text-sm font-semibold">0</div>
                  <div className="text-[#4A4A6A] text-[10px] uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="flex justify-between px-5 py-3.5 border-b border-[#1C1C34] items-center">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-sm">Hot Leads</span>
                <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">
                  Score 70+
                </span>
              </div>
              <button className="text-[#7B5CFC] text-xs">View All →</button>
            </div>
            <div className="grid grid-cols-6 px-5 h-10 items-center text-[#4A4A6A] text-[10px] uppercase tracking-wider bg-[#06060F]">
              <span>Patient</span>
              <span>Score</span>
              <span>Intent</span>
              <span>Last Contact</span>
              <span>Channel</span>
              <span>Action</span>
            </div>
            <div className="py-12 text-center flex flex-col items-center gap-2">
              <TrendingUp size={32} className="text-[#1C1C34]" />
              <div className="text-white text-sm font-medium">No hot leads yet</div>
              <div className="text-[#4A4A6A] text-xs">Leads with 70+ AI score will appear here</div>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
                <Sparkles size={16} className="text-[#7B5CFC]" />
              </div>
              <div className="text-white font-semibold text-sm">AI Closer Assistant</div>
            </div>
            <div className="space-y-3">
              {TIPS.map((tip, i) => {
                const I = tip.icon;
                return (
                  <div key={i} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${tip.bg}`}>
                        <I size={12} className={tip.color} />
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">{tip.t}</div>
                        <div className="text-[#4A4A6A] text-[11px] mt-1">{tip.d}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-[#4A4A6A] text-xs uppercase mb-4">Avg Close Probability</div>
            <div className="relative w-[160px] h-[160px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[{ value: 0 }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" fill="#7B5CFC" background={{ fill: "#1C1C34" }} cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white font-bold text-[32px]">0%</div>
                <div className="text-[#4A4A6A] text-[11px]">close rate</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { v: "0", l: "Won" },
                { v: "0", l: "Lost" },
                { v: "0%", l: "Rate" },
              ].map((s) => (
                <div key={s.l} className="bg-[#06060F] rounded-lg p-3 text-center">
                  <div className="text-white font-bold text-lg">{s.v}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
