import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Folder, List, RefreshCw, Search, Users, X } from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/contacts")({ component: EmailContacts });

const METRICS = [
  ["Total Lists", "1", "Active", "text-[#22C55E]"],
  ["Subscribers", "1", "Active"],
  ["Active Lists", "1", "Live"],
  ["Avg Size", "1", "Active"],
  ["Active Rate", "100%", ""],
  ["Avg Opens", "—", ""], ["Avg Clicks", "—", ""],
  ["New (30d)", "—", ""], ["Unsub Rate", "—", ""], ["Health", "—", ""],
] as const;

function EmailContacts() {
  const [open, setOpen] = useState(false);
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
            <Users size={22} className="text-[#6366F1]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Contact Management</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">Pro</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">4 Modules</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Lists · Subscribers · Segments · Health Monitoring</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm">Add Contact</button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold">+ New List</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map(([l, v, sub, color]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[120px]">
            <div className="text-[#8B8FA8] text-xs">{l}</div>
            <div className="text-white font-bold text-xl mt-1">{v}</div>
            {sub && <div className={`text-[10px] ${color ?? "text-[#4A4A6A]"}`}>{sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 flex gap-4 border-b border-[#1C1C34] mb-5">
        {["All Lists 1", "Active 1", "Insights", "Health"].map((t, i) => (
          <button key={t} className={i === 0 ? "px-1 pb-3 border-b-2 border-[#6366F1] text-white text-sm font-medium" : "px-1 pb-3 text-[#8B8FA8] text-sm hover:text-white"}>{t}</button>
        ))}
      </div>

      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search lists..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#6366F1]/40" />
        </div>
        <select className="ml-auto h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>Latest</option></select>
      </div>

      <div className="px-6 grid grid-cols-4 gap-4">
        <div className="bg-[#0B0B1A] border border-[#22C55E]/30 rounded-xl overflow-hidden">
          <div className="h-0.5 bg-gradient-to-r from-[#22C55E] to-transparent" />
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" />
              <Folder size={16} className="text-[#6366F1]" />
              <span className="ml-auto bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="text-white text-sm font-semibold">Promotional</div>
            <div className="text-[#4A4A6A] text-xs">Promotional Email</div>
            <span className="inline-block mt-2 bg-[#6366F1]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">Marketing</span>
          </div>
          <div className="px-4 pb-4 grid grid-cols-3 gap-3">
            {[["1", "Contacts"], ["0%", "Opens"], ["0%", "Clicks"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-white text-sm font-semibold">{v}</div>
                <div className="text-[#4A4A6A] text-[10px]">{l}</div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-[#1C1C34] flex justify-between items-center">
            <div className="flex items-center gap-1 text-[#4A4A6A] text-[11px]"><CalendarDays size={12} /> 4 days ago</div>
            <span className="text-[#22C55E] text-xs">→ +0%</span>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[480px] w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2"><List size={16} className="text-[#6366F1]" /><span className="text-white font-semibold text-lg">Create Contact List</span></div>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">List Name</label>
                <input placeholder="e.g., Newsletter Subscribers" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Description</label>
                <textarea className="w-full min-h-[60px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Category</label>
                <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-[#8B8FA8] text-sm">
                  <option>Marketing</option><option>Transactional</option><option>Promotional</option><option>Newsletter</option><option>Other</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-[#8B8FA8] text-sm"><input type="checkbox" /> This list is GDPR compliant</label>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setOpen(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Cancel</button>
              <button className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">Create List</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
