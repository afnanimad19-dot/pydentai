import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, RefreshCw, Search, Megaphone, Bell, Shield } from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/templates/")({
  component: Templates,
});

const STATS = [
  { label: "Total", value: "0" },
  { label: "Approved", value: "0" },
  { label: "Pending", value: "0" },
  { label: "Rejected", value: "0" },
  { label: "Marketing", value: "0" },
  { label: "Utility", value: "0" },
  { label: "Auth", value: "0" },
  { label: "Languages", value: "0" },
];

const TYPES = [
  { icon: Megaphone, color: "text-[#7B5CFC]", label: "Marketing" },
  { icon: Bell, color: "text-[#00D4AA]", label: "Utility" },
  { icon: Shield, color: "text-[#3B82F6]", label: "Auth" },
];

function Templates() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center">
            <FileText size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Template Manager</h1>
              <span className="bg-[#22C55E]/12 border border-[#22C55E]/20 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">Meta Approved</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Create, approve, and track WhatsApp message templates</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#4A4A6A] text-xs">Approved: 0</span>
          <span className="text-[#4A4A6A] text-xs">Rate: 0%</span>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <Link to="/whatsapp/templates/new" className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold flex items-center">+ New Template</Link>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-8 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
            <div className="text-white font-bold text-lg">{s.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search templates..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
          <option>All Categories</option>
        </select>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
          <option>All Status</option>
        </select>
        <div className="ml-auto text-[#4A4A6A] text-sm">0 results</div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
          <div className="w-[72px] h-[72px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-2xl flex items-center justify-center mb-6">
            <FileText size={36} className="text-[#3B82F6]/50" />
          </div>
          <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">Create Your First Template</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Design Meta-approved message templates with rich headers, buttons, and dynamic variables for automated messaging.
          </div>
          <div className="flex gap-4 justify-center mb-8">
            {TYPES.map((t) => (
              <div key={t.label} className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 flex flex-col items-center gap-2 w-28">
                <t.icon size={20} className={t.color} />
                <span className="text-[#8B8FA8] text-xs">{t.label}</span>
              </div>
            ))}
          </div>
          <Link to="/whatsapp/templates/new" className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold flex items-center">+ Create Template</Link>
        </div>
      </div>
    </div>
  );
}
