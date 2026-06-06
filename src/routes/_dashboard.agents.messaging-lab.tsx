import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Paperclip,
  Phone,
  Play,
  RefreshCw,
  Send,
  Shield,
  Smile,
  Video,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/messaging-lab")({
  component: MessagingLabPage,
});

const QUICK_REPLIES = [
  "Hi, I need help",
  "What are your prices?",
  "Book an appointment",
  "Send me a brochure",
  "Where are you located?",
  "Do you offer discounts?",
];

type Msg = { role: "agent" | "user"; text: string; t: string };

const WELCOME: Msg = {
  role: "agent",
  text: "Hello! I'm ready to help. How can I assist you today?",
  t: nowStr(),
};

function nowStr() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function getAutoReply(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("appoint") || m.includes("book")) return "I can help with that! We have slots available this week. Would Thursday or Friday work for you?";
  if (m.includes("price") || m.includes("cost") || m.includes("fee")) return "Our consultation starts from AED 299. Would you like a full breakdown of our services and pricing?";
  if (m.includes("hour") || m.includes("open") || m.includes("time")) return "We're open Saturday–Thursday, 9am–8pm. Fridays by appointment only. Would you like to schedule a visit?";
  if (m.includes("location") || m.includes("address") || m.includes("where")) return "We're in Dubai Marina, near the Metro Station. Can I send you the exact pin on WhatsApp?";
  if (m.includes("cancel") || m.includes("reschedule")) return "No problem at all! I can reschedule that for you. What new date would you prefer?";
  return "Thank you for your message! I'm here to help — could you tell me more about what you're looking for?";
}

function MessagingLabPage() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed, t: nowStr() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { role: "agent", text: getAutoReply(trimmed), t: nowStr() }]);
    }, 1500);
  };

  const reset = () => {
    setMessages([{ ...WELCOME, t: nowStr() }]);
    setIsTyping(false);
    setInput("");
  };

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-[#00D4AA]" />
          <span className="text-white font-semibold text-sm">Messaging Lab</span>
          <span className="text-[#4A4A6A] text-xs ml-2">AI Chat Testing Console</span>
        </div>

        <div className="flex items-center gap-2 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 ml-4 cursor-pointer">
          <MessageCircle size={14} className="text-[#22C55E]" />
          <span className="text-white text-sm">WhatsApp</span>
          <ChevronDown size={12} className="text-[#4A4A6A]" />
        </div>

        <div className="flex items-center gap-2 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 cursor-pointer">
          <Bot size={14} className="text-[#22C55E]" />
          <span className="text-white text-sm">Dental Assistant</span>
          <span className="text-[#4A4A6A] text-xs">chat · EN</span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded font-semibold">LIVE</span>
          <ChevronDown size={12} className="text-[#4A4A6A]" />
        </div>

        <div className="hidden lg:flex gap-4 ml-4 text-[11px] text-[#8B8FA8]">
          <Meta icon={Globe} text="EN" />
          <Meta icon={FileText} text="1 docs" />
          <Meta icon={HelpCircle} text="68 FAQs" />
        </div>

        <div className="ml-auto flex gap-3 text-[11px] items-center">
          <span className="text-[#4A4A6A]">Agents: 2</span>
          <span className="text-[#4A4A6A]">Active: 2</span>
          <span className="bg-[#0B0B1A] border border-[#1C1C34] rounded px-2 py-1 text-[#8B8FA8]">Model: Claude Sonnet</span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] rounded px-2 py-1">RAG Active</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col bg-[#06060F]">
          <div className="h-14 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-5 gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] font-semibold text-sm flex items-center justify-center">DA</div>
            <div>
              <div className="text-white font-semibold text-sm">Dental Assistant</div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[#22C55E] text-xs">online</span>
              </div>
            </div>
            <div className="ml-auto flex gap-3 text-[#8B8FA8]">
              <Video size={16} className="hover:text-white cursor-pointer" />
              <Phone size={16} className="hover:text-white cursor-pointer" />
              <button onClick={reset}>
                <RefreshCw size={16} className="hover:text-white cursor-pointer" />
              </button>
            </div>
          </div>

          <div className="px-5 py-2.5 bg-[#0B0B1A]/50 border-b border-[#1C1C34] flex items-center gap-3 flex-shrink-0">
            <Zap size={12} className="text-[#7B5CFC]" />
            <span className="text-[#8B8FA8] text-xs">Quick persona test</span>
            <span className="text-[#4A4A6A] text-[11px]">sends a test inquiry and verifies persona</span>
            <button
              onClick={() => sendMessage("Hello, I'd like some information about your services")}
              className="ml-auto h-7 px-3 rounded-md border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1"
            >
              <Play size={12} />
              Run test
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5">
            <div className="text-center mb-4 flex items-center justify-center gap-1.5 text-[#4A4A6A] text-xs">
              <Shield size={12} />
              Messages are end-to-end encrypted in sandbox mode
            </div>
            <div className="text-[#4A4A6A] text-[10px] text-center py-2">TODAY</div>

            {messages.map((m, i) => (
              <div key={i} className={`flex mb-4 gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "agent" && (
                  <div className="w-8 h-8 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] font-semibold text-xs flex items-center justify-center flex-shrink-0">
                    DA
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 ${
                    m.role === "user"
                      ? "bg-[#7B5CFC] text-white rounded-2xl rounded-tr-[4px]"
                      : "bg-[#0B0B1A] border border-[#1C1C34] text-white rounded-2xl rounded-tl-[4px]"
                  }`}
                >
                  <div className="text-sm">{m.text}</div>
                  <div className={`text-[10px] mt-1.5 ${m.role === "user" ? "text-white/60" : "text-[#4A4A6A]"}`}>{m.t}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex mb-4 gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] font-semibold text-xs flex items-center justify-center flex-shrink-0">DA</div>
                <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl rounded-tl-[4px] px-4 py-3 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A4A6A] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A4A6A] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4A4A6A] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}

            {messages.length <= 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 mb-4 ml-10">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="bg-[#0B0B1A] border border-[#1C1C34] rounded-full px-4 py-2 text-white text-xs hover:border-[#7B5CFC]/40"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-14 bg-[#0B0B1A] border-t border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
            <Smile size={18} className="text-[#8B8FA8] hover:text-white cursor-pointer" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-[#4A4A6A]"
            />
            <Paperclip size={18} className="text-[#8B8FA8] hover:text-white cursor-pointer" />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="h-8 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] disabled:bg-[#1C1C34] disabled:text-[#4A4A6A] text-white text-sm font-semibold flex items-center gap-1"
            >
              <Send size={14} />
              Send
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
