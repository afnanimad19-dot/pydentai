import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  AlertCircle,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


export const Route = createFileRoute("/_dashboard/agents/avatar-manage")({
  component: AvatarManagePage,
});

const VOLUME = Array.from({ length: 14 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (13 - i));
  return {
    date: `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    v: 0,
  };
});

const TABS = [
  "Overview",
  "Meetings",
  "Avatars",
  "Agents",
  "Mapping",
  "Test Lab",
  "Schedule",
  "Live",
  "KB Console",
  "Health",
];

function AvatarManagePage() {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="font-sans">
      <div className="px-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/20 flex items-center justify-center">
            <Sparkles size={22} className="text-[#00D4AA]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">
              Avatar Manage
            </div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Manage avatars, agents, meetings and integrations
            </div>
          </div>
          <div className="flex items-center gap-1.5 ml-3">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#22C55E] text-xs">
              All systems operational
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {["Refresh", "Inbox", "Export", "Sync Status"].map((b) => (
            <button
              key={b}
              className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm"
            >
              {b}
            </button>
          ))}
          <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold">
            + New Meeting
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6 grid grid-cols-4 gap-4">
        {[
          {
            icon: Zap,
            tone: "text-[#7B5CFC]",
            name: "Test Lab",
            desc: "Preview avatar instantly",
          },
          {
            icon: CalendarDays,
            tone: "text-[#00D4AA]",
            name: "Schedule Meeting",
            desc: "Send invite in seconds",
          },
          {
            icon: Users,
            tone: "text-amber-400",
            name: "Browse Avatars",
            desc: "0 ready",
          },
          {
            icon: Activity,
            tone: "text-[#22C55E]",
            name: "Health Check",
            desc: "API & webhooks",
          },
        ].map(({ icon: Icon, tone, name, desc }) => (
          <div
            key={name}
            className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:border-[#7B5CFC]/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <Icon size={20} className={tone} />
              <div>
                <div className="text-white text-sm font-semibold">{name}</div>
                <div className="text-[#4A4A6A] text-xs">{desc}</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-[#4A4A6A]" />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {[
          ["Live now", "0"],
          ["Scheduled today", "0"],
          ["Completed today", "0"],
          ["Completed (7d)", "0"],
          ["Avg duration", "0m"],
          ["Conversion", "0%"],
        ].map(([l, v]) => (
          <div
            key={l}
            className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4"
          >
            <div className="text-white font-bold text-xl leading-none">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1.5">
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="px-6 mb-4 flex items-center gap-3">
        <input
          placeholder="Search meetings, avatars, agents..."
          className="flex-1 h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm px-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
        />
        {["All statuses", "All providers", "All languages"].map((s) => (
          <select
            key={s}
            className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm"
          >
            <option>{s}</option>
          </select>
        ))}
        <span className="text-[#4A4A6A] text-sm whitespace-nowrap">
          0 meetings · 0 avatars · 2 agents
        </span>
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-5 border-b border-[#1C1C34] mb-5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm whitespace-nowrap ${
              tab === t
                ? "text-white border-b-2 border-[#7B5CFC] font-medium"
                : "text-[#4A4A6A] hover:text-[#8B8FA8]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="px-6 pb-6 grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-4">
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-white font-semibold text-[15px]">
                  Meeting volume
                </div>
                <span className="text-[#4A4A6A] text-xs">Last 14 days</span>
                <span className="ml-auto bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={VOLUME}>
                    <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      stroke="#4A4A6A"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis stroke="#4A4A6A" tick={{ fontSize: 10 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0B1A",
                        border: "1px solid #1C1C34",
                        borderRadius: 8,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#7B5CFC"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <div className="text-white font-semibold text-sm mb-4">
                  Avatars by provider
                </div>
                <div className="text-[#4A4A6A] text-sm text-center py-6">
                  No providers connected.
                </div>
              </div>
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold text-sm">
                    Recent meetings
                  </div>
                  <button className="text-[#7B5CFC] text-xs">View all →</button>
                </div>
                <div className="grid grid-cols-4 gap-2 text-[#4A4A6A] text-[10px] uppercase mb-3">
                  <div>Customer</div>
                  <div>Agent</div>
                  <div>When</div>
                  <div>Status</div>
                </div>
                <div className="text-[#4A4A6A] text-sm text-center py-6">
                  No meetings yet.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-1">
              Session setup
            </div>
            <div className="text-[#4A4A6A] text-xs mb-5">
              Pick agent + avatar to start
            </div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle size={14} className="text-[#22C55E]" />
              <span className="text-[#22C55E] text-sm">
                2 agents configured
              </span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <Clock size={14} className="text-amber-400" />
              <span className="text-amber-400 text-sm">0 avatars ready</span>
            </div>
            <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2.5 text-[#4A4A6A] text-sm mb-3">
              <option>Choose agent</option>
            </select>
            <select className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2.5 text-[#4A4A6A] text-sm mb-5">
              <option>Choose avatar</option>
            </select>
            <button
              disabled
              className="w-full h-11 bg-[#1C1C34] text-[#4A4A6A] text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <AlertCircle size={14} />
              Setup required
            </button>
          </div>
        </div>
      )}

      {tab !== "Overview" && (
        <div className="px-6 py-16 text-center text-[#4A4A6A] text-sm">
          {tab} coming soon.
        </div>
      )}
    </div>
  );
}
