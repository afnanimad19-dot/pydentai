import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle, ArrowDown, ArrowUp, CheckCircle, MessageSquare, RefreshCw,
  Search, TrendingUp, XCircle, Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/sms/inbox")({ component: SmsInbox });

const CHIPS = [
  { icon: MessageSquare, c: "text-[#3B82F6]", v: "0", l: "Conversations" },
  { icon: AlertCircle, c: "text-[#F59E0B]", v: "0", l: "Unread" },
  { icon: ArrowDown, c: "text-[#00D4AA]", v: "0", l: "Inbound" },
  { icon: ArrowUp, c: "text-[#22C55E]", v: "0", l: "Outbound" },
  { icon: CheckCircle, c: "text-[#22C55E]", v: "0", l: "Delivered" },
  { icon: XCircle, c: "text-[#FF4D6D]", v: "0", l: "Failed" },
  { icon: TrendingUp, c: "text-[#7B5CFC]", v: "0%", l: "Response Rate", sub: "Low", subColor: "text-[#FF4D6D]" },
  { icon: Zap, c: "text-[#F59E0B]", v: "0%", l: "Delivery", sub: "Check", subColor: "text-[#FF4D6D]" },
];

function SmsInbox() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <MessageSquare size={16} className="text-[#3B82F6]" />
        <span className="text-white font-semibold text-sm">SMS Inbox</span>
        <span className="text-[#4A4A6A] text-xs ml-1">View and respond to two-way SMS conversations</span>
        <span className="text-[#4A4A6A] text-xs ml-3">0 conversations · 0 messages</span>
        <button className="ml-auto text-[#8B8FA8] hover:text-white"><RefreshCw size={14} /></button>
      </div>

      <div className="px-6 py-3 border-b border-[#1C1C34] grid grid-cols-8 gap-2 flex-shrink-0">
        {CHIPS.map((c) => (
          <div key={c.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 py-2 text-center">
            <c.icon size={14} className={`${c.c} mx-auto`} />
            <div className="text-white font-bold text-sm mt-0.5">{c.v}</div>
            <div className="text-[#4A4A6A] text-[9px] uppercase">{c.l}</div>
            {c.sub && <div className={`${c.subColor} text-[9px]`}>{c.sub}</div>}
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[300px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-3 py-2 border-b border-[#1C1C34]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input placeholder="Search conversations..." className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
            </div>
          </div>
          <div className="flex gap-1 px-3 py-2 border-b border-[#1C1C34]">
            {["All", "Unread", "Starred"].map((t, i) => (
              <button key={t} className={i === 0
                ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
                : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{t}</button>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <MessageSquare size={40} className="text-[#1C1C34] mb-3" />
            <div className="text-[#4A4A6A] text-sm">No conversations</div>
          </div>
          <div className="flex justify-between px-4 py-2 border-t border-[#1C1C34] text-[11px] text-[#4A4A6A]">
            <span>0 conversations</span>
            <span>0 unread</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F]">
          <MessageSquare size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">Select a conversation</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-xs">Choose a conversation from the list to view messages and reply</div>
        </div>
      </div>
    </div>
  );
}
