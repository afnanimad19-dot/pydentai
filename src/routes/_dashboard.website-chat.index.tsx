import { createFileRoute } from "@tanstack/react-router";
import { Globe, RefreshCw, MessageSquare, Users, Mail, UserCheck, Phone, Activity, Zap, Target, Bot, TrendingUp, ThumbsUp, Minus, ThumbsDown, Clock, Sparkles, Settings, Code2, ChevronRight, ChevronDown } from "lucide-react";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/_dashboard/website-chat/")({ component: WebsiteChatDashboard });

const METRICS = [
  [Globe, "#00D4AA", "1", "Active Widgets", "of 1", ""],
  [MessageSquare, "#22C55E", "7", "Conversations", "+18% vs last period", "g"],
  [Users, "#3B82F6", "7", "Visitors", "+12% vs last period", "g"],
  [Mail, "#F59E0B", "60", "Messages", "+24% vs last period", "g"],
  [UserCheck, "#7B5CFC", "7", "Email Leads", "+5% vs last period", "g"],
  [Phone, "#FF4D6D", "0", "Phone Leads", "-2% vs last period", "r"],
] as any[];

const CHART = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({ d, c: [20, 35, 50, 75, 80, 60, 30][i], m: [8, 14, 20, 26, 28, 20, 10][i] }));
const PIE = [{ name: "Positive", value: 0, c: "#22C55E" }, { name: "Neutral", value: 7, c: "#F59E0B" }, { name: "Negative", value: 0, c: "#FF4D6D" }];
const HOURS = Array.from({ length: 24 }, (_, i) => ({ h: i, v: [1, 1, 0, 0, 0, 0, 2, 3, 4, 6, 7, 8, 9, 10, 14, 20, 18, 12, 9, 6, 4, 3, 2, 1][i] }));
const CONVOS = [["D", "Daniyal", "1h ago"], ["A", "awwias", "4h ago"], ["A", "awais", "4h ago"], ["A", "amin", "3d ago"], ["M", "Mohammad", "4d ago"]] as any[];

