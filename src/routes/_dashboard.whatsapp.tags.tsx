import { createFileRoute } from "@tanstack/react-router";
import {
  Tag,
  Hash,
  Users,
  BarChart,
  Star,
  Palette,
  Target,
  Search,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/tags")({
  component: Tags,
});

const STATS = [
  { icon: Hash, color: "text-[#F59E0B]", value: "0", label: "TOTAL TAGS" },
  { icon: Users, color: "text-[#3B82F6]", value: "0", label: "TAGGED CONTACTS" },
  { icon: BarChart, color: "text-[#00D4AA]", value: "0", label: "AVG PER TAG" },
  { icon: Star, color: "text-[#7B5CFC]", value: "—", label: "MOST USED" },
  { icon: Palette, color: "text-[#FF4D6D]", value: "0/10", label: "COLORS USED" },
  { icon: Target, color: "text-[#22C55E]", value: "0%", label: "COVERAGE" },
];

const FEATURES = [
  { icon: Tag, color: "text-[#F59E0B]", title: "Organize", desc: "Group contacts" },
  { icon: Target, color: "text-[#00D4AA]", title: "Segment", desc: "Smart targeting" },
  { icon: Zap, color: "text-[#7B5CFC]", title: "Automate", desc: "Trigger actions" },
  { icon: BarChart, color: "text-[#3B82F6]", title: "Analyze", desc: "Track usage" },
];

function Tags() {
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/20 flex items-center justify-center">
            <Tag size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Contact Tags</h1>
            <p className="text-[#4A4A6A] text-sm">0 tags · 0 contacts organized</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Export</button>
          <button className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ New Tag</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex items-center gap-3">
            <s.icon size={16} className={s.color} />
            <div>
              <div className="text-white font-bold text-lg">{s.value}</div>
              <div className="text-[#4A4A6A] text-[10px] uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search tags..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
          <option>All</option>
        </select>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3">
          <option>Most...</option>
        </select>
        <div className="ml-auto text-[#4A4A6A] text-sm">0 results</div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
          <div className="w-[72px] h-[72px] bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-2xl flex items-center justify-center mb-6">
            <Tag size={36} className="text-[#F59E0B]/50" />
          </div>
          <div className="text-white font-bold text-xl mb-2">No tags yet</div>
          <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
            Create tags to organize and segment your contacts for targeted campaigns and smarter workflows
          </div>
          <div className="flex gap-4 justify-center mb-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-2 w-24">
                <f.icon size={18} className={f.color} />
                <span className="text-white text-xs font-semibold">{f.title}</span>
                <span className="text-[#4A4A6A] text-[10px]">{f.desc}</span>
              </div>
            ))}
          </div>
          <button className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Create First Tag</button>
        </div>
      </div>
    </div>
  );
}
