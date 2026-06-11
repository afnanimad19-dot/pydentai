import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Activity, Phone, PhoneCall, Eye, Clock, RefreshCw, Sparkles, Search, PhoneOff, MessageSquare, Shield, Heart, Headphones, Volume2, UserCheck } from "lucide-react";

export const Route = createFileRoute("/_dashboard/engage/live-monitoring")({ component: LiveMonitoring });

type LiveCall = {
  id: string;
  contact: string;
  phone: string;
  agent: string;
  status: "Active" | "Ringing" | "Positive";
  startTime: number;
};

const MOCK_CONTACTS = [
  { contact: "Ahmed Al Mansouri", phone: "+971501234567" },
  { contact: "Fatima Hassan", phone: "+971507891234" },
  { contact: "Omar Khaled", phone: "+971554567890" },
];

function fmtTimer(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function LiveMonitoring() {
  const [calls, setCalls] = useState<LiveCall[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const [tab, setTab] = useState<"All" | "Active" | "Ringing" | "Positive">("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!calls.length) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [calls.length]);

  const simulate = () => {
    const m = MOCK_CONTACTS[Math.floor(Math.random() * MOCK_CONTACTS.length)];
    const c: LiveCall = { id: crypto.randomUUID(), contact: m.contact, phone: m.phone, agent: "Dental Assistant", status: "Active", startTime: Date.now() };
    setCalls((prev) => [c, ...prev]);
    setSelectedId(c.id);
  };

  const visible = useMemo(() => calls.filter((c) => {
    if (tab !== "All" && c.status !== tab) return false;
    if (query && !c.contact.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  }), [calls, tab, query]);

  const selected = calls.find((c) => c.id === selectedId) || null;
  const connected = calls.filter((c) => c.status === "Active").length;
  const ringing = calls.filter((c) => c.status === "Ringing").length;

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-5 gap-3 flex-shrink-0">
        <Activity size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Live Monitoring</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${calls.length ? "bg-[#22C55E]/12 text-[#22C55E]" : "bg-[#F59E0B]/12 text-amber-400"}`}>{calls.length ? "Live" : "Standby"}</span>
        <div className="flex items-center gap-3 ml-4">
          {([[Phone, "#22C55E", String(connected), "connected"], [PhoneCall, "#F59E0B", String(ringing), "ringing"], [Eye, "#3B82F6", String(calls.length), "monitored"], [Clock, "#8B8FA8", "0:00", "avg"]] as const).map(([Icon, c, v, l]) => (
            <div key={l} className="flex items-center gap-1.5"><Icon size={12} style={{ color: c }} /><span className="text-white text-xs">{v}</span><span className="text-[#4A4A6A] text-[10px]">{l}</span></div>
          ))}
        </div>
        <div className="ml-auto flex gap-2"><button className="text-[#8B8FA8] p-1 hover:text-white"><RefreshCw size={14} /></button><button onClick={simulate} className="h-7 px-3 rounded bg-[#7B5CFC]/12 text-[#7B5CFC] border border-[#7B5CFC]/20 text-xs hover:bg-[#7B5CFC]/20">Simulate ✨</button></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[380px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
          <div className="px-4 py-3 border-b border-[#1C1C34] flex items-center gap-2"><Activity size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Call Queue</span><span className="bg-[#1C1C34] text-[#4A4A6A] text-[10px] rounded-full px-1.5">{calls.length}</span></div>
          <div className="px-3 py-2 border-b border-[#1C1C34]"><div className="relative"><Search size={12} className="absolute left-2.5 top-2 text-[#4A4A6A]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search calls..." className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg pl-7 pr-3 py-1.5 text-xs text-white placeholder:text-[#4A4A6A]" /></div></div>
          <div className="px-3 py-2 border-b border-[#1C1C34] flex gap-2">
            {(["All", "Active", "Ringing", "Positive"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`px-2 py-0.5 text-[11px] rounded ${tab === t ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>)}
          </div>

          {visible.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <PhoneOff size={36} className="text-[#1C1C34] mb-3" />
              <div className="text-[#4A4A6A] text-sm">No Active Calls</div>
              <div className="text-[#4A4A6A] text-xs mt-1 max-w-[180px] leading-relaxed mb-4">Calls will appear here in real-time when they connect.</div>
              <button onClick={simulate} className="h-8 px-3 rounded border border-[#7B5CFC]/30 text-[#7B5CFC] text-xs hover:bg-[#7B5CFC]/10">Simulate Call ✨</button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
              {visible.map((c) => (
                <button key={c.id} onClick={() => setSelectedId(c.id)} className={`w-full bg-[#06060F] border rounded-xl p-3 text-left transition-colors ${selectedId === c.id ? "border-[#7B5CFC]" : "border-[#1C1C34] hover:border-[#7B5CFC]/40"}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#1C1C34] flex items-center justify-center text-[#8B8FA8] text-xs font-semibold">{c.contact.slice(0, 2).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold truncate">{c.contact}</div>
                      <div className="text-[#4A4A6A] text-[11px] truncate">{c.phone}</div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/15 text-[#22C55E]">{c.status}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#4A4A6A]">
                    <span>{c.agent}</span>
                    <span className="text-[#22C55E] font-mono">{fmtTimer(now - c.startTime)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="px-4 py-2.5 border-t border-[#1C1C34] flex justify-between text-[11px] text-[#4A4A6A]"><span>0 positive · 0 negative</span><span>0:00 avg</span></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F]">
          {selected ? (
            <div className="w-full h-full p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center text-[#7B5CFC] font-semibold">{selected.contact.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="text-white font-semibold">{selected.contact}</div>
                  <div className="text-[#4A4A6A] text-xs">{selected.phone} · {selected.agent}</div>
                </div>
                <div className="ml-auto text-[#22C55E] font-mono text-xl">{fmtTimer(now - selected.startTime)}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="col-span-2 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
                  <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">Live Transcript</div>
                  <div className="text-[#4A4A6A] text-sm">Listening...</div>
                </div>
                <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
                  <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-3">AI Coaching</div>
                  <div className="text-[#4A4A6A] text-sm">Analyzing conversation...</div>
                </div>
              </div>
              <div className="mt-4 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
                <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mb-2">Sentiment</div>
                <div className="h-2 bg-[#1C1C34] rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#FF4D6D] via-[#F59E0B] to-[#22C55E]" style={{ width: "70%" }} /></div>
              </div>
            </div>
          ) : (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 w-24 h-24 -left-3 -top-3 border-2 border-[#7B5CFC]/20 rounded-full animate-ping" />
                <div className="w-[72px] h-[72px] bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 rounded-full flex items-center justify-center"><Activity size={36} className="text-[#7B5CFC]/60" /></div>
              </div>
              <div className="text-white font-bold text-xl mb-2">Command Center Ready</div>
              <p className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Select a call from the queue to access live transcripts, AI coaching, and real-time intervention controls.</p>

              <div className="flex gap-3 justify-center mb-8">
                {([["#22C55E", "Voice Engine"], ["#3B82F6", "AI Pipeline"], ["#7B5CFC", "Transcription"], ["#00D4AA", "Realtime"]] as const).map(([c, l]) => (
                  <div key={l} className="bg-[#06060F] border border-[#1C1C34] rounded-full px-3 py-1.5 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} /><span className="text-[#8B8FA8] text-xs">{l}</span></div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-[380px] w-full">
                {([[MessageSquare, "#3B82F6", "Live Transcript", "Real-time speech-to-text"], [Sparkles, "#7B5CFC", "AI Coaching", "Context-aware suggestions"], [Shield, "#F59E0B", "Safety Guard", "Automated compliance"], [Heart, "#00D4AA", "Sentiment", "Live emotion tracking"]] as const).map(([Icon, c, n, d]) => (
                  <div key={n} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
                    <Icon size={16} style={{ color: c }} />
                    <div className="text-white text-sm font-medium mt-2">{n}</div>
                    <div className="text-[#4A4A6A] text-xs mt-1">{d}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center mt-6">
                {([[Headphones, "Listen", "⌘1"], [Volume2, "Whisper", "⌘2"], [PhoneCall, "Barge", "⌘3"], [UserCheck, "Takeover", "⌘4"]] as const).map(([Icon, l, k]) => (
                  <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex flex-col items-center gap-1.5 cursor-pointer hover:border-[#7B5CFC]/30">
                    <Icon size={20} className="text-[#4A4A6A]" />
                    <span className="text-[#8B8FA8] text-xs">{l}</span>
                    <span className="text-[9px] bg-[#06060F] text-[#4A4A6A] rounded px-1">{k}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
