import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Star, Phone, TrendingUp, Award, Mic, Volume2, AlertTriangle, Clock, Activity, Zap, Volume, MessageSquare } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/_dashboard/engage/advanced-analytics")({ component: AdvAnalytics });

const M: any[] = [
  [Star, "#7B5CFC", "0", "Avg Call Score", "+5% this week"],
  [Phone, "#3B82F6", "0", "Calls Analyzed", "0 with QA scores"],
  [TrendingUp, "#22C55E", "0%", "Positive Calls", "0 high performers"],
  [Award, "#F59E0B", "0", "High Performers", "Top scoring agents"],
];

const CARDS: any[] = [
  [Mic, "#7B5CFC", "Talk Ratio", "Ideal: 40-60% talk time", "Normal", "#22C55E"],
  [Volume2, "#00D4AA", "Listen Ratio", "Ideal: 40-60% listen time", "Normal", "#22C55E"],
  [AlertTriangle, "#F59E0B", "Interruptions", "Per call average", "Normal", "#22C55E"],
  [Clock, "#3B82F6", "Response Time", "Ideal: <500ms", "Slow", "#FF4D6D"],
];

const TREND = Array.from({ length: 7 }, (_, i) => ({ d: i, v: 0 }));

function AdvAnalytics() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center"><BarChart3 size={22} className="text-[#7B5CFC]" /></div>
          <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Advanced Analytics</h1><p className="text-[#4A4A6A] text-sm">Comprehensive call intelligence, quality scoring, and team performance</p></div>
        </div>
        <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Export</button>
      </div>

      <div className="px-6 mb-5 grid grid-cols-4 gap-4">
        {M.map(([Icon, c, v, l, s]: any) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-5">
            <Icon size={16} style={{ color: c }} />
            <div className="text-white font-bold text-2xl mt-2">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{l}</div>
            <div className="text-[#22C55E] text-[11px] mt-1">{s}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-5 flex gap-1 border-b border-[#1C1C34]">
        {["Overview", "Voice Analytics", "Compliance", "Scripts", "Battle Cards"].map((t, i) => <button key={t} className={`px-4 py-2 text-sm ${i === 0 ? "text-white border-b-2 border-[#7B5CFC]" : "text-[#8B8FA8]"}`}>{t}</button>)}
      </div>

      <div className="px-6">
        <div className="grid grid-cols-4 gap-4 mb-5">
          {CARDS.map(([Icon, c, l, ideal, badge, bc]: any) => (
            <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Icon size={16} style={{ color: c }} /><span className="text-[#4A4A6A] text-[10px] uppercase">{l}</span></div><span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${bc}25`, color: bc }}>{badge}</span></div>
              <div className="text-white font-bold text-2xl mt-2">—</div>
              <div className="text-[#4A4A6A] text-xs">{ideal}</div>
              <div className="h-1 bg-[#1C1C34] rounded mt-2 overflow-hidden"><div className="h-full" style={{ background: c, width: "0%" }} /></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><Activity size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Call Time Distribution</span></div>
            <div className="h-[120px] flex items-center justify-center text-[#4A4A6A] text-sm">No call data yet</div>
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4"><TrendingUp size={14} className="text-[#22C55E]" /><span className="text-white font-semibold text-sm">Talk Ratio Trend</span></div>
            <ResponsiveContainer width="100%" height={120}><LineChart data={TREND}><Line type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2"><Zap size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Speaking Pace</span></div>
            <div className="text-white font-bold text-xl mt-2">—</div>
            <div className="text-[#4A4A6A] text-xs">words per minute</div>
            <div className="text-[#4A4A6A] text-[11px] mt-2">120-150 WPM = Ideal conversational pace</div>
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2"><Volume size={14} className="text-[#3B82F6]" /><span className="text-white font-semibold text-sm">Silence Ratio</span></div>
            <div className="text-white font-bold text-xl mt-2">—</div>
            <div className="text-[#4A4A6A] text-xs">average silence</div>
          </div>
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2"><MessageSquare size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Calls Analyzed</span></div>
            <div className="text-white font-bold text-[28px] mt-1 tracking-[-0.03em]">0</div>
            <div className="text-[#4A4A6A] text-xs">with voice analytics</div>
            <div className="flex gap-2 mt-3"><span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">0 high performers</span><span className="bg-[#FF4D6D]/12 text-[#FF4D6D] text-[10px] px-2 py-0.5 rounded-full">0 needs work</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
