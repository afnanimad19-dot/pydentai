import { createFileRoute } from "@tanstack/react-router";
import { Users, Sparkles, Upload, Users2, UserPlus, CheckCircle, Flame, Percent, Phone, Search, BarChart2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/leads")({ component: Leads });

const METRICS: any[] = [
  [Users2, "#7B5CFC", "0", "Total Leads"],
  [UserPlus, "#3B82F6", "0", "New Leads"],
  [CheckCircle, "#00D4AA", "0", "Qualified"],
  [Flame, "#FF4D6D", "0", "Hot Leads"],
  [Percent, "#22C55E", "0%", "Conversion Rate"],
  [Phone, "#F59E0B", "0", "Avg. Calls/Lead"],
];

const STAGES: any[] = [
  ["New", "#7B5CFC"], ["Pending", "#3B82F6"], ["In Progress", "#F59E0B"],
  ["Qualified", "#22C55E"], ["Not Qualified", "#FF4D6D"], ["Calling", "#00D4AA"],
];

function Leads() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center"><Users size={22} className="text-[#7B5CFC]" /></div>
          <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Leads</h1><p className="text-[#4A4A6A] text-sm">Manage your pipeline, track engagement, and convert leads</p></div>
        </div>
        <div className="flex gap-2 items-center text-xs">
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8]">Duplicates</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center gap-1.5"><Sparkles size={12} /> AI Score All</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8]">Score Filtered...</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8]">Schedule</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center gap-1.5"><Upload size={12} /> Import CSV</button>
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] text-white font-semibold">+ Add Lead</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map(([Icon, c, v, l]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-4">
            <Icon size={14} style={{ color: c }} />
            <div className="text-white font-bold text-xl mt-1">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2"><BarChart2 size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Pipeline Overview</span><span className="text-[#4A4A6A] text-xs ml-auto">0 total leads</span></div>
          <div className="grid grid-cols-6 gap-2 mt-4">
            {STAGES.map(([n, c]: any) => (
              <div key={n} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3">
                <div className="text-[#4A4A6A] text-[10px] uppercase">{n}</div>
                <div className="text-white font-bold text-lg">0</div>
                <div className="h-1 bg-[#1C1C34] rounded mt-2 overflow-hidden"><div style={{ background: c, width: "0%" }} className="h-full" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search by name, phone, email, or company..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {["All", "Hot 🔥", "Warm", "Cold"].map((t, i) => <button key={t} className={`px-3 py-1 text-xs rounded ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>)}
        </div>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">More</button>
      </div>

      <div className="px-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <Users2 size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No leads found</div>
          <p className="text-[#4A4A6A] text-sm mb-8">Add your first lead or import contacts to get started.</p>
          <div className="flex gap-3">
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2"><Upload size={14} /> Import CSV</button>
            <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">+ Add Lead</button>
          </div>
        </div>
      </div>
    </div>
  );
}
