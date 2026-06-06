import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, RefreshCw, Search, Send, X } from "lucide-react";

export const Route = createFileRoute("/_dashboard/sms/campaigns")({ component: SmsCampaigns });

const METRICS = [
  { l: "Total", v: "0", sub: "0 drafts" },
  { l: "Active", v: "0", sub: "Sending now" },
  { l: "Scheduled", v: "0", sub: "Queued" },
  { l: "Sent", v: "0", sub: "0 delivered" },
  { l: "Delivery", v: "0%", sub: "Low", subColor: "text-[#FF4D6D]" },
  { l: "Click Rate", v: "0%", sub: "0 clicks" },
  { l: "Reply Rate", v: "0%", sub: "0 replies" },
  { l: "Failed", v: "0", sub: "Healthy", subColor: "text-[#22C55E]" },
];

const TABS = [
  ["All", 0], ["Draft", 0], ["Scheduled", 0], ["Sending", 0], ["Completed", 0], ["Paused", 0], ["Failed", 0],
] as const;

function SmsCampaigns() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("Promotional");
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
            <Send size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Campaigns</h1>
            <p className="text-[#4A4A6A] text-sm">Create, manage & track campaigns · 0 total</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ New Campaign</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map((m) => (
          <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 text-center min-w-[120px]">
            <div className="text-white font-bold text-xl">{m.v}</div>
            <div className="text-[#8B8FA8] text-xs">{m.l}</div>
            <div className={`text-[10px] ${m.subColor ?? "text-[#4A4A6A]"}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-3 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search campaigns..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All Status</option></select>
        <div className="ml-auto text-[#4A4A6A] text-xs">0 results</div>
      </div>

      <div className="px-6 mb-4 flex gap-1">
        {TABS.map(([label, n], i) => (
          <button key={label} className={i === 0
            ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
            : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{label} {n}</button>
        ))}
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <MessageSquare size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No campaigns yet</div>
          <div className="text-[#4A4A6A] text-sm text-center mb-8">Get started by creating your first SMS campaign</div>
          <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ Create Campaign</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[600px] w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-white font-semibold text-lg">New SMS Campaign</div>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Campaign Name</label>
                <input placeholder="e.g., Appointment Reminder June" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Campaign Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Promotional", "Transactional", "Reminder"].map((t) => (
                    <button key={t} onClick={() => setType(t)} className={`p-3 rounded-xl border text-sm ${type === t ? "border-[#3B82F6] bg-[#3B82F6]/[0.06] text-white" : "border-[#1C1C34] bg-[#06060F] text-[#8B8FA8]"}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Message</label>
                <textarea className="w-full min-h-[100px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#3B82F6]/40" />
                <div className="flex justify-between mt-1 text-xs"><span className="text-[#4A4A6A]">0/160</span><span className="text-[#3B82F6]">1 segment</span></div>
                <div className="flex items-center gap-2 mt-2 text-[#F59E0B] text-[11px]"><span>⚠</span> STOP to opt-out</div>
                <label className="flex items-center gap-2 mt-1 text-[#8B8FA8] text-xs"><input type="checkbox" defaultChecked /> Include opt-out message</label>
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Audience</label>
                <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-[#8B8FA8] text-sm"><option>All Contacts</option><option>Specific Group</option></select>
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Schedule</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-[#8B8FA8] text-sm"><input type="checkbox" /> Send Now</label>
                  <input type="datetime-local" className="flex-1 h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-[#8B8FA8] text-sm" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setOpen(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Cancel</button>
              <button className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Create Campaign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
