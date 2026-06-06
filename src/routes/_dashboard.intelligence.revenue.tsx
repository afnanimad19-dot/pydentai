import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DollarSign, Download, Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
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

const RANGES: { id: string; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "1y", label: "1Y" },
];

const TABS = [
  { id: "channels", label: "Channel Overview" },
  { id: "ai", label: "Channel AI Agent" },
  { id: "pipeline", label: "Pipeline" },
];

const PERIOD_DATA: Record<string, number[]> = {
  "7d": [12, 18, 14, 22, 19, 25, 21],
  "30d": [45, 52, 48, 61, 58, 72, 65, 70, 68, 75, 80, 77],
  "90d": [180, 195, 210, 225, 240, 255, 270, 285, 300, 315],
  "1y": [890, 920, 950, 980, 1010, 1040, 1070, 1100, 1130, 1160, 1190, 1220],
};

const CHANNEL_REV = [
  { name: "WhatsApp", value: 42, color: "#22C55E" },
  { name: "Voice", value: 28, color: "#00D4AA" },
  { name: "SMS", value: 16, color: "#F59E0B" },
  { name: "Email", value: 14, color: "#3B82F6" },
];

const AI_AGENTS = [
  { name: "Sales Closer", conv: 34, rev: "AED 48K" },
  { name: "Support Agent", conv: 22, rev: "AED 12K" },
  { name: "Booking Bot", conv: 41, rev: "AED 31K" },
  { name: "Follow-up Engine", conv: 18, rev: "AED 22K" },
];

const FUNNEL = [
  { stage: "Leads", value: 1247, pct: 100, color: "#7B5CFC" },
  { stage: "Contacted", value: 892, pct: 71, color: "#00D4AA" },
  { stage: "Qualified", value: 412, pct: 33, color: "#F59E0B" },
  { stage: "Closed", value: 156, pct: 12, color: "#22C55E" },
];

const HEALTH = [
  { l: "Growth", v: 0, c: "#FF4D6D" },
  { l: "Conversion", v: 0, c: "#FF4D6D" },
  { l: "AI Adoption", v: 0, c: "#FF4D6D" },
  { l: "Retention", v: 100, c: "#22C55E" },
];

function RevenuePage() {
  const [period, setPeriod] = useState("30d");
  const [tab, setTab] = useState("channels");

  const chartData = useMemo(
    () => PERIOD_DATA[period].map((v, i) => ({ d: `${i + 1}`, rev: v })),
    [period]
  );

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <DollarSign size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">Revenue Command Center</div>
              <span className="bg-[#1C1C34] text-[#4A4A6A] text-xs px-2 py-0.5 rounded-full">+ 0.0% vs prev</span>
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
                key={r.id}
                onClick={() => setPeriod(r.id)}
                className={`px-3 h-7 rounded-md text-xs font-medium transition-colors ${
                  period === r.id ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8]"
                }`}
              >
                {r.label}
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

      <div className="px-6 pb-8 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-[15px]">Revenue Trend</div>
            <div className="flex gap-4 mt-1 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#7B5CFC]" />
                <span className="text-[#8B8FA8] text-xs">Revenue · {RANGES.find((r) => r.id === period)?.label}</span>
              </div>
            </div>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid stroke="#1C1C34" />
                  <XAxis dataKey="d" stroke="#4A4A6A" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#4A4A6A" tick={{ fontSize: 9 }} />
                  <Area
                    dataKey="rev"
                    stroke="#7B5CFC"
                    fill="#7B5CFC"
                    fillOpacity={0.25}
                    isAnimationActive
                    animationDuration={600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {tab === "channels" && (
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-4">Revenue by Channel</div>
              <div className="space-y-3">
                {CHANNEL_REV.map((c) => (
                  <div key={c.name}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-white font-medium">{c.name}</span>
                      <span className="text-[#8B8FA8]">{c.value}%</span>
                    </div>
                    <div className="h-2.5 bg-[#1C1C34] rounded">
                      <div className="h-full rounded transition-all duration-500" style={{ width: `${c.value}%`, background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "ai" && (
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-4">AI Agent Contribution</div>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={AI_AGENTS}>
                    <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#4A4A6A" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#4A4A6A" tick={{ fontSize: 10 }} />
                    <Bar dataKey="conv" fill="#7B5CFC" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {AI_AGENTS.map((a) => (
                  <div key={a.name} className="bg-[#06060F] rounded-lg p-3 text-center">
                    <div className="text-white font-bold text-sm">{a.rev}</div>
                    <div className="text-[#4A4A6A] text-[10px] mt-0.5">{a.name}</div>
                    <div className="text-[#22C55E] text-[10px] mt-0.5">{a.conv}% conv</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "pipeline" && (
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-4">Pipeline Funnel</div>
              <div className="space-y-3">
                {FUNNEL.map((f) => (
                  <div key={f.stage} className="flex items-center gap-3">
                    <div className="w-24 text-[#8B8FA8] text-xs">{f.stage}</div>
                    <div className="flex-1 h-8 bg-[#1C1C34] rounded relative overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-500 flex items-center px-3 text-white text-xs font-semibold"
                        style={{ width: `${f.pct}%`, background: f.color }}
                      >
                        {f.value}
                      </div>
                    </div>
                    <div className="w-12 text-right text-[#8B8FA8] text-xs">{f.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center">
              <div className="text-white font-semibold text-sm">Revenue Health</div>
              <span className="bg-[#FF4D6D]/12 text-[#FF4D6D] text-[10px] px-2 py-0.5 rounded-full ml-auto">Needs Attention</span>
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
              <span className="text-white text-sm font-semibold uppercase tracking-[0.06em]">AI Revenue Engine</span>
            </div>
            <div className="text-[#00D4AA] font-extrabold text-[28px] tracking-[-0.04em]">AED 0.00</div>
            <div className="text-[#4A4A6A] text-xs mt-1 mb-4">0% of total · this month</div>
            <div className="grid grid-cols-2 gap-3">
              {[["142", "Auto-qualified"], ["38", "AI-closed"], ["284", "Follow-ups"], ["56", "Bookings"]].map(([v, l]) => (
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
                  <Pie data={CHANNEL_REV} dataKey="value" innerRadius={30} outerRadius={48} stroke="none">
                    {CHANNEL_REV.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
