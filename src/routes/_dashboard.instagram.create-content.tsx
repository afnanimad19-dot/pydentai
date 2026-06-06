import { createFileRoute, Link } from "@tanstack/react-router";
import { Wand2, ChevronRight, ChevronDown, Check, Image as ImageIcon, Play, LayoutGrid, BookOpen, FileText, Camera, Heart, MessageCircle, Send, Bookmark, ChevronLeft, TrendingUp, Lightbulb, Sparkles, BarChart2 } from "lucide-react";

export const Route = createFileRoute("/_dashboard/instagram/create-content")({ component: CreateContent });

const STEPS = [["Format", "active"], ["Brief", "pending"], ["Create", "pending"], ["Publish", "pending"]] as const;
const FORMATS = [
  [ImageIcon, "#E1306C", "Single Post", "High quality photo or designed graphic", true],
  [Play, "#FF4D6D", "Reel/Video", "Short-form vertical video (15-30s)", false],
  [LayoutGrid, "#7B5CFC", "Carousel", "Multi-slide swipeable content", false],
  [BookOpen, "#00D4AA", "Story", "24h ephemeral — polls, Q&A, links", false],
] as const;
const TEMPLATES = [
  ["Hook → Story → CTA", "Reel", "45s"],
  ["Top 5 Listicle", "Carousel", "5 slides"],
  ["Before / After", "Single Post", ""],
  ["Myth vs Reality", "Carousel", ""],
  ["Day in the Life", "Reel", "Daily"],
] as const;

