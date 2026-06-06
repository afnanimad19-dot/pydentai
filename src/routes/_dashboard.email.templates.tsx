import { createFileRoute } from "@tanstack/react-router";
import { FileText, Layers, Search, Sparkles, Upload } from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/templates")({ component: EmailTemplates });

const METRICS = [
  ["Templates", "0", "+2"], ["Active", "0", "Live", "text-[#22C55E]"],
  ["Library", "10", "Curated", "text-[#00D4AA]"], ["Categories", "0", "+0"],
  ["Emails Sent", "0", "+12%"], ["Avg Opens", "0%", "+2.3%"],
  ["Avg Clicks", "0%", "+1.1%"], ["Favorites", "0", "+0"],
] as const;

const TABS = ["My Templates", "Library 10", "Favorites", "Analytics"];

const LIBRARY = [
  "Welcome Email", "Appointment Reminder", "Dental Newsletter", "Post-Treatment",
  "Recall Campaign", "Promotion", "Holiday", "Thank You", "Re-engagement", "New Patient",
];

function EmailTemplates() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
            <FileText size={22} className="text-[#6366F1]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Templates</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">Pro</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">4 Modules</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Design · Manage · Optimize · AI Generate</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><Upload size={14} /> Import</button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><Sparkles size={14} /> AI Generate</button>
          <button className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold">+ New Template</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map(([l, v, sub, color]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[120px]">
            <div className="text-[#8B8FA8] text-xs">{l}</div>
            <div className="text-white font-bold text-xl mt-1">{v}</div>
            <div className={`text-[10px] ${color ?? "text-[#4A4A6A]"}`}>{sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="flex gap-1">
          {TABS.map((t, i) => (
            <button key={t} className={i === 0
              ? "bg-[#6366F1]/12 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 text-xs rounded-full"
              : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{t}</button>
          ))}
        </div>
        <div className="relative ml-auto flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search templates..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#6366F1]/40" />
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <FileText size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No templates yet</div>
          <div className="text-[#4A4A6A] text-sm mb-8">Create your first email template, use AI, or pick from our library</div>
          <div className="flex gap-3">
            <button className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold flex items-center gap-2"><Sparkles size={14} /> AI Generate</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center gap-2"><Layers size={14} /> Library</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">+ Create</button>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-4">Library</div>
        <div className="grid grid-cols-4 gap-4">
          {LIBRARY.map((name) => (
            <div key={name} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden hover:border-[#6366F1]/30 transition-all cursor-pointer">
              <div className="h-40 bg-[#06060F] flex items-center justify-center p-4">
                <div className="w-full bg-white/[0.04] border border-[#1C1C34] rounded p-2 space-y-1.5">
                  <div className="h-3 bg-[#6366F1]/30 rounded w-1/2" />
                  <div className="h-1.5 bg-white/[0.06] rounded w-full" />
                  <div className="h-1.5 bg-white/[0.06] rounded w-full" />
                  <div className="h-1.5 bg-white/[0.06] rounded w-3/4" />
                  <div className="h-4 bg-[#6366F1]/40 rounded w-20 mt-2" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-white text-sm font-semibold">{name}</div>
                <div className="text-[#4A4A6A] text-xs">Curated · 0 uses</div>
                <button className="w-full h-8 text-xs border border-[#1C1C34] hover:border-[#6366F1]/40 text-[#8B8FA8] rounded-lg mt-2">Use Template</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
