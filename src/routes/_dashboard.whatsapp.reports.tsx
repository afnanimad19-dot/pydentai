import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, RefreshCw, MessageSquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis as PA,
  Tooltip,
} from "recharts";

export const Route = createFileRoute("/_dashboard/whatsapp/reports")({
  component: Reports,
});

const METRICS = [
  { label: "Contacts", value: "0" },
  { label: "Total Msgs", value: "0" },
  { label: "Sent", value: "0" },
  { label: "Received", value: "0" },
  { label: "Delivered", value: "0", sub: "+0%" },
  { label: "Read Rate", value: "0.0%" },
  { label: "Reply Rate", value: "0.0%" },
  { label: "Resp Time", value: "0m" },
  { label: "Bounce", value: "0.0%" },
  { label: "Campaigns", value: "0" },
];

const TABS = ["Overview", "Delivery Funnel", "Engagement", "Campaigns", "AI Intelligence", "Data Table"];

const TREND_DATA = [
  { week: "Week 1", sent: 0, delivered: 0, read: 0, replied: 0 },
  { week: "Week 2", sent: 0, delivered: 0, read: 0, replied: 0 },
  { week: "Week 3", sent: 0, delivered: 0, read: 0, replied: 0 },
  { week: "Week 4", sent: 0, delivered: 0, read: 0, replied: 0 },
];

const DAILY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({ day: d, messages: 0, responses: 0 }));

const RADAR = [
  { axis: "Delivery", v: 0 },
  { axis: "Open Rate", v: 0 },
  { axis: "Volume", v: 0 },
  { axis: "Speed", v: 0 },
  { axis: "Growth", v: 0 },
  { axis: "Reply", v: 0 },
];

const BOTTOM = [
  { l: "Avg Sent/Day", v: "0" },
  { l: "Avg Received/Day", v: "0" },
  { l: "Read:Sent", v: "0%", c: "text-[#F59E0B]" },
  { l: "Response Rate", v: "0%", c: "text-[#F59E0B]" },
  { l: "New Contacts/Day", v: "0.0" },
  { l: "Campaign Success", v: "—", c: "text-[#FF4D6D]" },
];

function Reports() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
            <BarChart3 size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Reports</h1>
            <p className="text-[#4A4A6A] text-sm">Real-time delivery funnel · Engagement analytics · Campaign intelligence · AI insights</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-[#22C55E] text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" /> Live
              </span>
              <span className="text-[#4A4A6A] text-xs">0 msgs</span>
              <span className="text-[#4A4A6A] text-xs">0 contacts</span>
              <span className="text-[#4A4A6A] text-xs">Score: 0</span>
              <span className="text-[#4A4A6A] text-xs">May 3 – Jun 2</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Export</button>
        </div>
      </div>

      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[110px]">
              <div className="text-[#4A4A6A] text-[10px] uppercase">{m.label}</div>
              <div className="text-white font-bold text-lg mt-1">{m.value}</div>
              {m.sub && <div className="text-[#22C55E] text-[10px]">{m.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-5">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={
              i === 0
                ? "text-white border-b-2 border-[#22C55E] px-4 py-2.5 text-sm font-medium -mb-px"
                : "text-[#8B8FA8] hover:text-white px-4 py-2.5 text-sm"
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-6 pb-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white font-semibold text-sm">Message Activity Trend</div>
              <div className="flex gap-3 text-xs">
                {[
                  { l: "Sent", c: "bg-[#7B5CFC]" },
                  { l: "Delivered", c: "bg-[#22C55E]" },
                  { l: "Read", c: "bg-[#3B82F6]" },
                  { l: "Replied", c: "bg-[#00D4AA]" },
                ].map((leg) => (
                  <span key={leg.l} className="flex items-center gap-1 text-[#8B8FA8]">
                    <span className={`w-2 h-2 rounded-full ${leg.c}`} /> {leg.l}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={TREND_DATA}>
                <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#4A4A6A" fontSize={11} />
                <YAxis stroke="#4A4A6A" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34", borderRadius: 8 }} />
                <Line dataKey="sent" stroke="#7B5CFC" strokeWidth={2} dot={false} />
                <Line dataKey="delivered" stroke="#22C55E" strokeWidth={2} dot={false} />
                <Line dataKey="read" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line dataKey="replied" stroke="#00D4AA" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-3">Daily Message Activity</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={DAILY}>
                  <XAxis dataKey="day" stroke="#4A4A6A" fontSize={10} />
                  <Bar dataKey="messages" fill="#22C55E" />
                  <Bar dataKey="responses" fill="#7B5CFC" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-3">Message Flow</div>
              <div className="flex flex-col items-center justify-center h-[120px]">
                <MessageSquare size={32} className="text-[#1C1C34] mb-2" />
                <div className="text-[#4A4A6A] text-xs">No messages yet</div>
              </div>
            </div>
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="text-white font-semibold text-sm mb-3">Peak Hours</div>
              <div className="flex justify-between text-[#4A4A6A] text-[9px] mb-2">
                {[0, 4, 8, 12, 16, 20, 22].map((h) => <span key={h}>{h}h</span>)}
              </div>
              <div className="h-8 bg-[#06060F] rounded" />
              <div className="text-[#4A4A6A] text-[10px] mt-3">9AM-5PM PEAK WINDOW</div>
              <div className="text-[#4A4A6A] text-[10px]">0 AVG/DAY · N/A IN/OUT RATIO</div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3">
            {BOTTOM.map((b) => (
              <div key={b.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
                <div className={`text-lg font-bold ${b.c ?? "text-white"}`}>{b.v}</div>
                <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">{b.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold text-sm">Channel Health Score</div>
              <span className="bg-[#FF4D6D]/12 text-[#FF4D6D] text-[10px] px-2 py-0.5 rounded-full">NEEDS WORK</span>
            </div>
            <div className="relative w-[100px] h-[100px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: 100 }]} startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar dataKey="v" fill="#FF4D6D" />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white font-bold text-2xl">0</div>
                <div className="text-[#FF4D6D] text-[10px]">NEEDS WORK</div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {["Delivery", "Open Rate", "Reply Rate", "Growth"].map((l) => (
                <div key={l} className="flex justify-between">
                  <span className="text-[#8B8FA8] text-xs">{l}</span>
                  <span className="text-white text-xs font-medium">0%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-3">Performance Radar</div>
            <ResponsiveContainer width="100%" height={140}>
              <RadarChart data={RADAR}>
                <PolarGrid stroke="#1C1C34" />
                <PA dataKey="axis" stroke="#4A4A6A" fontSize={10} />
                <Radar dataKey="v" stroke="#7B5CFC" fill="#7B5CFC" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
