import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  ExternalLink,
  Filter,
  RefreshCw,
} from "lucide-react";


export const Route = createFileRoute("/_dashboard/agents/avatar-sync")({
  component: AvatarSyncPage,
});

function AvatarSyncPage() {
  return (
    <div className="font-sans">
      <div className="px-6 pb-5">
        <div className="flex items-center gap-2 text-xs text-[#4A4A6A] mb-4">
          <Link
            to="/agents/avatar-manage"
            className="flex items-center gap-1 hover:text-white"
          >
            <ArrowLeft size={12} />
            Back
          </Link>
          <span>/</span>
          <Link to="/agents/avatar-manage" className="text-[#7B5CFC]">
            Avatar Manage
          </Link>
          <span>/</span>
          <span className="text-white">Sync Status</span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-r from-[#7B5CFC]/10 via-[#0B0B1A] to-[#0B0B1A] border border-[#7B5CFC]/20 rounded-2xl p-8 flex items-start justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-[#7B5CFC]" />
              <span className="text-[#7B5CFC] text-xs font-semibold">
                Realtime · Avatar pipeline
              </span>
            </div>
            <div className="text-white font-bold text-[28px] tracking-[-0.03em] leading-tight">
              Sync Operations Center
            </div>
            <div className="text-[#4A4A6A] text-sm mt-2 mb-6">
              Live health for every provider sync — throughput, errors,
              durations, and per-run details.
            </div>
            <div className="flex items-center gap-3">
              <button className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2">
                <RefreshCw size={14} />
                Refresh now
              </button>
              <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2">
                <ExternalLink size={14} />
                Avatar Manage
              </button>
              <div className="flex items-center gap-2 ml-3">
                <div className="bg-[#7B5CFC] w-10 h-5 rounded-full relative">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                </div>
                <span className="text-white text-xs">Live updates</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-72">
            {[
              { v: "0", l: "Synced Avatars", s: "Across all providers" },
              { v: "0%", l: "Success Rate", s: "0 ok · 0 failed" },
              { v: "0", l: "Active Runs", s: "Idle" },
              { v: "0", l: "Records Moved", s: "+0 new · ~0 updated" },
            ].map((s) => (
              <div key={s.l} className="bg-black/20 rounded-xl p-4">
                <div className="text-white font-bold text-[22px] leading-none">
                  {s.v}
                </div>
                <div className="text-[#4A4A6A] text-[10px] uppercase mt-2">
                  {s.l}
                </div>
                <div className="text-[#4A4A6A] text-[11px] mt-1">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-6 mb-5 flex items-center gap-3 flex-wrap">
        <input
          placeholder="Search by job ID, provider, error message..."
          className="flex-1 min-w-[200px] h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm px-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
        />
        <Filter size={14} className="text-[#4A4A6A]" />
        {["All providers", "All statuses"].map((s) => (
          <select
            key={s}
            className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm"
          >
            <option>{s}</option>
          </select>
        ))}
        <input
          type="date"
          className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm"
        />
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          <button className="px-3 py-1 rounded-md text-xs font-medium bg-[#7B5CFC] text-white flex items-center gap-1">
            <BarChart3 size={12} />
            Overview
          </button>
          <button className="px-3 py-1 rounded-md text-xs font-medium text-[#8B8FA8] flex items-center gap-1">
            <Activity size={12} />
            Timeline
          </button>
        </div>
        <span className="text-[#4A4A6A] text-sm">0 runs</span>
      </div>

      {/* Provider Cards */}
      <div className="px-6 pb-6 grid grid-cols-2 gap-4">
        <ProviderCard
          name="OIS Avatar"
          swatch="bg-gradient-to-br from-[#7B5CFC] to-[#9B84FF]"
        />
        <ProviderCard
          name="OIS Video"
          swatch="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>
    </div>
  );
}

function ProviderCard({ name, swatch }: { name: string; swatch: string }) {
  return (
    <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
      <div className="px-5 py-4 flex items-center gap-3 border-b border-[#1C1C34]">
        <div className={`w-8 h-8 rounded-lg ${swatch}`} />
        <div className="flex-1">
          <div className="text-white font-semibold text-sm">{name}</div>
          <div className="text-[#4A4A6A] text-xs">No syncs yet.</div>
        </div>
        <div className="text-right">
          <div className="text-[#4A4A6A] text-xs">
            Last 0 runs · throughput
          </div>
          <div className="text-[#4A4A6A] text-xs">+0 / ~0</div>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-[#1C1C34] bg-[#06060F] h-24 flex items-center justify-center">
        <span className="text-[#4A4A6A] text-sm">No runs yet</span>
      </div>

      <div className="px-5 py-4 grid grid-cols-4 gap-4">
        {[
          { l: "Avatars", v: "0", tone: "text-white" },
          { l: "Success", v: "0%", tone: "text-[#FF4D6D]" },
          { l: "Avg Dur", v: "—", tone: "text-white" },
          { l: "Runs", v: "0", tone: "text-white" },
        ].map((c) => (
          <div key={c.l}>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{c.l}</div>
            <div className={`font-bold text-lg mt-1 ${c.tone}`}>{c.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
