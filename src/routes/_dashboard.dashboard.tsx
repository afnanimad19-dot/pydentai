import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
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
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
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

const sourceData = [
  { name: "WhatsApp", value: 52, fill: "#7B5CFC" },
  { name: "Voice", value: 24, fill: "#00D4AA" },
  { name: "SMS", value: 15, fill: "#F59E0B" },
  { name: "Instagram", value: 9, fill: "#FF4D6D" },
];

type PrimaryCard = {
  icon: LucideIcon;
  color: string;
  trend: string;
  trendUp: boolean;
  value: string;
  label: string;
  prev: string;
};

const primaryCards: PrimaryCard[] = [
  { icon: Users, color: "#7B5CFC", trend: "↑ 12.4%", trendUp: true, value: "1,284", label: "Total Patients", prev: "1,147" },
  { icon: PhoneCall, color: "#00D4AA", trend: "↑ 3%", trendUp: true, value: "14", label: "Today's Calls", prev: "13" },
  { icon: TrendingUp, color: "#22C55E", trend: "↑ 2.1%", trendUp: true, value: "87%", label: "Completion Rate", prev: "84%" },
  { icon: Zap, color: "#F59E0B", trend: "↑ 5%", trendUp: true, value: "3.2s", label: "Avg AI Response", prev: "3.4s" },
];

