import { createFileRoute } from "@tanstack/react-router";
import { Globe, RefreshCw, LayoutTemplate, BarChart, MessageSquare, Users, Link as LinkIcon, Calendar, Eye, Power, Mic, Settings } from "lucide-react";

export const Route = createFileRoute("/_dashboard/website-chat/widgets")({ component: Widgets });

function Widgets() {
  return (
    <div className="font-sans flex overflow-hidden h-[calc(100vh-56px)]">
      <div className="w-[340px] flex-shrink-0 border-r border-[#1C1C34] flex flex-col">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex justify-between items-center">
          <div className="flex items-center gap-2"><Globe size={16} className="text-[#00D4AA]" /><span className="text-white font-semibold text-sm">Chat Widgets</span></div>
          <div className="flex gap-1.5">
            <button className="text-[#8B8FA8] p-1"><RefreshCw size={14} /></button>
            <button className="text-[#8B8FA8] p-1"><LayoutTemplate size={14} /></button>
            <button className="text-[#8B8FA8] p-1"><BarChart size={14} /></button>
            <button className="ml-1 h-7 px-2 rounded bg-[#00D4AA] text-black text-xs font-semibold">+ New</button>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-[#1C1C34] grid grid-cols-5 gap-1 text-center">
          {[["Total", "1"], ["Active", "1"], ["Voice", "0"], ["Text", "1"], ["Lead", "1"]].map(([l, v]) => (
            <div key={l} className="bg-[#06060F] rounded-lg py-2"><div className="text-white font-bold text-sm">{v}</div><div className="text-[#4A4A6A] text-[10px]">{l}</div></div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="text-[#4A4A6A] text-[10px] uppercase mb-3">Your Widgets 1</div>
          <div className="bg-[#06060F] border-2 border-[#00D4AA]/40 rounded-xl p-4 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-white text-sm font-semibold">chat</span>
              <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded-full">Live</span>
            </div>
            <div className="text-[#4A4A6A] text-xs">@ Ella</div>
            <div className="flex gap-2 mt-2">
              <span className="bg-[#00D4AA]/12 text-[#00D4AA] text-[10px] px-2 py-0.5 rounded-full">Live</span>
              <span className="bg-[#00D4AA]/12 text-[#00D4AA] text-[10px] px-2 py-0.5 rounded-full">Text</span>
            </div>
            <div className="flex items-center gap-4 mt-3 text-[11px] text-[#4A4A6A]">
              <div className="flex items-center gap-1"><Users size={10} /> 2 fields</div>
              <div className="flex items-center gap-1"><LinkIcon size={10} /> 1 channel</div>
              <div className="flex items-center gap-1"><Calendar size={10} /> Jun 2</div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <button className="text-[#8B8FA8] text-xs">Get Code</button>
              <div className="flex gap-2"><Eye size={14} className="text-[#4A4A6A]" /><Power size={14} className="text-[#4A4A6A]" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-9 h-9 rounded-full bg-[#00D4AA]/15 flex items-center justify-center"><MessageSquare size={18} className="text-[#00D4AA]" /></div>
          <div className="flex-1"><div className="text-white font-semibold text-[18px]">chat</div><div className="text-[#4A4A6A] text-xs">@ Ella · Jun 2, 2026 · 4d ago</div></div>
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2.5 py-1 rounded-full">Live</span>
          <div className="w-10 h-5 bg-[#22C55E] rounded-full relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div>
          <Settings size={16} className="text-[#8B8FA8]" />
        </div>

        <div className="grid grid-cols-4 gap-3 mb-5">
          {[["1", "Text"], ["2", "Name, Email"], ["Right Bottom", "Position"], ["#2563EB", "Color"]].map(([v, l]) => (
            <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-3 text-center">
              <div className="text-white font-bold text-lg">{v}</div><div className="text-[#4A4A6A] text-[10px]">{l}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-5">
          {["Text", "Name", "Email", "#4a7d8...trunc"].map((t) => <span key={t} className="bg-[#1C1C34] text-[#8B8FA8] text-xs rounded px-2 py-1">{t}</span>)}
        </div>

        <div className="flex gap-1 bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 mb-5 w-fit">
          {["General", "Appearance", "Lead Capture", "Install", "Advanced"].map((t, i) => (
            <button key={t} className={`px-3 py-1.5 text-xs rounded ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8]"}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-5">
          <section>
            <div className="text-white font-semibold text-sm">Widget Identity</div>
            <div className="text-[#4A4A6A] text-xs mb-3">Basic configuration for your chat widget</div>
            <div className="grid grid-cols-2 gap-4">
              <div><div className="text-[#8B8FA8] text-[10px] mb-1">Widget Name</div><input defaultValue="chat" className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm" /></div>
              <div><div className="text-[#8B8FA8] text-[10px] mb-1">AI Agent</div><div className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#22C55E]" /> Ella</div></div>
            </div>
          </section>

          <section>
            <div className="text-white font-semibold text-sm">Greeting & Messaging</div>
            <div className="text-[#4A4A6A] text-xs mb-3">Customize how your widget communicates with visitors</div>
            <div className="text-[#8B8FA8] text-[10px] mb-1">Welcome Message</div>
            <textarea defaultValue="Hi there! 👋 How can I help you today?" className="w-full bg-[#06060F] border border-[#1C1C34] rounded-xl p-3 text-white text-sm" rows={3} />
            <div className="text-[#4A4A6A] text-[10px] text-right mt-1">40/200 characters</div>
            <div className="text-[#8B8FA8] text-[10px] mb-1 mt-3">Button Text</div>
            <input defaultValue="Chat with us" className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm" />
          </section>

          <section>
            <div className="text-white font-semibold text-sm">Communication Channels</div>
            <div className="text-[#4A4A6A] text-xs mb-3">Enable different ways for visitors to interact</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                <div className="flex items-center justify-between"><Mic size={16} className="text-[#7B5CFC]" /><div className="w-10 h-5 bg-[#1C1C34] rounded-full" /></div>
                <div className="text-white text-sm mt-2">Voice Chat</div>
                <div className="text-[#4A4A6A] text-xs">Real-time voice conversations</div>
                <span className="bg-[#7B5CFC]/12 text-[#7B5CFC] text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block">AI-powered voice</span>
              </div>
              <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4">
                <div className="flex items-center justify-between"><MessageSquare size={16} className="text-[#00D4AA]" /><div className="w-10 h-5 bg-[#00D4AA] rounded-full relative"><div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" /></div></div>
                <div className="text-white text-sm mt-2">Text Chat</div>
                <div className="text-[#4A4A6A] text-xs">Standard text messaging</div>
                <span className="bg-[#00D4AA]/12 text-[#00D4AA] text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block">Instant replies</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
