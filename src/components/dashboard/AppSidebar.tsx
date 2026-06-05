import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Bot,
  BrainCircuit,
  Camera,
  ChevronRight,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Search,
  Settings,
  Sparkles,
  Users,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";

type SubItem = { label: string; url: string };
type Item = {
  label: string;
  icon: LucideIcon;
  url?: string;
  badge?: string;
  liveDot?: boolean;
  sub?: SubItem[];
};
type Section = { title: string; items: Item[] };

const SECTIONS: Section[] = [
  {
    title: "MAIN",
    items: [{ label: "Dashboard", icon: LayoutDashboard, url: "/dashboard" }],
  },
  {
    title: "AI",
    items: [
      {
        label: "AI & Agents",
        icon: Bot,
        url: "/agents",
        badge: "2",
        sub: [
          { label: "Agent Studio", url: "/agents/studio" },
          { label: "Workflow Builder", url: "/agents/workflows" },
          { label: "Voice Lab", url: "/agents/voice-lab" },
          { label: "Knowledge Base", url: "/agents/knowledge" },
        ],
      },
      {
        label: "AI Intelligence",
        icon: BrainCircuit,
        url: "/intelligence",
        sub: [
          { label: "Conversation Intelligence", url: "/intelligence/conversation" },
          { label: "AI Brain", url: "/intelligence/brain" },
          { label: "AI Insights", url: "/intelligence/insights" },
          { label: "Revenue Dashboard", url: "/intelligence/revenue" },
        ],
      },
    ],
  },
  {
    title: "CHANNELS",
    items: [
      {
        label: "WhatsApp",
        icon: MessageCircle,
        url: "/whatsapp",
        badge: "3",
        liveDot: true,
        sub: [
          { label: "Dashboard", url: "/whatsapp" },
          { label: "Inbox", url: "/whatsapp/inbox" },
          { label: "Campaigns", url: "/whatsapp/campaigns" },
          { label: "Templates", url: "/whatsapp/templates" },
          { label: "Contacts", url: "/whatsapp/contacts" },
          { label: "Reports", url: "/whatsapp/reports" },
        ],
      },
      {
        label: "SMS",
        icon: Phone,
        url: "/sms",
        sub: [
          { label: "Inbox", url: "/sms/inbox" },
          { label: "Campaigns", url: "/sms/campaigns" },
          { label: "Templates", url: "/sms/templates" },
          { label: "Contacts", url: "/sms/contacts" },
        ],
      },
      {
        label: "Email",
        icon: Mail,
        url: "/email",
        sub: [
          { label: "Inbox", url: "/email/inbox" },
          { label: "Campaigns", url: "/email/campaigns" },
          { label: "Templates", url: "/email/templates" },
        ],
      },
      {
        label: "Instagram",
        icon: Camera,
        url: "/instagram",
        sub: [
          { label: "Inbox", url: "/instagram/inbox" },
          { label: "Chatbot", url: "/instagram/chatbot" },
          { label: "Contacts", url: "/instagram/contacts" },
        ],
      },
      { label: "Website Chat", icon: Globe, url: "/webchat" },
    ],
  },
  {
    title: "ENGAGE",
    items: [
      {
        label: "Engage",
        icon: Zap,
        sub: [
          { label: "Leads", url: "/engage/leads" },
          { label: "Call Status", url: "/engage/calls" },
          { label: "Live Monitor", url: "/engage/monitor" },
          { label: "Upcoming Calls", url: "/engage/upcoming" },
          { label: "Call Scripts", url: "/engage/scripts" },
          { label: "Call History", url: "/engage/history" },
        ],
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "Settings", icon: Settings, url: "/settings" },
      { label: "Team Members", icon: Users, url: "/team" },
      { label: "API & Webhooks", icon: Webhook, url: "/api" },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<Record<string, boolean>>({
    "AI & Agents": true,
  });

  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  return (
    <aside className="fixed left-0 top-0 h-screen w-[232px] bg-[#0B0B1A] border-r border-[#1C1C34] flex flex-col overflow-hidden z-40 font-sans">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 gap-3 border-b border-[#1C1C34] flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#7B5CFC]/20 border border-[#7B5CFC]/25 flex items-center justify-center">
          <span className="font-bold text-[13px] text-[#7B5CFC]">Py</span>
        </div>
        <span className="text-white font-bold text-[15px] tracking-[-0.02em]">
          pydent<span className="text-[#7B5CFC]">.ai</span>
        </span>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-[#1C1C34]">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]"
          />
          <input
            placeholder="Search pages..."
            className="w-full h-8 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-8 focus:outline-none focus:border-[#7B5CFC]/40"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#4A4A6A]">
            ⌘K
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.1em] text-[#4A4A6A] font-semibold select-none">
              {section.title}
            </div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.url && pathname === item.url
                  ? true
                  : item.sub
                  ? item.sub.some((s) => pathname === s.url)
                  : false;
              const isOpen = open[item.label] ?? isActive;
              const baseRow =
                "flex items-center gap-2.5 mx-2 px-3 h-8 rounded-lg cursor-pointer transition-all duration-100 text-[13px]";
              const activeCls =
                "bg-[#7B5CFC]/[0.12] border-l-2 border-[#7B5CFC] -ml-0.5 pl-[10px] text-white";
              const inactiveCls =
                "text-[#8B8FA8] hover:bg-white/[0.04] hover:text-white";

              const content = (
                <>
                  <Icon
                    size={16}
                    className={isActive ? "text-[#7B5CFC]" : ""}
                  />
                  <span>{item.label}</span>
                  {item.liveDot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                  )}
                  {item.badge && (
                    <span className="ml-auto bg-[#1C1C34] text-[#8B8FA8] text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {item.badge}
                    </span>
                  )}
                  {item.sub && (
                    <ChevronRight
                      size={14}
                      className={`${
                        item.badge ? "ml-1" : "ml-auto"
                      } transition-transform ${isOpen ? "rotate-90" : ""}`}
                    />
                  )}
                </>
              );

              return (
                <div key={item.label}>
                  {item.sub ? (
                    <button
                      onClick={() => toggle(item.label)}
                      className={`${baseRow} w-[calc(100%-1rem)] ${
                        isActive ? activeCls : inactiveCls
                      }`}
                    >
                      {content}
                    </button>
                  ) : (
                    <Link
                      to={item.url!}
                      className={`${baseRow} ${
                        isActive ? activeCls : inactiveCls
                      }`}
                    >
                      {content}
                    </Link>
                  )}
                  {item.sub && isOpen && (
                    <div className="ml-5 mt-0.5">
                      {item.sub.map((s) => {
                        const subActive = pathname === s.url;
                        return (
                          <Link
                            key={s.url}
                            to={s.url}
                            className={`pl-5 border-l border-[#1C1C34] h-7 flex items-center text-[12px] cursor-pointer transition-colors ${
                              subActive
                                ? "text-white"
                                : "text-[#4A4A6A] hover:text-[#8B8FA8]"
                            }`}
                          >
                            {s.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Upgrade */}
        <div className="mx-3 mb-3 mt-4 bg-[#7B5CFC]/[0.07] border border-[#7B5CFC]/15 rounded-xl p-4">
          <Sparkles size={14} className="text-[#7B5CFC] mb-2" />
          <div className="text-white text-xs font-semibold">Upgrade to Pro</div>
          <div className="text-[#4A4A6A] text-[11px] mt-0.5 mb-3">
            Voice AI + unlimited campaigns
          </div>
          <button className="w-full h-8 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-xs font-semibold transition-colors">
            Upgrade
          </button>
        </div>
      </nav>

      {/* User */}
      <div className="h-14 border-t border-[#1C1C34] px-3 flex items-center gap-2.5 flex-shrink-0">
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[#7B5CFC]/40 to-[#00D4AA]/30 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
          AK
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white text-xs font-medium truncate">Ahmad K.</div>
          <div className="text-[#4A4A6A] text-[10px]">Owner</div>
        </div>
        <Bell
          size={15}
          className="text-[#4A4A6A] hover:text-white cursor-pointer"
        />
        <LogOut
          size={15}
          className="text-[#4A4A6A] hover:text-[#FF4D6D] cursor-pointer"
        />
      </div>
    </aside>
  );
}
