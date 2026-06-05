import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  RefreshCw,
  Send,
  Megaphone,
  Bot,
  FileText,
  Phone,
  BarChart,
  Image as ImageIcon,
  Settings,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Reply,
  Sparkles,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/_dashboard/whatsapp/")({
  component: WhatsAppDashboard,
});

const METRICS = [
  { label: "Contacts", value: "0", sub: "+0" },
  { label: "Sent", value: "0", sub: "30d" },
  { label: "Received", value: "0", sub: "30d" },
  { label: "Open Rate", value: "0.0%", sub: "" },
  { label: "Reply Rate", value: "0.0%", sub: "" },
  { label: "Delivery", value: "0.0%", sub: "" },
  { label: "Campaigns", value: "0", sub: "live" },
  { label: "Health", value: "0", sub: "Needs Attention", red: true },
];

const QUICK_ACTIONS = [
  { icon: Send, color: "text-[#7B5CFC]", name: "New Campaign", desc: "Create & launch" },
  { icon: Megaphone, color: "text-[#00D4AA]", name: "Send Broadcast", desc: "Mass message delivery" },
  { icon: Bot, color: "text-[#F59E0B]", name: "Chatbot Builder", desc: "Design conversation flows" },
  { icon: FileText, color: "text-[#3B82F6]", name: "Templates", desc: "Manage message templates" },
  { icon: Phone, color: "text-[#22C55E]", name: "Validate Numbers", desc: "Verify phone numbers" },
  { icon: BarChart, color: "text-[#7B5CFC]", name: "View Analytics", desc: "Deep performance insights" },
  { icon: ImageIcon, color: "text-[#00D4AA]", name: "Media Library", desc: "Images, videos & docs" },
  { icon: Settings, color: "text-[#8B8FA8]", name: "Settings", desc: "API & account config" },
];

const ACTIVITY = [
  { icon: Send, color: "bg-[#22C55E]/15 text-[#22C55E]", title: "Welcome Series launched", time: "2 min ago" },
  { icon: CheckCircle, color: "bg-[#00D4AA]/15 text-[#00D4AA]", title: "1,240 messages delivered", time: "15 min ago" },
  { icon: FileText, color: "bg-[#3B82F6]/15 text-[#3B82F6]", title: "Template 'promo_v3' approved", time: "1 hr ago" },
  { icon: Bot, color: "bg-[#7B5CFC]/15 text-[#7B5CFC]", title: "Chatbot handled 89 queries", time: "3 hrs ago" },
  { icon: AlertTriangle, color: "bg-[#F59E0B]/15 text-[#F59E0B]", title: "Rate limit threshold 70%", time: "5 hrs ago" },
];

const TYPES = [
  { icon: MessageSquare, color: "text-[#3B82F6]", bar: "bg-[#3B82F6]", label: "Text", count: 342, pct: 45 },
  { icon: ImageIcon, color: "text-[#22C55E]", bar: "bg-[#22C55E]", label: "Image", count: 128, pct: 22 },
  { icon: FileText, color: "text-[#F59E0B]", bar: "bg-[#F59E0B]", label: "Document", count: 85, pct: 15 },
  { icon: Phone, color: "text-[#7B5CFC]", bar: "bg-[#7B5CFC]", label: "Audio", count: 52, pct: 10 },
  { icon: ImageIcon, color: "text-[#FF4D6D]", bar: "bg-[#FF4D6D]", label: "Video", count: 43, pct: 8 },
];

const INSIGHTS = [
  { color: "bg-[#22C55E]", title: "Strong Delivery", desc: "Messages reach 98.5% of recipients" },
  { color: "bg-[#3B82F6]", title: "Peak Hours", desc: "Best send time: 9-11 AM weekdays" },
  { color: "bg-[#F59E0B]", title: "Template Performance", desc: "Welcome template: 72% open rate" },
  { color: "bg-[#FF4D6D]", title: "Low Engagement", desc: "Personalize messages for better replies" },
  { color: "bg-[#00D4AA]", title: "API Quality", desc: "No rate-limiting issues detected" },
];

