import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  {
    name: "AI Calling",
    icon: PhoneCall,
    iconTone: "bg-[#7B5CFC]/15 text-[#7B5CFC]",
    desc: "Outbound & inbound calls",
    agent: null,
    enabled: false,
    statusKind: "not-set",
    statusText: "Set up a phone number first",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    iconTone: "bg-[#22C55E]/15 text-[#22C55E]",
    desc: "WhatsApp messages",
    agent: null,
    enabled: false,
    statusKind: "not-connected",
    statusText: "Not connected",
  },
  {
    name: "Instagram",
    icon: Camera,
    iconTone: "bg-pink-500/15 text-pink-400",
    desc: "Instagram DMs",
    agent: null,
    enabled: false,
    statusKind: "not-connected",
    statusText: "Not connected",
  },
  {
    name: "Website Chat",
    icon: Globe,
    iconTone: "bg-blue-500/15 text-blue-400",
    desc: "Website visitors",
    agent: "Dental Assistant",
    enabled: true,
    statusKind: "live",
    statusText: "Active",
  },
  {
    name: "Email",
    icon: Mail,
    iconTone: "bg-blue-500/15 text-blue-400",
    desc: "Incoming emails",
    agent: null,
    enabled: false,
    statusKind: "not-set",
    statusText: "Not set",
  },
  {
    name: "SMS",
    icon: MessageSquare,
    iconTone: "bg-[#00D4AA]/15 text-[#00D4AA]",
    desc: "SMS messages",
    agent: null,
    enabled: false,
    statusKind: "not-set",
    statusText: "Not set",
  },
];

function AgentHubPage() {
  const [channels, setChannels] = useState(INITIAL);

  const toggle = (i: number) =>
    setChannels((cs) =>
      cs.map((c, j) => (i === j ? { ...c, enabled: !c.enabled } : c))
    );

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <GitBranch size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Agent Hub
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Route conversations to the right AI agent per channel
            </div>
          </div>
        </div>
        <button className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm">
          Manage Agents
        </button>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6 grid grid-cols-3 gap-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Bot size={22} className="text-[#7B5CFC]" />
          <div>
            <div className="text-white font-bold text-xl leading-none">2</div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
              Total Agents
            </div>
          </div>
        </div>
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Settings size={22} className="text-[#00D4AA]" />
          <div>
            <div className="text-white font-bold text-xl leading-none">1</div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
              Configured
            </div>
          </div>
        </div>
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-6 py-4 flex items-center gap-4">
          <Zap size={22} className="text-[#22C55E]" />
          <div>
            <div className="text-white font-bold text-xl leading-none flex items-center gap-2">
              1
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            </div>
            <div className="text-[#4A4A6A] text-[11px] uppercase tracking-[0.06em] mt-1.5">
              Live Now
            </div>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div className="px-6 grid grid-cols-3 gap-4">
        {channels.map((c, i) => (
          <ChannelCard key={c.name} channel={c} onToggle={() => toggle(i)} />
        ))}
      </div>

      {/* Info Bar */}
      <div className="px-6 mt-6 mb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-3 flex items-center gap-3">
          <Sparkles size={14} className="text-[#7B5CFC]" />
          <span className="text-[#8B8FA8] text-sm">
            Agents auto-respond using their knowledge base & FAQs
          </span>
          <div className="ml-auto flex gap-2">
            <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs">
              Knowledge
            </button>
            <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs">
              Documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChannelCard({
  channel,
  onToggle,
}: {
  channel: Channel;
  onToggle: () => void;
}) {
  const Icon = channel.icon;
  const statusBadge =
    channel.statusKind === "live"
      ? "bg-[#22C55E]/12 text-[#22C55E]"
      : channel.statusKind === "not-connected"
      ? "bg-red-500/12 text-red-400"
      : "bg-[#1C1C34] text-[#8B8FA8]";
  const statusLabel =
    channel.statusKind === "live"
      ? "Live"
      : channel.statusKind === "not-connected"
      ? "Not connected"
      : "Not set";

  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${channel.iconTone}`}
          >
            <Icon size={18} />
          </div>
          <div>
            <div className="text-white font-semibold text-[15px]">
              {channel.name}
            </div>
            <div className="text-[#4A4A6A] text-xs">{channel.desc}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`${statusBadge} text-[10px] px-2 py-0.5 rounded-full font-medium`}
          >
            {statusLabel}
          </span>
          <button
            onClick={onToggle}
            className={`w-9 h-5 rounded-full relative transition-colors ${
              channel.enabled ? "bg-[#22C55E]" : "bg-[#1C1C34]"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                channel.enabled ? "translate-x-4" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2.5 flex items-center gap-2 cursor-pointer hover:border-[#7B5CFC]/40">
        <Bot size={14} className="text-[#4A4A6A]" />
        <span
          className={`text-sm ${
            channel.agent ? "text-white" : "text-[#4A4A6A]"
          }`}
        >
          {channel.agent ?? "No agent"}
        </span>
        <ChevronDown size={14} className="ml-auto text-[#4A4A6A]" />
      </div>

      <div className="mt-3 flex justify-between items-center">
        <span
          className={`text-xs ${
            channel.statusKind === "live"
              ? "text-[#22C55E]"
              : "text-[#4A4A6A]"
          }`}
        >
          {channel.statusText}
        </span>
        <button className="text-[#7B5CFC] hover:text-[#9B84FF] text-xs">
          Configure →
        </button>
      </div>
    </div>
  );
}
