import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  ChevronDown,
  FileText,
  Globe,
  HelpCircle,
  Maximize2,
  MessageSquare,
  Phone,
  Settings,
  Volume2,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/voice-lab")({
  component: VoiceLabPage,
});

function VoiceLabPage() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* Top Info Bar */}
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-[#7B5CFC]" />
          <span className="text-white font-semibold text-sm">Voice Lab</span>
          <span className="text-[#4A4A6A] text-xs ml-2">
            Real-time AI Voice Testing Console
          </span>
        </div>

        <div className="flex items-center gap-2 ml-6 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 cursor-pointer">
          <Bot size={14} className="text-[#22C55E]" />
          <span className="text-white text-sm">Dental Assistant</span>
          <span className="text-[#4A4A6A] text-xs">both · EN</span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded font-semibold">
            LIVE
          </span>
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
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#22C55E] text-xs">Online</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[#4A4A6A] text-xs">
            <span>7d Calls: 0</span>
            <span>Today: 0</span>
            <span>Avg: 0s</span>
          </div>
          <div className="h-4 w-px bg-[#1C1C34]" />
          <span className="text-[#00D4AA] text-[11px]">Latency: ~120ms</span>
          <span className="text-[#22C55E] text-[11px]">Quality: HD</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Call Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F] relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(123,92,252,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Avatar */}
          <div className="relative w-[200px] h-[200px] mb-8">
            <div className="absolute inset-0 rounded-full border border-[#1C1C34]" />
            <div className="w-full h-full rounded-full bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center">
              <Bot size={64} className="text-[#7B5CFC]/50" />
            </div>
          </div>

          {/* Waveform */}
          <div className="w-64 h-8 flex items-center justify-center gap-[2px] mb-6">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full bg-[#1C1C34]"
                style={{ height: "4px" }}
              />
            ))}
          </div>

          {/* Call Button */}
          <button className="w-24 h-24 rounded-full bg-[#06060F] border-2 border-[#1C1C34] flex items-center justify-center hover:border-[#7B5CFC]/50 hover:bg-[#7B5CFC]/10 transition-all">
            <Phone size={32} className="text-white" />
          </button>
          <div className="text-[#4A4A6A] text-sm mt-4 text-center">
            Click to start a conversation with Dental Assistant
          </div>

          {/* Agent Info Card */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
              <Bot size={14} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">
                Dental Assistant
              </div>
              <div className="text-[#4A4A6A] text-xs">
                EN · 1 Persona & Tone Guidelines · Identity: Dental F...
              </div>
            </div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Transcript */}
        <div className="w-[320px] flex-shrink-0 border-l border-[#1C1C34] flex flex-col">
          <div className="h-12 flex items-center justify-between px-4 border-b border-[#1C1C34]">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-[#7B5CFC]" />
              <span className="text-white text-sm font-medium">
                Live Transcript
              </span>
            </div>
            <button className="text-[#8B8FA8] hover:text-white">
              <Maximize2 size={14} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <Bot size={40} className="text-[#1C1C34] mx-auto mb-3" />
            <div className="text-[#4A4A6A] text-sm text-center">
              No conversation yet
            </div>
            <div className="text-[#4A4A6A] text-xs text-center mt-1">
              Start a call to see the live transcript appear here
            </div>
          </div>

          <div className="h-12 border-t border-[#1C1C34] flex items-center px-4 gap-2">
            <input
              disabled
              placeholder="Start a call to send messages..."
              className="flex-1 bg-transparent border-0 outline-none text-[#4A4A6A] text-sm cursor-not-allowed"
            />
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
