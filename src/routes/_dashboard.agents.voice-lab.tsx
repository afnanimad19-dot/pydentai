import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  Maximize2,
  MessageSquare,
  Phone,
  PhoneOff,
  Send,
  Settings,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/voice-lab")({
  component: VoiceLabPage,
});

type Msg = { from: "agent" | "user"; text: string; t: string };

function nowStr() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function VoiceLabPage() {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [bars, setBars] = useState<number[]>(Array(40).fill(4));

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    const w = setInterval(
      () => setBars(Array.from({ length: 40 }, () => 4 + Math.random() * 22)),
      120,
    );
    return () => {
      clearInterval(t);
      clearInterval(w);
    };
  }, [active]);

  const startCall = () => {
    setActive(true);
    setSeconds(0);
    setMessages([
      {
        from: "agent",
        text: "Hi, this is your AI dental assistant at Dubai Smile Clinic. How can I help today?",
        t: nowStr(),
      },
    ]);
  };

  const endCall = () => {
    setActive(false);
    setBars(Array(40).fill(4));
  };

  const send = () => {
    if (!input.trim() || !active) return;
    const userMsg: Msg = { from: "user", text: input, t: nowStr() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "agent",
          text:
            "Got it — let me check the calendar. Would morning or afternoon work better for you?",
          t: nowStr(),
        },
      ]);
    }, 700);
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-[#7B5CFC]" />
          <span className="text-white font-semibold text-sm">Voice Lab</span>
          <span className="text-[#4A4A6A] text-xs ml-2">Real-time AI Voice Testing Console</span>
        </div>
        <div className="flex items-center gap-2 ml-6 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 cursor-pointer">
          <Bot size={14} className="text-[#22C55E]" />
          <span className="text-white text-sm">Dental Assistant</span>
          <span className="text-[#4A4A6A] text-xs">both · EN</span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded font-semibold">LIVE</span>
          <ChevronDown size={14} className="text-[#4A4A6A]" />
        </div>
        <div className="hidden lg:flex items-center gap-3 ml-4 text-[11px] text-[#8B8FA8]">
          <Meta icon={Globe} text="EN" />
          <Meta icon={Volume2} text="alloy" />
          <Meta icon={FileText} text="52 docs" />
          <Meta icon={HelpCircle} text="68 FAQs" />
          <Meta icon={Settings} text="1 Persona..." />
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#22C55E] animate-pulse" : "bg-[#4A4A6A]"}`} />
            <span className={`text-xs ${active ? "text-[#22C55E]" : "text-[#4A4A6A]"}`}>
              {active ? "In Call" : "Online"}
            </span>
          </div>
          <span className="text-[#00D4AA] text-[11px]">Latency: ~120ms</span>
          <span className="text-[#22C55E] text-[11px]">Quality: HD</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F] relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at center, rgba(123,92,252,0.06) 0%, transparent 60%)" }}
          />
          <div className="relative w-[200px] h-[200px] mb-8">
            {active && <div className="absolute inset-0 rounded-full border-2 border-[#7B5CFC]/50 animate-ping" />}
            <div className="w-full h-full rounded-full bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center relative">
              <Bot size={64} className={active ? "text-[#7B5CFC]" : "text-[#7B5CFC]/50"} />
            </div>
          </div>
          <div className="w-64 h-8 flex items-center justify-center gap-[2px] mb-6">
            {bars.map((h, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-all duration-100 ${active ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"}`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
          <button
            onClick={active ? endCall : startCall}
            className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              active
                ? "bg-[#FF4D6D] hover:bg-[#FF6B85] border-2 border-[#FF4D6D]"
                : "bg-[#06060F] border-2 border-[#1C1C34] hover:border-[#7B5CFC]/50 hover:bg-[#7B5CFC]/10"
            }`}
          >
            {active ? <PhoneOff size={32} className="text-white" /> : <Phone size={32} className="text-white" />}
          </button>
          <div className="text-[#4A4A6A] text-sm mt-4 text-center">
            {active ? `Call in progress · ${fmt(seconds)}` : "Click to start a conversation with Dental Assistant"}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
              <Bot size={14} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Dental Assistant</div>
              <div className="text-[#4A4A6A] text-xs">EN · 1 Persona · Identity: Dental F...</div>
            </div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded">ACTIVE</span>
          </div>
        </div>

        <div className="w-[320px] flex-shrink-0 border-l border-[#1C1C34] flex flex-col">
          <div className="h-12 flex items-center justify-between px-4 border-b border-[#1C1C34]">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#7B5CFC]" />
              <span className="text-white text-sm font-medium">Live Transcript</span>
            </div>
            <button className="text-[#8B8FA8] hover:text-white">
              <Maximize2 size={14} />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Bot size={40} className="text-[#1C1C34] mx-auto mb-3" />
              <div className="text-[#4A4A6A] text-sm text-center">No conversation yet</div>
              <div className="text-[#4A4A6A] text-xs text-center mt-1">Start a call to see the live transcript appear here</div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 ${
                      m.from === "user"
                        ? "bg-[#7B5CFC] text-white rounded-br-[4px]"
                        : "bg-[#0B0B1A] border border-[#1C1C34] text-white rounded-bl-[4px]"
                    }`}
                  >
                    <div className="text-xs">{m.text}</div>
                    <div className={`text-[9px] mt-1 ${m.from === "user" ? "text-white/60" : "text-[#4A4A6A]"}`}>{m.t}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="h-12 border-t border-[#1C1C34] flex items-center px-3 gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              disabled={!active}
              placeholder={active ? "Type a message…" : "Start a call to send messages..."}
              className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-[#4A4A6A] disabled:cursor-not-allowed"
            />
            <button
              disabled={!active || !input.trim()}
              onClick={send}
              className="h-7 w-7 rounded-md bg-[#7B5CFC] hover:bg-[#6047DB] disabled:bg-[#1C1C34] disabled:text-[#4A4A6A] text-white flex items-center justify-center"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ icon: Icon, text }: { icon: typeof Bot; text: string }) {
  return (
    <div className="flex items-center gap-1">
      <Icon size={12} />
      <span>{text}</span>
    </div>
  );
}
