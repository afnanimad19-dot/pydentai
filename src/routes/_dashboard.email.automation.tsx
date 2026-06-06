import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, BarChart, CheckCircle, Clock, Eye, FileText, GitBranch,
  Mail, MousePointer, RefreshCw, Send, Settings, TrendingUp, Truck, Zap,
} from "lucide-react";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/_dashboard/email/automation")({ component: EmailAutomation });

const METRICS = [
  { icon: Send, c: "text-[#00D4AA]", v: "0", l: "Total Sent" },
  { icon: CheckCircle, c: "text-[#22C55E]", v: "0", l: "Delivered" },
  { icon: Eye, c: "text-[#3B82F6]", v: "0", l: "Opened" },
  { icon: MousePointer, c: "text-[#F59E0B]", v: "0", l: "Clicked" },
  { icon: TrendingUp, c: "text-[#7B5CFC]", v: "0%", l: "Open Rate" },
  { icon: BarChart, c: "text-[#F97316]", v: "0%", l: "Click Rate" },
  { icon: Truck, c: "text-[#00D4AA]", v: "0.0%", l: "Delivery" },
  { icon: AlertTriangle, c: "text-[#FF4D6D]", v: "0.0%", l: "Bounce" },
];

const CHART = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date(2026, 4, 24 + i);
  return { d: `${d.toLocaleString("en-US", { month: "short" })} ${d.getDate()}`, sent: 0, opened: 0, clicked: 0 };
});

const STATUSES = [
  { icon: Clock, c: "text-[#F59E0B]", l: "Pending" },
  { icon: Send, c: "text-[#00D4AA]", l: "Sent" },
  { icon: CheckCircle, c: "text-[#22C55E]", l: "Delivered" },
  { icon: Eye, c: "text-[#3B82F6]", l: "Opened" },
  { icon: MousePointer, c: "text-[#7B5CFC]", l: "Clicked" },
];

const QUICK = [
  { icon: FileText, c: "text-[#3B82F6]", l: "Create Template" },
  { icon: GitBranch, c: "text-[#00D4AA]", l: "New Sequence" },
  { icon: BarChart, c: "text-[#F59E0B]", l: "View Analytics" },
  { icon: Settings, c: "text-[#8B8FA8]", l: "Configure Settings" },
];

function EmailAutomation() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
            <Zap size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Automation</h1>
              {["0 Templates", "0 Sequences", "0 Active"].map((b) => (
                <span key={b} className="bg-[#1C1C34] rounded-full px-2 py-0.5 text-[10px] text-[#8B8FA8]">{b}</span>
              ))}
            </div>
            <p className="text-[#4A4A6A] text-sm">Intelligent email automation with AI-powered insights</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">+ New Template</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-8 gap-3">
        {METRICS.map((m) => (
          <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
            <m.icon size={14} className={`${m.c} mx-auto`} />
            <div className="text-white font-bold text-lg mt-1">{m.v}</div>
            <div className="text-[#8B8FA8] text-[10px]">{m.l}</div>
          </div>
        ))}
      </div>

      <div className="px-6 flex gap-4 border-b border-[#1C1C34] mb-5">
        {["Overview", "Templates 0", "Activity", "Analytics", "Settings"].map((t, i) => (
          <button key={t} className={i === 0 ? "px-1 pb-3 border-b-2 border-[#6366F1] text-white text-sm font-medium" : "px-1 pb-3 text-[#8B8FA8] text-sm hover:text-white"}>{t}</button>
        ))}
      </div>

      <div className="px-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 space-y-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="text-white font-semibold text-sm">Email Performance Trends</div>
              <div className="ml-auto flex gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"/>Sent</span>
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#22C55E]"/>Opened</span>
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#F59E0B]"/>Clicked</span>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART}>
                  <CartesianGrid stroke="#1C1C34" />
                  <XAxis dataKey="d" stroke="#4A4A6A" fontSize={10} />
                  <YAxis stroke="#4A4A6A" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34" }} />
                  <Line type="monotone" dataKey="sent" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="opened" stroke="#22C55E" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="clicked" stroke="#F59E0B" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center mb-3"><span className="text-white font-semibold text-sm">Recent Templates</span><button className="ml-auto text-[#6366F1] text-xs">View All →</button></div>
              <div className="py-8 text-center">
                <FileText size={32} className="text-[#1C1C34] mx-auto mb-2" />
                <div className="text-[#4A4A6A] text-sm">No templates yet</div>
                <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs mt-4 hover:text-white">+ Create Template</button>
              </div>
            </div>
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center mb-3"><span className="text-white font-semibold text-sm">Active Sequences</span><button className="ml-auto text-[#6366F1] text-xs">View All →</button></div>
              <div className="py-8 text-center">
                <GitBranch size={32} className="text-[#1C1C34] mx-auto mb-2" />
                <div className="text-[#4A4A6A] text-sm">No sequences yet</div>
                <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs mt-4 hover:text-white">+ New Sequence</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Mail size={14} className="text-[#6366F1]" /><span className="text-white font-semibold text-sm">Email Status</span></div>
            <div className="space-y-2">
              {STATUSES.map((s, i) => (
                <div key={s.l} className={`flex justify-between items-center py-2 ${i < STATUSES.length - 1 ? "border-b border-[#1C1C34]/50" : ""}`}>
                  <div className="flex items-center gap-2"><s.icon size={14} className={s.c} /><span className="text-[#8B8FA8] text-sm">{s.l}</span></div>
                  <span className="text-white text-sm font-semibold">0</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Zap size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Quick Actions</span></div>
            <div className="space-y-2">
              {QUICK.map((q) => (
                <button key={q.l} className="w-full flex items-center gap-3 py-2.5 px-3 bg-[#06060F] rounded-lg hover:bg-[#1C1C34] text-left">
                  <q.icon size={16} className={q.c} />
                  <span className="text-white text-sm font-medium">{q.l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
