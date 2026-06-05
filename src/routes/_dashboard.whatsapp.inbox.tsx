import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  Search,
  Filter,
  AlertCircle,
  UserPlus,
  Zap,
  Hash,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/inbox")({
  component: Inbox,
});

const STATS = [
  { icon: AlertCircle, color: "text-[#FF4D6D]", value: "0", label: "Unread" },
  { icon: UserPlus, color: "text-[#3B82F6]", value: "0", label: "Leads" },
  { icon: Zap, color: "text-[#22C55E]", value: "0%", label: "AI Rate" },
  { icon: Hash, color: "text-[#8B8FA8]", value: "0", label: "Total" },
];

const FILTERS = ["All", "Unread", "Leads", "Pinned"];

function Inbox() {
  return (
    <div className="h-[calc(100vh-56px)] flex flex-col overflow-hidden font-sans">
      {/* Top bar */}
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <MessageCircle size={16} className="text-[#22C55E]" />
        <span className="text-white font-semibold text-sm">WhatsApp Inbox</span>
        <span className="text-[#4A4A6A] text-xs">0 conversations · 0 numbers</span>

        <div className="ml-auto flex items-center gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <s.icon size={12} className={s.color} />
              <span className="text-white text-xs font-semibold">{s.value}</span>
              <span className="text-[#4A4A6A] text-[10px]">{s.label}</span>
            </div>
          ))}
          <button className="text-[#8B8FA8] hover:text-white text-xs px-2">Live Agent</button>
          <button className="text-[#8B8FA8] hover:text-white text-xs px-2">Setup</button>
          <button className="text-[#8B8FA8] hover:text-white text-xs px-2">Reports</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left */}
        <div className="w-[340px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-3 py-3 border-b border-[#1C1C34]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input
                placeholder="Search by name or message..."
                className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-8 focus:outline-none focus:border-[#22C55E]/40"
              />
              <Filter size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            </div>
          </div>
          <div className="px-3 py-2 border-b border-[#1C1C34] flex gap-1">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                className={
                  i === 0
                    ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1 text-xs rounded-full font-medium"
                    : "bg-[#06060F] border border-[#1C1C34] text-[#4A4A6A] text-xs px-3 py-1 rounded-full"
                }
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-[#22C55E]/50" />
            </div>
            <div className="text-white text-base font-semibold mb-1">No conversations</div>
            <div className="text-[#4A4A6A] text-xs leading-relaxed mb-4">WhatsApp messages will appear here once your number is connected</div>
            <button className="h-8 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold">Connect WhatsApp</button>
          </div>
          <div className="flex-shrink-0 border-t border-[#1C1C34] px-4 py-2">
            <div className="text-[#4A4A6A] text-[11px]">0 conversations shown</div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F]">
          <div className="w-16 h-16 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-5">
            <MessageCircle size={32} className="text-[#22C55E]/40" />
          </div>
          <div className="text-white text-lg font-semibold mb-2">Select a Conversation</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-xs">Choose a WhatsApp conversation from the list to view and respond</div>
        </div>
      </div>
    </div>
  );
}
