import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Send,
  CheckCircle,
  Eye,
  Reply,
  Search,
  Megaphone,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/campaigns/")({
  component: Campaigns,
});

const STATS = [
  { icon: Send, color: "text-[#22C55E]", value: "0", label: "Total Campaigns" },
  { icon: CheckCircle, color: "text-[#00D4AA]", value: "0", label: "Sent" },
  { icon: Eye, color: "text-[#3B82F6]", value: "0.0%", label: "Avg Open Rate" },
  { icon: Reply, color: "text-[#7B5CFC]", value: "0.0%", label: "Avg Reply Rate" },
];

const FILTERS = ["All", "Draft", "Scheduled", "Sending", "Completed", "Failed"];

function Campaigns() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center">
            <Send size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Campaigns</h1>
            <p className="text-[#4A4A6A] text-sm">Create and manage WhatsApp broadcast campaigns</p>
          </div>
        </div>
        <Link to="/whatsapp/campaigns/new" className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold flex items-center">+ New Campaign</Link>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4 flex items-center gap-3">
            <s.icon size={18} className={s.color} />
            <div>
              <div className="text-white font-bold text-xl">{s.value}</div>
              <div className="text-[#4A4A6A] text-xs">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input
            placeholder="Search campaigns..."
            className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#22C55E]/40"
          />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={
                i === 0
                  ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1.5 text-xs rounded-full font-medium"
                  : "bg-[#0B0B1A] border border-[#1C1C34] text-[#4A4A6A] hover:text-white text-xs px-3 py-1.5 rounded-full"
              }
            >
              {f}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
            <option>Sort: Newest</option>
          </select>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <Megaphone size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No campaigns yet</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Create your first WhatsApp broadcast campaign to reach your patients at scale.</div>
          <Link to="/whatsapp/campaigns/new" className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold flex items-center">+ Create Campaign</Link>
        </div>
      </div>
    </div>
  );
}
