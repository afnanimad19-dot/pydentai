import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  BarChart,
  BarChart3,
  BrainCircuit,
  Filter,
  Heart,
  Lightbulb,
  MessageSquare,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export const Route = createFileRoute("/_dashboard/intelligence/insights")({
  component: InsightsPage,
});

const METRICS = [
  { l: "Total Leads", v: "1,247", d: "+89", c: "#22C55E" },
  { l: "Conversion", v: "12.4%", d: "-3.2%", c: "#FF4D6D" },
  { l: "Pipeline", v: "AED 198.0K", d: "+24K", c: "#22C55E" },
  { l: "Calls Made", v: "456", d: "+32", c: "#22C55E" },
  { l: "Answer Rate", v: "78%", d: "+3.1%", c: "#22C55E" },
  { l: "Avg Response", v: "2.3m", d: "-18s", c: "#22C55E" },
  { l: "WA Messages", v: "2,341", d: "+156", c: "#22C55E" },
  { l: "Qualified", v: "234", d: "+18", c: "#22C55E" },
  { l: "AI Actions", v: "89", d: "+12", c: "#22C55E" },
  { l: "Engagement", v: "91%", d: "+6.3%", c: "#22C55E" },
];

const MODULES = [
  { icon: TrendingUp, color: "text-[#7B5CFC]", name: "Conversion Analysis", desc: "Why rates change" },
  { icon: Filter, color: "text-[#00D4AA]", name: "Funnel Diagnostics", desc: "Drop-off points" },
  { icon: Lightbulb, color: "text-[#F59E0B]", name: "Smart Recs", desc: "Impact-ranked" },
  { icon: AlertTriangle, color: "text-[#FF4D6D]", name: "Risk Alerts", desc: "Proactive warnings" },
  { icon: MessageSquare, color: "text-[#22C55E]", name: "Best Messages", desc: "Top performers" },
  { icon: BarChart, color: "text-blue-400", name: "Predictions", desc: "Forecast trends" },
  { icon: Shield, color: "text-[#9B84FF]", name: "Advantages", desc: "Competitive edge" },
  { icon: Heart, color: "text-[#00D4AA]", name: "Health Score", desc: "Business vitals" },
];

const TREND = [
  { d: "Mon", vol: 40, conv: 10, q: 5 },
  { d: "Tue", vol: 55, conv: 22, q: 8 },
  { d: "Wed", vol: 70, conv: 40, q: 10 },
  { d: "Thu", vol: 85, conv: 68, q: 14 },
  { d: "Fri", vol: 92, conv: 72, q: 16 },
  { d: "Sat", vol: 60, conv: 35, q: 10 },
  { d: "Sun", vol: 35, conv: 15, q: 6 },
];

const RADAR = [
  { axis: "Lead Quality", v: 30 },
  { axis: "Response Speed", v: 22 },
  { axis: "Conversion", v: 28 },
  { axis: "Retention", v: 35 },
  { axis: "Engagement", v: 25 },
  { axis: "Satisfaction", v: 30 },
];

const CHANNELS = [
  { name: "WhatsApp", value: 45, color: "#7B5CFC" },
  { name: "Phone", value: 28, color: "#00D4AA" },
  { name: "Instagram", value: 15, color: "#F59E0B" },
  { name: "Email", value: 12, color: "#3B82F6" },
];

function InsightsPage() {
  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center">
              <BarChart3 size={22} className="text-[#3B82F6]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
                  AI Insights Dashboard
                </div>
                <span className="bg-blue-500/12 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                  Intelligence Engine
                </span>
              </div>
              <div className="text-[#4A4A6A] text-sm">
                Conversion drivers · Funnel diagnostics · Predictive intelligence · Risk alerts · Channel analytics
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-sm">
            <span className="text-[#4A4A6A]">Engine</span>
            <span className="text-amber-400 font-medium">Standby</span>
            <div className="w-px h-4 bg-[#1C1C34] mx-2" />
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-0.5 rounded-full">
              Live Data
            </span>
          </div>
        </div>
        <button className="h-10 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2 transition-colors">
          <Sparkles size={14} /> Generate AI Report
        </button>
      </div>

      <div className="px-6 mb-5 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {METRICS.map((m) => (
            <div
              key={m.l}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[140px]"
            >
              <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{m.l}</div>
              <div className="text-white font-bold text-lg mt-1">{m.v}</div>
              <div className="text-[11px] mt-0.5" style={{ color: m.c }}>{m.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 grid grid-cols-12 gap-5">
        <div className="col-span-7">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="flex flex-col items-center text-center py-6">
              <BrainCircuit size={56} className="text-[#7B5CFC]/40 mb-4" />
              <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">
                AI-Powered Business Intelligence
              </div>
              <div className="text-[#4A4A6A] text-sm max-w-md leading-relaxed mb-6">
                Generate a comprehensive AI report analyzing your conversion drivers, funnel bottlenecks, top-performing messages, predictive trends, and risk alerts — all powered by advanced analytics.
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mb-6">
                {MODULES.map((m) => {
                  const I = m.icon;
                  return (
                    <div
                      key={m.name}
                      className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-[#7B5CFC]/30 transition-all"
                    >
                      <I size={14} className={m.color} />
                      <div className="text-left">
                        <div className="text-white text-xs font-semibold">{m.name}</div>
                        <div className="text-[#4A4A6A] text-[10px]">{m.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="w-full h-11 bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center justify-center gap-2 rounded-lg transition-colors">
                <Sparkles size={16} /> Generate Intelligence Report
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2">
              <div className="text-white font-semibold text-sm">Weekly Performance Trends</div>
              <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full ml-auto">Live</span>
            </div>
            <div className="h-[160px] mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TREND}>
                  <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                  <XAxis dataKey="d" stroke="#4A4A6A" tick={{ fontSize: 10 }} />
                  <Bar dataKey="vol" fill="#1C1C34" />
                  <Line dataKey="conv" stroke="#7B5CFC" strokeWidth={2} dot={false} />
                  <Line dataKey="q" stroke="#22C55E" strokeWidth={1.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-3">Performance Radar</div>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR}>
                  <PolarGrid stroke="#1C1C34" />
                  <PolarAngleAxis dataKey="axis" tick={{ fill: "#4A4A6A", fontSize: 9 }} />
                  <Radar dataKey="v" stroke="#7B5CFC" fill="#7B5CFC" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-3">Channel Distribution</div>
            <div className="flex items-center gap-5">
              <div className="w-[100px] h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CHANNELS} dataKey="value" innerRadius={28} outerRadius={44} stroke="none">
                      {CHANNELS.map((c, i) => (
                        <Cell key={i} fill={c.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {CHANNELS.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-[#8B8FA8] text-xs">{c.name}</span>
                    <span className="text-white text-xs font-semibold ml-auto">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
