import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle, Search, Filter, AlertCircle, UserPlus, Zap, Hash, Send,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/inbox")({ component: Inbox });

const STATS = [
  { icon: AlertCircle, color: "text-[#FF4D6D]", value: "3", label: "Unread" },
  { icon: UserPlus, color: "text-[#3B82F6]", value: "3", label: "Leads" },
  { icon: Zap, color: "text-[#22C55E]", value: "92%", label: "AI Rate" },
  { icon: Hash, color: "text-[#8B8FA8]", value: "3", label: "Total" },
];

const FILTERS = ["All", "Unread", "Leads", "Pinned"];

type Msg = { from: "them" | "me"; text: string; time: string };
type Contact = { id: string; name: string; initials: string; preview: string; time: string; unread: number; thread: Msg[] };

const CONTACTS: Contact[] = [
  {
    id: "1", name: "Ahmed Al Mansouri", initials: "AA",
    preview: "Hi, I'd like to book an appointment...", time: "2m ago", unread: 2,
    thread: [
      { from: "them", text: "Hi, I'd like to book an appointment for a dental cleaning.", time: "10:24 AM" },
      { from: "them", text: "Are there any slots open this week?", time: "10:24 AM" },
      { from: "me", text: "Hello Ahmed! Yes, we have openings on Thursday and Friday.", time: "10:26 AM" },
      { from: "them", text: "Thursday at 3pm works for me. Can I confirm?", time: "10:28 AM" },
    ],
  },
  {
    id: "2", name: "Sara Hassan", initials: "SH",
    preview: "What are your opening hours?", time: "15m ago", unread: 1,
    thread: [
      { from: "them", text: "Hello! What are your opening hours?", time: "10:10 AM" },
      { from: "me", text: "Hi Sara, we're open 9 AM – 7 PM Monday to Saturday.", time: "10:12 AM" },
    ],
  },
  {
    id: "3", name: "Mohamed K.", initials: "MK",
    preview: "Can I reschedule my appointment?", time: "1h ago", unread: 0,
    thread: [
      { from: "them", text: "Can I reschedule my appointment from tomorrow to next week?", time: "9:20 AM" },
      { from: "me", text: "Of course! What day works best?", time: "9:25 AM" },
      { from: "them", text: "Monday or Tuesday after 4pm if possible.", time: "9:30 AM" },
    ],
  },
];

function Inbox() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [threads, setThreads] = useState<Record<string, Msg[]>>(
    Object.fromEntries(CONTACTS.map((c) => [c.id, c.thread]))
  );
  const [draft, setDraft] = useState("");

  const selected = CONTACTS.find((c) => c.id === selectedId)!;
  const messages = threads[selectedId] ?? [];

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setThreads((t) => ({
      ...t,
      [selectedId]: [...(t[selectedId] ?? []), { from: "me", text, time: "now" }],
    }));
    setDraft("");
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col overflow-hidden font-sans">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <MessageCircle size={16} className="text-[#22C55E]" />
        <span className="text-white font-semibold text-sm">WhatsApp Inbox</span>
        <span className="text-[#4A4A6A] text-xs">3 conversations · 1 number</span>
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
              >{f}</button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONTACTS.map((c) => {
              const active = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedId(c.id)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 border-b border-[#1C1C34]/50 transition-all ${
                    active ? "bg-[#1C1C28] border-l-2 border-l-[#7C5CFC]" : "hover:bg-[#0E0E1C] border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-semibold truncate">{c.name}</span>
                      <span className="text-[#4A4A6A] text-[10px]">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[#8B8FA8] text-xs truncate pr-2">{c.preview}</span>
                      {c.unread > 0 && (
                        <span className="bg-[#3B82F6] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0">{c.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex-shrink-0 border-t border-[#1C1C34] px-4 py-2">
            <div className="text-[#4A4A6A] text-[11px]">3 conversations shown</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#06060F]">
          <div className="h-14 border-b border-[#1C1C34] flex items-center px-5 gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#22C55E]/15 text-[#22C55E] flex items-center justify-center text-xs font-semibold">{selected.initials}</div>
            <div>
              <div className="text-white text-sm font-semibold">{selected.name}</div>
              <div className="text-[#4A4A6A] text-[11px]">Last active {selected.time}</div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                {m.from === "me" ? (
                  <div className="bg-[#7C5CFC]/15 border border-[#7C5CFC]/20 rounded-xl rounded-tr-sm max-w-[70%] px-4 py-3">
                    <div className="text-white text-sm">{m.text}</div>
                    <div className="text-[#8B8FA8] text-[10px] mt-1 text-right">{m.time}</div>
                  </div>
                ) : (
                  <div className="bg-[#16161F] border border-[#1E1E2E] rounded-xl rounded-tl-sm max-w-[70%] px-4 py-3">
                    <div className="text-white text-sm">{m.text}</div>
                    <div className="text-[#4A4A6A] text-[10px] mt-1">{m.time}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-[#1C1C34] px-4 py-3 flex items-center gap-2 flex-shrink-0">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Type a message..."
              className="flex-1 h-10 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40"
            />
            <button onClick={send} className="h-10 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold flex items-center gap-2">
              <Send size={14} /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
