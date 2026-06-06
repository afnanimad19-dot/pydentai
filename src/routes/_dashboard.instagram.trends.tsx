import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Sparkles, BrainCircuit, Lightbulb, BarChart2, Hash, Target, BookOpen, Play, LayoutGrid, Clock, Eye, Crown, Globe, Home, ShoppingBag, Cpu, Heart, GraduationCap, UtensilsCrossed, Dumbbell, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/_dashboard/instagram/trends")({ component: Trends });

const MODULES = [
  [Lightbulb, "#F59E0B", "8+ Viral Content Concepts"],
  [BarChart2, "#3B82F6", "4 Format Performance Reports"],
  [Hash, "#22C55E", "8+ Hashtag Growth Signals"],
  [Target, "#FF4D6D", "Opportunity Scoring Matrix"],
] as any[];

const BENCHMARKS = [
  [Play, "#FF4D6D", "Reels Avg. Reach", "vs static posts", "2.5x"],
  [LayoutGrid, "#3B82F6", "Carousel Saves", "engagement boost", "+67%"],
  [BookOpen, "#7B5CFC", "Stories Completion", "avg view-through", "72%"],
  [Clock, "#F59E0B", "Optimal Posting", "peak engagement", "6-9 PM"],
  [Hash, "#22C55E", "Hashtag Sweet Spot", "tags per post", "8-15"],
] as any[];

const INDUSTRIES = [
  [Globe, "#7B5CFC", "General Business", true],
  [Home, "#3B82F6", "Real Estate", false],
  [ShoppingBag, "#F59E0B", "E-Commerce", false],
  [Cpu, "#00D4AA", "SaaS / Tech", false],
  [Heart, "#FF4D6D", "Healthcare", false],
  [GraduationCap, "#22C55E", "Education", false],
  [UtensilsCrossed, "#FB923C", "Hospitality", false],
  [Dumbbell, "#E1306C", "Fitness & Wellness", false],
  [TrendingUp, "#EAB308", "Finance & Crypto", false],
] as any[];

const STEPS = [
  ["Select Industry", "Choose your market vertical for targeted analysis"],
  ["AI Scans Trends", "Our engine analyzes viral patterns & hashtag velocity"],
  ["Get Strategies", "Receive scored content ideas with captions & timing"],
  ["Execute & Grow", "Apply insights to boost engagement & reach"],
] as any[];

const TIPS = [
  ["#F59E0B", "Hook viewers in the first 0.5 seconds — use pattern interrupts or bold text overlays on Reels."],
  ["#3B82F6", "Post carousels with a 'Save-worthy' first slide — educational content gets 3x more saves."],
  ["#22C55E", "Use 3-5 niche-specific hashtags + 3-5 broad ones for optimal discoverability."],
  ["#7B5CFC", "Engage with 30 accounts in your niche before and after posting to boost algorithm signals."],
  ["#00D4AA", "Repurpose top-performing Reels into carousels and stories for 2x content output."],
] as any[];

function Trends() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#E1306C]/15 border border-[#E1306C]/20 flex items-center justify-center"><TrendingUp size={22} className="text-[#E1306C]" /></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Trend Intelligence</h1>
              <span className="bg-[#7B5CFC]/12 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">AI</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">AI-powered viral patterns, formats & hashtag velocity</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-xs flex items-center gap-2">General Business <ChevronDown size={14} /></button>
          <button className="h-9 px-4 rounded-lg bg-[#E1306C] text-white text-sm font-semibold flex items-center gap-2"><Sparkles size={14} /> Generate</button>
        </div>
      </div>

      <div className="px-6 grid grid-cols-12 gap-5">
        <div className="col-span-8 flex flex-col gap-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center"><BrainCircuit size={22} className="text-[#7B5CFC]" /></div>
              <div>
                <div className="text-white font-bold text-lg">AI Trend Intelligence Engine</div>
                <div className="text-[#4A4A6A] text-sm">Generate comprehensive content strategies</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              {MODULES.map(([Icon, c, n]) => (
                <div key={n} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 cursor-pointer hover:border-[#E1306C]/30 flex items-center gap-3">
                  <Icon size={16} style={{ color: c }} />
                  <span className="text-white text-sm font-semibold">{n}</span>
                </div>
              ))}
            </div>
            <button className="w-full h-10 bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center justify-center gap-2 rounded-lg"><Sparkles size={16} /> Generate Intelligence Report</button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">How It Works</div>
            <div className="space-y-3">
              {STEPS.map(([t, d], i) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E1306C]/15 text-[#E1306C] text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                  <div><div className="text-white text-sm font-medium">{t}</div><div className="text-[#4A4A6A] text-xs mt-0.5">{d}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><BarChart2 size={14} className="text-[#3B82F6]" /><span className="text-white font-semibold text-sm">Platform Benchmarks</span></div>
            {BENCHMARKS.map(([Icon, c, n, d, v]) => (
              <div key={n} className="flex items-center justify-between py-2 border-b border-[#1C1C34]/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}><Icon size={14} style={{ color: c }} /></div>
                  <div><div className="text-white text-sm font-medium">{n}</div><div className="text-[#4A4A6A] text-xs">{d}</div></div>
                </div>
                <span className="text-white font-bold text-sm">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-4"><span className="text-white font-semibold text-sm">Supported Industries</span><span className="ml-auto bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 rounded-full">9 verticals</span></div>
            <div className="grid grid-cols-9 gap-2">
              {INDUSTRIES.map(([Icon, c, n, sel]) => (
                <div key={n} className={`bg-[#06060F] border rounded-xl px-2 py-3 text-center cursor-pointer ${sel ? "border-[#E1306C] bg-[#E1306C]/[0.04]" : "border-[#1C1C34] hover:border-[#E1306C]/30"}`}>
                  <Icon size={16} style={{ color: c }} className="mx-auto" />
                  <div className="text-[11px] text-[#8B8FA8] mt-1.5">{n}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Eye size={14} className="text-[#E1306C]" /><span className="text-white font-semibold text-sm">Preview</span></div>
            {[["Content Viability", "92", 92, "#22C55E"], ["Format Trending", "87", 87, "#3B82F6"], ["Hashtag Growth", "+34%", 34, "#F59E0B"], ["Competition", "Low", 20, "#22C55E"]].map(([l, v, p, c]) => (
              <div key={l as string} className="mb-3">
                <div className="flex justify-between mb-1"><span className="text-[#8B8FA8] text-xs">{l}</span><span className="text-white text-xs font-semibold">{v}</span></div>
                <div className="h-1.5 bg-[#1C1C34] rounded-full overflow-hidden"><div className="h-full" style={{ width: `${p}%`, background: c as string }} /></div>
              </div>
            ))}
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Crown size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Pro Growth Tips</span></div>
            {TIPS.map(([c, t], i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: c }} />
                <span className="text-[#8B8FA8] text-xs leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
