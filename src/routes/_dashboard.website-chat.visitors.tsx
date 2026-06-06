import { createFileRoute } from "@tanstack/react-router";
import { Users, RefreshCw, UserPlus, Mail, Phone, Activity, TrendingUp, Search, Calendar, Globe, ChevronDown } from "lucide-react";
import { AreaChart, Area, CartesianGrid, XAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/_dashboard/website-chat/visitors")({ component: Visitors });

const METRICS: any[] = [
  [Users, "#00D4AA", "7", "Total Visitors", "+100%"],
  [UserPlus, "#22C55E", "3", "New Today", "+100%"],
  [Mail, "#3B82F6", "7", "With Email", "(100%)"],
  [Phone, "#F59E0B", "0", "With Phone", "(0%)"],
  [Activity, "#7B5CFC", "7", "Active Now", ""],
  [TrendingUp, "#FB923C", "100%", "Conversion", ""],
];

const TREND = Array.from({ length: 30 }, (_, i) => ({ d: `${i + 1}`, v: i === 29 ? 4 : 0, l: i === 29 ? 3 : 0 }));
const PIE = [{ name: "Email Only", value: 7, c: "#00D4AA" }];
const VISITORS: any[] = [
  ["D", "Daniyal", "1h ago", "daniyal@tasweequae.com"],
  ["A", "awwias", "4h ago", "awwias@ingenious.ae"],
  ["A", "awais", "4h ago", "awais@ingenious.ae"],
  ["A", "amin", "3d ago", "aminafra@gmail.com"],
  ["M", "Mohammad", "4d ago", "0508758963"],
  ["H", "Hammad", "4d ago", "hammadrza01@gmail.com"],
  ["A", "awals", "2d ago", "awais@ingenious.ae"],
];

function Visitors() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 flex items-center justify-center"><Users size={22} className="text-[#00D4AA]" /></div>
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Visitor Intelligence</h1>
              <p className="text-[#4A4A6A] text-sm">Track and analyze all website chat visitors</p>
            </div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2.5 py-1 rounded-full ml-2">7 Online</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs flex items-center gap-1">Last 30... <ChevronDown size={14} /></button>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map(([Icon, c, v, l, s]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-4">
            <Icon size={14} style={{ color: c }} />
            <div className="text-white font-bold text-xl mt-1">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
            <div className="text-[#22C55E] text-[10px]">{s}</div>
          </div>
        ))}
      </div>

      <div className="px-6 grid grid-cols-12 gap-5 mb-5">
        <div className="col-span-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center mb-3"><span className="text-white font-semibold text-sm">Visitor Trend</span><span className="text-[#4A4A6A] text-xs ml-2">Daily visitors and lead captures</span><div className="ml-auto flex gap-3 text-xs"><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#00D4AA]" /><span className="text-[#8B8FA8]">Visitors</span></span><span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#7B5CFC]" /><span className="text-[#8B8FA8]">Leads</span></span></div></div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={TREND}>
              <CartesianGrid stroke="#1C1C34" />
              <XAxis dataKey="d" stroke="#4A4A6A" fontSize={10} />
              <Area dataKey="v" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.1} />
              <Area dataKey="l" stroke="#7B5CFC" fill="#7B5CFC" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-4 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-white font-semibold text-sm">Lead Quality</div>
          <div className="text-[#4A4A6A] text-xs mb-2">Contact information captured</div>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart><Pie data={PIE} dataKey="value" innerRadius={35} outerRadius={55}>{PIE.map((e, i) => <Cell key={i} fill={e.c} />)}</Pie></PieChart>
          </ResponsiveContainer>
          <div className="flex items-center mt-2"><div className="w-2 h-2 rounded-full bg-[#00D4AA]" /><span className="text-[#8B8FA8] text-xs ml-2">Email Only</span><span className="text-white font-bold ml-auto">7</span></div>
        </div>
      </div>

      <div className="px-6">
        <div className="flex items-center gap-3 mb-4">
          <Users size={14} className="text-[#00D4AA]" />
          <span className="text-white font-semibold text-sm">All Visitors</span>
          <span className="bg-[#00D4AA]/12 text-[#00D4AA] text-[10px] px-1.5 rounded-full">7</span>
          <div className="ml-auto flex gap-2 items-center">
            <div className="relative"><Search size={12} className="absolute left-2.5 top-2 text-[#4A4A6A]" /><input placeholder="Search visitors..." className="bg-[#06060F] border border-[#1C1C34] rounded-lg pl-7 pr-3 py-1.5 text-xs text-[#8B8FA8] w-48" /></div>
            <select className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 py-1.5 text-xs text-[#8B8FA8]"><option>All Status</option></select>
            <select className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 py-1.5 text-xs text-[#8B8FA8]"><option>All Contacts</option></select>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
          <div className="bg-[#06060F] h-10 flex items-center px-5 text-[#4A4A6A] text-[11px] uppercase tracking-wider">
            <input type="checkbox" className="mr-3" />
            <div className="w-48">Visitor</div><div className="w-56">Contact Info</div><div className="w-40">Source</div><div className="w-24">Widget</div><div className="w-40">Timeline</div><div>Status</div>
          </div>
          {VISITORS.map(([i, n, t, e]: any, idx: number) => (
            <div key={idx} className="border-b border-[#1C1C34]/50 last:border-0 px-5 py-3 flex items-center">
              <input type="checkbox" className="mr-3" />
              <div className="w-48 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4AA]/20 to-[#7B5CFC]/20 text-white text-xs font-bold flex items-center justify-center">{i}</div>
                <div><div className="text-white text-sm font-semibold">{n}</div><div className="text-[#4A4A6A] text-xs">about {t}</div></div>
              </div>
              <div className="w-56 flex items-center gap-2 text-xs"><Mail size={12} className="text-[#4A4A6A]" /><span className="text-[#4A4A6A]">{e}</span></div>
              <div className="w-40 flex items-center gap-1 text-xs"><Globe size={12} className="text-[#4A4A6A]" /><span className="text-[#4A4A6A] truncate">/widget-preview/4...</span></div>
              <div className="w-24"><span className="bg-[#00D4AA]/12 text-[#00D4AA] text-xs rounded-full px-2 py-0.5">chat</span></div>
              <div className="w-40 flex items-center gap-1 text-xs"><Calendar size={12} className="text-[#4A4A6A]" /><span className="text-[#4A4A6A]">Jun {idx + 1}, 2026</span></div>
              <div><span className="bg-[#22C55E]/12 text-[#22C55E] text-xs rounded-full px-2 py-0.5">active</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
