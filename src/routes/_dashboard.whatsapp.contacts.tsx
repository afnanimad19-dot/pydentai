import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  RefreshCw,
  Search,
  UserPlus,
  MessageSquare,
  Star,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/contacts")({
  component: Contacts,
});

const STATS = [
  { icon: Users, color: "text-[#7B5CFC]", value: "0", label: "TOTAL", sub: "All contacts" },
  { icon: UserPlus, color: "text-[#3B82F6]", value: "0", label: "NEW", sub: "Pending outreach" },
  { icon: MessageSquare, color: "text-[#F59E0B]", value: "0", label: "CONTACTED", sub: "In conversation" },
  { icon: Star, color: "text-[#22C55E]", value: "0", label: "QUALIFIED", sub: "High intent" },
  { icon: Target, color: "text-[#00D4AA]", value: "0%", label: "ENGAGEMENT", sub: "0 active" },
  { icon: TrendingUp, color: "text-[#FF4D6D]", value: "0%", label: "CONVERSION", sub: "Qualified rate" },
];

const FILTERS = ["All", "New", "Contacted", "Qualified"];

function Contacts() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <Users size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Contacts</h1>
            <p className="text-[#4A4A6A] text-sm">0 contacts · 0 active · 0% engagement</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Export</button>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Import Contacts</button>
          <button className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Contact</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon size={16} className={s.color} />
            </div>
            <div className="text-white font-bold text-xl">{s.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{s.label}</div>
            <div className="text-[#4A4A6A] text-[10px] mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search by name, phone, email, company..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3" />
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f, i) => (
            <button key={f} className={i === 0 ? "bg-[#22C55E]/12 text-[#22C55E] border border-[#22C55E]/20 px-3 py-1.5 text-xs rounded-full font-medium" : "bg-[#0B0B1A] border border-[#1C1C34] text-[#4A4A6A] hover:text-white text-xs px-3 py-1.5 rounded-full"}>{f}</button>
          ))}
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3 ml-auto">
          <option>Last Active</option>
        </select>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
          <div className="w-[72px] h-[72px] bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
            <Users size={36} className="text-[#22C55E]/50" />
          </div>
          <div className="text-white font-bold text-xl mb-2">No WhatsApp contacts yet</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">
            Add contacts with phone numbers or import from CSV to get started.
          </div>
          <div className="flex gap-3 justify-center">
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2">
              <Upload size={14} /> Import Contacts
            </button>
            <button className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Contact</button>
          </div>
        </div>
      </div>
    </div>
  );
}
