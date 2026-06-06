import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  BrainCircuit,
  CheckCircle,
  Clock,
  Cpu,
  Lightbulb,
  Loader2,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/intelligence/brain")({
  component: BrainPage,
});

const INITIAL_STATS = [
  { icon: TrendingUp, color: "#7B5CFC", value: 0, suffix: "", label: "Predictions Generated" },
  { icon: Target, color: "#00D4AA", value: 0, suffix: "%", label: "Confidence Average" },
  { icon: Zap, color: "#F59E0B", value: 0, suffix: "", label: "Pending Actions" },
  { icon: CheckCircle, color: "#22C55E", value: 0, suffix: "%", label: "Success Rate" },
  { icon: Activity, color: "#3B82F6", value: 0, suffix: "", label: "Operations Total" },
  { icon: Cpu, color: "#FF4D6D", value: 0, suffix: "", label: "Tokens Used" },
];

const TABS = ["Predictions", "Recommendations", "Channels", "Activity"];

const PREDICTIONS = [
  { title: "WhatsApp lead surge expected", conf: 87, trend: "up", delta: "+18%", desc: "Inbound volume projected to rise next 48h based on campaign reach." },
  { title: "Voice answer rate likely to dip", conf: 72, trend: "down", delta: "-6%", desc: "Friday afternoon historically shows weaker pickup. Reschedule batches." },
  { title: "Email reply window: 9–11 AM", conf: 91, trend: "up", delta: "+24%", desc: "Best engagement window for the next campaign send." },
  { title: "Churn risk: 3 enterprise accounts", conf: 68, trend: "down", delta: "-12%", desc: "Engagement dropped >40% in last 14 days. Trigger retention play." },
];

const RECOMMENDATIONS = [
  { title: "Auto-reply enabled on Instagram DMs", impact: "High", desc: "Cuts first-response time by ~3.2 min on average." },
  { title: "Re-engage 42 cold WhatsApp leads", impact: "Medium", desc: "Send a soft-touch sequence to leads inactive >14 days." },
  { title: "Move voice agents to peak 11AM–2PM", impact: "High", desc: "Pickup rate is 27% higher in this window." },
  { title: "Add price objection handler to script", impact: "Medium", desc: "Detected in 38% of unconverted calls this week." },
];

const CHANNELS = [
  { name: "WhatsApp", val: 87, color: "#22C55E" },
  { name: "Instagram", val: 64, color: "#FF4D6D" },
  { name: "Email", val: 72, color: "#3B82F6" },
  { name: "SMS", val: 58, color: "#F59E0B" },
  { name: "Voice", val: 91, color: "#00D4AA" },
];

const ACTIVITY = [
  { t: "2 min ago", type: "Prediction", text: "Generated 4 new predictions across 3 channels", result: "success" },
  { t: "14 min ago", type: "Recommendation", text: "Suggested auto-reply rule for Instagram", result: "success" },
  { t: "1 hr ago", type: "Analysis", text: "Cross-channel sentiment scan completed", result: "success" },
  { t: "3 hr ago", type: "Alert", text: "Detected anomaly in voice answer rates", result: "warn" },
  { t: "Yesterday", type: "Training", text: "Model retraining cycle finished", result: "success" },
];

function BrainPage() {
  const [tab, setTab] = useState("Predictions");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [applied, setApplied] = useState<Record<number, boolean>>({});

  const runAnalysis = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setStats((prev) =>
        prev.map((s, i) => ({
          ...s,
          value: [127, 84, 12, 76, 312, 18420][i] ?? s.value,
        }))
      );
      setLoading(false);
      toast.success("AI analysis complete — predictions updated");
    }, 3000);
  };

  return (
    <div className="font-sans">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
              <BrainCircuit size={22} className="text-[#7B5CFC]" />
            </div>
            <div>
              <div className="text-white font-bold text-[22px] tracking-[-0.03em]">AI Brain</div>
              <div className="text-[#4A4A6A] text-sm">
                Predictive intelligence · Cross-channel analytics · Smart recommendations
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 mt-3 text-sm">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#22C55E]" />
              <span className="text-[#4A4A6A]">Status</span>
              <span className="text-[#22C55E] font-medium">Active</span>
            </div>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">{stats[0].value} Predictions</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">{stats[1].value}% Confidence</span>
            <div className="w-px h-4 bg-[#1C1C34]" />
            <span className="text-[#8B8FA8]">{stats[2].value} Actions</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[#22C55E] text-xs">Live</span>
          </div>
          <button
            onClick={runAnalysis}
            disabled={loading}
            className="h-10 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] disabled:opacity-70 text-white text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {stats.map((s) => {
          const I = s.icon;
          return (
            <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
              <I size={16} style={{ color: s.color }} />
              <div className="text-white font-bold text-xl mt-2">
                {s.value}
                {s.suffix}
              </div>
              <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 h-10 text-sm font-medium border-b-2 transition-colors ${
              tab === t ? "text-white border-[#7B5CFC]" : "text-[#8B8FA8] border-transparent hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-6 pb-8">
        {tab === "Predictions" && (
          <div className="grid grid-cols-2 gap-4">
            {PREDICTIONS.map((p, i) => {
              const Up = p.trend === "up";
              return (
                <div key={i} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-white font-semibold text-sm">{p.title}</div>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${Up ? "text-[#22C55E]" : "text-[#FF4D6D]"}`}>
                      {Up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {p.delta}
                    </span>
                  </div>
                  <div className="text-[#4A4A6A] text-xs mt-2 leading-relaxed">{p.desc}</div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#1C1C34] rounded">
                      <div className="h-full rounded bg-[#7B5CFC]" style={{ width: `${p.conf}%` }} />
                    </div>
                    <span className="text-[#8B8FA8] text-xs font-semibold">{p.conf}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "Recommendations" && (
          <div className="space-y-3">
            {RECOMMENDATIONS.map((r, i) => (
              <div key={i} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
                  <Lightbulb size={16} className="text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold flex items-center gap-2">
                    {r.title}
                    <span className="bg-[#7B5CFC]/15 text-[#9B84FF] text-[10px] px-2 py-0.5 rounded-full">{r.impact} impact</span>
                  </div>
                  <div className="text-[#4A4A6A] text-xs mt-1">{r.desc}</div>
                </div>
                <button
                  onClick={() => {
                    setApplied((a) => ({ ...a, [i]: true }));
                    toast.success("Applied");
                  }}
                  disabled={applied[i]}
                  className={`h-9 px-4 rounded-lg text-xs font-semibold transition-colors ${
                    applied[i] ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#7B5CFC] hover:bg-[#6047DB] text-white"
                  }`}
                >
                  {applied[i] ? "Applied" : "Apply"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "Channels" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 space-y-4">
            {CHANNELS.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="text-white font-medium">{c.name}</span>
                  <span className="text-[#8B8FA8]">{c.val}%</span>
                </div>
                <div className="h-2 bg-[#1C1C34] rounded">
                  <div className="h-full rounded transition-all" style={{ width: `${c.val}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Activity" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-4">
                <Clock size={14} className="text-[#4A4A6A]" />
                <div className="text-[#4A4A6A] text-xs w-24">{a.t}</div>
                <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">{a.type}</span>
                <div className="text-white text-sm flex-1">{a.text}</div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    a.result === "success" ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#F59E0B]/15 text-amber-400"
                  }`}
                >
                  {a.result === "success" ? "Success" : "Warning"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
