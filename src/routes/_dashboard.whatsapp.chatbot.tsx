import { createFileRoute } from "@tanstack/react-router";
import {
  GitBranch,
  Search,
  Layers,
  CheckCircle,
  Zap,
  Network,
  Link2,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/chatbot")({
  component: Chatbot,
});

const METRICS = [
  { icon: Layers, color: "text-[#7B5CFC]", value: "0", label: "TOTAL FLOWS", sub: "0 drafts" },
  { icon: CheckCircle, color: "text-[#00D4AA]", value: "0", label: "ACTIVE", sub: "0% of total" },
  { icon: Zap, color: "text-[#F59E0B]", value: "0", label: "TRIGGERS", sub: "0 avg/flow" },
  { icon: Network, color: "text-[#3B82F6]", value: "0", label: "TOTAL NODES", sub: "0 avg/flow" },
  { icon: Link2, color: "text-[#22C55E]", value: "0", label: "CONNECTIONS", sub: "0 avg/flow" },
  { icon: Activity, color: "text-[#FF4D6D]", value: "Low", label: "COMPLEXITY", sub: "0 nodes avg" },
];

function Chatbot() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <GitBranch size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Flow Command Center</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">AI-Powered</span>
              <span className="text-[#4A4A6A] text-xs ml-3">0 flows · 0 active · 0 nodes · 0 triggers</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Design and deploy WhatsApp chatbot automation flows</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Export</button>
          <button className="h-9 px-4 rounded-lg bg-[#00D4AA] hover:bg-[#00B894] text-black text-sm font-semibold">+ New Flow</button>
        </div>
      </div>

      <div className="px-6 mb-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">0%</span>
            <span className="text-[#8B8FA8] text-sm">Automation Readiness</span>
            <span className="text-[#4A4A6A] text-xs ml-3">Get started by creating your first active flow with triggers.</span>
          </div>
          <div className="flex gap-6">
            <span className="text-[#8B8FA8] text-xs">0% AVG HEALTH</span>
            <span className="text-[#8B8FA8] text-xs">0% ACTIVE RATE</span>
            <span className="text-[#8B8FA8] text-xs">0 ATTENTION</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <m.icon size={16} className={m.color} />
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-1.5 py-0.5 rounded">+0%</span>
            </div>
            <div className="text-white font-bold text-[26px] tracking-[-0.03em] mt-2">{m.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1">{m.label}</div>
            <div className="text-[#4A4A6A] text-[10px] mt-0.5">{m.sub}</div>
            <div className="h-8 mt-2 flex items-end gap-0.5">
              {[3, 5, 4, 7, 6, 8, 5, 7].map((h, i) => (
                <div key={i} className={`flex-1 ${m.color.replace("text-", "bg-")}/30 rounded-sm`} style={{ height: `${h * 4}px` }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex items-center gap-3">
        <div className="flex gap-1">
          {["Flows 0", "Analytics", "Intelligence"].map((t, i) => (
            <button
              key={t}
              className={
                i === 0
                  ? "bg-[#00D4AA]/12 text-[#00D4AA] border border-[#00D4AA]/20 px-3 py-1.5 text-xs rounded-full font-medium"
                  : "text-[#8B8FA8] hover:text-white text-xs px-3 py-1.5"
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="relative flex-1 ml-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search flows by name or description..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-8 pr-3 text-[#8B8FA8] text-xs" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
          <option>Last Updated</option>
        </select>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <div className="w-[72px] h-[72px] bg-[#00D4AA]/10 border border-[#00D4AA]/20 rounded-2xl flex items-center justify-center mb-6">
            <GitBranch size={36} className="text-[#00D4AA]/50" />
          </div>
          <div className="text-white font-bold text-xl mb-2">No chatbot flows yet</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Create your first conversation flow to automate WhatsApp responses with AI-powered interactions.
          </div>
          <div className="flex gap-3 justify-center">
            <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">Create with AI ✨</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm">Blank Flow</button>
          </div>
        </div>
      </div>
    </div>
  );
}
