import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DollarSign, Download, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export const Route = createFileRoute("/_dashboard/intelligence/revenue")({
  component: RevenuePage,
});

const METRICS = [
  { l: "Total Revenue", s: "AED 0.00", d: "+0.0%" },
  { l: "AI Revenue", s: "AED 0.00", d: "0% share" },
  { l: "Recurring", s: "AED 0.00", d: "NaN% of total" },
  { l: "Deals Closed", s: "0", d: "+24" },
  { l: "Conversion", s: "0%", d: "+0.8%" },
  { l: "Pipeline", s: "AED 0.00", d: "0 active" },
  { l: "Profit", s: "AED 0.00", d: "40% margin" },
];

const RANGES = ["7D", "30D", "90D", "1Y"];
const TABS = ["Overview", "Channels", "AI Agents", "Pipeline"];

const REVENUE_DATA = Array.from({ length: 30 }, (_, i) => ({
  d: `Day ${i + 1}`,
  rev: 0,
  ai: 0,
  profit: 0,
  target: 0,
}));

const HEALTH = [
  { l: "Growth", v: 0, c: "#FF4D6D" },
  { l: "Conversion", v: 0, c: "#FF4D6D" },
  { l: "AI Adoption", v: 0, c: "#FF4D6D" },
  { l: "Retention", v: 100, c: "#22C55E" },
];

function RevenuePage() {
  const [range, setRange] = useState("30D");
  const [tab, setTab] = useState("Overview");

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <DollarSign size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                Revenue Command Center
              </div>
              <span className="bg-[#1C1C34] text-[#4A4A6A] text-xs px-2 py-0.5 rounded-full">
                + 0.0% vs prev
              </span>
            </div>
            <div className="text-[#4A4A6A] text-sm">
              Real-time financial intelligence across all channels, agents, and AI-driven revenue streams
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#06060F] border border-[#1C1C34] rounded-lg p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 h-7 rounded-md text-xs font-medium transition-colors ${
                  range === r ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs font-medium flex items-center gap-2">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {METRICS.map((m) => (
            <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[160px]">
              <div className="text-[#4A4A6A] text-[10px] uppercase">{m.l}</div>
              <div className="text-white font-bold text-base mt-1">{m.s}</div>
              <div className="text-[#4A4A6A] text-[10px] mt-0.5">{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mb-5 flex gap-1 border-b border-[#1C1C34]">
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

      <div className="px-6 pb-8 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-[15px]">
              Revenue vs Target vs Profit
            </div>
            <div className="flex gap-4 mt-1 mb-4">
              {[
                ["Revenue", "#7B5CFC"],
                ["AI Revenue", "#22C55E"],
                ["Profit", "#00D4AA"],
                ["Target", "#FF4D6D"],
              ].map(([n, c]) => (
                <div key={n} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span className="text-[#8B8FA8] text-xs">{n}</span>
                </div>
              ))}
            </div>
            <div className="h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <CartesianGrid stroke="#1C1C34" />
                  <XAxis dataKey="d" stroke="#4A4A6A" tick={{ fontSize: 9 }} hide />
                  <Area dataKey="rev" stroke="#7B5CFC" fill="#7B5CFC" fillOpacity={0.2} />
                  <Area dataKey="ai" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} />
                  <Area dataKey="profit" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[#1C1C34] text-sm">
                  Connect channels and make sales to see revenue data
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm">Peak Revenue Hours</div>
            <div className="grid grid-cols-12 gap-1 mt-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="h-8 bg-[#06060F] border border-[#1C1C34] rounded text-[10px] text-[#4A4A6A] flex items-center justify-center"
                >
                  {i < 12 ? `${i || 12}A` : `${i - 12 || 12}P`}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center">
              <div className="text-white font-semibold text-sm">Revenue Health</div>
              <span className="bg-[#FF4D6D]/12 text-[#FF4D6D] text-[10px] px-2 py-0.5 rounded-full ml-auto">
                Needs Attention
              </span>
            </div>
            <div className="relative w-[100px] h-[100px] mx-auto mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{ value: 20 }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="value" fill="#F59E0B" background={{ fill: "#1C1C34" }} cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-[22px]">20</span>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {HEALTH.map((h) => (
                <div key={h.l} className="flex justify-between items-center">
                  <span className="text-[#8B8FA8] text-xs">{h.l}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 bg-[#1C1C34] rounded">
                      <div className="h-full rounded" style={{ width: `${h.v}%`, background: h.c }} />
                    </div>
                    <span className="text-white text-xs">{h.v}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00D4AA]/10 to-[#0B0B1A] border border-[#00D4AA]/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-[#00D4AA]" />
              <span className="text-white text-sm font-semibold uppercase tracking-[0.06em]">
                AI Revenue Engine
              </span>
            </div>
            <div className="text-[#00D4AA] font-extrabold text-[28px] tracking-[-0.04em]">
              AED 0.00
            </div>
            <div className="text-[#4A4A6A] text-xs mt-1 mb-4">
              0% of total · this month
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ["142", "Auto-qualified"],
                ["38", "AI-closed"],
                ["284", "Follow-ups"],
                ["56", "Bookings"],
              ].map(([v, l]) => (
                <div key={l} className="bg-[#06060F] rounded-lg p-3">
                  <div className="text-white font-bold text-lg">{v}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Revenue Split</div>
            <div className="relative h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ value: 1 }]} dataKey="value" innerRadius={30} outerRadius={48} stroke="none">
                    <Cell fill="#1C1C34" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#4A4A6A] text-sm">AED 0</span>
              </div>
            </div>
            <div className="text-[#4A4A6A] text-xs text-center mt-3">
              No revenue data yet. Connect channels and make sales.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
