import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  MessageSquare,
  Phone,
  PhoneOff,
  RotateCcw,
  Settings,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/voice-lab")({
  component: VoiceLabPage,
});

type CallState = "idle" | "active" | "ended";

const MOCK_LINES: { delay: number; text: string }[] = [
  { delay: 0, text: "Agent: Hello! Thank you for calling. How can I assist you today?" },
  { delay: 3000, text: "Customer: Hi, I'd like to book an appointment for a checkup." },
  { delay: 6000, text: "Agent: Of course! I'd be happy to schedule that. What date works best?" },
  { delay: 9000, text: "Customer: Thursday at 2pm would be great." },
  { delay: 12000, text: "Agent: Perfect, I have Thursday at 2pm available. May I have your name?" },
];

function fmt(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function VoiceLabPage() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  const cleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  useEffect(() => cleanup, []);

  const startCall = () => {
    setCallState("active");
    setSeconds(0);
    setTranscript([]);
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    MOCK_LINES.forEach((line) => {
      const t = setTimeout(() => setTranscript((prev) => [...prev, line.text]), line.delay);
      timeoutsRef.current.push(t);
    });
  };

  const endCall = () => {
    cleanup();
    setCallState("ended");
  };

  const reset = () => {
    cleanup();
    setCallState("idle");
    setSeconds(0);
    setTranscript([]);
  };

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <style>{`
        @keyframes wave { 0%,100% { height: 6px } 50% { height: 28px } }
        .wave-bar { animation: wave 1s ease-in-out infinite; }
      `}</style>

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
            <span className={`w-1.5 h-1.5 rounded-full ${callState === "active" ? "bg-[#22C55E] animate-pulse" : "bg-[#4A4A6A]"}`} />
            <span className={`text-xs ${callState === "active" ? "text-[#22C55E]" : "text-[#4A4A6A]"}`}>
              {callState === "active" ? "In Call" : callState === "ended" ? "Call Ended" : "Online"}
            </span>
          </div>
          <span className="text-[#00D4AA] text-[11px]">Latency: ~120ms</span>
          <span className="text-[#22C55E] text-[11px]">Quality: HD</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F] relative">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at center, rgba(123,92,252,0.06) 0%, transparent 60%)" }} />

          {callState === "ended" ? (
            <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-6 w-[480px]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[#8B8FA8] text-xs uppercase">Call Duration</div>
                  <div className="text-white text-2xl font-bold mt-1">{fmt(seconds)}</div>
                </div>
                <span className="bg-[#22C55E]/15 text-[#22C55E] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#22C55E]/30">
                  ✓ Appointment Booked
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#8B8FA8] text-xs">Sentiment</span>
                  <span className="text-[#22C55E] text-xs font-semibold">Positive (78%)</span>
                </div>
                <div className="h-2 rounded-full bg-[#1C1C34] overflow-hidden">
                  <div className="h-full bg-[#22C55E] rounded-full" style={{ width: "78%" }} />
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[#8B8FA8] text-xs uppercase mb-2">Full Transcript</div>
                <textarea
                  readOnly
                  value={transcript.join("\n")}
                  className="w-full h-40 bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-white text-xs resize-none focus:outline-none"
                />
              </div>

              <button
                onClick={reset}
                className="w-full h-10 rounded-lg border border-[#1E1E2E] text-[#8B8FA8] hover:text-white text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} /> New Call
              </button>
            </div>
          ) : (
            <>
              <div className="relative w-[200px] h-[200px] mb-8">
                {callState === "active" && <div className="absolute inset-0 rounded-full border-2 border-[#7B5CFC]/50 animate-ping" />}
                <div className="w-full h-full rounded-full bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center relative">
                  <Bot size={64} className={callState === "active" ? "text-[#7B5CFC]" : "text-[#7B5CFC]/50"} />
                </div>
              </div>

              <div className="h-10 flex items-end justify-center gap-1.5 mb-6">
                {[0, 150, 300, 450, 600].map((delay) => (
                  <div
                    key={delay}
                    className={`w-1.5 rounded-full bg-[#7C5CFC] ${callState === "active" ? "wave-bar" : ""}`}
                    style={{
                      height: callState === "active" ? undefined : "6px",
                      animationDelay: `${delay}ms`,
                      opacity: callState === "active" ? 1 : 0.3,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={callState === "active" ? endCall : startCall}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  callState === "active"
                    ? "bg-[#FF4D6D] hover:bg-[#FF6B85] border-2 border-[#FF4D6D]"
                    : "bg-[#06060F] border-2 border-[#1C1C34] hover:border-[#7B5CFC]/50 hover:bg-[#7B5CFC]/10"
                }`}
              >
                {callState === "active" ? <PhoneOff size={32} className="text-white" /> : <Phone size={32} className="text-white" />}
              </button>
              <div className="text-[#4A4A6A] text-sm mt-4 text-center">
                {callState === "active" ? `Call in progress · ${fmt(seconds)}` : "Click to start a conversation with Dental Assistant"}
              </div>
            </>
          )}
        </div>

        <div className="w-[320px] flex-shrink-0 border-l border-[#1C1C34] flex flex-col">
          <div className="h-12 flex items-center justify-between px-4 border-b border-[#1C1C34]">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#7B5CFC]" />
              <span className="text-white text-sm font-medium">Live Transcript</span>
            </div>
            {callState !== "idle" && (
              <button onClick={reset} className="text-[#8B8FA8] hover:text-white text-xs">Reset</button>
            )}
          </div>

          {transcript.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Bot size={40} className="text-[#1C1C34] mx-auto mb-3" />
              <div className="text-[#4A4A6A] text-sm text-center">No conversation yet</div>
              <div className="text-[#4A4A6A] text-xs text-center mt-1">Start a call to see transcript</div>
            </div>
          ) : (
            <div ref={transcriptRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {transcript.map((line, i) => {
                const isAgent = line.startsWith("Agent:");
                return (
                  <div key={i} className={`flex ${isAgent ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs ${
                        isAgent
                          ? "bg-[#0B0B1A] border border-[#1C1C34] text-white rounded-bl-[4px]"
                          : "bg-[#7B5CFC] text-white rounded-br-[4px]"
                      }`}
                    >
                      {line.replace(/^(Agent:|Customer:)\s*/, "")}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