export function DashboardOverview() {
  return (
    <div className="px-6 py-5 space-y-5 max-w-[1400px] bg-beam-purple">
      {/* Tab row (unchanged) */}
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

      {/* ROW 1: Channel Health (unchanged) */}
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
                  <div className="text-white text-xs font-semibold truncate">{c.name}</div>
                  <div className="text-[#4A4A6A] text-[10px] truncate">{c.sub}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                    c.live ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#1C1C34] text-[#4A4A6A]"
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

      {/* ROW 2: 4 primary metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {primaryCards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <Icon size={18} style={{ color: c.color }} />
                <span
                  className={`h-5 px-2 text-[11px] font-semibold rounded-full inline-flex items-center ${
                    c.trendUp ? "bg-[#22C55E]/[0.12] text-[#22C55E]" : "bg-[#FF4D6D]/[0.12] text-[#FF4D6D]"
                  }`}
                >
                  {c.trend}
                </span>
              </div>
              <div className="text-white font-bold text-[28px] tracking-[-0.035em] leading-none mt-3">
                {c.value}
              </div>
              <div className="text-[#8B8FA8] text-sm mt-1.5">{c.label}</div>
              <div className="mt-3 pt-3 border-t border-[#1C1C34]">
                <span className="text-[#4A4A6A] text-xs">Prev: {c.prev}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 3: Main content - chart + right panels */}
      <div className="grid grid-cols-12 gap-5">
        {/* LEFT: chart */}
        <div className="col-span-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-white font-semibold text-[16px] tracking-[-0.02em]">
                Patient Conversations
              </h3>
              <p className="text-[#4A4A6A] text-[12px] mt-1">
                vs Qualified Patients — 7 day rolling
              </p>
            </div>
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 flex gap-1">
              {["24H", "7D", "30D", "90D"].map((t, i) => (
                <button
                  key={t}
                  className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${
                    i === 1 ? "bg-[#7B5CFC] text-white" : "text-[#4A4A6A] hover:text-[#8B8FA8]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7B5CFC" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#7B5CFC" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="tealArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C1C34" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: "#141428",
                    border: "1px solid #1C1C34",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 13,
                    padding: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="conv"
                  name="Conversations"
                  stroke="#7B5CFC"
                  strokeWidth={2.5}
                  fill="url(#purpleArea)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#7B5CFC" }}
                />
                <Area
                  type="monotone"
                  dataKey="qual"
                  name="Qualified"
                  stroke="#00D4AA"
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  fill="url(#tealArea)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#7B5CFC]" />
              <span className="text-[#8B8FA8] text-xs">Conversations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm border border-dashed border-[#00D4AA]" />
              <span className="text-[#8B8FA8] text-xs">Qualified Patients</span>
            </div>
          </div>

          <div className="flex items-center gap-8 mt-4 pt-4 border-t border-[#1C1C34]">
            {[
              { icon: TrendingUp, color: "#22C55E", label: "Completion Rate", value: "87%", delta: "↑ 2.1%" },
              { icon: MessageSquare, color: "#7B5CFC", label: "Weekly Volume", value: "1,465", delta: "conversations" },
              { icon: Zap, color: "#F59E0B", label: "Peak", value: "Friday", delta: "285 conv." },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: s.color }} />
                  <div>
                    <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{s.label}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-white text-sm font-semibold">{s.value}</span>
                      <span className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                        {s.delta}
                      </span>
                    </div>
          </div>

          {/* SECTION A — Recent AI Conversations */}
          <div className="mt-5 pt-5 border-t border-[#1C1C34]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white text-sm font-semibold">Recent Conversations</h4>
              <span className="text-[#7B5CFC] text-xs hover:text-[#9B84FF] cursor-pointer">
                View Inbox →
              </span>
            </div>
            <div className="space-y-1">
              {[
                {
                  initials: "OA", name: "Omar Al Rashidi", grad: "from-[#7B5CFC]/40 to-[#00D4AA]/30",
                  ChIcon: MessageCircle, time: "12m",
                  msg: "I'd like to book a checkup for next week",
                  status: "Qualified", sc: "#22C55E",
                },
                {
                  initials: "SM", name: "Sara Mohammed", grad: "from-[#F59E0B]/40 to-[#FF4D6D]/30",
                  ChIcon: MessageSquare, time: "34m",
                  msg: "What are your teeth whitening prices?",
                  status: "New", sc: "#7B5CFC",
                },
                {
                  initials: "AK", name: "Ahmed Khalid", grad: "from-[#00D4AA]/40 to-[#7B5CFC]/30",
                  ChIcon: Phone, time: "1h",
                  msg: "Appointment confirmed for Thursday 2pm",
                  status: "Contacted", sc: "#F59E0B",
                },
                {
                  initials: "FR", name: "Fatima Rahman", grad: "from-[#FF4D6D]/40 to-[#7B5CFC]/30",
                  ChIcon: MessageCircle, time: "2h",
                  msg: "Can I reschedule my cleaning appointment?",
                  status: "Qualified", sc: "#22C55E",
                },
              ].map((c) => {
                const ChIcon = c.ChIcon;
                return (
                  <div
                    key={c.name}
                    className="flex items-center gap-3 py-2.5 rounded-lg hover:bg-white/[0.02] px-2 -mx-2 cursor-pointer transition-all"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0`}
                    >
                      {c.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-[13px] font-medium">{c.name}</span>
                        <ChIcon size={12} className="text-[#4A4A6A]" />
                        <span className="w-[3px] h-[3px] bg-[#1C1C34] rounded-full" />
                        <span className="text-[#4A4A6A] text-[11px]">{c.time}</span>
                      </div>
                      <div className="text-[#4A4A6A] text-[12px] truncate mt-0.5">{c.msg}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span
                        className="h-4 px-1.5 text-[10px] rounded-full inline-flex items-center font-medium"
                        style={{ background: c.sc + "1A", color: c.sc }}
                      >
                        {c.status}
                      </span>
                      <span className="bg-[#7B5CFC]/[0.12] text-[#9B84FF] text-[10px] px-1.5 rounded font-medium">
                        AI
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION B — Message Volume by Channel */}
          <div className="mt-5 pt-5 border-t border-[#1C1C34]">
            <h4 className="text-white text-sm font-semibold mb-4">
              Message Volume — Last 7 Days
            </h4>
            <div className="space-y-3">
              {[
                { Icon: MessageCircle, color: "#22C55E", name: "WhatsApp", width: "74%", count: "2,398" },
                { Icon: Phone, color: "#7B5CFC", name: "Voice", width: "42%", count: "847" },
                { Icon: MessageSquare, color: "#00D4AA", name: "SMS", width: "23%", count: "412" },
                { Icon: Camera, color: "#F59E0B", name: "Instagram", width: "12%", count: "198" },
              ].map((r) => {
                const Icon = r.Icon;
                return (
                  <div key={r.name} className="flex items-center gap-3">
                    <Icon size={14} style={{ color: r.color }} className="flex-shrink-0" />
                    <span className="text-[#8B8FA8] text-xs w-20 flex-shrink-0">{r.name}</span>
                    <div className="flex-1 h-2 bg-[#1C1C34] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: r.width, background: r.color }}
                      />
                    </div>
                    <span className="text-white text-xs font-semibold w-10 text-right flex-shrink-0">
                      {r.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

              );
            })}
          </div>
        </div>

        {/* RIGHT: 3 stacked cards */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Card A — Patient Sources donut */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Patient Sources</h3>
            <div className="relative flex justify-center">
              <PieChart width={200} height={160}>
                <Pie
                  data={sourceData}
                  innerRadius={50}
                  outerRadius={72}
                  paddingAngle={3}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((d) => (
                    <Cell key={d.name} fill={d.fill} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-white font-bold text-[18px] tracking-[-0.03em] leading-none">
                  1,284
                </div>
                <div className="text-[#4A4A6A] text-[10px] mt-1">total</div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {sourceData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: d.fill }}
                    />
                    <span className="text-[#8B8FA8] text-xs">{d.name}</span>
                  </div>
                  <span className="text-white text-xs font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card B — Live Operations */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center">
              <h3 className="text-white font-semibold text-sm">Live Operations</h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse ml-auto" />
              <span className="text-[#22C55E] text-[11px] ml-2">Live</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-[#1C1C34]">
              <div className="flex items-center">
                <PhoneCall size={14} className="text-[#22C55E]" />
                <span className="text-[#8B8FA8] text-xs ml-2">Active Calls</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-[24px] tracking-[-0.03em] leading-none">3</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">in progress</div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3">
              <div className="flex items-center">
                <Clock size={14} className="text-[#4A4A6A]" />
                <span className="text-[#8B8FA8] text-xs ml-2">Queued</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold text-[24px] tracking-[-0.03em] leading-none">0</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">waiting</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#8B8FA8] text-xs">System Health</span>
                <span className="text-white text-xs font-semibold">20%</span>
              </div>
              <div className="bg-[#1C1C34] h-1.5 rounded-full">
                <div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: "20%" }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[#4A4A6A] text-[10px]">Latency: 10ms</span>
                <span className="text-[#4A4A6A] text-[10px]">Uptime: 99.8%</span>
              </div>
            </div>
          </div>

          {/* Card C — Quick Actions */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { i: PhoneCall, c: "#00D4AA", l: "Start Calling" },
                { i: UserPlus, c: "#7B5CFC", l: "Import Patients" },
                { i: Bot, c: "#7B5CFC", l: "Create Agent" },
                { i: CalendarDays, c: "#F59E0B", l: "Schedule Call" },
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
                    <span className="text-[10px] text-[#8B8FA8] text-center leading-tight">
                      {a.l}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34] flex items-center justify-between">
              <div className="flex items-center">
                <Zap size={14} className="text-[#7B5CFC]" />
                <span className="text-white text-xs font-medium ml-2">Autopilot</span>
              </div>
              <div className="bg-[#1C1C34] w-9 h-5 rounded-full cursor-pointer hover:bg-[#7B5CFC]/30 transition-colors relative">
                <div className="w-3.5 h-3.5 bg-[#4A4A6A] rounded-full absolute top-[3px] left-[3px]" />
              </div>
            </div>
          </div>

          {/* Today's AI Summary */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <h3 className="text-white font-semibold text-sm mb-4">Today's AI Summary</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { Icon: MessageSquare, color: "#7B5CFC", label: "Messages Handled", value: "247" },
                { Icon: PhoneCall, color: "#00D4AA", label: "Calls Completed", value: "14" },
                { Icon: CalendarCheck, color: "#22C55E", label: "Appointments Booked", value: "8" },
                { Icon: Clock, color: "#F59E0B", label: "Avg Response", value: "1.8s" },
              ].map((m) => {
                const Icon = m.Icon;
                return (
                  <div key={m.label} className="bg-[#06060F] rounded-lg p-3">
                    <Icon size={14} style={{ color: m.color }} />
                    <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-2">
                      {m.label}
                    </div>
                    <div className="text-white text-[18px] font-[700] tracking-[-0.03em] mt-1">
                      {m.value}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34]">
              <div className="text-[#4A4A6A] text-[10px] mb-2">vs yesterday</div>
              <div className="flex items-center justify-between">
                <span className="text-[#22C55E] text-xs font-medium">Messages ↑ 18%</span>
                <span className="text-[#22C55E] text-xs font-medium">Calls ↑ 7%</span>
                <span className="text-[#22C55E] text-xs font-medium">Bookings ↑ 33%</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Rate Limits */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-sm">WhatsApp Limits</h3>
              <span className="bg-[#7B5CFC]/[0.12] border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Tier 1
              </span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Daily Messages", used: "2,847 / 10,000", width: "28%", color: "#22C55E" },
                { label: "Hourly Rate", used: "234 / 1,000", width: "23%", color: "#7B5CFC" },
                { label: "Templates", used: "156 / 500", width: "31%", color: "#00D4AA" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[#8B8FA8] text-xs">{b.label}</span>
                    <span className="text-white text-xs font-medium">{b.used}</span>
                  </div>
                  <div className="h-1.5 bg-[#1C1C34] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: b.width, background: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-[#22C55E] text-xs">API Connected</span>
              </div>
              <span className="text-[#4A4A6A] text-[11px]">Resets in 4h 12m</span>
            </div>
          </div>
        </div>

      </div>

      {/* ROW 4: 3 cards */}
      <div className="grid grid-cols-3 gap-5">
        {/* Performance */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Performance</h3>
            <span className="text-[#4A4A6A] text-xs">This month</span>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { i: TrendingUp, c: "#22C55E", l: "Conversion", v: "34%", d: "+12%", dc: "#22C55E" },
              { i: Clock, c: "#00D4AA", l: "Avg Duration", v: "6m 24s", d: "-5%", dc: "#FF4D6D" },
              { i: MessageSquare, c: "#7B5CFC", l: "Response Rate", v: "98%", d: "+2%", dc: "#22C55E" },
              { i: Star, c: "#F59E0B", l: "Satisfaction", v: "4.6/5", d: "+5%", dc: "#22C55E" },
            ].map((m) => {
              const Icon = m.i;
              return (
                <div key={m.l} className="bg-[#06060F] rounded-lg p-3">
                  <Icon size={14} style={{ color: m.c }} />
                  <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-2">
                    {m.l}
                  </div>
                  <div className="text-white text-[20px] font-bold tracking-[-0.03em] leading-none mt-1">
                    {m.v}
                  </div>
                  <span
                    className="inline-block text-[10px] mt-1.5 px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: m.dc + "1A", color: m.dc }}
                  >
                    {m.d}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Recent Patients</h3>
            <button className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">View All →</button>
          </div>
          <div className="mt-4">
            {[
              { name: "Omar A.", initials: "OA", grad: "from-[#7B5CFC]/40 to-[#00D4AA]/30", ch: "WA", time: "2h ago", status: "Qualified", sc: "#22C55E" },
              { name: "Sara M.", initials: "SM", grad: "from-[#F59E0B]/40 to-[#FF4D6D]/30", ch: "SMS", time: "3h ago", status: "New", sc: "#7B5CFC" },
              { name: "Ahmed K.", initials: "AK", grad: "from-[#00D4AA]/40 to-[#7B5CFC]/30", ch: "Voice", time: "5h ago", status: "Contacted", sc: "#F59E0B" },
              { name: "Fatima R.", initials: "FR", grad: "from-[#FF4D6D]/40 to-[#7B5CFC]/30", ch: "WA", time: "Yesterday", status: "Qualified", sc: "#22C55E" },
              { name: "Khalid M.", initials: "KM", grad: "from-[#7B5CFC]/40 to-[#F59E0B]/30", ch: "IG", time: "Yesterday", status: "New", sc: "#7B5CFC" },
            ].map((p, idx, arr) => (
              <div
                key={p.name}
                className={`flex items-center gap-3 py-2.5 ${
                  idx !== arr.length - 1 ? "border-b border-[#1C1C34]/50" : ""
                }`}
              >
                <div
                  className={`w-[30px] h-[30px] rounded-full bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0`}
                >
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-medium truncate">{p.name}</div>
                  <div className="text-[#4A4A6A] text-[11px]">
                    {p.ch} · {p.time}
                  </div>
                </div>
                <span
                  className="h-5 px-2 text-[10px] rounded-full flex-shrink-0 inline-flex items-center font-medium"
                  style={{ background: p.sc + "1A", color: p.sc }}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Today's Schedule</h3>
            <button className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">View All →</button>
          </div>
          <div className="mt-4">
            {[
              { time: "09:15", name: "Omar Al Rashidi", type: "Checkup", status: "Completed", sc: "#22C55E" },
              { time: "10:30", name: "Sara Ahmed", type: "Cleaning", status: "Completed", sc: "#22C55E" },
              { time: "11:00", name: "Ahmed Khalid", type: "Consultation", status: "Missed", sc: "#FF4D6D" },
              { time: "13:45", name: "Fatima Rahman", type: "Implant Consult", status: "Upcoming", sc: "#7B5CFC" },
              { time: "14:30", name: "Layla Hassan", type: "Whitening", status: "Upcoming", sc: "#7B5CFC" },
              { time: "15:15", name: "Mohammed S.", type: "Checkup", status: "Upcoming", sc: "#7B5CFC" },
            ].map((r, idx, arr) => (
              <div
                key={r.time}
                className={`flex items-center gap-3 py-2.5 ${
                  idx !== arr.length - 1 ? "border-b border-[#1C1C34]/50" : ""
                }`}
              >
                <span className="bg-[#0E0E1C] border border-[#1C1C34] rounded px-2 py-1 text-[10px] text-[#8B8FA8] font-mono w-14 text-center flex-shrink-0">
                  {r.time}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-medium truncate">{r.name}</div>
                  <div className="text-[#4A4A6A] text-[11px]">{r.type}</div>
                </div>
                <span
                  className="h-5 px-2 text-[10px] rounded-full flex-shrink-0 inline-flex items-center font-medium"
                  style={{ background: r.sc + "1A", color: r.sc }}
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 5: AI Recommendations */}
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <Sparkles size={16} className="text-[#7B5CFC]" />
            <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">
              AI Recommendations
            </h3>
            <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2.5 py-1 rounded-full font-semibold">
              3 new insights
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="bg-[#7B5CFC] w-5 h-1.5 rounded-full" />
              <span className="bg-[#1C1C34] w-1.5 h-1.5 rounded-full" />
              <span className="bg-[#1C1C34] w-1.5 h-1.5 rounded-full" />
            </div>
            <button className="w-7 h-7 rounded-lg border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/30">
              <ChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 rounded-lg border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/30">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              score: "91", scoreColor: "#22C55E", icon: TrendingUp,
              title: "Enable WhatsApp Follow-Up Sequences",
              desc: "Activate automated 24h post-appointment follow-ups.",
              impact: "+$12,400 recall revenue",
            },
            {
              score: "84", scoreColor: "#F59E0B", icon: MessageCircle,
              title: "Launch Inactive Patient Recall Campaign",
              desc: "87 patients haven't visited in 6+ months. WhatsApp campaign could recover 40–50 bookings.",
              impact: "40–50 bookings",
            },
            {
              score: "88", scoreColor: "#7B5CFC", icon: Zap,
              title: "Activate Voice AI for Inbound Calls",
              desc: "Connect phone number to capture missed calls. Estimated 16 new bookings/month.",
              impact: "+16 bookings/mo",
            },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5 hover:border-[#7B5CFC]/20 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="font-extrabold text-[32px] tracking-[-0.04em] leading-none"
                    style={{ color: r.scoreColor }}
                  >
                    {r.score}
                  </div>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: r.scoreColor + "1F" }}
                  >
                    <Icon size={16} style={{ color: r.scoreColor }} />
                  </div>
                </div>
                <h4 className="text-white text-[14px] font-semibold leading-snug mb-2">
                  {r.title}
                </h4>
                <p className="text-[#4A4A6A] text-[12px] leading-relaxed">{r.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1C1C34]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">
                      Impact
                    </span>
                    <span className="text-xs font-semibold" style={{ color: r.scoreColor }}>
                      {r.impact}
                    </span>
                  </div>
                  <button className="text-[#7B5CFC] text-[11px] font-medium hover:text-[#9B84FF]">
                    Apply →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 6: Agent Leaderboard + Lead Intelligence + System Activity */}
      <div className="grid grid-cols-3 gap-5">
        {/* Agent Leaderboard */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Agent Leaderboard</h3>
            <span className="text-[#4A4A6A] text-[10px]">Ranked by volume</span>
          </div>
          <div className="flex gap-3 mt-3 mb-5">
            {[
              { v: "2", l: "Agents" },
              { v: "2", l: "Active" },
              { v: "0", l: "Calls" },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-center flex-1"
              >
                <div className="text-white font-bold text-lg leading-none">{s.v}</div>
                <div className="text-[#4A4A6A] text-[10px] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              { rank: "1", name: "Sarah", initials: "SA", grad: "from-[#7B5CFC]/50 to-[#00D4AA]/30", ready: "92%" },
              { rank: "2", name: "Ella", initials: "EL", grad: "from-[#00D4AA]/50 to-[#7B5CFC]/30", ready: "87%" },
            ].map((a) => (
              <div key={a.rank} className="bg-[#06060F] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="text-[#4A4A6A] text-xs font-bold w-4 flex-shrink-0">{a.rank}</div>
                <div
                  className={`w-[34px] h-[34px] rounded-full bg-gradient-to-br ${a.grad} flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0`}
                >
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{a.name}</span>
                    <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded font-semibold">
                      Live
                    </span>
                  </div>
                  <div className="h-1 bg-[#1C1C34] rounded-full mt-2">
                    <div className="h-1 bg-[#22C55E] rounded-full" style={{ width: a.ready }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-white text-base font-bold leading-none">0</div>
                  <div className="text-[#4A4A6A] text-[10px] mt-1">calls</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Intelligence */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">Lead Intelligence</h3>
            <span className="text-[#4A4A6A] text-[10px]">AI-qualified hot leads</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { v: "0", l: "Avg Score" },
              { v: "0", l: "Signals" },
              { v: "—", l: "Top Channel" },
            ].map((s) => (
              <div key={s.l} className="bg-[#06060F] rounded-lg p-3 text-center">
                <div className="text-white font-bold text-xl">{s.v}</div>
                <div className="text-[#4A4A6A] text-[10px] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 py-4 text-center">
            <BarChart3 size={32} className="text-[#1C1C34] mx-auto" />
            <div className="text-[#4A4A6A] text-xs mt-2">No qualified leads yet</div>
            <div className="text-[#4A4A6A] text-[11px] mt-1">
              Leads with 60%+ scores appear here
            </div>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">System Activity</h3>
            <button className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">Full Log →</button>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4 mb-4">
            {[
              { v: "2", l: "EVENTS" },
              { v: "2", l: "SUCCESS" },
              { v: "0", l: "WARNINGS" },
              { v: "0", l: "INFO" },
            ].map((s) => (
              <div key={s.l} className="bg-[#06060F] rounded-lg px-2 py-2 text-center">
                <div className="text-white font-bold text-base">{s.v}</div>
                <div className="text-[#4A4A6A] text-[10px] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {[
              { event: "Agent Online", sub: "Sarah · Agent", time: "< 1 min ago" },
              { event: "Agent Online", sub: "Ella · Agent", time: "< 1 min ago" },
            ].map((a, idx, arr) => (
              <div
                key={idx}
                className={`flex items-center gap-3 py-2 ${
                  idx !== arr.length - 1 ? "border-b border-[#1C1C34]/40" : ""
                }`}
              >
                <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium">{a.event}</div>
                  <div className="text-[#4A4A6A] text-[11px]">{a.sub}</div>
                </div>
                <span className="text-[#4A4A6A] text-[10px] ml-auto">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 7: Campaign Performance */}
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">
              Campaign Performance
            </h3>
            <p className="text-[#4A4A6A] text-[11px] mt-0.5">
              Last 30 days · WhatsApp + SMS
            </p>
          </div>
          <button className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">
            View All Campaigns →
          </button>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div style={{ width: "100%", height: 180 }}>
              <ResponsiveContainer>
                <BarChart
                  data={[
                    { name: "Recall May", sent: 450, opened: 306, replied: 89 },
                    { name: "Promo Jun", sent: 280, opened: 168, replied: 42 },
                    { name: "Follow-up", sent: 320, opened: 246, replied: 78 },
                    { name: "Reminder", sent: 180, opened: 144, replied: 61 },
                    { name: "Newsletter", sent: 520, opened: 291, replied: 47 },
                    { name: "No-Show", sent: 95, opened: 82, replied: 71 },
                  ]}
                  margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C1C34" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#4A4A6A", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#4A4A6A", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={28}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(123,92,252,0.05)" }}
                    contentStyle={{
                      background: "#141428",
                      border: "1px solid #1C1C34",
                      borderRadius: 12,
                      color: "#fff",
                      fontSize: 13,
                      padding: 12,
                    }}
                  />
                  <Bar dataKey="sent" fill="#1C1C34" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="opened" fill="#7B5CFC" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="replied" fill="#00D4AA" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 justify-center mt-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#1C1C34]" />
                <span className="text-[#8B8FA8] text-xs">Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#7B5CFC]" />
                <span className="text-[#8B8FA8] text-xs">Opened</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00D4AA]" />
                <span className="text-[#8B8FA8] text-xs">Replied</span>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "8", l: "Campaigns", d: "this month", dc: "#4A4A6A", db: "#1C1C34" },
                { v: "68%", l: "Avg Open Rate", d: "+4% ↑", dc: "#22C55E", db: "#22C55E1A" },
                { v: "34%", l: "Reply Rate", d: "+2% ↑", dc: "#22C55E", db: "#22C55E1A" },
                { v: "2,847", l: "Delivered", d: "97.2% delivery", dc: "#9B84FF", db: "#7B5CFC1F" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 text-center"
                >
                  <div className="text-white font-[700] text-[22px] tracking-[-0.03em] leading-none">
                    {s.v}
                  </div>
                  <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1">
                    {s.l}
                  </div>
                  <span
                    className="inline-block text-[10px] mt-2 px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: s.db, color: s.dc }}
                  >
                    {s.d}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-2">
                Top Campaign
              </div>
              <div className="bg-[#06060F] border border-[#22C55E]/20 rounded-xl p-3">
                <div className="flex justify-between items-start">
                  <span className="text-white text-xs font-semibold">Recall May Campaign</span>
                  <span className="text-[#22C55E] text-xs font-semibold">91% open</span>
                </div>
                <div className="text-[#4A4A6A] text-[11px] mt-1">
                  450 recipients · 3 days ago
                </div>
                <div className="h-1 bg-[#1C1C34] rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-[#22C55E] rounded-full" style={{ width: "91%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

