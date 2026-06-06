import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bot,
  Camera,
  ChevronDown,
  Globe,
  GitBranch,
  Mail,
  MessageCircle,
  MessageSquare,
  PhoneCall,
  Settings,
  Sparkles,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/hub")({
  component: AgentHubPage,
});

type Channel = {
  name: string;
  icon: LucideIcon;
  iconTone: string;
  desc: string;
  agent: string | null;
  enabled: boolean;
  statusKind: "live" | "not-set" | "not-connected";
  statusText: string;
};

const INITIAL: Channel[] = [
  { name: "AI Calling", icon: PhoneCall, iconTone: "bg-[#7B5CFC]/15 text-[#7B5CFC]", desc: "Outbound & inbound calls", agent: null, enabled: false, statusKind: "not-set", statusText: "Set up a phone number first" },
  { name: "WhatsApp", icon: MessageCircle, iconTone: "bg-[#22C55E]/15 text-[#22C55E]", desc: "WhatsApp messages", agent: null, enabled: false, statusKind: "not-connected", statusText: "Not connected" },
  { name: "Instagram", icon: Camera, iconTone: "bg-pink-500/15 text-pink-400", desc: "Instagram DMs", agent: null, enabled: false, statusKind: "not-connected", statusText: "Not connected" },
  { name: "Website Chat", icon: Globe, iconTone: "bg-blue-500/15 text-blue-400", desc: "Website visitors", agent: "Dental Assistant", enabled: true, statusKind: "live", statusText: "Active" },
  { name: "Email", icon: Mail, iconTone: "bg-blue-500/15 text-blue-400", desc: "Incoming emails", agent: null, enabled: false, statusKind: "not-set", statusText: "Not set" },
  { name: "SMS", icon: MessageSquare, iconTone: "bg-[#00D4AA]/15 text-[#00D4AA]", desc: "SMS messages", agent: null, enabled: false, statusKind: "not-set", statusText: "Not set" },
];

function AgentHubPage() {
  const [channels, setChannels] = useState(INITIAL);
  const [openAgent, setOpenAgent] = useState<Channel | null>(null);

  const toggle = (i: number) =>
    setChannels((cs) => cs.map((c, j) => (i === j ? { ...c, enabled: !c.enabled } : c)));

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <GitBranch size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">Agent Hub</div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">Route conversations to the right AI agent per channel</div>
          </div>
        </div>
        <Link to="/agents/studio" className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center">
          Manage Agents
        </Link>
      </div>

      <div className="px-6 mb-6 grid grid-cols-3 gap-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Bot size={22} className="text-[#7B5CFC]" />
          <div>
            <div className="text-white font-bold text-xl leading-none">2</div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">Total Agents</div>
          </div>
        </div>
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Settings size={22} className="text-[#00D4AA]" />
          <div>
            <div className="text-white font-bold text-xl leading-none">1</div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">Configured</div>
          </div>
        </div>
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Zap size={22} className="text-[#22C55E]" />
          <div>
            <div className="text-white font-bold text-xl leading-none flex items-center gap-2">
              1
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            </div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">Live Now</div>
          </div>
        </div>
      </div>

      <div className="px-6 grid grid-cols-3 gap-4">
        {channels.map((c, i) => (
          <ChannelCard
            key={c.name}
            channel={c}
            onToggle={() => toggle(i)}
            onOpenAgent={() => setOpenAgent(c)}
          />
        ))}
      </div>

      <div className="px-6 mt-6 mb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center gap-3">
          <Sparkles size={14} className="text-[#7B5CFC]" />
          <span className="text-[#8B8FA8] text-sm">Agents auto-respond using their knowledge base & FAQs</span>
          <div className="ml-auto flex gap-2">
            <Link to="/agents/knowledge" className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center">Knowledge</Link>
            <Link to="/agents/documents" className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center">Documents</Link>
          </div>
        </div>
      </div>

      {openAgent && <AgentSlideOver channel={openAgent} onClose={() => setOpenAgent(null)} />}
    </div>
  );
}

