import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  ChevronDown,
  FileText,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { PremiumBanner } from "@/components/dashboard/PremiumBanner";

export const Route = createFileRoute("/_dashboard/agents/avatar-studio")({
  component: AvatarStudioPage,
});

function AvatarStudioPage() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* Top Info Bar */}
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <Video size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Avatar Studio</span>
        <span className="text-[#4A4A6A] text-xs">
          Live AI Avatar Testing Console
        </span>

        <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-2 ml-4 cursor-pointer">
          <Sparkles size={12} className="text-[#7B5CFC]" />
          <span className="text-white text-sm">Dental Assistant</span>
          <ChevronDown size={12} className="text-[#4A4A6A]" />
        </div>

        <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-2 cursor-pointer">
          <Video size={12} className="text-[#00D4AA]" />
          <span className="text-white text-sm">LIVEAVATAR</span>
        </div>

        <div className="ml-4 flex bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 gap-1">
          {["Preview", "Design", "Diagnostics"].map((m, i) => (
            <button
              key={m}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                i === 0
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#4A4A6A] hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Premium banner inline */}
      <div className="px-6 pt-4">
        <PremiumBanner />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Avatar Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f6f0] relative overflow-y-auto">
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
              {[
                { l: "Avatar", a: false },
                { l: "Agent", a: true },
                { l: "Voice", a: false },
                { l: "Persona", a: false },
                { l: "Knowledge", a: false },
              ].map((s) => (
                <span
                  key={s.l}
                  className={`rounded-full px-3 py-1 text-xs border ${
                    s.a
                      ? "bg-[#7B5CFC]/10 border-[#7B5CFC]/30 text-[#7B5CFC]"
                      : "bg-white border-gray-200 text-gray-600"
                  }`}
                >
                  {s.l}
                </span>
              ))}
            </div>

            <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl w-[220px] h-[260px] flex flex-col items-center justify-center gap-3 px-4">
              <Sparkles size={36} className="text-gray-300" />
              <div className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
                LIVEAVATAR
              </div>
              <div className="text-gray-700 text-lg font-semibold mt-2">
                Pick an avatar
              </div>
              <div className="text-gray-400 text-sm text-center max-w-[180px]">
                No live avatars found. Add one to get started.
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl flex items-center px-4 gap-6 h-14">
              {[
                { icon: Bot, label: "AGENT", a: true },
                { icon: Video, label: "AVATARS", a: false },
                { icon: TrendingUp, label: "SALES", a: false },
                { icon: FileText, label: "TRANSCRIPT", a: false },
              ].map(({ icon: Icon, label, a }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <Icon
                    size={16}
                    className={a ? "text-[#7B5CFC]" : "text-gray-300"}
                  />
                  <span
                    className={`text-[10px] font-semibold ${
                      a ? "text-[#7B5CFC]" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
              ))}
              <div className="w-px h-8 bg-gray-200" />
              <button className="bg-gray-100 border border-gray-200 rounded-lg px-6 py-2 text-gray-400 text-sm cursor-not-allowed">
                Start
              </button>
            </div>
          </div>
        </div>

        {/* Config Panel */}
        <div className="w-[300px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] flex flex-col overflow-y-auto">
          {/* Agent Header */}
          <div className="px-4 pt-4 pb-3 border-b border-[#1C1C34]">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold text-sm">
                Dental Assistant
              </div>
              <button className="text-[#FF4D6D] text-xs hover:underline">
                Unlink
              </button>
            </div>
            <div className="flex gap-2 mt-2 items-center">
              <span className="bg-blue-500/12 text-blue-400 text-[10px] px-2 py-0.5 rounded-full">
                Turbo v2.5
              </span>
              <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">
                SOC2
              </span>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">
                EN
              </span>
              <div className="ml-auto bg-[#7B5CFC] w-8 h-4 rounded-full relative">
                <span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Setup checklist */}
          <div className="px-4 py-4 border-b border-[#1C1C34] grid grid-cols-2 gap-2">
            {[
              { l: "Persona", v: "Set", ok: true },
              { l: "Voice", v: "alloy", ok: true },
              { l: "Opening", v: "Custom", ok: true },
              { l: "Knowledge", v: "1 docs", ok: true },
            ].map((s) => (
              <div key={s.l} className="bg-[#06060F] rounded-lg px-3 py-2">
                <div className="text-[#4A4A6A] text-[10px] uppercase">
                  {s.l}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      s.ok ? "bg-[#22C55E]" : "bg-amber-400"
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      s.ok ? "text-[#22C55E]" : "text-amber-400"
                    }`}
                  >
                    {s.v}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Knowledge */}
          <div className="px-4 py-4 border-b border-[#1C1C34]">
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-3">
              Knowledge
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-[#1C1C34] rounded-lg px-2 py-1 text-white text-xs">
                Docs · 1
              </div>
              <div className="bg-[#1C1C34] rounded-lg px-2 py-1 text-white text-xs">
                Chunks · 312
              </div>
              <div className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-1 rounded-lg font-semibold">
                Recall 98.4%
              </div>
            </div>
          </div>

          {/* Voice Tune */}
          <div className="px-4 py-4 border-b border-[#1C1C34]">
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-3">
              Voice Tune
            </div>
            <div className="flex items-center mb-2">
              <span className="text-[#8B8FA8] text-xs">Speaking rate</span>
              <span className="text-white text-xs ml-auto">1.00×</span>
            </div>
            <div className="relative h-1.5 bg-[#1C1C34] rounded-full">
              <div className="absolute left-1/2 -top-1.5 w-4 h-4 rounded-full bg-[#7B5CFC] -translate-x-1/2" />
            </div>
            <div className="text-[#8B8FA8] text-xs mt-3 mb-2">Emotion</div>
            <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm">
              <option>FRIENDLY</option>
              <option>NEUTRAL</option>
              <option>EXCITED</option>
            </select>
          </div>

          {/* Persona Override */}
          <div className="px-4 py-4">
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-3">
              Persona override (this session)
            </div>
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 text-[#8B8FA8] text-xs leading-relaxed h-32 overflow-y-auto">
              1. Persona & Tone Guidelines
              <br />• Identity: Digital Receptionist for Dubai Smile Clinic
              <br />• Tone: Professional, empathetic, and reassuring
              <br />• Style: Concise, clear, and friendly
            </div>
            <div className="text-[#4A4A6A] text-[10px] mt-3 mb-1 uppercase tracking-wider">
              Opening message
            </div>
            <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 text-[#8B8FA8] text-xs">
              Hi, I'm your AI dental assistant at Dubai Smile Clinic...
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-7 bg-[#06060F] border-t border-[#1C1C34] flex items-center justify-between px-4 flex-shrink-0">
        <span className="text-[#4A4A6A] text-[10px]">IDLE</span>
        <span className="text-[#4A4A6A] text-[10px]">LIVEAVATAR</span>
      </div>
    </div>
  );
}
