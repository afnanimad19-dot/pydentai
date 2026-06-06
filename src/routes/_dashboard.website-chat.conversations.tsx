import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, RefreshCw, Zap, ThumbsUp, Clock, Search, ChevronRight, Paperclip, Smile, Send, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/_dashboard/website-chat/conversations")({ component: Conversations });

const CONVOS = [
  ["D", "Daniyal", "1h"], ["A", "awwias", "4h"], ["A", "awais", "4h"],
  ["A", "amin", "3d"], ["M", "Mohammad", "4d"], ["H", "Hammad", "4d"], ["A", "awals", "2d"],
];

const MSGS: any[] = [
  ["ai", "I'm Ella, an AI receptionist built by the Leila Hariri Dental & Sleep Apnea Clinic team. How can I assist you today?", "2:32 AM"],
  ["user", "R u a live person?", "2:33 AM"],
  ["ai", "I'm an AI. How can I help?", "2:33 AM"],
  ["user", "What are your services", "2:34 AM"],
  ["ai", "We offer general dentistry, cosmetic dentistry, orthodontics, teeth whitening, and sleep apnea treatment.", "2:34 AM"],
  ["user", "so I wanted teeth whitening", "2:35 AM"],
  ["ai", "For teeth whitening, I'd recommend booking with a General Practitioner. Would you like me to schedule an appointment?", "2:35 AM"],
  ["user", "Daniyal +971261996609", "2:36 AM"],
];

function Conversations() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <MessageSquare size={16} className="text-[#00D4AA]" />
        <span className="text-white font-semibold text-sm">Conversations</span>
        <span className="bg-[#22C55E]/12 text-[#22C55E] text-[11px] rounded-full px-2 py-0.5">7 Live</span>
        <span className="text-[#4A4A6A] text-xs ml-1">Manage and review all website chat interactions</span>
        <div className="ml-auto flex gap-2"><button className="text-[#8B8FA8] p-1"><RefreshCw size={14} /></button><button className="text-[#8B8FA8] text-xs h-7 px-3 rounded border border-[#1C1C34]">Export</button></div>
      </div>

      <div className="px-6 py-2.5 border-b border-[#1C1C34] flex items-center gap-6 text-xs flex-shrink-0">
        {[[MessageSquare, "#00D4AA", "7", "Total Chats"], [Zap, "#22C55E", "7", "Active Now"], [ThumbsUp, "#3B82F6", "0", "Positive"], [Clock, "#F59E0B", "0", "Avg Messages"]].map(([Icon, c, v, l]: any) => (
          <div key={l} className="flex items-center gap-1.5"><Icon size={12} style={{ color: c }} /><span className="text-white font-semibold text-sm">{v}</span><span className="text-[#4A4A6A]">{l}</span></div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[320px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-3 py-3 border-b border-[#1C1C34] space-y-2">
            <div className="relative"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search by name, email, phone..." className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-xs text-[#8B8FA8]" /></div>
            <div className="grid grid-cols-2 gap-2">
              <select className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 py-1.5 text-xs text-[#8B8FA8]"><option>All Status</option></select>
              <select className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 py-1.5 text-xs text-[#8B8FA8]"><option>All Types</option></select>
            </div>
          </div>
          <div className="text-[#4A4A6A] text-[11px] px-4 py-2 border-b border-[#1C1C34]">7 conversations</div>
          <div className="flex-1 overflow-y-auto">
            {CONVOS.map(([i, n, t], idx) => (
              <div key={idx} className={`px-4 py-3.5 border-b border-[#1C1C34]/50 flex items-start gap-3 cursor-pointer ${idx === 0 ? "bg-[#06060F]" : "hover:bg-[#06060F]"}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4AA]/20 to-[#7B5CFC]/20 text-white text-xs font-bold flex items-center justify-center">{i}</div>
                <div className="flex-1">
                  <div className="flex justify-between"><span className="text-white text-sm font-semibold">{n}</span><span className="text-[#4A4A6A] text-[11px]">{t}</span></div>
                  <div className="flex items-center gap-1.5 mt-0.5"><span className="text-[#4A4A6A] text-[11px]">@chat</span><span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded-full">active</span><span className="bg-[#00D4AA]/12 text-[#00D4AA] text-[10px] px-1.5 rounded-full">text</span></div>
                </div>
                <ChevronRight size={12} className="text-[#1C1C34]" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden bg-[#06060F]">
          <div className="px-5 py-3.5 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D4AA]/20 to-[#7B5CFC]/20 text-white text-xs font-bold flex items-center justify-center">D</div>
            <div><span className="text-white font-semibold text-sm">Daniyal</span><span className="text-[#4A4A6A] text-xs ml-2">daniyal@tasweequae.com</span></div>
            <div className="ml-auto flex gap-4 text-[#4A4A6A] text-xs">
              <span>Started: Jun 8, 9:20 AM</span><span>Duration: Ongoing</span><span>Agent: Ella</span><span>Widget: chat</span>
            </div>
            <MoreHorizontal size={16} className="text-[#8B8FA8]" />
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="text-[#4A4A6A] text-[10px] text-center">Jun 6, 2026 at 2:32 AM</div>
            {MSGS.map(([who, text, t], i) => who === "ai" ? (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] text-xs font-bold flex items-center justify-center">E</div>
                <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%]">
                  <div className="text-white text-sm leading-relaxed">{text}</div>
                  <div className="text-[#4A4A6A] text-[10px] mt-1">{t}</div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div className="bg-[#00D4AA] rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[60%]"><div className="text-black text-sm font-medium">{text}</div></div>
              </div>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-[#1C1C34] bg-[#0B0B1A] flex items-center gap-3 flex-shrink-0">
            <Paperclip size={16} className="text-[#8B8FA8]" />
            <input placeholder="Type a message..." className="flex-1 bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-2 text-[#4A4A6A] text-sm" />
            <Smile size={16} className="text-[#8B8FA8]" />
            <button className="bg-[#00D4AA] text-black w-9 h-9 rounded-lg flex items-center justify-center"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
