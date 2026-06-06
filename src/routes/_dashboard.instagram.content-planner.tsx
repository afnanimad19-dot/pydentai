import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Sparkles, FileText, Clock, CheckCircle, Edit, Play, LayoutGrid, BookOpen, Percent, Lightbulb, Camera, Zap, Star, Moon, ChevronLeft, ChevronRight, Image as ImageIcon, BarChart2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/instagram/content-planner")({ component: ContentPlanner });

const METRICS = [
  [FileText, "#8B8FA8", "0", "Total Posts"],
  [Clock, "#3B82F6", "0", "Scheduled"],
  [CheckCircle, "#22C55E", "0", "Published"],
  [Edit, "#F59E0B", "0", "Drafts"],
  [Play, "#FF4D6D", "0", "Reels"],
  [LayoutGrid, "#7B5CFC", "0", "Carousels"],
  [BookOpen, "#00D4AA", "0", "Stories"],
  [Percent, "#E1306C", "0%", "Week Coverage"],
] as const;

const DAYS = [
  ["MON", Lightbulb, "#F59E0B", "Motivation & Goals"],
  ["TUE", BookOpen, "#00D4AA", "Tips & Education"],
  ["WED", Camera, "#7B5CFC", "Behind the Scenes"],
  ["THU", Clock, "#3B82F6", "Throwback / Story"],
  ["FRI", Zap, "#FB923C", "Fun & Engagement"],
  ["SAT", Star, "#EAB308", "Community Spotlight"],
  ["SUN", Moon, "#8B8FA8", "Rest & Preview"],
] as const;

const SLOTS = [
  ["09:00", "Morning Peak", 97, "#22C55E"],
  ["12:30", "Lunch Break", 92, "#00D4AA"],
  ["17:00", "After Work", 78, "#3B82F6"],
  ["20:00", "Evening Prime", 89, "#7B5CFC"],
  ["22:00", "Night Scroll", 83, "#E1306C"],
] as const;

function ContentPlanner() {
  const days = Array.from({ length: 35 }, (_, i) => i - 0);
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-5 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/20 flex items-center justify-center"><CalendarDays size={22} className="text-[#E1306C]" /></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Content Command Center</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">AI-Powered</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Plan, schedule & orchestrate your multi-channel content strategy with AI-powered insights</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm flex items-center gap-2"><Sparkles size={14} /> AI Create</button>
          <button className="h-9 px-4 rounded-lg bg-[#E1306C] text-white text-sm font-semibold">+ New Content</button>
        </div>
      </div>

      <div className="px-6 mb-4 overflow-x-auto flex gap-3">
        {METRICS.map(([Icon, c, v, l]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 flex items-center gap-2.5 min-w-[150px]">
            <Icon size={14} style={{ color: c }} />
            <div><div className="text-white text-sm font-semibold">{v}</div><div className="text-[#4A4A6A] text-[10px]">{l}</div></div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 grid grid-cols-7 gap-2">
        {DAYS.map(([d, Icon, c, t]) => (
          <div key={d} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-3">
            <div className="flex justify-between items-center"><div className="text-[#4A4A6A] text-[10px] uppercase">{d}</div><Icon size={12} style={{ color: c }} /></div>
            <div className="text-white text-xs font-semibold mt-1">{t}</div>
            <div className="text-[#4A4A6A] text-[10px] mt-1">+ No posts</div>
          </div>
        ))}
      </div>

      <div className="px-6 flex gap-5">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 gap-3">
            <button className="text-[#8B8FA8] p-1"><ChevronLeft size={16} /></button>
            <div className="text-white font-semibold text-lg">June 2026</div>
            <button className="text-[#8B8FA8] p-1"><ChevronRight size={16} /></button>
            <button className="text-[#8B8FA8] text-xs h-8 px-3 rounded-lg border border-[#1C1C34]">Today</button>
            <div className="ml-auto flex gap-2">
              <button className="h-8 w-8 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><ImageIcon size={14} /></button>
              <button className="h-8 w-8 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><Play size={14} /></button>
              <button className="h-8 w-8 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><BookOpen size={14} /></button>
              <button className="h-8 px-3 rounded-lg bg-[#E1306C] text-white text-xs font-semibold">+ New Post</button>
            </div>
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="grid grid-cols-7 border-b border-[#1C1C34]">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => <div key={d} className="h-9 flex items-center justify-center text-[#4A4A6A] text-xs font-medium">{d}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {days.map((i) => {
                const num = i - 0;
                const isToday = num === 6;
                return (
                  <div key={i} className="min-h-[90px] border-b border-r border-[#1C1C34] last:border-r-0 p-2">
                    {isToday ? <div className="w-6 h-6 rounded-full bg-[#7B5CFC] text-white flex items-center justify-center text-xs font-semibold">6</div> : <div className="text-[#4A4A6A] text-xs">{num > 0 && num <= 30 ? num : ""}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-[280px] flex-shrink-0 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-2 text-xs">
                <button className="text-white font-medium">Jun 6</button>
                <button className="text-[#4A4A6A]">Pipeline</button>
                <button className="text-[#4A4A6A]">AI Ideas</button>
                <button className="text-[#4A4A6A]">Stats</button>
              </div>
              <button className="text-[#8B8FA8] text-xs">+ Add</button>
            </div>
            <div className="text-white font-semibold text-sm">Saturday, June 6</div>
            <div className="text-[#4A4A6A] text-xs mb-4">0 pieces planned</div>
            <div className="py-8 flex flex-col items-center">
              <CalendarDays size={32} className="text-[#1C1C34] mb-2" />
              <div className="text-[#4A4A6A] text-xs text-center mb-4">No content planned</div>
              <div className="flex gap-2">
                <button className="h-7 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">Manual</button>
                <button className="h-7 px-3 rounded-lg bg-[#7B5CFC] text-white text-xs">AI Generate ✨</button>
              </div>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4"><Zap size={14} className="text-[#F59E0B]" /><span className="text-white text-sm font-semibold">Optimal Posting Windows</span></div>
            <div className="space-y-3">
              {SLOTS.map(([t, _l, p, c]) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="text-white text-xs font-mono w-12 flex-shrink-0">{t}</div>
                  <div className="flex-1 h-1.5 bg-[#1C1C34] rounded-full overflow-hidden"><div style={{ width: `${p}%`, background: c }} className="h-full" /></div>
                  <div className="text-[#22C55E] text-xs font-semibold">{p}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3"><BookOpen size={14} className="text-[#E1306C]" /><span className="text-white text-sm font-semibold">Weekly Theme Guide</span></div>
            {DAYS.map(([d, Icon, c, t]) => (
              <div key={d} className="flex items-center gap-2 py-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}><Icon size={10} style={{ color: c }} /></div>
                <span className="text-[#8B8FA8] text-[11px]">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
