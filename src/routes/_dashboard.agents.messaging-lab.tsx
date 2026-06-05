import { createFileRoute } from "@tanstack/react-router";
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

function MessagingLabPage() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* Top Info Bar */}
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare size={16} className="text-[#00D4AA]" />
          <span className="text-white font-semibold text-sm">
            Messaging Lab
          </span>
          <span className="text-[#4A4A6A] text-xs ml-2">
            AI Chat Testing Console
          </span>
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
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded font-semibold">
            LIVE
          </span>
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
          <span className="bg-[#0B0B1A] border border-[#1C1C34] rounded px-2 py-1 text-[#8B8FA8]">
            Model: Claude Sonnet
          </span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] rounded px-2 py-1">
            RAG Active
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col bg-[#06060F]">
          {/* Chat Header */}
          <div className="h-14 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-5 gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] font-semibold text-sm flex items-center justify-center">
              DA
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                Dental Assistant
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                <span className="text-[#22C55E] text-xs">online</span>
              </div>
            </div>
            <div className="ml-auto flex gap-3 text-[#8B8FA8]">
              <Video size={16} className="hover:text-white cursor-pointer" />
              <Phone size={16} className="hover:text-white cursor-pointer" />
              <RefreshCw size={16} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Test Bar */}
          <div className="px-5 py-2.5 bg-[#0B0B1A]/50 border-b border-[#1C1C34] flex items-center gap-3 flex-shrink-0">
            <Zap size={12} className="text-[#7B5CFC]" />
            <span className="text-[#8B8FA8] text-xs">Quick persona test</span>
            <span className="text-[#4A4A6A] text-[11px]">
              sends 'hi' and verifies persona + first-message template
            </span>
            <button className="ml-auto h-7 px-3 rounded-md border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center gap-1">
              <Play size={12} />
              Run test
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5">
            <div className="text-center mb-4 flex items-center justify-center gap-1.5 text-[#4A4A6A] text-xs">
              <Shield size={12} />
              Messages are end-to-end encrypted in sandbox mode
            </div>

            <div className="text-[#4A4A6A] text-[10px] text-center py-2">
              TODAY
            </div>

            <div className="flex justify-start mb-4 gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00D4AA]/20 text-[#00D4AA] font-semibold text-xs flex items-center justify-center flex-shrink-0">
                DA
              </div>
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl rounded-tl-[4px] max-w-[75%] px-4 py-3">
                <div className="text-white text-sm">
                  Hello and welcome to Dubai Smile Clinic! I'm your AI Dental
                  Advisor. Please tell me, what brings you here today?
                </div>
                <div className="text-[#4A4A6A] text-[10px] mt-1.5">
                  02:58 AM
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 ml-10">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  className="bg-[#0B0B1A] border border-[#1C1C34] rounded-full px-4 py-2 text-white text-xs hover:border-[#7B5CFC]/40"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Compose */}
          <div className="h-14 bg-[#0B0B1A] border-t border-[#1C1C34] flex items-center px-4 gap-3 flex-shrink-0">
            <Smile size={18} className="text-[#8B8FA8] hover:text-white cursor-pointer" />
            <input
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder:text-[#4A4A6A]"
            />
            <Paperclip size={18} className="text-[#8B8FA8] hover:text-white cursor-pointer" />
            <button className="h-8 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-white text-sm font-semibold flex items-center gap-1">
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
