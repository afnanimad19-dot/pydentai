import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  MessageCircle, Search, Filter, AlertCircle, UserPlus, Zap, Hash, Send,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_dashboard/whatsapp/inbox")({ component: Inbox });

const FILTERS = ["All", "Unread", "Leads", "Pinned"];

type Msg = { from: "them" | "me"; text: string; time: string };
type Contact = { id: string; name: string; initials: string; preview: string; time: string; unread: number; thread: Msg[] };

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function extractText(content: any): string {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (typeof content === "object" && typeof content.text === "string") return content.text;
  try { return JSON.stringify(content); } catch { return ""; }
}

function Inbox() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [convLoading, setConvLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [threads, setThreads] = useState<Record<string, Msg[]>>({});
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    async function loadConversations() {
      setConvLoading(true);
      const { data, error } = await supabase
        .from("conversations")
        .select(`id, status, updated_at, contacts ( id, name, phone )`)
        .eq("channel", "whatsapp")
        .order("updated_at", { ascending: false })
        .limit(50);

      if (cancelled) return;
      if (error) { console.error(error); setConvLoading(false); return; }

      const mapped: Contact[] = (data ?? []).map((row: any) => {
        const contactName: string = row.contacts?.name ?? row.contacts?.phone ?? "Unknown";
        const initials = contactName.split(" ").slice(0, 2).map((w: string) => w[0] ?? "").join("").toUpperCase();
        return {
          id: row.id,
          name: contactName,
          initials: initials || "?",
          preview: "Loading…",
          time: formatRelativeTime(row.updated_at),
          unread: row.status === "open" ? 1 : 0,
          thread: [],
        };
      });

      setContacts(mapped);
      if (mapped.length > 0) setSelectedId(mapped[0].id);
      setConvLoading(false);
    }
    loadConversations();
    return () => { cancelled = true; };
  }, [user]);

  useEffect(() => {
    if (!selectedId) return;
    let cancelled = false;
    async function loadMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("id, direction, content, created_at, sender_type")
        .eq("conversation_id", selectedId)
        .order("created_at", { ascending: true })
        .limit(100);

      if (cancelled || error || !data) return;

      const msgs: Msg[] = data.map((m: any) => ({
        from: m.direction === "outbound" ? "me" : "them",
        text: extractText(m.content),
        time: new Date(m.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }));
      setThreads((t) => ({ ...t, [selectedId!]: msgs }));
      if (msgs.length > 0) {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === selectedId
              ? { ...c, preview: msgs[msgs.length - 1].text.slice(0, 50) }
              : c
          )
        );
      }
    }
    loadMessages();
    return () => { cancelled = true; };
  }, [selectedId]);

  const selected = contacts.find((c) => c.id === selectedId) ?? null;
  const messages = selectedId ? threads[selectedId] ?? [] : [];

  const stats = [
    { icon: AlertCircle, color: "text-[#FF4D6D]", value: String(contacts.filter((c) => c.unread > 0).length), label: "Unread" },
    { icon: UserPlus, color: "text-[#3B82F6]", value: String(contacts.length), label: "Leads" },
    { icon: Zap, color: "text-[#22C55E]", value: "—", label: "AI Rate" },
    { icon: Hash, color: "text-[#8B8FA8]", value: String(contacts.length), label: "Total" },
  ];

  const send = () => {
    const text = draft.trim();
    if (!text || !selectedId) return;
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
        <span className="text-[#4A4A6A] text-xs">{contacts.length} conversations</span>
        <div className="ml-auto flex items-center gap-3">
          {stats.map((s) => (
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
            {convLoading ? (
              <div className="flex items-center justify-center h-full text-[#4A4A6A] text-sm">Loading conversations…</div>
            ) : contacts.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center py-12">
                <MessageCircle size={32} className="text-[#1C1C34]" />
                <p className="text-[#4A4A6A] text-sm">No WhatsApp conversations yet.</p>
                <p className="text-[#2A2A4A] text-xs">Connect a WhatsApp number in Setup to start receiving messages.</p>
              </div>
            ) : (
              contacts.map((c) => {
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
              })
            )}
          </div>

          <div className="flex-shrink-0 border-t border-[#1C1C34] px-4 py-2">
            <div className="text-[#4A4A6A] text-[11px]">{contacts.length} conversations shown</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#06060F]">
          {selected ? (
            <>
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
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#4A4A6A] text-sm">
              {convLoading ? "Loading…" : "Select a conversation"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