function CreateContent() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] flex flex-col overflow-hidden">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-3 flex-shrink-0">
        <Link to="/instagram/content-planner" className="text-[#8B8FA8] text-sm">← Back</Link>
        <Wand2 size={16} className="text-[#E1306C]" />
        <span className="text-white font-semibold text-sm">AI Content Studio</span>
        <span className="bg-[#E1306C]/12 text-[#E1306C] text-[10px] px-2 py-0.5 rounded-full">Instagram</span>
        <div className="flex items-center gap-1 mx-auto">
          {STEPS.map(([n, s], i) => (
            <div key={n} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-2 py-1 rounded ${s === "active" ? "bg-[#E1306C] text-white" : "bg-[#1C1C34] text-[#4A4A6A]"}`}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                <span className="text-xs">{n}</span>
              </div>
              {i < 3 && <ChevronRight size={12} className="text-[#1C1C34]" />}
            </div>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2"><span className="text-[#4A4A6A] text-xs">0 Readiness</span><span className="text-[#F59E0B] font-semibold text-xs">0%</span></div>
      </div>

      <div className="px-6 py-2.5 border-b border-[#1C1C34] flex items-center gap-5 text-xs flex-shrink-0">
        {[["Format", "Single Post"], ["Est. Reach", "28"], ["Engagement", "3.7%"], ["Saves", "97"], ["Viral Score", "48"], ["Visuals", "0"], ["Style", "Modern"]].map(([l, v]) => (
          <div key={l} className="flex items-center gap-1.5"><span className="text-[#4A4A6A]">{l}:</span><span className="text-white font-medium">{v}</span></div>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[440px] flex-shrink-0 overflow-y-auto border-r border-[#1C1C34] px-5 py-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mb-4">
            <div className="flex items-center"><div className="text-white font-semibold text-[15px]">1. Choose Format</div><div className="text-[#4A4A6A] text-xs ml-auto">Step 1/4</div></div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {FORMATS.map(([Icon, c, n, d, sel]) => (
                <div key={n} className={`relative bg-[#06060F] border rounded-xl p-4 cursor-pointer transition-all ${sel ? "border-[#E1306C] bg-[#E1306C]/[0.04]" : "border-[#1C1C34] hover:border-[#E1306C]/30"}`}>
                  {sel && <Check size={14} className="text-[#E1306C] absolute top-2 right-2" />}
                  <Icon size={22} style={{ color: c }} />
                  <div className="text-white text-sm font-semibold mt-2">{n}</div>
                  <div className="text-[#4A4A6A] text-[11px] mt-1">{d}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#E1306C]/15 flex items-center justify-center"><Camera size={14} className="text-[#E1306C]" /></div>
              <span className="text-white text-sm">Instagram</span>
              <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 rounded-full">Connected</span>
              <ChevronDown size={14} className="text-[#4A4A6A] ml-auto" />
            </div>
            <button className="w-full h-10 bg-[#E1306C] hover:bg-[#C1255A] text-white text-sm font-semibold rounded-xl mt-4">Continue to Brief →</button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-3"><span className="text-white font-semibold text-sm">Quick Templates</span><span className="ml-auto bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 rounded-full">5 templates</span></div>
            <div className="space-y-2">
              {TEMPLATES.map(([n, t, s]) => (
                <div key={n} className="flex items-center gap-3 py-2.5 px-3 bg-[#06060F] rounded-lg cursor-pointer hover:bg-[#1C1C34]">
                  <FileText size={14} className="text-[#E1306C]" />
                  <div className="text-white text-xs font-medium flex-1">{n}</div>
                  <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-1.5 rounded">{t}</span>
                  {s && <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-1.5 rounded">{s}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-[#06060F] overflow-y-auto py-5">
          <div className="bg-black w-[260px] rounded-[36px] border-4 border-[#1C1C34] overflow-hidden flex flex-col flex-shrink-0">
            <div className="h-6 bg-black" />
            <div className="bg-[#06060F] h-11 flex items-center px-4 gap-3">
              <ChevronLeft size={16} className="text-white" />
              <span className="text-white text-sm font-semibold flex-1">your_brand</span>
              <Heart size={16} className="text-white" />
            </div>
            <div className="px-4 py-2.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E1306C]/20 text-[#E1306C] text-sm font-bold flex items-center justify-center">P</div>
              <span className="text-white text-sm">your_brand</span>
              <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-1.5 rounded">Following</span>
            </div>
            <div className="w-full aspect-square bg-[#0B0B1A] flex flex-col items-center justify-center">
              <Camera size={36} className="text-[#1C1C34]" />
              <div className="text-[#4A4A6A] text-xs mt-2">Generate visuals</div>
            </div>
            <div className="px-4 py-3 flex items-center gap-4">
              <Heart size={20} className="text-white" />
              <MessageCircle size={20} className="text-white" />
              <Send size={20} className="text-white" />
              <Bookmark size={20} className="text-white ml-auto" />
            </div>
            <div className="px-4 pb-1 text-white text-xs font-semibold">1,247 likes</div>
            <div className="px-4 pb-3 text-xs"><span className="text-white font-semibold">your_brand</span><span className="text-[#4A4A6A]"> Your caption will appear here...</span></div>
          </div>

          <div className="mt-5 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 w-[260px]">
            <div className="flex items-center gap-2 mb-3"><TrendingUp size={12} className="text-[#22C55E]" /><span className="text-[#8B8FA8] text-[10px] uppercase">Predicted Performance</span></div>
            <div className="grid grid-cols-2 gap-3">
              {[["28", "Reach"], ["3.7%", "Engagement"], ["97", "Saves"], ["48%", "Viral Score"]].map(([v, l]) => (
                <div key={l}><div className="text-white font-bold text-base">{v}</div><div className="text-[#4A4A6A] text-[10px]">{l}</div></div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34]">
              <div className="text-[#4A4A6A] text-[10px] uppercase mb-2">Best Posting Times</div>
              {[["8:00 PM", "95%"], ["12:30 PM", "91%"], ["9:00 AM", "87%"]].map(([t, p]) => (
                <div key={t} className="flex justify-between text-[10px] py-0.5"><span className="text-[#8B8FA8]">{t}</span><span className="text-[#22C55E]">{p}</span></div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-[#1C1C34]">
              <div className="flex items-center gap-1.5 mb-2"><Lightbulb size={12} className="text-[#F59E0B]" /><span className="text-[#4A4A6A] text-[10px] uppercase">Growth Tips</span></div>
              {["Use 8-15 hashtags per post", "Post during peak engagement", "Add captions to all videos", "Engage in first 30 min"].map((t) => (
                <div key={t} className="flex items-start gap-2 py-0.5"><div className="w-1 h-1 rounded-full bg-[#22C55E] mt-1.5" /><span className="text-[#8B8FA8] text-[10px]">{t}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[260px] flex-shrink-0 border-l border-[#1C1C34] overflow-y-auto px-4 py-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 mb-4">
            <div className="text-white text-sm font-semibold mb-3">Content Readiness</div>
            {["Topic", "Brand", "Caption"].map((l) => (
              <div key={l} className="flex justify-between py-1"><span className="text-[#4A4A6A] text-xs">{l}</span><span className="text-[#4A4A6A] text-xs">0</span></div>
            ))}
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2"><Sparkles size={14} className="text-[#7B5CFC]" /><span className="text-white text-sm font-semibold">AI Content Intelligence</span></div>
            <input placeholder="@your_handle" className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-[#4A4A6A] text-xs w-full" />
            <button className="w-full h-9 mt-2 bg-[#E1306C] text-white text-xs font-semibold rounded-lg">Analyze</button>
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4"><BarChart2 size={14} className="text-[#F59E0B]" /><span className="text-white text-sm font-semibold">Algorithm Insights</span></div>
            {[["Reel Avg. Reach", "8,100", "+9%", "#22C55E"], ["Carousel Saves", "156", "+12%", "#22C55E"], ["Story Top Pct", "34%", "-5%", "#FF4D6D"], ["Post Stories", "89", "+7%", "#22C55E"]].map(([l, v, d, c]) => (
              <div key={l} className="py-2">
                <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
                <div className="flex items-center"><span className="text-white text-sm font-semibold">{v}</span><span style={{ color: c }} className="text-[10px] ml-2">{d}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
