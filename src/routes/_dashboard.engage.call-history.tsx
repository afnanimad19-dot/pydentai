import { createFileRoute } from "@tanstack/react-router";
import { Phone, RefreshCw, Clock, CheckCircle, Headphones, Timer, BarChart, Search, Download, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/call-history")({ component: CallHistory });

const M: any[] = [[Phone, "#3B82F6", "2", "Total Calls"], [Clock, "#F59E0B", "0:14", "Avg Duration"], [CheckCircle, "#22C55E", "100%", "Success Rate"], [Headphones, "#7B5CFC", "0", "Recordings"], [Timer, "#00D4AA", "0m", "Total Time"]];

const CALLS: any[] = [
  ["D", "Demo Lead – Sarah Johnson", "+971 55 123 4567", "8:22", "4:35 AM"],
  ["D", "Demo Lead – Sarah Johnson", "+971 55 123 4567", "8:05", "4:34 AM"],
];

function CallHistory() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 flex items-center justify-center"><Phone size={22} className="text-[#00D4AA]" /></div>
          <div className="flex items-center gap-2">
            <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Call History</h1><p className="text-[#4A4A6A] text-sm">Browse, analyze & manage all voice conversations</p></div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-0.5 rounded-full ml-2">Live</span>
            <span className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-2 py-0.5 rounded-full">2 calls</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Sync</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button>
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold flex items-center gap-2"><BarChart size={14} /> Reports</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-5 gap-4">
        {M.map(([Icon, c, v, l]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-5">
            <Icon size={16} style={{ color: c }} />
            <div className="text-white font-bold text-2xl mt-2">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search calls, contacts, notes..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>All Time</option></select>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>All Status</option></select>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Filters</button>
      </div>

      <div className="px-6 space-y-2">
        {CALLS.map(([i, n, p, d, t]: any, idx: number) => (
          <div key={idx} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 hover:border-[#00D4AA]/20 cursor-pointer flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-[#7B5CFC]/20 text-[#9B84FF] text-sm font-bold flex items-center justify-center">{i}</div>
            <div className="flex-1"><div className="text-white text-sm font-semibold">{n}</div><div className="text-[#4A4A6A] text-xs">{p}</div></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <div className="flex items-center gap-1"><Clock size={12} className="text-[#4A4A6A]" /><span className="text-white text-sm font-medium">{d}</span></div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs rounded-full px-2 py-0.5">Completed</span>
            <span className="text-[#4A4A6A] text-xs">{t}</span>
            <Download size={14} className="text-[#1C1C34]" />
            <ChevronRight size={14} className="text-[#1C1C34]" />
          </div>
        ))}
      </div>

      <div className="px-6 mt-4 text-[11px] text-[#4A4A6A]">2 results</div>
    </div>
  );
}