function WhatsAppDashboard() {
  return (
    <div className="font-sans">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center">
            <MessageCircle size={22} className="text-[#22C55E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Command Center</h1>
              <span className="bg-[#22C55E]/12 border border-[#22C55E]/20 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full font-semibold">Business API</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Real-time messaging analytics, campaign management & automation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ New Campaign</button>
        </div>
      </div>

      {/* 8 metric strip */}
      <div className="px-6 mb-5 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[130px]">
              <div className="text-[#4A4A6A] text-[10px] uppercase">{m.label}</div>
              <div className="text-white font-bold text-lg mt-1">{m.value}</div>
              <div className={`text-[10px] ${m.red ? "text-[#FF4D6D]" : "text-[#4A4A6A]"}`}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 1 */}
      <div className="px-6 mb-4 grid grid-cols-3 gap-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-white font-semibold text-sm">Account Health</div>
              <div className="text-[#4A4A6A] text-xs">Delivery + engagement</div>
            </div>
          </div>
          <div className="relative w-20 h-20 mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: 100 }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="v" fill="#FF4D6D" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">0</div>
          </div>
          <div className="flex justify-center mt-2">
            <span className="bg-[#FF4D6D]/12 text-[#FF4D6D] text-xs px-2 py-0.5 rounded-full">Needs Attention</span>
          </div>
          <div className="text-[#4A4A6A] text-xs text-center mt-2">No account connected</div>
          <div className="flex justify-center mt-3">
            <button className="h-8 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-semibold">Connect Now</button>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold text-sm">API Status</div>
            <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2 py-0.5 rounded-full">Operational</span>
          </div>
          <div className="space-y-3 mt-4">
            {["Messaging", "Media Upload", "Webhooks"].map((l) => (
              <div key={l} className="flex justify-between items-center">
                <span className="text-[#8B8FA8] text-sm">{l}</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span className="text-[#22C55E] text-xs font-medium">OK</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold text-sm">Rate Limits</div>
            <span className="bg-blue-500/12 text-blue-400 text-xs px-2 py-0.5 rounded-full">Tier 3</span>
          </div>
          <div className="space-y-4 mt-4">
            {[
              { label: "Messages/24h", val: "1,240 / 10,000", pct: 12, color: "bg-[#22C55E]" },
              { label: "Media/hour", val: "32 / 500", pct: 6, color: "bg-[#7B5CFC]" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#8B8FA8] text-xs">{r.label}</span>
                  <span className="text-white text-xs font-medium">{r.val}</span>
                </div>
                <div className="h-1.5 bg-[#1C1C34] rounded-full overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="px-6 mb-4 grid grid-cols-12 gap-4">
        <div className="col-span-8 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-[#22C55E]" />
            <div className="text-white font-semibold text-sm">Quick Actions</div>
            <span className="ml-auto bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">8 tools</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {QUICK_ACTIONS.map((a) => (
              <div key={a.name} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 cursor-pointer hover:border-[#22C55E]/30 hover:bg-[#0E0E1C] transition-all">
                <a.icon size={22} className={a.color} />
                <div className="text-white text-xs font-semibold mt-2">{a.name}</div>
                <div className="text-[#4A4A6A] text-[10px]">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-[#7B5CFC]" />
            <div className="text-white font-semibold text-sm">Recent Activity</div>
            <span className="ml-auto bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">Live</span>
          </div>
          <div className="mt-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-[#1C1C34]/50 last:border-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${a.color}`}>
                  <a.icon size={14} />
                </div>
                <div>
                  <div className="text-white text-xs font-medium">{a.title}</div>
                  <div className="text-[#4A4A6A] text-[10px] mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="px-6 pb-6 grid grid-cols-3 gap-4">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-[#22C55E]" />
            <div className="text-white font-semibold text-sm">Message Flow</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
            {[
              { label: "SENT", icon: Send, color: "text-[#22C55E]" },
              { label: "REPLIES", icon: Reply, color: "text-[#00D4AA]" },
            ].map((s) => (
              <div key={s.label} className="bg-[#06060F] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{s.label}</span>
                  <s.icon size={16} className={s.color} />
                </div>
                <div className="text-white font-bold text-[28px] tracking-[-0.03em]">0</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-3 border-t border-[#1C1C34]">
            {["Delivery Rate", "Open Rate", "Reply Rate", "Engagement"].map((l) => (
              <div key={l} className="flex justify-between">
                <span className="text-[#8B8FA8] text-xs">{l}</span>
                <span className="text-white text-xs font-medium">0.0%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-[#7B5CFC]" />
            <div className="text-white font-semibold text-sm">Message Types</div>
          </div>
          <div className="space-y-3 mt-4">
            {TYPES.map((t) => (
              <div key={t.label} className="flex items-center gap-3">
                <t.icon size={14} className={t.color} />
                <span className="text-[#8B8FA8] text-sm flex-1">{t.label}</span>
                <span className="text-white text-sm font-semibold w-8 text-right">{t.count}</span>
                <span className="text-[#4A4A6A] text-xs w-8 text-right">{t.pct}%</span>
                <div className="flex-1 h-1.5 bg-[#1C1C34] rounded-full max-w-[80px] overflow-hidden">
                  <div className={`h-full ${t.bar} rounded-full`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1C1C34] mt-3 pt-3 flex justify-between">
            <span className="text-[#8B8FA8] text-sm">Total Messages</span>
            <span className="text-white font-bold">650</span>
          </div>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#7B5CFC]" />
            <div className="text-white font-semibold text-sm">AI Insights</div>
          </div>
          <div className="space-y-3 mt-4">
            {INSIGHTS.map((ins) => (
              <div key={ins.title} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${ins.color}`} />
                <div>
                  <div className="text-white text-xs font-medium">{ins.title}</div>
                  <div className="text-[#4A4A6A] text-[11px] mt-0.5">{ins.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[#22C55E] text-xs mt-4 cursor-pointer">View Full Analytics →</div>
        </div>
      </div>
    </div>
  );
}