function WebsiteChatDashboard() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center"><Globe size={22} className="text-[#00D4AA]" /></div>
          <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Website Chat</h1><p className="text-[#4A4A6A] text-sm">Real-time visitor engagement and lead capture</p></div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs flex items-center gap-1">Last 7 days <ChevronDown size={14} /></button>
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button>
          <button className="h-9 px-4 rounded-lg bg-[#00D4AA] text-black text-sm font-semibold">+ New Widget</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map(([Icon, c, v, l, s, t]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3">
            <Icon size={14} style={{ color: c }} />
            <div className="text-white font-bold text-xl mt-1">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
            <div className={`text-[10px] mt-1 ${t === "r" ? "text-[#FF4D6D]" : "text-[#22C55E]"}`}>{s}</div>
          </div>
        ))}
      </div>

      <div className="px-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-4">
              <Activity size={14} className="text-[#00D4AA]" />
              <span className="text-white font-semibold text-[15px] ml-2">Conversation Activity</span>
              <span className="text-[#4A4A6A] text-xs ml-2">Daily chat volume and engagement</span>
              <div className="ml-auto flex gap-3 text-xs">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00D4AA]" /><span className="text-[#8B8FA8]">Conversations</span></span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#7B5CFC]" /><span className="text-[#8B8FA8]">Messages</span></span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={CHART}>
                <CartesianGrid stroke="#1C1C34" />
                <Area dataKey="c" stroke="#00D4AA" strokeWidth={2} fill="#00D4AA" fillOpacity={0.1} />
                <Area dataKey="m" stroke="#7B5CFC" strokeWidth={1.5} fill="#7B5CFC" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {([[Zap, "#22C55E", "1.2s", "Avg Response", "-0.3s faster"], [Target, "#3B82F6", "0%", "Completion Rate", ""], [Bot, "#00D4AA", "87%", "AI Handled", "15% escalated"], [TrendingUp, "#F59E0B", "50%", "Conversion Rate", "Visitors to leads"]] as any[]).map(([Icon, c, v, l, d]: any[]) => (
              <div key={l as string} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}><Icon size={16} style={{ color: c as string }} /></div>
                <div className="text-white font-bold text-[22px] mt-2 tracking-[-0.03em]">{v}</div>
                <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
                <div className="text-[#22C55E] text-[11px]">{d}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1C1C34] flex items-center">
              <MessageSquare size={14} className="text-[#00D4AA]" />
              <span className="text-white font-semibold text-sm ml-2">Recent Conversations</span>
              <span className="text-[#4A4A6A] text-[11px] ml-2">Latest chat interactions from your widgets</span>
              <button className="ml-auto text-[#00D4AA] text-xs">View All →</button>
            </div>
            {CONVOS.map(([i, n, t]) => (
              <div key={n} className="px-5 py-3.5 flex items-center gap-3 border-b border-[#1C1C34]/50 last:border-0 hover:bg-[#06060F] cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4AA]/20 to-[#7B5CFC]/20 text-white text-xs font-semibold flex items-center justify-center">{i}</div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{n}</div>
                  <div className="text-[#4A4A6A] text-[11px]">@chat · 0 messages · {t}</div>
                </div>
                <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded-full">active</span>
                <MessageSquare size={14} className="text-[#1C1C34]" />
                <ChevronRight size={14} className="text-[#1C1C34]" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Sparkles size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Sentiment Analysis</span></div>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart><Pie data={PIE} dataKey="value" innerRadius={35} outerRadius={55}>{PIE.map((e, i) => <Cell key={i} fill={e.c} />)}</Pie></PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {([[ThumbsUp, "#22C55E", "0", "Positive"], [Minus, "#F59E0B", "7", "Neutral"], [ThumbsDown, "#FF4D6D", "0", "Negative"]] as any[]).map(([Icon, c, v, l]: any[]) => (
                <div key={l as string} className="bg-[#06060F] rounded-lg p-2.5 text-center">
                  <Icon size={14} style={{ color: c as string }} className="mx-auto" />
                  <div className="text-white font-bold text-lg">{v}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3"><Clock size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Peak Hours</span></div>
            <div className="text-[#22C55E] text-xs mb-3">Peak: 3PM – 4PM</div>
            <ResponsiveContainer width="100%" height={80}>
              <BarChart data={HOURS}><Bar dataKey="v" fill="#7B5CFC" radius={[2, 2, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center"><Globe size={14} className="text-[#00D4AA]" /><span className="text-white font-semibold text-sm ml-2">Your Widgets</span><button className="ml-auto text-[#00D4AA] text-xs">View All →</button></div>
            <div className="flex items-center gap-3 bg-[#06060F] border border-[#1C1C34] rounded-lg px-4 py-3 mt-3">
              <div className="w-7 h-7 rounded-full bg-[#00D4AA]/15 flex items-center justify-center"><MessageSquare size={14} className="text-[#00D4AA]" /></div>
              <div className="flex-1"><div className="text-white text-sm font-medium">chat</div><div className="text-[#4A4A6A] text-xs">Chat widget</div></div>
              <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] rounded-full px-2 py-0.5">Active</span>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-3">Quick Actions</div>
            <div className="grid grid-cols-2 gap-2">
              {([[Globe, "#00D4AA", "Widgets"], [Users, "#3B82F6", "Visitors"], [Settings, "#8B8FA8", "Settings"], [Bot, "#7B5CFC", "AI Agents"]] as any[]).map(([Icon, c, l]: any[]) => (
                <div key={l as string} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#00D4AA]/30">
                  <Icon size={18} style={{ color: c as string }} />
                  <span className="text-[11px] text-[#8B8FA8]">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#00D4AA]/10 to-[#0B0B1A] border border-[#00D4AA]/20 rounded-xl p-5">
            <div className="flex items-center gap-2"><Code2 size={14} className="text-[#00D4AA]" /><span className="text-white font-semibold text-sm">Install Widget</span></div>
            <p className="text-[#4A4A6A] text-xs mt-1 mb-4">Add chat to your website with one line of code</p>
            <button className="w-full h-9 bg-[#00D4AA]/12 border border-[#00D4AA]/30 text-[#00D4AA] text-sm font-semibold rounded-lg">Get Embed Code</button>
          </div>
        </div>
      </div>
    </div>
  );
}
