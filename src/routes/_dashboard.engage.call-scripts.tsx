import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Search } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/call-scripts")({ component: CallScripts });

const STATS: any[] = [["Scripts", "#7B5CFC", "0"], ["Active", "#22C55E", "0"], ["Total Uses", "#00D4AA", "0"], ["Languages", "#F59E0B", "0"]];

function CallScripts() {
  return (
    <div className="font-sans pb-6">
      <div className="bg-gradient-to-br from-[#7B5CFC]/8 to-[#0B0B1A] border border-[#7B5CFC]/20 rounded-xl mx-6 mt-6 p-8 mb-5">
        <div className="flex justify-between items-start gap-6">
          <div>
            <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full mb-3 inline-flex items-center gap-1"><Sparkles size={12} /> AI-guided conversations</span>
            <h1 className="text-white font-extrabold text-[28px] tracking-[-0.04em] mb-2 mt-3">Call Scripts Studio</h1>
            <p className="text-[#8B8FA8] text-sm max-w-[500px] leading-relaxed mb-5">Design adaptive scripts your AI agents follow during live calls. The right script is auto-selected per lead based on language, source, and intent — and improved by every conversation.</p>
            <div className="flex gap-3">
              <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">+ New script</button>
              <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2"><Sparkles size={14} /> Start from template</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {STATS.map(([l, c, v]: any) => (
              <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 w-32">
                <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{l}</div>
                <div className="w-7 h-7 rounded-full mt-2" style={{ background: `${c}25` }} />
                <div className="text-white font-bold text-2xl">{v}</div>
                <div className="h-0.5 mt-2 rounded" style={{ background: c }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mb-4 flex gap-3">
        <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search by name, source, tag..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>All status</option></select>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>All languages</option></select>
        <select className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-sm"><option>Highest priority</option></select>
      </div>

      <div className="px-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-16 flex flex-col items-center">
          <div className="w-[72px] h-[72px] bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 rounded-2xl flex items-center justify-center mb-5"><Sparkles size={36} className="text-[#7B5CFC]/50" /></div>
          <div className="text-white font-bold text-xl mb-2">No scripts match your filters</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Try clearing filters, or create a new guided script the AI will follow during calls.</p>
          <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">+ Create script</button>
        </div>
      </div>
    </div>
  );
}