function ChannelCard({ channel, onToggle, onOpenAgent }: { channel: Channel; onToggle: () => void; onOpenAgent: () => void }) {
  const Icon = channel.icon;
  const statusBadge =
    channel.statusKind === "live" ? "bg-[#22C55E]/12 text-[#22C55E]"
    : channel.statusKind === "not-connected" ? "bg-red-500/12 text-red-400"
    : "bg-[#1C1C34] text-[#8B8FA8]";
  const statusLabel =
    channel.statusKind === "live" ? "Live"
    : channel.statusKind === "not-connected" ? "Not connected"
    : "Not set";

  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${channel.iconTone}`}>
            <Icon size={18} />
          </div>
          <div>
            <div className="text-white font-semibold text-[15px]">{channel.name}</div>
            <div className="text-[#4A4A6A] text-xs">{channel.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`${statusBadge} text-[10px] px-2 py-0.5 rounded-full font-medium`}>{statusLabel}</span>
          <button
            onClick={onToggle}
            className={`w-9 h-5 rounded-full relative transition-colors ${channel.enabled ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${channel.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      <button
        onClick={onOpenAgent}
        className="w-full mt-4 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2.5 flex items-center gap-2 hover:border-[#7B5CFC]/40 text-left"
      >
        <Bot size={14} className="text-[#4A4A6A]" />
        <span className={`text-sm ${channel.agent ? "text-white" : "text-[#4A4A6A]"}`}>{channel.agent ?? "No agent"}</span>
        <ChevronDown size={14} className="ml-auto text-[#4A4A6A]" />
      </button>

      <div className="mt-3 flex justify-between items-center">
        <span className={`text-xs ${channel.statusKind === "live" ? "text-[#22C55E]" : "text-[#4A4A6A]"}`}>
          {channel.statusText}
        </span>
        <button onClick={onOpenAgent} className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs">
          Manage Agent →
        </button>
      </div>
    </div>
  );
}

function AgentSlideOver({ channel, onClose }: { channel: Channel; onClose: () => void }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(channel.enabled);
  const [readiness, setReadiness] = useState(0);
  const targetReadiness = channel.agent ? 84 : 12;

  useEffect(() => {
    const t = setTimeout(() => setReadiness(targetReadiness), 50);
    return () => clearTimeout(t);
  }, [targetReadiness]);

  const prompt =
    "You are a friendly, knowledgeable dental clinic assistant. Help patients book appointments, answer questions about services, pricing, and clinic hours. Always be empathetic, professional, and concise. If a question is outside your scope, offer to connect them with a human team member.";

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div
        className="fixed right-0 top-0 h-full w-[480px] bg-[#111118] border-l border-[#1E1E2E] z-50 shadow-2xl flex flex-col"
        style={{ animation: "slideInRight 150ms ease-out" }}
      >
        <style>{`@keyframes slideInRight { from { transform: translateX(100%);} to { transform: translateX(0);} }`}</style>
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#1E1E2E] flex-shrink-0">
          <div className="text-white font-bold text-base">{channel.agent ?? `${channel.name} Agent`}</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 pb-24">
          <div className="flex items-center justify-between">
            <span className="text-[#8B8FA8] text-xs uppercase">Status</span>
            <button
              onClick={() => setActive((a) => !a)}
              className={`w-10 h-5 rounded-full relative transition-colors ${active ? "bg-[#22C55E]" : "bg-[#1C1C34]"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${active ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div>
            <div className="text-[#8B8FA8] text-xs uppercase mb-2">Type & Channels</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#7B5CFC]/15 text-[#7B5CFC] text-[11px] px-2 py-1 rounded-full">Conversational AI</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[11px] px-2 py-1 rounded-full">{channel.name}</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#8B8FA8] text-xs uppercase">Readiness</span>
              <span className="text-white text-xs font-semibold">{readiness}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#1C1C34] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7B5CFC] to-[#00D4AA] transition-all duration-700"
                style={{ width: `${readiness}%` }}
              />
            </div>
          </div>

          <div>
            <div className="text-[#8B8FA8] text-xs uppercase mb-2">System Prompt</div>
            <div className="bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-[#8B8FA8] text-xs leading-relaxed">
              {prompt.slice(0, 200)}…
            </div>
            <button
              onClick={() => { onClose(); navigate({ to: "/agents/studio" }); }}
              className="mt-2 text-[#7B5CFC] hover:text-[#9B84FF] text-xs"
            >
              Edit in Studio →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat value="1,284" label="Total Calls" />
            <Stat value="3,921" label="Messages" />
            <Stat value="1.2s" label="Avg Response" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#1E1E2E] bg-[#111118] flex gap-3">
          <button
            onClick={() => { onClose(); navigate({ to: "/agents/studio" }); }}
            className="flex-1 h-10 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold"
          >
            Open Full Studio →
          </button>
          <button
            onClick={() => { onClose(); navigate({ to: "/whatsapp/inbox" }); }}
            className="flex-1 h-10 rounded-lg border border-[#1E1E2E] text-[#8B8FA8] hover:text-white text-sm"
          >
            View Conversations →
          </button>
        </div>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#06060F] border border-[#1E1E2E] rounded-lg p-3 text-center">
      <div className="text-white font-bold text-base">{value}</div>
      <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">{label}</div>
    </div>
  );
}
