import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  CalendarDays,
  Camera,
  CheckCircle,
  Clock,
  DownloadCloud,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — pydent.ai" }] }),
  component: DashboardOverview,
});

const chartData = [
  { name: "Mon", conv: 180, qual: 24 },
  { name: "Tue", conv: 210, qual: 31 },
  { name: "Wed", conv: 195, qual: 28 },
  { name: "Thu", conv: 240, qual: 38 },
  { name: "Fri", conv: 285, qual: 44 },
  { name: "Sat", conv: 190, qual: 22 },
  { name: "Sun", conv: 165, qual: 19 },
];

function DashboardOverview() {
  return (
    <div className="px-6 py-5 space-y-5 max-w-[1400px]">
      {/* Tab row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[
            { label: "Overview", active: true },
            { label: "Channels", badge: "5" },
            { label: "AI Agents", badge: "2" },
            { label: "Activity" },
          ].map((t) => (
            <button
              key={t.label}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                t.active
                  ? "bg-[#7B5CFC]/[0.12] text-white border border-[#7B5CFC]/25"
                  : "text-[#4A4A6A] hover:text-[#8B8FA8] hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              {t.label}
              {t.badge && (
                <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] rounded-full px-1.5 py-0.5">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[11px] px-3 py-1 rounded-full font-medium">
            System Healthy
          </span>
          <span className="text-[#4A4A6A] text-xs">Updated 2 min ago</span>
          <button className="flex items-center gap-1.5 text-xs text-[#8B8FA8] hover:text-white border border-[#1C1C34] px-3 py-1.5 rounded-lg">
            <DownloadCloud size={13} /> Export
          </button>
        </div>
      </div>

      {/* Channel health strip */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { name: "Voice AI", sub: "2/2 Agents", icon: Phone, color: "#7B5CFC", live: true, val: "Live" },
          { name: "WhatsApp", sub: "Connected", icon: MessageCircle, color: "#22C55E", live: true, val: "3" },
          { name: "Instagram", sub: "0 Accounts", icon: Camera, color: "#EC4899", live: false, val: "—" },
          { name: "Email", sub: "0 Domains", icon: Mail, color: "#3B82F6", live: false, val: "—" },
          { name: "SMS", sub: "0 Providers", icon: MessageSquare, color: "#00D4AA", live: false, val: "—" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.name}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: c.color + "22" }}
                >
                  <Icon size={14} style={{ color: c.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-white text-xs font-semibold truncate">
                    {c.name}
                  </div>
                  <div className="text-[#4A4A6A] text-[10px] truncate">
                    {c.sub}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                    c.live
                      ? "bg-[#22C55E]/10 text-[#22C55E]"
                      : "bg-[#1C1C34] text-[#4A4A6A]"
                  }`}
                >
                  {c.live ? "Live" : "Inactive"}
                </span>
                <span className="text-white text-xs font-semibold">{c.val}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Business intelligence row */}
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center divide-x divide-[#1C1C34]">
        {[
          { l: "Total Patients", v: "1,284", s: "all time" },
          { l: "Conversion", v: "34%", s: "this month" },
          { l: "Total Calls", v: "847", s: "this month" },
          { l: "Conversations", v: "3,241", s: "WA+IG+Web" },
          { l: "Avg Response", v: "1.8s", s: "AI" },
          { l: "Satisfaction", v: "4.6/5", s: "rating" },
        ].map((m, i) => (
          <div key={m.l} className={`px-5 ${i === 0 ? "pl-0" : ""}`}>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.08em] font-medium">
              {m.l}
            </div>
            <div className="text-white text-lg font-bold tracking-[-0.03em] mt-0.5">
              {m.v}
            </div>
            <div className="text-[#4A4A6A] text-[10px]">{m.s}</div>
          </div>
        ))}
      </div>

      {/* 8 metric chips */}
      <div className="grid grid-cols-8 gap-3">
        {[
          { i: PhoneCall, c: "#00D4AA", v: "14", l: "Today's Calls", d: "+3%", dc: "#22C55E" },
          { i: Users, c: "#7B5CFC", v: "1,284", l: "Total Patients", d: "+12.4%", dc: "#22C55E" },
          { i: Bot, c: "#22C55E", v: "2/2", l: "AI Agents Online", d: "100%", dc: "#22C55E" },
          { i: Clock, c: "#FFAB00", v: "6m 24s", l: "Avg Call Duration", d: "-5%", dc: "#FF4D6D" },
          { i: CheckCircle, c: "#22C55E", v: "87%", l: "Completion Rate", d: "+2.1%", dc: "#22C55E" },
          { i: MessageSquare, c: "#7B5CFC", v: "3,241", l: "Total Conversations", d: "+8%", dc: "#22C55E" },
          { i: Activity, c: "#00D4AA", v: "3", l: "Active Now", d: "live", dc: "#22C55E" },
          { i: TrendingUp, c: "#22C55E", v: "8", l: "Qualified Today", d: "+33%", dc: "#22C55E" },
        ].map((m) => {
          const Icon = m.i;
          return (
            <div
              key={m.l}
              className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <Icon size={16} style={{ color: m.c }} />
                <span
                  className="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: m.dc + "1A", color: m.dc }}
                >
                  {m.d}
                </span>
              </div>
              <div className="text-white font-bold text-[22px] tracking-[-0.03em] mt-2 leading-none">
                {m.v}
              </div>
              <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1">
                {m.l}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main content row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Chart */}
        <div className="col-span-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">
                Patient Conversations
              </h3>
              <p className="text-[#4A4A6A] text-[11px] mt-0.5">
                vs Qualified Patients — 7 day rolling
              </p>
            </div>
            <div className="flex gap-1">
              {["24H", "7D", "30D", "90D"].map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    i === 1
                      ? "bg-[#7B5CFC]/20 text-[#9B84FF] border border-[#7B5CFC]/25"
                      : "text-[#4A4A6A] hover:text-[#8B8FA8] border border-transparent"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7B5CFC" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#7B5CFC" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C1C34" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "#141428",
                    border: "1px solid #1C1C34",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Area yAxisId="left" type="monotone" dataKey="conv" name="Conversations" stroke="#7B5CFC" strokeWidth={2} fill="url(#purpleGrad)" />
                <Area yAxisId="right" type="monotone" dataKey="qual" name="Qualified" stroke="#00D4AA" strokeWidth={1.5} strokeDasharray="4 2" fill="url(#tealGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 justify-center mt-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-[#7B5CFC]" />
              <span className="text-[11px] text-[#8B8FA8]">Conversations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-sm bg-[#00D4AA]" />
              <span className="text-[11px] text-[#8B8FA8]">Qualified Patients</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#1C1C34]">
            {[
              { l: "Completion Rate", v: "87%", d: "↑2.1%", dc: "#22C55E" },
              { l: "Weekly Volume", v: "1,465", d: "conversations", dc: "#4A4A6A" },
              { l: "Peak", v: "Friday", d: "285 conversations", dc: "#4A4A6A" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-[10px] text-[#4A4A6A]">{s.l}</div>
                <div className="text-white text-sm font-semibold mt-0.5">
                  {s.v}{" "}
                  <span className="text-[10px] font-normal" style={{ color: s.dc }}>
                    {s.d}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Live Operations */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold text-sm">Live Operations</h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse ml-auto" />
              <span className="text-[#22C55E] text-xs">Live</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#1C1C34] mt-2">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#22C55E]" />
                <span className="text-[#8B8FA8] text-xs">Active Calls</span>
              </div>
              <div className="text-right">
                <div className="text-white text-xl font-bold leading-none">3</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">in progress</div>
              </div>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[#8B8FA8] text-xs">Queued</span>
              <div className="text-right">
                <div className="text-white text-xl font-bold leading-none">0</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">waiting</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#8B8FA8]">System Health</span>
                <span className="text-xs text-white">20%</span>
              </div>
              <div className="h-1.5 bg-[#1C1C34] rounded-full">
                <div className="h-1.5 bg-[#22C55E] rounded-full" style={{ width: "20%" }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#4A4A6A] mt-1.5">
                <span>Latency: 10ms</span>
                <span>Web: 12s</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { i: PhoneCall, c: "#00D4AA", l: "Start Calling" },
                { i: UserPlus, c: "#7B5CFC", l: "Import Patients" },
                { i: Bot, c: "#7B5CFC", l: "Create Agent" },
                { i: CalendarDays, c: "#FFAB00", l: "Schedule Call" },
                { i: MessageCircle, c: "#22C55E", l: "WhatsApp" },
                { i: Settings, c: "#8B8FA8", l: "Settings" },
              ].map((a) => {
                const Icon = a.i;
                return (
                  <button
                    key={a.l}
                    className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-[#7B5CFC]/30 hover:bg-[#0E0E1C] transition-all"
                  >
                    <Icon size={18} style={{ color: a.c }} />
                    <span className="text-[11px] text-[#8B8FA8] text-center leading-tight">
                      {a.l}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Autopilot */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-[#7B5CFC]" />
              <div>
                <div className="text-white text-sm font-semibold">Autopilot Mode</div>
                <div className="text-[#4A4A6A] text-[11px]">
                  AI handles everything automatically
                </div>
              </div>
            </div>
            <div className="w-10 h-5 bg-[#1C1C34] rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-[#4A4A6A] rounded-full absolute top-0.5 left-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row 4 cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Performance */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Performance</h3>
            <span className="text-[#4A4A6A] text-xs">This month</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { i: TrendingUp, c: "#22C55E", l: "Conversion Rate", v: "34%", d: "+12%", dc: "#22C55E" },
              { i: Clock, c: "#00D4AA", l: "Avg Duration", v: "6m 24s", d: "-5%", dc: "#FF4D6D" },
              { i: MessageSquare, c: "#7B5CFC", l: "Response Rate", v: "0%", d: "—", dc: "#4A4A6A" },
              { i: Star, c: "#FFAB00", l: "Satisfaction", v: "4.6/5", d: "+5%", dc: "#22C55E" },
            ].map((m) => {
              const Icon = m.i;
              return (
                <div key={m.l} className="bg-[#06060F] rounded-lg p-3">
                  <Icon size={14} style={{ color: m.c }} />
                  <div className="text-[#4A4A6A] text-[10px] mt-2">{m.l}</div>
                  <div className="text-white text-lg font-bold tracking-[-0.03em] leading-none mt-1">
                    {m.v}
                  </div>
                  <div className="text-[10px] mt-1" style={{ color: m.dc }}>
                    {m.d}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Recent Patients</h3>
            <span className="text-[#7B5CFC] text-xs cursor-pointer">View All →</span>
          </div>
          <div className="mt-4">
            {[
              { n: "Omar A.", ch: "WA", t: "2h ago", s: "Qualified", sc: "#22C55E", g: "from-[#7B5CFC]/40 to-[#00D4AA]/30" },
              { n: "Sara M.", ch: "SMS", t: "3h ago", s: "New", sc: "#3B82F6", g: "from-[#3B82F6]/40 to-[#7B5CFC]/30" },
              { n: "Ahmed K.", ch: "Voice", t: "5h ago", s: "Contacted", sc: "#7B5CFC", g: "from-[#FFAB00]/40 to-[#FF4D6D]/30" },
              { n: "Fatima R.", ch: "WA", t: "Yesterday", s: "Qualified", sc: "#22C55E", g: "from-[#EC4899]/40 to-[#7B5CFC]/30" },
              { n: "Khalid M.", ch: "IG", t: "Yesterday", s: "New", sc: "#3B82F6", g: "from-[#00D4AA]/40 to-[#3B82F6]/30" },
            ].map((p) => (
              <div
                key={p.n}
                className="flex items-center gap-3 py-2 border-b border-[#1C1C34]/50 last:border-0"
              >
                <div
                  className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.g} flex items-center justify-center text-[10px] font-semibold text-white flex-shrink-0`}
                >
                  {p.n
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{p.n}</div>
                  <div className="text-[10px] text-[#4A4A6A]">
                    {p.ch} · {p.t}
                  </div>
                </div>
                <span
                  className="text-[10px] h-4 px-1.5 rounded-full flex items-center font-medium"
                  style={{ background: p.sc + "1A", color: p.sc }}
                >
                  {p.s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Call Timeline */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Call Timeline</h3>
            <span className="text-[#7B5CFC] text-xs cursor-pointer">View All →</span>
          </div>
          <div className="mt-4">
            {[
              { t: "09:15", n: "Omar Al Rashidi", s: "Completed", sc: "#22C55E" },
              { t: "10:30", n: "Sara Ahmed", s: "Completed", sc: "#22C55E" },
              { t: "11:00", n: "Ahmed Khalid", s: "Missed", sc: "#FF4D6D" },
              { t: "13:45", n: "Fatima Rahman", s: "Upcoming", sc: "#3B82F6" },
              { t: "14:30", n: "Layla Hassan", s: "Upcoming", sc: "#3B82F6" },
              { t: "15:15", n: "Mohammed S.", s: "Upcoming", sc: "#3B82F6" },
            ].map((c) => (
              <div
                key={c.t}
                className="flex items-center gap-3 py-1.5 border-b border-[#1C1C34]/40 last:border-0"
              >
                <span className="text-[#4A4A6A] text-[10px] w-10 flex-shrink-0">
                  {c.t}
                </span>
                <span className="text-white text-xs flex-1 truncate">{c.n}</span>
                <span
                  className="text-[10px] h-4 px-1.5 rounded-full flex items-center font-medium"
                  style={{ background: c.sc + "1A", color: c.sc }}
                >
                  {c.s}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Upcoming Calls</h3>
            <span className="text-[#7B5CFC] text-xs cursor-pointer">View All →</span>
          </div>
          <div className="space-y-2 mt-4">
            {[
              { t: "2:00 PM", n: "Sara Ahmed", k: "Checkup", g: "from-[#7B5CFC]/40 to-[#00D4AA]/30" },
              { t: "3:30 PM", n: "Omar R.", k: "Cleaning", g: "from-[#FFAB00]/40 to-[#FF4D6D]/30" },
              { t: "4:15 PM", n: "Ahmed K.", k: "Consultation", g: "from-[#3B82F6]/40 to-[#7B5CFC]/30" },
            ].map((u) => (
              <div
                key={u.t}
                className="bg-[#06060F] rounded-lg px-3 py-2.5 flex items-center gap-3"
              >
                <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 px-2 py-1 rounded text-[#9B84FF] text-[10px] font-semibold w-14 text-center flex-shrink-0">
                  {u.t}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium truncate">{u.n}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{u.k}</div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full bg-gradient-to-br ${u.g} flex-shrink-0`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Leaderboard + Lead Intelligence + System Activity */}
      <div className="grid grid-cols-3 gap-4">
        {/* Agent Leaderboard */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div>
            <h3 className="text-white font-semibold text-sm">Agent Leaderboard</h3>
            <p className="text-[#4A4A6A] text-[10px] mt-0.5">Ranked by call volume</p>
          </div>
          <div className="flex gap-4 mt-1 mb-5">
            {[
              { l: "agents", v: "2" },
              { l: "active", v: "2" },
              { l: "calls", v: "0" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-[#4A4A6A] text-[10px]">{s.l}</div>
                <div className="text-white text-sm font-bold">{s.v}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { r: 1, n: "Sarah", g: "from-[#7B5CFC]/60 to-[#9B84FF]/30", read: 92 },
              { r: 2, n: "Ella", g: "from-[#00D4AA]/60 to-[#3B82F6]/30", read: 87 },
            ].map((a) => (
              <div
                key={a.n}
                className="flex items-center gap-3 bg-[#06060F] rounded-xl px-4 py-3"
              >
                <span className="text-[#4A4A6A] text-xs font-bold w-4">{a.r}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${a.g} flex items-center justify-center text-xs font-semibold text-white flex-shrink-0`}
                >
                  {a.n[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{a.n}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[9px] uppercase bg-[#1C1C34] text-[#8B8FA8] px-1.5 py-0.5 rounded">
                      Agent
                    </span>
                  </div>
                  <div className="h-1 bg-[#1C1C34] rounded-full mt-1.5">
                    <div
                      className="h-1 bg-[#22C55E] rounded-full"
                      style={{ width: `${a.read}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white text-sm font-bold">0</div>
                  <div className="text-[#4A4A6A] text-[10px]">calls</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Intelligence */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div>
            <h3 className="text-white font-semibold text-sm">Lead Intelligence</h3>
            <p className="text-[#4A4A6A] text-[10px] mt-0.5">AI-qualified hot leads</p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 mb-5">
            {[
              { l: "Avg Score", v: "0" },
              { l: "Signals", v: "0" },
              { l: "Top Channel", v: "—" },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-[#06060F] rounded-lg p-3 text-center"
              >
                <div className="text-white font-bold text-lg">{s.v}</div>
                <div className="text-[#4A4A6A] text-[10px] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center">
            <Users size={32} className="text-[#1C1C34]" />
            <p className="text-[#4A4A6A] text-xs mt-2">No qualified leads yet</p>
            <p className="text-[#4A4A6A] text-[11px] mt-1">
              Leads with 60%+ scores appear here
            </p>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">System Activity</h3>
            <span className="text-[#7B5CFC] text-xs cursor-pointer">Full Log →</span>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4 mb-4">
            {[
              { l: "EVENTS", v: 2 },
              { l: "SUCCESS", v: 2 },
              { l: "WARNINGS", v: 0 },
              { l: "INFO", v: 0 },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-[#06060F] rounded-lg px-2 py-2 text-center"
              >
                <div className="text-white font-bold text-base">{s.v}</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div>
            {[
              { e: "Agent Online", s: "Sarah · Agent", t: "less than a minute ago" },
              { e: "Agent Online", s: "Ella · Agent", t: "less than a minute ago" },
            ].map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-1.5 border-b border-[#1C1C34]/40 last:border-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs">{a.e}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{a.s}</div>
                </div>
                <span className="text-[#4A4A6A] text-[10px] ml-auto flex-shrink-0">
                  {a.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
        <div className="flex items-center">
          <Sparkles size={16} className="text-[#7B5CFC]" />
          <h3 className="text-white font-semibold text-sm ml-2">
            AI Recommendations
          </h3>
          <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full ml-2">
            3 insights
          </span>
          <div className="flex gap-1 ml-auto items-center">
            <span className="h-1.5 rounded-full bg-[#7B5CFC] w-3" />
            <span className="h-1.5 rounded-full bg-[#1C1C34] w-1.5" />
            <span className="h-1.5 rounded-full bg-[#1C1C34] w-1.5" />
          </div>
        </div>
        <p className="text-[#4A4A6A] text-[11px] mt-0.5 ml-6">
          Auto-generated from your last 30 days of patient data
        </p>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            {
              s: "91%",
              i: TrendingUp,
              c: "#22C55E",
              t: "Enable WhatsApp Follow-Up Sequences",
              d: "Activate automated 24h post-appointment follow-ups. Estimated +$12,400 recall revenue",
            },
            {
              s: "84%",
              i: MessageCircle,
              c: "#7B5CFC",
              t: "Launch Inactive Patient Recall Campaign",
              d: "87 patients haven't visited in 6+ months. WhatsApp campaign could recover 40–50 bookings",
            },
            {
              s: "88%",
              i: Zap,
              c: "#FFAB00",
              t: "Activate Voice AI for Inbound Calls",
              d: "Connect phone number to capture missed inbound calls. Estimated 16 new bookings/month",
            },
          ].map((r) => {
            const Icon = r.i;
            return (
              <div
                key={r.t}
                className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5 hover:border-[#7B5CFC]/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <span className="bg-[#22C55E]/12 text-[#22C55E] text-sm font-bold px-2.5 py-1 rounded-lg">
                    {r.s}
                  </span>
                  <Icon size={16} style={{ color: r.c }} />
                </div>
                <h4 className="text-white text-sm font-semibold mt-3 mb-2 leading-snug">
                  {r.t}
                </h4>
                <p className="text-[#4A4A6A] text-xs leading-relaxed">{r.d}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">
                    Impact
                  </span>
                  <span className="text-[#22C55E] text-xs font-medium">High</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
