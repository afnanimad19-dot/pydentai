import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, RefreshCw, MessageSquare, Users, Bot, Clock, TrendingUp, Activity, UserPlus, Star } from "lucide-react";

export const Route = createFileRoute("/_dashboard/website-chat/reports")({ component: WCReports });

const METRICS: any[] = [
  [MessageSquare, "#00D4AA", "0", "Conversations"],
  [Users, "#3B82F6", "0", "Visitors"],
  [Bot, "#7B5CFC", "0%", "AI Resolution"],
  [Clock, "#F59E0B", "N/A", "Avg Response"],
  [TrendingUp, "#22C55E", "0%", "Conversion"],
  [Activity, "#FB923C", "0", "Active Now"],
  [UserPlus, "#00D4AA", "0", "New Visitors"],
  [Star, "#EAB308", "0", "Score"],
];

function WCReports() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 flex items-center justify-center"><BarChart3 size={22} className="text-[#00D4AA]" /></div>
          <div className="flex items-center gap-2">
            <div>
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Website Chat Analytics</h1>
              <p className="text-[#4A4A6A] text-sm">Widget performance, visitor engagement & AI resolution</p>
            </div>
            <span className="bg-[#F59E0B]/12 text-[#F59E0B] text-[10px] px-2 py-0.5 rounded-full ml-2">No Data</span>
            <span className="text-[#4A4A6A] text-xs ml-2">May 7 – Jun 6, 2026</span>
          </div>
        </div>
        <div className="flex gap-2"><button className="h-9 w-9 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><RefreshCw size={14} /></button><button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button></div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-8 gap-3">
        {METRICS.map(([Icon, c, v, l]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3">
            <Icon size={14} style={{ color: c }} />
            <div className="text-white font-bold text-lg mt-1">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center">
          <MessageSquare size={56} className="text-[#1C1C34] mb-5" />
          <div className="text-white font-bold text-xl mb-2">No Website Chat Data Yet</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-md mb-8">Create a chat widget and embed it on your website to start collecting visitor engagement data.</p>
          <div className="flex gap-6">
            {[["1", "Create Widget"], ["2", "Embed Code"], ["3", "See Analytics"]].map(([n, t]) => (
              <div key={n} className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-5 py-4 text-center w-[180px]">
                <div className="w-7 h-7 rounded-full bg-[#00D4AA]/15 text-[#00D4AA] font-bold text-sm mx-auto mb-2 flex items-center justify-center">{n}</div>
                <div className="text-white text-sm font-semibold">{t}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button className="h-10 px-5 rounded-lg bg-[#00D4AA] text-black text-sm font-semibold">+ New Widget</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">View Widgets</button>
          </div>
        </div>
      </div>
    </div>
  );
}
