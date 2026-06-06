import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bot,
  ChevronDown,
  FileText,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";


export const Route = createFileRoute("/_dashboard/agents/avatar-studio")({
  component: AvatarStudioPage,
});

const MODES = ["Preview", "Design", "Diagnostics"] as const;
type Mode = (typeof MODES)[number];

const AVATARS = [
  { id: "av1", name: "Aria — Friendly", desc: "Female · EN" },
  { id: "av2", name: "Leo — Professional", desc: "Male · EN" },
  { id: "av3", name: "Mia — Warm", desc: "Female · EN/ES" },
];

function AvatarStudioPage() {
  const [mode, setMode] = useState<Mode>("Preview");
  const [linked, setLinked] = useState(true);
  const [rate, setRate] = useState(1);
  const [emotion, setEmotion] = useState("FRIENDLY");
  const [persona, setPersona] = useState(
    "1. Persona & Tone Guidelines\n• Identity: Digital Receptionist for Dubai Smile Clinic\n• Tone: Professional, empathetic, and reassuring\n• Style: Concise, clear, and friendly"
  );
  const [opening, setOpening] = useState(
    "Hi, I'm your AI dental assistant at Dubai Smile Clinic..."
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<null | typeof AVATARS[number]>(null);
  const [running, setRunning] = useState(false);

  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      {/* Top Info Bar */}
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <Video size={16} className="text-[#7B5CFC]" />
        <span className="text-white font-semibold text-sm">Avatar Studio</span>
        <span className="text-[#4A4A6A] text-xs">
          Live AI Avatar Testing Console
        </span>

        <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-2 ml-4">
          <Sparkles size={12} className="text-[#7B5CFC]" />
          <span className="text-white text-sm">Dental Assistant</span>
          <ChevronDown size={12} className="text-[#4A4A6A]" />
        </div>

        <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-1.5 flex items-center gap-2">
          <Video size={12} className="text-[#00D4AA]" />
          <span className="text-white text-sm">LIVEAVATAR</span>
        </div>

        <div className="ml-4 flex bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 gap-1">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                mode === m
                  ? "bg-[#7B5CFC] text-white"
                  : "text-[#4A4A6A] hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>


      <div className="flex flex-1 overflow-hidden">
        {/* Avatar Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f6f0] relative overflow-y-auto">
          {mode === "Diagnostics" ? (
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
              <div className="text-gray-800 font-semibold">Diagnostics</div>
              {[
                ["WebRTC", "OK"],
                ["TTS latency", "112 ms"],
                ["STT latency", "98 ms"],
                ["Avatar stream", selectedAvatar ? "Bound" : "Idle"],
                ["Voice engine", "Vapi.ai · healthy"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-gray-800 font-medium">{v}</span>
                </div>
              ))}
            </div>
          ) : mode === "Design" ? (
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <div className="text-gray-800 font-semibold">Design</div>
              <label className="block text-xs text-gray-500">Background</label>
              <div className="flex gap-2">
                {["#f8f6f0", "#0B0B1A", "#ffffff", "#1e293b"].map((c) => (
                  <button
                    key={c}
                    className="w-8 h-8 rounded-full border border-gray-200"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <label className="block text-xs text-gray-500">Frame style</label>
              <div className="flex gap-2">
                {["Rounded", "Square", "Circle"].map((s) => (
                  <button
                    key={s}
                    className="px-3 py-1.5 rounded-md border border-gray-200 text-xs text-gray-700 hover:border-[#7B5CFC]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
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

              <button
                onClick={() => setPickerOpen(true)}
                className="bg-white border-2 border-dashed border-gray-200 rounded-2xl w-[220px] h-[260px] flex flex-col items-center justify-center gap-3 px-4 hover:border-[#7B5CFC] transition-colors"
              >
                {selectedAvatar ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7B5CFC] to-[#00D4AA] flex items-center justify-center text-white text-2xl font-bold">
                      {selectedAvatar.name.charAt(0)}
                    </div>
                    <div className="text-gray-700 text-lg font-semibold mt-2">
                      {selectedAvatar.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {selectedAvatar.desc}
                    </div>
                    <span className="text-[#7B5CFC] text-xs">Change</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={36} className="text-gray-300" />
                    <div className="text-gray-400 text-xs tracking-widest uppercase font-semibold">
                      LIVEAVATAR
                    </div>
                    <div className="text-gray-700 text-lg font-semibold mt-2">
                      Pick an avatar
                    </div>
                    <div className="text-gray-400 text-sm text-center max-w-[180px]">
                      Click to choose an avatar.
                    </div>
                  </>
                )}
              </button>

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
                <button
                  disabled={!selectedAvatar}
                  onClick={() => setRunning((v) => !v)}
                  className={`rounded-lg px-6 py-2 text-sm font-semibold transition-colors ${
                    selectedAvatar
                      ? running
                        ? "bg-[#FF4D6D] text-white"
                        : "bg-[#7B5CFC] text-white hover:bg-[#6047DB]"
                      : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {running ? "Stop" : "Start"}
                </button>
              </div>
            </div>
          )}

          {/* Picker modal */}
          {pickerOpen && (
            <div
              className="absolute inset-0 bg-black/40 flex items-center justify-center z-10"
              onClick={() => setPickerOpen(false)}
            >
              <div
                className="bg-white rounded-2xl p-6 w-[420px] shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-800 font-semibold">Choose an avatar</div>
                  <button
                    onClick={() => setPickerOpen(false)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-2">
                  {AVATARS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setSelectedAvatar(a);
                        setPickerOpen(false);
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#7B5CFC] hover:bg-[#7B5CFC]/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B5CFC] to-[#00D4AA] flex items-center justify-center text-white font-bold">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-gray-800 text-sm font-semibold">
                          {a.name}
                        </div>
                        <div className="text-gray-400 text-xs">{a.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Config Panel */}
        <div className="w-[300px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] flex flex-col overflow-y-auto">
          {/* Agent Header */}
          <div className="px-4 pt-4 pb-3 border-b border-[#1C1C34]">
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold text-sm">
                Dental Assistant
              </div>
              <button
                onClick={() => setLinked((v) => !v)}
                className={`text-xs hover:underline ${
                  linked ? "text-[#FF4D6D]" : "text-[#22C55E]"
                }`}
              >
                {linked ? "Unlink" : "Link"}
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
              <button
                onClick={() => setLinked((v) => !v)}
                className={`ml-auto w-8 h-4 rounded-full relative transition-colors ${
                  linked ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                    linked ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Setup checklist */}
          <div className="px-4 py-4 border-b border-[#1C1C34] grid grid-cols-2 gap-2">
            {[
              { l: "Persona", v: persona.length > 10 ? "Set" : "Empty", ok: persona.length > 10 },
              { l: "Voice", v: "alloy", ok: true },
              { l: "Opening", v: opening.length > 5 ? "Custom" : "Default", ok: true },
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
              <span className="text-white text-xs ml-auto">{rate.toFixed(2)}×</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full accent-[#7B5CFC]"
            />
            <div className="text-[#8B8FA8] text-xs mt-3 mb-2">Emotion</div>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm"
            >
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
            <textarea
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 text-[#E5E7EB] text-xs leading-relaxed h-32 resize-none focus:outline-none focus:border-[#7B5CFC]/40"
            />
            <div className="text-[#4A4A6A] text-[10px] mt-3 mb-1 uppercase tracking-wider">
              Opening message
            </div>
            <textarea
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 text-[#E5E7EB] text-xs h-20 resize-none focus:outline-none focus:border-[#7B5CFC]/40"
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="h-7 bg-[#06060F] border-t border-[#1C1C34] flex items-center justify-between px-4 flex-shrink-0">
        <span className="text-[#4A4A6A] text-[10px]">
          {running ? "LIVE" : "IDLE"} · {mode.toUpperCase()}
        </span>
        <span className="text-[#4A4A6A] text-[10px]">LIVEAVATAR</span>
      </div>
    </div>
  );
}
