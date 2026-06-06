import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Upload, UploadCloud, Users, X } from "lucide-react";

export const Route = createFileRoute("/_dashboard/sms/contacts")({ component: SmsContacts });

const METRICS = [
  ["Total", "0", "0 this week"], ["Active", "0", "0% of total"],
  ["Unsubscribed", "0", ""], ["Invalid", "0", ""],
  ["Messages", "0", "Total sent"], ["With Email", "0", "0% coverage"],
  ["Tagged", "0", "0% tagged"], ["Recent", "0", "Last 7 days"],
] as const;
const TABS = ["All", "Active", "Unsubscribed", "Bounced", "Invalid"];

function SmsContacts() {
  const [add, setAdd] = useState(false);
  const [imp, setImp] = useState(false);
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
            <Users size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Contacts</h1>
            <p className="text-[#4A4A6A] text-sm">0 contacts · 0 active · 0 with email</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Export</button>
          <button onClick={() => setImp(true)} className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Import</button>
          <button onClick={() => setAdd(true)} className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ Add Contact</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map(([l, v, sub]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 text-center min-w-[120px]">
            <div className="text-white font-bold text-xl">{v}</div>
            <div className="text-[#8B8FA8] text-xs">{l}</div>
            {sub && <div className="text-[#4A4A6A] text-[10px]">{sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-1">
        {TABS.map((t, i) => (
          <button key={t} className={i === 0
            ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
            : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{t} 0</button>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search name, phone, email, tags..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
        </div>
        <div className="text-[#4A4A6A] text-xs">0 results</div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <Users size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No contacts found</div>
          <div className="text-[#4A4A6A] text-sm mb-8">Add contacts manually or import from a CSV file</div>
          <div className="flex gap-3">
            <button onClick={() => setImp(true)} className="h-10 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><Upload size={14} /> Import CSV</button>
            <button onClick={() => setAdd(true)} className="h-10 px-5 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Add Contact</button>
          </div>
        </div>
      </div>

      {add && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setAdd(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[480px] w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2"><Users size={16} className="text-[#3B82F6]" /><span className="text-white font-semibold text-lg">Add SMS Contact</span></div>
              <button onClick={() => setAdd(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name" className="h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <input placeholder="Last Name" className="h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Phone Number *</label>
                <div className="flex gap-2">
                  <span className="h-10 px-3 bg-[#06060F] border border-[#1C1C34] rounded-xl flex items-center text-[#8B8FA8] text-sm">+971</span>
                  <input className="flex-1 h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                </div>
              </div>
              <input placeholder="Email (optional)" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              <input placeholder="Add tags..." className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setAdd(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Cancel</button>
              <button className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Add Contact</button>
            </div>
          </div>
        </div>
      )}

      {imp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setImp(false)}>
          <div onClick={(e) => e.stopPropagation()} className="max-w-[520px] w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2"><Upload size={16} className="text-[#3B82F6]" /><span className="text-white font-semibold text-lg">Import SMS Contacts</span></div>
              <button onClick={() => setImp(false)} className="text-[#8B8FA8]"><X size={18} /></button>
            </div>
            <div className="bg-[#06060F] border-2 border-dashed border-[#1C1C34] rounded-xl p-10 text-center">
              <UploadCloud size={40} className="text-[#3B82F6]/50 mx-auto mb-3" />
              <div className="text-white text-sm">Drop CSV file here or click to browse</div>
              <div className="text-[#4A4A6A] text-xs mt-1">.csv format · max 10MB</div>
            </div>
            <div className="text-[#4A4A6A] text-[11px] mt-3">CSV must include: phone (required), name, email</div>
            <a className="text-[#3B82F6] text-xs cursor-pointer">Download template</a>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setImp(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Cancel</button>
              <button className="h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Import Contacts</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
