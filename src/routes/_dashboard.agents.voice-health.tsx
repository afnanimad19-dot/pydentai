import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Bot,
  Check,
  Circle,
  Clock,
  FileText,
  Phone,
  PhoneCall,
  PhoneOff,
  RefreshCw,
  Signal,
  TrendingUp,
  Volume2,
  X,
} from "lucide-react";
import {
  Cell,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";


export const Route = createFileRoute("/_dashboard/agents/voice-health")({
  component: VoiceHealthPage,
});

const STATS = [
  { icon: Bot, tone: "text-[#7B5CFC]", l: "Active Agents", v: "2/2" },
  { icon: PhoneCall, tone: "text-[#00D4AA]", l: "Phone Lines", v: "0/0" },
  { icon: Phone, tone: "text-blue-400", l: "Total Calls", v: "0" },
  { icon: Clock, tone: "text-amber-400", l: "Avg Duration", v: "—" },
  { icon: FileText, tone: "text-[#8B8FA8]", l: "Knowledge Docs", v: "0" },
  { icon: TrendingUp, tone: "text-[#22C55E]", l: "Completion Rate", v: "0%" },
];

type Agent = {
  initials: string;
  name: string;
  kind: string;
  knowledgeOk: boolean;
  readiness: number;
  readinessFill: string;
};

const AGENTS: Agent[] = [
  {
    initials: "DA",
    name: "Dental Assistant",
    kind: "BOTH",
    knowledgeOk: true,
    readiness: 50,
    readinessFill: "#F59E0B",
  },
  {
    initials: "SA",
    name: "Sarah",
    kind: "CHAT",
    knowledgeOk: false,
    readiness: 25,
    readinessFill: "#FF4D6D",
  },
];

function VoiceHealthPage() {
  const [openAgent, setOpenAgent] = useState<Agent | null>(null);

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <Activity size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Voice Health
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Real-time agent health monitoring & readiness diagnostics
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-3 bg-[#22C55E]/12 text-[#22C55E] text-xs px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            System Online
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
            <Activity size={14} />
            Live Monitoring
          </button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
            <RefreshCw size={14} />
            Sync
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6 grid grid-cols-6 gap-3">
        {STATS.map(({ icon: Icon, tone, l, v }) => (
          <div
            key={l}
            className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-3"
          >
            <Icon size={18} className={tone} />
            <div>
              <div className="text-white font-bold text-lg leading-none">
                {v}
              </div>
              <div className="text-[#4A4A6A] text-[10px] uppercase mt-1.5">
                {l}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Three Panels */}
      <div className="px-6 mb-6 grid grid-cols-3 gap-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="text-white font-semibold text-sm mb-1">
            Overall Readiness
          </div>
          <div className="text-[#FF4D6D] text-xs mb-4">
            Critical setup required
          </div>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ v: 38 }, { v: 62 }]}
                    dataKey="v"
                    innerRadius={25}
                    outerRadius={38}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    <Cell fill="#F59E0B" />
                    <Cell fill="#1C1C34" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                38%
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Check size={12} className="text-[#22C55E]" />
                <span className="text-white text-sm">2 online</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={12} className="text-[#FF4D6D]" />
                <span className="text-[#FF4D6D] text-xs">
                  Phone setup needed
                </span>
              </div>
              <div className="text-[#4A4A6A] text-[11px] mt-2">
                Configure phone numbers to reach 100%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center">
              <Volume2 size={18} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                Voice Engine
              </div>
              <div className="text-[#4A4A6A] text-xs">Vapi.ai Provider</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#06060F] rounded-lg p-3">
              <div className="text-[#4A4A6A] text-[10px] uppercase">
                Voices Configured
              </div>
              <div className="text-white text-lg font-bold mt-1">2/2</div>
            </div>
            <div className="bg-[#06060F] rounded-lg p-3">
              <div className="text-[#4A4A6A] text-[10px] uppercase">
                Synced Agents
              </div>
              <div className="text-white text-lg font-bold mt-1">1/2</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-full bg-[#00D4AA]/15 flex items-center justify-center">
              <Signal size={18} className="text-[#00D4AA]" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                Phone Network
              </div>
              <div className="text-[#4A4A6A] text-xs">
                0 numbers provisioned
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-2">
            <PhoneOff size={32} className="text-[#1C1C34]" />
            <div className="text-[#4A4A6A] text-sm text-center mt-2">
              No phone numbers provisioned
            </div>
            <button className="mt-3 h-8 px-3 rounded-md border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs">
              + Add Phone Number
            </button>
          </div>
        </div>
      </div>

      {/* Agent Roster */}
      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center gap-3">
            <Circle size={14} className="text-[#7B5CFC]" />
            <div className="text-white font-semibold text-[15px]">
              Agent Roster & Diagnostics
            </div>
            <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-xs px-2 py-0.5 rounded-full">
              {AGENTS.length}
            </span>
            <div className="ml-auto flex items-center gap-4 text-xs">
              <Legend dot="bg-[#22C55E]" tone="text-[#22C55E]" label="Ready" />
              <Legend dot="bg-amber-400" tone="text-amber-400" label="Partial" />
              <Legend
                dot="bg-[#FF4D6D]"
                tone="text-[#FF4D6D]"
                label="Needs Setup"
              />
            </div>
          </div>

          {AGENTS.map((a) => (
            <AgentRow key={a.name} agent={a} onClick={() => setOpenAgent(a)} />
          ))}
        </div>
      </div>

      {openAgent && (
        <AgentSlideOver agent={openAgent} onClose={() => setOpenAgent(null)} />
      )}
    </div>
  );
}

function Legend({
  dot,
  tone,
  label,
}: {
  dot: string;
  tone: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${dot}`} />
      <span className={tone}>{label}</span>
    </div>
  );
}

function AgentRow({ agent, onClick }: { agent: Agent; onClick: () => void }) {
  const { initials, name, kind, knowledgeOk, readiness, readinessFill } = agent;
  return (
    <button
      onClick={onClick}
      className="w-full border-b border-[#1C1C34] last:border-0 px-5 py-4 flex items-center gap-4 hover:bg-[#7B5CFC]/5 transition-colors text-left"
    >
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7B5CFC]/40 to-[#00D4AA]/30 flex items-center justify-center text-white text-xs font-semibold">
        {initials}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{name}</span>
          <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">
            EN
          </span>
          <span className="bg-blue-500/12 text-blue-400 text-[10px] px-2 py-0.5 rounded-full">
            {kind}
          </span>
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">
            ONLINE
          </span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Diag ok label="Voice" />
          <Diag ok label="Synced" />
          <Diag ok={knowledgeOk} label="Knowledge" />
          <Diag ok={false} label="Phone" />
        </div>
      </div>
      <div className="w-[60px] h-[60px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={[{ v: readiness, fill: readinessFill }]}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              background={{ fill: "#1C1C34" }}
              dataKey="v"
              cornerRadius={6}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center text-white text-[11px] font-bold">
          {readiness}%
        </div>
      </div>
    </button>
  );
}

function Diag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      {ok ? (
        <Check size={12} className="text-[#22C55E]" />
      ) : (
        <X size={12} className="text-[#FF4D6D]" />
      )}
      <span className="text-xs text-[#8B8FA8]">{label}</span>
    </div>
  );
}

function AgentSlideOver({
  agent,
  onClose,
}: {
  agent: Agent;
  onClose: () => void;
}) {
  const checks = [
    { l: "Voice engine", ok: true, detail: "Vapi.ai · alloy · 112 ms TTS" },
    { l: "Sync status", ok: true, detail: "Synced 4 minutes ago" },
    {
      l: "Knowledge base",
      ok: agent.knowledgeOk,
      detail: agent.knowledgeOk ? "1 doc · 312 chunks · 98% recall" : "No documents indexed",
    },
    { l: "Phone number", ok: false, detail: "Not provisioned" },
    { l: "Webhook delivery", ok: true, detail: "100% over last 24h" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-[460px] h-full bg-[#0B0B1A] border-l border-[#1C1C34] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1C1C34]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B5CFC]/40 to-[#00D4AA]/30 flex items-center justify-center text-white font-semibold">
                {agent.initials}
              </div>
              <div>
                <div className="text-white font-bold text-lg">{agent.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-0.5">
                  {agent.kind} agent · EN
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#4A4A6A] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-[72px] h-[72px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[{ v: agent.readiness, fill: agent.readinessFill }]}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    background={{ fill: "#1C1C34" }}
                    dataKey="v"
                    cornerRadius={6}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                {agent.readiness}%
              </div>
            </div>
            <div className="text-[#8B8FA8] text-xs leading-relaxed">
              Readiness reflects voice setup, knowledge coverage, sync state,
              and phone provisioning.
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-2">
            Diagnostic detail
          </div>
          {checks.map((c) => (
            <div
              key={c.l}
              className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex items-start gap-3"
            >
              {c.ok ? (
                <Check size={16} className="text-[#22C55E] mt-0.5" />
              ) : (
                <X size={16} className="text-[#FF4D6D] mt-0.5" />
              )}
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{c.l}</div>
                <div className="text-[#8B8FA8] text-xs mt-0.5">{c.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 pb-6 flex gap-2">
          <button className="flex-1 h-10 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm">
            Run diagnostics
          </button>
          <button className="flex-1 h-10 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
            Fix issues
          </button>
        </div>
      </div>
    </div>
  );
}
