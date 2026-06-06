import { createFileRoute } from "@tanstack/react-router";
import { Activity, Phone, PhoneCall, Eye, Clock, RefreshCw, Sparkles, Search, PhoneOff, MessageSquare, Shield, Heart, Headphones, Volume2, UserCheck } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/live-monitoring")({ component: LiveMonitoring });

function LiveMonitoring() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-5 gap-3 flex-shrink-0">
        <Activity size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Live Monitoring</span>
        <span className="bg-[#F59E0B]/12 text-amber-400 text-[10px] px-2 py-0.5 rounded-full">Standby</span>
        <div className="flex items-center gap-3 ml-4">
          {[[Phone, "#22C55E", "0", "connected"], [PhoneCall, "#F59E0B", "0", "ringing"], [Eye, "#3B82F6", "0", "monitored"], [Clock, "#8B8FA8", "0:00", "avg"]].map(([Icon, c, v, l]: any) => (
            <div key={l} className="flex items-center gap-1.5"><Icon size={12} style={{ color: c }} /><span className="text-white text-xs">{v}</span><span className="text-[#4A4A6A] text-[10px]">{l}</span></div>
          ))}
        </div>
        <div className="ml-auto flex gap-2"><button className="text-[#8B8FA8] p-1"><RefreshCw size={14} /></button><button className="h-7 px-3 rounded bg-[#7B5CFC]/12 text-[#7B5CFC] border border-[#7B5CFC]/20 text-xs">Simulate ✨</button></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[320px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-4 py-3 border-b border-[#1C1C34] flex items-center gap-2"><Activity size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Call Queue</span><span className="bg-[#1C1C34] text-[#4A4A6A] text-[10px] rounded-full px-1.5">0</span></div>
          <div className="px-3 py-2 border-b border-[#1C1C34]"><div className="relative"><Search size={12} className="absolute left-2.5 top-2 text-[#4A4A6A]" /><input placeholder="Search calls..." className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg pl-7 pr-3 py-1.5 text-xs text-[#8B8FA8]" /></div></div>
          <div className="px-3 py-2 border-b border-[#1C1C34] flex gap-2">
            {["All", "Active", "Ringing", "Positive"].map((t, i) => <button key={t} className={`px-2 py-0.5 text-[11px] rounded ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>)}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <PhoneOff size={36} className="text-[#1C1C34] mb-3" />
            <div className="text-[#4A4A6A] text-sm">No Active Calls</div>
            <div className="text-[#4A4A6A] text-xs mt-1 max-w-[180px] leading-relaxed mb-4">Calls will appear here in real-time when they connect.</div>
            <button className="h-8 px-3 rounded border border-[#7B5CFC]/30 text-[#7B5CFC] text-xs">Simulate Call ✨</button>
          </div>
          <div className="px-4 py-2.5 border-t border-[#1C1C34] flex justify-between text-[11px] text-[#4A4A6A]"><span>0 positive · 0 negative</span><span>0:00 avg</span></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F]">
          <div className="relative mb-6">
            <div className="absolute inset-0 w-24 h-24 -left-3 -top-3 border-2 border-[#7B5CFC]/20 rounded-full animate-ping" />
            <div className="w-[72px] h-[72px] bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 rounded-full flex items-center justify-center"><Activity size={36} className="text-[#7B5CFC]/60" /></div>
          </div>
          <div className="text-white font-bold text-xl mb-2">Command Center Ready</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Select a call from the queue to access live transcripts, AI coaching, and real-time intervention controls.</p>

          <div className="flex gap-3 justify-center mb-8">
            {[["#22C55E", "Voice Engine"], ["#3B82F6", "AI Pipeline"], ["#7B5CFC", "Transcription"], ["#00D4AA", "Realtime"]].map(([c, l]: any) => (
              <div key={l} className="bg-[#06060F] border border-[#1C1C34] rounded-full px-3 py-1.5 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} /><span className="text-[#8B8FA8] text-xs">{l}</span></div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-[380px] w-full">
            {[[MessageSquare, "#3B82F6", "Live Transcript", "Real-time speech-to-text"], [Sparkles, "#7B5CFC", "AI Coaching", "Context-aware suggestions"], [Shield, "#F59E0B", "Safety Guard", "Automated compliance"], [Heart, "#00D4AA", "Sentiment", "Live emotion tracking"]].map(([Icon, c, n, d]: any) => (
              <div key={n} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
                <Icon size={16} style={{ color: c }} />
                <div className="text-white text-sm font-medium mt-2">{n}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{d}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center mt-6">
            {[[Headphones, "Listen", "⌘1"], [Volume2, "Whisper", "⌘2"], [PhoneCall, "Barge", "⌘3"], [UserCheck, "Takeover", "⌘4"]].map(([Icon, l, k]: any) => (
              <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#7B5CFC]/30">
                <Icon size={20} className="text-[#4A4A6A]" />
                <span className="text-[#8B8FA8] text-xs">{l}</span>
                <span className="text-[9px] bg-[#06060F] text-[#4A4A6A] rounded px-1">{k}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
