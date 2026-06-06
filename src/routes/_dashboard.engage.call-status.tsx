import { createFileRoute } from "@tanstack/react-router";
import { Phone, CheckCircle, PhoneOff, Star, Search, Download } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/call-status")({ component: CallStatus });

const M: any[] = [[Phone, "#3B82F6", "0", "Total Calls"], [CheckCircle, "#00D4AA", "0", "Answered"], [PhoneOff, "#F59E0B", "0", "Unreachable"], [Star, "#22C55E", "0", "Qualified"]];

function CallStatus() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 flex items-center justify-center"><Phone size={22} className="text-[#22C55E]" /></div>
          <div className="flex items-center gap-2">
            <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Lead Call Status</h1><p className="text-[#4A4A6A] text-sm">Track every auto-call attempt, answer status, and qualification result</p></div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2.5 py-1 rounded-full ml-2">Live</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-4">
        {M.map(([Icon, c, v, l]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-5">
            <Icon size={16} style={{ color: c }} />
            <div className="text-white font-bold text-2xl mt-2">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search by lead name or phone..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>All statuses</option></select>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2"><Download size={14} /> Export CSV</button>
      </div>

      <div className="px-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center">
          <Phone size={56} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No call records yet</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Auto-calls will appear here once leads are registered with valid phone numbers.</p>
          <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">+ Add Leads</button>
        </div>
      </div>
    </div>
  );
}
