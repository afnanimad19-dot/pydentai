import { createFileRoute } from "@tanstack/react-router";
import {
  Headphones,
  ChevronDown,
  Clock,
  MessageSquare,
  Timer,
  CheckCircle,
  Zap,
  BarChart,
  Search,
  Inbox as InboxIcon,
  SlidersHorizontal,
  AlignLeft,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/live-agent")({
  component: LiveAgent,
});

const METRICS = [
  { icon: Clock, color: "text-[#F59E0B]", value: "0", label: "In Queue" },
  { icon: MessageSquare, color: "text-[#22C55E]", value: "0", label: "Active" },
  { icon: Timer, color: "text-[#3B82F6]", value: "0", label: "Waiting" },
  { icon: CheckCircle, color: "text-[#00D4AA]", value: "0", label: "Resolved" },
  { icon: Zap, color: "text-[#7B5CFC]", value: "1m 23s", label: "Avg Response" },
  { icon: BarChart, color: "text-[#8B8FA8]", value: "0", label: "Total Today" },
];

const TABS = [
  { label: "All", count: 0 },
  { label: "Queue", count: 0 },
  { label: "Active", count: 0 },
  { label: "Done", count: 0 },
];

function LiveAgent() {
  return (
    <div className="h-[calc(100vh-56px)] flex flex-col overflow-hidden font-sans">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <Headphones size={16} className="text-[#22C55E]" />
        <span className="text-white font-semibold text-sm">Live Agent Console</span>
        <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full font-bold">LIVE</span>
        <span className="text-[#4A4A6A] text-xs">Real-time WhatsApp customer support</span>

        <div className="ml-auto flex items-center gap-3">
          <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B8FA8]" />
            <span className="text-[#8B8FA8] text-xs">Offline</span>
            <ChevronDown size={12} className="text-[#8B8FA8]" />
          </div>
          <button className="h-8 px-3 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-xs">Bot Inbox →</button>
          <button className="h-8 px-3 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold">+ New Chat</button>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-[#1C1C34] grid grid-cols-6 gap-3 flex-shrink-0">
        {METRICS.map((m) => (
          <div key={m.label} className="flex items-center gap-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3">
            <m.icon size={16} className={m.color} />
            <div>
              <div className="text-white font-bold text-xl">{m.value}</div>
              <div className="text-[#4A4A6A] text-[10px] uppercase">{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[340px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-3 py-3 border-b border-[#1C1C34] space-y-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
              <input
                placeholder="Search by name or phone..."
                className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#22C55E]/40"
              />
            </div>
            <div className="flex gap-1">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  className={
                    i === 0
                      ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1 text-xs rounded-full font-medium"
                      : "bg-[#06060F] border border-[#1C1C34] text-[#4A4A6A] text-xs px-3 py-1 rounded-full"
                  }
                >
                  {t.label} {t.count}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <InboxIcon size={40} className="text-[#1C1C34] mb-3" />
            <div className="text-[#4A4A6A] text-sm">No conversations</div>
            <div className="text-[#4A4A6A] text-xs mt-1">Start a new chat to begin</div>
          </div>
          <div className="border-t border-[#1C1C34] px-4 py-2 flex items-center justify-between">
            <div className="text-[#4A4A6A] text-[11px]">0 conversations</div>
            <div className="flex gap-2">
              <SlidersHorizontal size={14} className="text-[#4A4A6A] cursor-pointer hover:text-white" />
              <AlignLeft size={14} className="text-[#4A4A6A] cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F] px-6">
          <div className="w-[72px] h-[72px] bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
            <Headphones size={36} className="text-[#22C55E]/60" />
          </div>
          <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">WhatsApp Live Agent</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Select a conversation from the queue to start helping patients, or create a new chat to reach out proactively.
          </div>
          <div className="flex items-center gap-4 justify-center mb-8">
            {[
              { icon: MessageSquare, label: "Real-time Chat" },
              { icon: Zap, label: "Bot Handoff" },
              { icon: Users, label: "Agent Transfer" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2">
                <f.icon size={14} className="text-[#22C55E]" />
                <span className="text-[#8B8FA8] text-xs">{f.label}</span>
              </div>
            ))}
          </div>
          <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-8 py-3 rounded-xl font-semibold">+ New Chat</button>
        </div>
      </div>
    </div>
  );
}
