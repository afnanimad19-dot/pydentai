import { createFileRoute } from "@tanstack/react-router";
import { Bell, RefreshCw, Layers, Send, CheckCircle, Clock, Mail, MessageSquare, Smartphone, MessageCircle, Settings, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/reminders")({ component: Reminders });

const M: any[] = [
  [Layers, "#3B82F6", "2", "Active Channels", "of 4 configured"],
  [Send, "#00D4AA", "231", "Total Sent", "last 30 days"],
  [CheckCircle, "#22C55E", "225", "Delivered", "97% rate"],
  [Clock, "#F59E0B", "0", "Pending Queue", "0 calls × 2 channels"],
];

const CHANNELS: any[] = [
  [true, Mail, "#6366F1", "Email", "Active", "#22C55E", "30 min before · 142 sent"],
  [false, MessageSquare, "#3B82F6", "SMS", "Off", "#8B8FA8", "Channel disabled"],
  [true, Smartphone, "#7B5CFC", "Push", "Active", "#22C55E", "5 min before · 89 sent"],
  [false, MessageCircle, "#22C55E", "WhatsApp", "Off", "#8B8FA8", "Channel disabled"],
];

function Reminders() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center"><Bell size={22} className="text-[#3B82F6]" /></div>
          <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Multi-Channel Reminders</h1><p className="text-[#4A4A6A] text-sm">Configure SMS, Email, Push & WhatsApp notifications</p></div>
        </div>
        <div className="flex gap-2"><button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Import</button><button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button><button className="h-9 w-9 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><RefreshCw size={14} /></button></div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-4">
        {M.map(([Icon, c, v, l, s]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-5">
            <Icon size={16} style={{ color: c }} />
            <div className="text-white font-bold text-2xl mt-2">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
            <div className="text-[#4A4A6A] text-[11px] mt-1">{s}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-5 flex gap-1 items-center">
        {["Channels", "Templates", "Analytics"].map((t, i) => <button key={t} className={`px-4 py-2 text-sm rounded ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>)}
        <button className="ml-auto h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">+ Add Channel</button>
      </div>

      <div className="px-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-3">
          {CHANNELS.map(([on, Icon, c, n, st, sc, stats]: any) => (
            <div key={n} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 flex items-center gap-4">
              <div className={`w-10 h-5 rounded-full relative ${on ? "bg-[#3B82F6]" : "bg-[#1C1C34]"}`}><div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full ${on ? "right-0.5" : "left-0.5"}`} /></div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}><Icon size={16} style={{ color: c }} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><span className="text-white font-semibold text-[15px]">{n}</span><span className="text-xs" style={{ color: sc }}>· {st}</span></div>
                <div className="text-[#4A4A6A] text-sm">{stats}</div>
              </div>
              <select className="bg-[#06060F] border border-[#1C1C34] rounded px-2 py-1 text-xs text-[#8B8FA8]"><option>30 min</option></select>
              <ChevronRight size={14} className="text-[#4A4A6A]" />
            </div>
          ))}
        </div>

        <div className="col-span-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 flex flex-col items-center justify-center h-full">
            <Settings size={36} className="text-[#1C1C34] mb-3" />
            <div className="text-[#4A4A6A] text-sm">Channel Details</div>
            <p className="text-[#4A4A6A] text-xs text-center mt-1">Select a channel to view configuration and performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
