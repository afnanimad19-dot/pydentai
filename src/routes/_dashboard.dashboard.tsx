import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  CalendarDays,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  DownloadCloud,
  GitBranch,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  Play,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  UploadCloud,
  UserPlus,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — pydent.ai" }] }),
  component: DashboardOverview,
});

const chartData = [
  { name: "Mon", conv: 180, qual: 24 },
  { name: "Tue", conv: 210, qual: 31 },
  { name: "Wed", conv: 195, qual: 28 },
  { name: "Thu", conv: 240, qual: 38 },
  { name: "Fri", conv: 285, qual: 44 },
  { name: "Sat", conv: 190, qual: 22 },
  { name: "Sun", conv: 165, qual: 19 },
];

const sourceData = [
  { name: "WhatsApp", value: 52, fill: "#7B5CFC" },
  { name: "Voice", value: 24, fill: "#00D4AA" },
  { name: "SMS", value: 15, fill: "#F59E0B" },
  { name: "Instagram", value: 9, fill: "#FF4D6D" },
];

type PrimaryCard = {
  icon: LucideIcon;
  color: string;
  trend: string;
  trendUp: boolean;
  value: string;
  label: string;
  prev: string;
  to: string;
};

const primaryCardsBase: PrimaryCard[] = [
  { icon: Users, color: "#7B5CFC", trend: "↑ 12.4%", trendUp: true, value: "1,284", label: "Total Leads", prev: "1,147", to: "/engage/leads" },
  { icon: MessageCircle, color: "#00D4AA", trend: "↑ 3%", trendUp: true, value: "14", label: "Active Conversations", prev: "13", to: "/whatsapp/inbox" },
  { icon: MessageSquare, color: "#22C55E", trend: "↑ 2.1%", trendUp: true, value: "0", label: "Messages Today", prev: "0", to: "/whatsapp/inbox" },
  { icon: Bot, color: "#F59E0B", trend: "↑ 5%", trendUp: true, value: "0", label: "Active Agents", prev: "0", to: "/agents" },
];

const channelHealth = [
  { name: "Voice AI", sub: "2/2 Agents", icon: Phone, color: "#7B5CFC", live: true, val: "Live", to: "/agents" },
  { name: "WhatsApp", sub: "Connected", icon: MessageCircle, color: "#22C55E", live: true, val: "3", to: "/whatsapp" },
  { name: "Instagram", sub: "0 Accounts", icon: Camera, color: "#EC4899", live: false, val: "—", to: "/instagram/content-planner" },
  { name: "Email", sub: "0 Domains", icon: Mail, color: "#3B82F6", live: false, val: "—", to: "/email" },
  { name: "SMS", sub: "0 Providers", icon: MessageSquare, color: "#00D4AA", live: false, val: "—", to: "/sms" },
];

type CallRow = {
  time: string;
  name: string;
  type: string;
  status: string;
  sc: string;
  phone: string;
  initials: string;
  duration: string;
  outcome: "completed" | "missed" | "failed";
  transcript: string;
};

const scheduleCalls: CallRow[] = [
  { time: "09:15", name: "Omar Al Rashidi", type: "Checkup", status: "Completed", sc: "#22C55E", phone: "+971 50 123 4567", initials: "OA", duration: "8m 32s", outcome: "completed", transcript: "Agent: Hello, thank you for calling. How can I assist you today?\nCustomer: Hi, I'd like to book an appointment for a checkup.\nAgent: Of course! I'd be happy to help with that. What date works best for you?" },
  { time: "10:30", name: "Sara Ahmed", type: "Cleaning", status: "Completed", sc: "#22C55E", phone: "+971 50 234 5678", initials: "SA", duration: "6m 12s", outcome: "completed", transcript: "Agent: Hello, thank you for calling. How can I assist you today?\nCustomer: Hi, I'd like to book an appointment for a checkup.\nAgent: Of course! I'd be happy to help with that. What date works best for you?" },
  { time: "11:00", name: "Ahmed Khalid", type: "Consultation", status: "Missed", sc: "#FF4D6D", phone: "+971 50 345 6789", initials: "AK", duration: "0m 00s", outcome: "missed", transcript: "No transcript available." },
  { time: "13:45", name: "Fatima Rahman", type: "Implant Consult", status: "Upcoming", sc: "#7B5CFC", phone: "+971 50 456 7890", initials: "FR", duration: "—", outcome: "completed", transcript: "No transcript available." },
  { time: "14:30", name: "Layla Hassan", type: "Whitening", status: "Upcoming", sc: "#7B5CFC", phone: "+971 50 567 8901", initials: "LH", duration: "—", outcome: "completed", transcript: "No transcript available." },
  { time: "15:15", name: "Mohammed S.", type: "Checkup", status: "Upcoming", sc: "#7B5CFC", phone: "+971 50 678 9012", initials: "MS", duration: "—", outcome: "completed", transcript: "No transcript available." },
];

const channelsTabData = [
  { name: "WhatsApp", Icon: MessageCircle, color: "#22C55E", status: "Live", to: "/whatsapp", stats: [{ l: "Sent", v: "2,847" }, { l: "Delivered", v: "92%" }, { l: "Replies", v: "412" }] },
  { name: "Voice AI", Icon: Phone, color: "#7B5CFC", status: "Live", to: "/agents", stats: [{ l: "Calls", v: "412" }, { l: "Avg", v: "8m" }, { l: "Success", v: "87%" }] },
  { name: "SMS", Icon: MessageSquare, color: "#00D4AA", status: "Live", to: "/sms", stats: [{ l: "Sent", v: "596" }, { l: "Delivery", v: "98%" }, { l: "Replies", v: "84" }] },
  { name: "Instagram", Icon: Camera, color: "#EC4899", status: "Disconnected", to: "/instagram/content-planner", stats: [{ l: "DMs", v: "0" }, { l: "Reach", v: "0" }, { l: "Replies", v: "0" }] },
  { name: "Email", Icon: Mail, color: "#3B82F6", status: "Disconnected", to: "/email", stats: [{ l: "Sent", v: "0" }, { l: "Open", v: "0%" }, { l: "CTR", v: "0%" }] },
];

const agentsTabData = [
  { name: "Sarah", type: "Voice Agent", status: "Live", readiness: 92, channels: "Voice, WhatsApp" },
  { name: "Ella", type: "Voice Agent", status: "Live", readiness: 87, channels: "Voice" },
  { name: "Maya", type: "Messaging", status: "Idle", readiness: 76, channels: "WhatsApp, SMS" },
];

type ActivityEvent = { kind: "message" | "call" | "campaign" | "workflow"; text: string; time: string; channel?: string };
const activityEvents: ActivityEvent[] = [
  { kind: "message", text: "Sarah Ahmed replied to WhatsApp message", time: "2 min ago", channel: "WhatsApp" },
  { kind: "call", text: "Inbound call completed — 8m 32s", time: "5 min ago", channel: "Voice" },
  { kind: "campaign", text: "Recall May campaign delivered to 450 recipients", time: "12 min ago", channel: "WhatsApp" },
  { kind: "workflow", text: "Lead Qualification workflow executed (24 leads)", time: "18 min ago" },
  { kind: "message", text: "Omar Al Rashidi sent new message", time: "22 min ago", channel: "WhatsApp" },
  { kind: "call", text: "Missed inbound call from +971 50 345 6789", time: "31 min ago", channel: "Voice" },
  { kind: "message", text: "SMS reply received from Fatima R.", time: "44 min ago", channel: "SMS" },
  { kind: "workflow", text: "Follow-up workflow scheduled for 87 patients", time: "1 hr ago" },
  { kind: "campaign", text: "Promo Jun campaign launched", time: "1 hr ago", channel: "WhatsApp" },
  { kind: "call", text: "Outbound call completed — 4m 18s", time: "2 hr ago", channel: "Voice" },
  { kind: "message", text: "WhatsApp template approved: promo_v3", time: "2 hr ago", channel: "WhatsApp" },
  { kind: "workflow", text: "Appointment reminder workflow ran", time: "3 hr ago" },
  { kind: "campaign", text: "Newsletter delivered to 520 subscribers", time: "3 hr ago", channel: "Email" },
  { kind: "call", text: "Inbound call queued", time: "4 hr ago", channel: "Voice" },
  { kind: "message", text: "Instagram DM auto-reply sent", time: "5 hr ago", channel: "Instagram" },
];

function ImportLeadsModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    onClose();
    toast.success("Leads imported successfully");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold text-[16px]">Import Leads</h3>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white">
            <X size={18} />
          </button>
        </div>
        <div
          onClick={() => inputRef.current?.click()}
          className="border-dashed border-2 border-[#1E1E2E] rounded-xl p-10 text-center cursor-pointer hover:border-[#7C5CFC]/40 transition"
        >
          <UploadCloud size={32} className="text-[#8B8FA8] mx-auto mb-3" />
          <div className="text-[#8B8FA8] text-[13px]">Drag CSV or Excel file here or click to browse</div>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        {file && (
          <div className="mt-3 bg-[#0D0D14] border border-[#1E1E2E] rounded-lg px-3 py-2 flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-white text-xs font-medium truncate">{file.name}</div>
              <div className="text-[#8B8FA8] text-[10px]">{(file.size / 1024).toFixed(1)} KB</div>
            </div>
            <button onClick={() => setFile(null)} className="text-[#8B8FA8] hover:text-white">
              <X size={14} />
            </button>
          </div>
        )}
        <button className="text-[#7B5CFC] text-[12px] mt-3 hover:underline">Download Sample Template</button>
        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-4 h-9 rounded-lg text-[#8B8FA8] hover:text-white hover:bg-white/[0.04] text-sm">Cancel</button>
          <button onClick={handleImport} className="px-4 h-9 rounded-lg bg-[#7B5CFC] hover:bg-[#6B4FE0] text-white text-sm font-semibold">Import Leads</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmAutopilotModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-8 max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
        <AlertTriangle size={40} className="text-[#F59E0B] mx-auto mb-4" />
        <h3 className="text-white font-bold text-[18px]">Enable Autopilot Mode?</h3>
        <p className="text-[#8B8FA8] text-sm mt-2">
          AI will automatically handle ALL incoming conversations 24/7 across every connected channel. You can take over any conversation at any time from Live Monitoring.
        </p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} className="flex-1 h-10 rounded-lg text-[#8B8FA8] hover:text-white hover:bg-white/[0.04] text-sm">Cancel</button>
          <button onClick={onConfirm} className="flex-1 h-10 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Enable Autopilot</button>
        </div>
      </div>
    </div>
  );
}

function CallDetailModal({ call, onClose, onHistory }: { call: CallRow; onClose: () => void; onHistory: () => void }) {
  const outcomeColor =
    call.outcome === "completed" ? "bg-[#22C55E]/15 text-[#22C55E]" :
    call.outcome === "missed" ? "bg-[#F59E0B]/15 text-[#F59E0B]" :
    "bg-[#FF4D6D]/15 text-[#FF4D6D]";

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#7C5CFC]/20 flex items-center justify-center text-white text-sm font-semibold">
              {call.initials}
            </div>
            <div>
              <div className="text-white font-bold text-[16px]">{call.name}</div>
              <div className="text-[#8B8FA8] text-[13px]">{call.phone}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-[#0D0D14] border border-[#1E1E2E] text-[#8B8FA8] text-xs px-2.5 py-1 rounded-full">Today · {call.time}</span>
          <span className="bg-[#0D0D14] border border-[#1E1E2E] text-[#8B8FA8] text-xs px-2.5 py-1 rounded-full">{call.duration}</span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${outcomeColor}`}>{call.status}</span>
        </div>
        <div className="mt-4">
          <div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-2">Recording</div>
          <div className="bg-[#0D0D14] rounded-xl p-3 flex items-center gap-3">
            <Play size={20} className="text-[#8B8FA8]" />
            <div className="flex-1 h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
              <div className="h-full bg-[#7B5CFC] w-0" />
            </div>
            <span className="text-[#8B8FA8] text-[11px]">0:00</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[#8B8FA8] text-[10px] uppercase tracking-wider mb-2">Transcript</div>
          <div className="bg-[#0D0D14] rounded-xl p-4 max-h-48 overflow-y-auto text-sm text-[#8B8FA8] leading-relaxed whitespace-pre-line">
            {call.transcript}
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button onClick={onHistory} className="text-[#7B5CFC] text-sm hover:text-[#9B84FF]">View Full History →</button>
          <button onClick={onClose} className="px-4 h-9 rounded-lg bg-[#7B5CFC] hover:bg-[#6B4FE0] text-white text-sm font-semibold">Close</button>
        </div>
      </div>
    </div>
  );
}

export function DashboardOverview() {
  const navigate = useNavigate();
  const { metrics, loading: metricsLoading } = useDashboardMetrics();
  const [dashTab, setDashTab] = useState<"overview" | "channels" | "agents" | "activity">("overview");
  const [showImport, setShowImport] = useState(false);
  const [autopilot, setAutopilot] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [openCall, setOpenCall] = useState<CallRow | null>(null);
  const [actFilter, setActFilter] = useState<"all" | "message" | "call" | "campaign" | "workflow">("all");

  const liveValues = [
    metricsLoading ? "…" : (metrics?.totalContacts ?? 0).toLocaleString(),
    metricsLoading ? "…" : String(metrics?.activeConversations ?? 0),
    metricsLoading ? "…" : (metrics?.messagesToday ?? 0).toLocaleString(),
    metricsLoading ? "…" : String(metrics?.activeAgents ?? 0),
  ];
  const primaryCards: PrimaryCard[] = primaryCardsBase.map((c, i) => ({ ...c, value: liveValues[i] }));
  const liveChartData = metrics?.weeklyChart ?? chartData;
  const liveSourceData = metrics?.sourceChart ?? sourceData;

  const handleAutopilotClick = () => {
    if (!autopilot) {
      setShowConfirm(true);
    } else {
      setAutopilot(false);
      toast("Autopilot disabled");
    }
  };

  const filteredActivity =
    actFilter === "all" ? activityEvents : activityEvents.filter((e) => e.kind === actFilter);

  return (
    <div className="px-6 py-5 space-y-5 w-full bg-beam-purple overflow-x-hidden">
      {/* Tab row */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {([
            { id: "overview", label: "Overview" },
            { id: "channels", label: "Channels", badge: "5" },
            { id: "agents", label: "AI Agents", badge: "3" },
            { id: "activity", label: "Activity" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setDashTab(t.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                dashTab === t.id
                  ? "bg-[#7B5CFC]/[0.12] text-white border border-[#7B5CFC]/25"
                  : "text-[#4A4A6A] hover:text-[#8B8FA8] hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              {t.label}
              {"badge" in t && t.badge && (
                <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] rounded-full px-1.5 py-0.5">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[11px] px-3 py-1 rounded-full font-medium">
            System Healthy
          </span>
          <span className="text-[#4A4A6A] text-xs">Updated 2 min ago</span>
          <button className="flex items-center gap-1.5 text-xs text-[#8B8FA8] hover:text-white border border-[#1C1C34] px-3 py-1.5 rounded-lg">
            <DownloadCloud size={13} /> Export
          </button>
        </div>
      </div>

      {dashTab === "overview" && (
        <>
          {/* ROW 1: Channel Health */}
          <div className="grid grid-cols-5 gap-3">
            {channelHealth.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.name}
                  onClick={() => navigate({ to: c.to })}
                  className="group bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] hover:border-[#7B5CFC]/30 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.color + "22" }}>
                      <Icon size={14} style={{ color: c.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-xs font-semibold truncate">{c.name}</div>
                      <div className="text-[#4A4A6A] text-[10px] truncate">{c.sub}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${c.live ? "bg-[#22C55E]/10 text-[#22C55E]" : "bg-[#1C1C34] text-[#4A4A6A]"}`}>
                        {c.live ? "Live" : "Inactive"}
                      </span>
                      <span className="text-white text-xs font-semibold">{c.val}</span>
                    </div>
                    <ChevronRight size={14} className="text-[#8B8FA8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROW 2: 4 metric cards */}
          <div className="grid grid-cols-4 gap-4">
            {primaryCards.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.label}
                  onClick={() => navigate({ to: c.to })}
                  className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 cursor-pointer hover:border-[#7C5CFC]/30 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <Icon size={18} style={{ color: c.color }} />
                    <span className={`h-5 px-2 text-[11px] font-semibold rounded-full inline-flex items-center ${c.trendUp ? "bg-[#22C55E]/[0.12] text-[#22C55E]" : "bg-[#FF4D6D]/[0.12] text-[#FF4D6D]"}`}>
                      {c.trend}
                    </span>
                  </div>
                  <div className="text-white font-bold text-[28px] tracking-[-0.035em] leading-none mt-3">{c.value}</div>
                  <div className="text-[#8B8FA8] text-sm mt-1.5">{c.label}</div>
                  <div className="mt-3 pt-3 border-t border-[#1C1C34]">
                    <span className="text-[#4A4A6A] text-xs">Prev: {c.prev}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-8 flex flex-col gap-5">
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white font-semibold text-[16px] tracking-[-0.02em]">Patient Conversations</h3>
                    <p className="text-[#4A4A6A] text-[12px] mt-1">vs Qualified Patients — 7 day rolling</p>
                  </div>
                  <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 flex gap-1">
                    {["24H", "7D", "30D", "90D"].map((t, i) => (
                      <button key={t} className={`px-3 py-1 rounded-md text-xs font-medium cursor-pointer transition-all ${i === 1 ? "bg-[#7B5CFC] text-white" : "text-[#4A4A6A] hover:text-[#8B8FA8]"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <AreaChart data={liveChartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="purpleArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7B5CFC" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#7B5CFC" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="tealArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.15} />
                          <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1C1C34" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                      <Tooltip contentStyle={{ background: "#141428", border: "1px solid #1C1C34", borderRadius: 12, color: "#fff", fontSize: 13, padding: 12 }} />
                      <Area type="monotone" dataKey="conv" name="Conversations" stroke="#7B5CFC" strokeWidth={2.5} fill="url(#purpleArea)" dot={false} activeDot={{ r: 4, fill: "#7B5CFC" }} />
                      <Area type="monotone" dataKey="qual" name="Qualified" stroke="#00D4AA" strokeWidth={1.5} strokeDasharray="5 3" fill="url(#tealArea)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#7B5CFC]" /><span className="text-[#8B8FA8] text-xs">Conversations</span></div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm border border-dashed border-[#00D4AA]" /><span className="text-[#8B8FA8] text-xs">Qualified Patients</span></div>
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-4 pt-4 border-t border-[#1C1C34]">
                  {[
                    { icon: TrendingUp, color: "#22C55E", label: "Completion Rate", value: "87%", delta: "↑ 2.1%" },
                    { icon: MessageSquare, color: "#7B5CFC", label: "Weekly Volume", value: "1,465", delta: "conversations" },
                    { icon: Zap, color: "#F59E0B", label: "Peak", value: "Friday", delta: "285 conv." },
                  ].map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.label} className="flex items-center gap-2">
                        <Icon size={14} style={{ color: s.color }} />
                        <div>
                          <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">{s.label}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-white text-sm font-semibold">{s.value}</span>
                            <span className="bg-[#22C55E]/10 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded-full font-medium">{s.delta}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Channel Overview card */}
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mt-0">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">Channel Overview</h3>
                  <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2.5 py-1 rounded-full">All Channels</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Instagram", Icon: Camera, color: "#F59E0B", status: "Inactive", statusBg: "bg-[#8B8FA8]/12", statusText: "text-[#8B8FA8]", value: "0", label: "accounts connected", secondary: "0 messages", delta: "—", deltaBg: "bg-[#1C1C34]", deltaText: "text-[#8B8FA8]", to: "/instagram/content-planner" },
                    { name: "WhatsApp", Icon: MessageCircle, color: "#22C55E", status: "Active", statusBg: "bg-[#22C55E]/15", statusText: "text-[#22C55E]", value: "2,847", label: "messages sent", secondary: "92% delivered", delta: "+12%", deltaBg: "bg-[#22C55E]/15", deltaText: "text-[#22C55E]", to: "/whatsapp" },
                    { name: "Voice", Icon: Phone, color: "#7B5CFC", status: "Active", statusBg: "bg-[#7B5CFC]/15", statusText: "text-[#7B5CFC]", value: "412", label: "calls handled", secondary: "8 min avg", delta: "+5%", deltaBg: "bg-[#22C55E]/15", deltaText: "text-[#22C55E]", to: "/agents" },
                    { name: "SMS", Icon: MessageSquare, color: "#00D4AA", status: "Active", statusBg: "bg-[#00D4AA]/15", statusText: "text-[#00D4AA]", value: "596", label: "messages sent", secondary: "98% delivered", delta: "+8%", deltaBg: "bg-[#22C55E]/15", deltaText: "text-[#22C55E]", to: "/sms" },
                  ].map((ch) => {
                    const Icon = ch.Icon;
                    return (
                      <div key={ch.name} onClick={() => navigate({ to: ch.to })} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 cursor-pointer hover:border-[#7B5CFC]/25 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg flex items-center justify-center" style={{ width: 28, height: 28, background: `${ch.color}26` }}>
                              <Icon size={14} style={{ color: ch.color }} />
                            </div>
                            <span className="text-white text-[13px] font-semibold">{ch.name}</span>
                          </div>
                          <span className={`h-5 px-2 text-[10px] rounded-full font-medium inline-flex items-center ${ch.statusBg} ${ch.statusText}`}>{ch.status}</span>
                        </div>
                        <div className="text-white font-bold text-[22px] tracking-[-0.03em]">{ch.value}</div>
                        <div className="text-[#4A4A6A] text-[11px] mt-0.5">{ch.label}</div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1C1C34]">
                          <span className="text-[#8B8FA8] text-xs">{ch.secondary}</span>
                          <span className={`h-4 px-1.5 text-[10px] rounded-full font-medium inline-flex items-center ${ch.deltaBg} ${ch.deltaText}`}>{ch.delta}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT stack */}
            <div className="col-span-4 flex flex-col gap-4">
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Patient Sources</h3>
                <div className="relative flex justify-center" style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer width={200} height={160}>
                    <PieChart>
                      <Pie data={liveSourceData} innerRadius={50} outerRadius={72} paddingAngle={3} startAngle={90} endAngle={-270} dataKey="value" stroke="none" isAnimationActive={false}>
                        {liveSourceData.map((d) => (<Cell key={d.name} fill={d.fill} />))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="text-white font-bold text-[18px] tracking-[-0.03em] leading-none">1,284</div>
                    <div className="text-[#4A4A6A] text-[10px] mt-1">total</div>
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  {liveSourceData.map((d) => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
                        <span className="text-[#8B8FA8] text-xs">{d.name}</span>
                      </div>
                      <span className="text-white text-xs font-semibold">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <div className="flex items-center">
                  <h3 className="text-white font-semibold text-sm">Live Operations</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse ml-auto" />
                  <span className="text-[#22C55E] text-[11px] ml-2">Live</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#1C1C34]">
                  <div className="flex items-center"><PhoneCall size={14} className="text-[#22C55E]" /><span className="text-[#8B8FA8] text-xs ml-2">Active Calls</span></div>
                  <div className="text-right"><div className="text-white font-bold text-[24px] tracking-[-0.03em] leading-none">3</div><div className="text-[#4A4A6A] text-[10px] mt-0.5">in progress</div></div>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <div className="flex items-center"><Clock size={14} className="text-[#4A4A6A]" /><span className="text-[#8B8FA8] text-xs ml-2">Queued</span></div>
                  <div className="text-right"><div className="text-white font-bold text-[24px] tracking-[-0.03em] leading-none">0</div><div className="text-[#4A4A6A] text-[10px] mt-0.5">waiting</div></div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-2"><span className="text-[#8B8FA8] text-xs">System Health</span><span className="text-white text-xs font-semibold">20%</span></div>
                  <div className="bg-[#1C1C34] h-1.5 rounded-full"><div className="bg-[#22C55E] h-1.5 rounded-full" style={{ width: "20%" }} /></div>
                  <div className="flex justify-between mt-1.5"><span className="text-[#4A4A6A] text-[10px]">Latency: 10ms</span><span className="text-[#4A4A6A] text-[10px]">Uptime: 99.8%</span></div>
                </div>
              </div>

              {/* Quick Actions card */}
              <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { i: PhoneCall, c: "#00D4AA", l: "Start Calling", onClick: () => navigate({ to: "/agents", search: { tab: "voice" } as never }) },
                    { i: UserPlus, c: "#7B5CFC", l: "Import Leads", onClick: () => setShowImport(true) },
                    { i: Bot, c: "#7B5CFC", l: "Create Agent", onClick: () => navigate({ to: "/agents", search: { action: "new" } as never }) },
                    { i: CalendarDays, c: "#F59E0B", l: "New Campaign", onClick: () => navigate({ to: "/whatsapp/campaigns", search: { action: "new" } as never }) },
                    { i: MessageCircle, c: "#22C55E", l: "WhatsApp", onClick: () => navigate({ to: "/whatsapp" }) },
                    { i: Settings, c: "#8B8FA8", l: "Settings", onClick: () => navigate({ to: "/settings" }) },
                  ].map((a) => {
                    const Icon = a.i;
                    return (
                      <button key={a.l} onClick={a.onClick} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex flex-col items-center gap-2 cursor-pointer hover:border-[#7B5CFC]/30 hover:bg-[#0E0E1C] transition-all">
                        <Icon size={18} style={{ color: a.c }} />
                        <span className="text-[10px] text-[#8B8FA8] text-center leading-tight">{a.l}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-[#1C1C34] flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap size={14} className={autopilot ? "text-[#22C55E]" : "text-[#7B5CFC]"} />
                    <span className="text-white text-xs font-medium ml-2">Autopilot</span>
                    {autopilot && <span className="ml-2 text-[#22C55E] text-[10px] font-semibold">ON</span>}
                  </div>
                  <button
                    onClick={handleAutopilotClick}
                    className={`w-9 h-5 rounded-full cursor-pointer transition-colors relative ${autopilot ? "bg-[#22C55E]" : "bg-[#1C1C34] hover:bg-[#7B5CFC]/30"}`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full absolute top-[3px] transition-all ${autopilot ? "left-[19px] bg-white" : "left-[3px] bg-[#4A4A6A]"}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3B */}
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-7 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">Recent Leads</h3>
                <button onClick={() => navigate({ to: "/engage/leads" })} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF] cursor-pointer transition-colors">View All Leads →</button>
              </div>
              <div className="space-y-1">
                {[
                  { initials: "OA", name: "Omar Al Rashidi", grad: "from-[#7B5CFC]/60 to-[#4A3AFF]/40", ChIcon: MessageCircle, time: "12m", msg: "I'd like to book a checkup for next week", status: "Qualified", badgeCls: "bg-[#22C55E]/[0.12] text-[#22C55E]" },
                  { initials: "SM", name: "Sara Mohammed", grad: "from-[#00D4AA]/50 to-[#00A87A]/30", ChIcon: MessageSquare, time: "34m", msg: "What are your teeth whitening prices?", status: "New", badgeCls: "bg-blue-500/[0.12] text-blue-400" },
                  { initials: "AK", name: "Ahmed Khalid", grad: "from-[#F59E0B]/50 to-[#D97706]/30", ChIcon: Phone, time: "1h", msg: "Appointment confirmed for Thursday 2pm", status: "Contacted", badgeCls: "bg-[#7B5CFC]/[0.12] text-[#9B84FF]" },
                  { initials: "FR", name: "Fatima Rahman", grad: "from-[#FF4D6D]/50 to-[#E11D48]/30", ChIcon: MessageCircle, time: "2h", msg: "Can I reschedule my cleaning appointment?", status: "Qualified", badgeCls: "bg-[#22C55E]/[0.12] text-[#22C55E]" },
                ].map((c) => {
                  const ChIcon = c.ChIcon;
                  return (
                    <div key={c.name} onClick={() => navigate({ to: "/engage/leads" })} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.025] cursor-pointer transition-all -mx-1">
                      <div className={`w-[34px] h-[34px] rounded-full bg-gradient-to-br ${c.grad} flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0`}>{c.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-[13px] font-semibold">{c.name}</span>
                          <ChIcon size={12} className="text-[#4A4A6A]" />
                          <span className="text-[#4A4A6A] text-[10px]">·</span>
                          <span className="text-[#4A4A6A] text-[11px]">{c.time}</span>
                        </div>
                        <div className="text-[#8B8FA8] text-[12px] truncate mt-0.5">{c.msg}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className={`h-5 px-2 text-[10px] rounded-full inline-flex items-center font-medium ${c.badgeCls}`}>{c.status}</span>
                        <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-1.5 rounded font-semibold">AI</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Message Volume */}
            <div className="col-span-5 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">Message Volume</h3>
                <span className="text-[#4A4A6A] text-xs">Last 7 Days</span>
              </div>
              <div className="mb-5">
                <div className="text-white font-[700] text-[28px] tracking-[-0.035em] leading-none">3,855</div>
                <div className="text-[#4A4A6A] text-[11px] mt-1">total messages across all channels</div>
              </div>
              <div className="space-y-4">
                {[
                  { Icon: MessageCircle, iconColor: "#22C55E", name: "WhatsApp", count: "2,398", width: "74%", barColor: "#7B5CFC" },
                  { Icon: Phone, iconColor: "#7B5CFC", name: "Voice", count: "847", width: "42%", barColor: "#00D4AA" },
                  { Icon: MessageSquare, iconColor: "#00D4AA", name: "SMS", count: "412", width: "23%", barColor: "#F59E0B" },
                  { Icon: Camera, iconColor: "#F59E0B", name: "Instagram", count: "198", width: "12%", barColor: "#FF4D6D" },
                ].map((r) => {
                  const Icon = r.Icon;
                  return (
                    <div key={r.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2"><Icon size={14} style={{ color: r.iconColor }} className="flex-shrink-0" /><span className="text-[#8B8FA8] text-[13px]">{r.name}</span></div>
                        <span className="text-white text-[13px] font-semibold">{r.count}</span>
                      </div>
                      <div className="bg-[#1C1C34] h-2 rounded-full w-full"><div className="h-full rounded-full transition-all" style={{ width: r.width, background: r.barColor }} /></div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-[#1C1C34] flex items-center justify-between">
                <div className="flex items-center gap-2"><TrendingUp size={14} className="text-[#22C55E]" /><span className="text-[#22C55E] text-xs font-medium">Total up 18% vs last week</span></div>
                <span onClick={() => navigate({ to: "/engage/leads" })} className="text-[#7B5CFC] text-xs cursor-pointer hover:text-[#9B84FF]">View Reports →</span>
              </div>
            </div>
          </div>

          {/* ROW 4 */}
          <div className="grid grid-cols-3 gap-5">
            {/* Performance */}
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="text-white font-semibold text-sm">Performance</h3><span className="text-[#4A4A6A] text-xs">This month</span></div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { i: TrendingUp, c: "#22C55E", l: "Conversion", v: "34%", d: "+12%", dc: "#22C55E" },
                  { i: Clock, c: "#00D4AA", l: "Avg Duration", v: "6m 24s", d: "-5%", dc: "#FF4D6D" },
                  { i: MessageSquare, c: "#7B5CFC", l: "Response Rate", v: "98%", d: "+2%", dc: "#22C55E" },
                  { i: Star, c: "#F59E0B", l: "Satisfaction", v: "4.6/5", d: "+5%", dc: "#22C55E" },
                ].map((m) => {
                  const Icon = m.i;
                  return (
                    <div key={m.l} className="bg-[#06060F] rounded-lg p-3">
                      <Icon size={14} style={{ color: m.c }} />
                      <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-2">{m.l}</div>
                      <div className="text-white text-[20px] font-bold tracking-[-0.03em] leading-none mt-1">{m.v}</div>
                      <span className="inline-block text-[10px] mt-1.5 px-1.5 py-0.5 rounded-full font-medium" style={{ background: m.dc + "1A", color: m.dc }}>{m.d}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Agent Activity (Recent Patients reused as agent activity) */}
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm">AI Agent Activity</h3>
                <button onClick={() => navigate({ to: "/agents" })} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">Manage →</button>
              </div>
              <div className="mt-4">
                {[
                  { name: "Sarah · 28 calls", initials: "SA", grad: "from-[#7B5CFC]/40 to-[#00D4AA]/30", ch: "Voice", time: "Active", status: "Live", sc: "#22C55E" },
                  { name: "Ella · 19 calls", initials: "EL", grad: "from-[#F59E0B]/40 to-[#FF4D6D]/30", ch: "Voice", time: "Active", status: "Live", sc: "#22C55E" },
                  { name: "Maya · 142 msgs", initials: "MA", grad: "from-[#00D4AA]/40 to-[#7B5CFC]/30", ch: "WhatsApp", time: "Idle", status: "Idle", sc: "#F59E0B" },
                  { name: "Kai · 88 msgs", initials: "KA", grad: "from-[#FF4D6D]/40 to-[#7B5CFC]/30", ch: "SMS", time: "Active", status: "Live", sc: "#22C55E" },
                  { name: "Nova · 12 calls", initials: "NO", grad: "from-[#7B5CFC]/40 to-[#F59E0B]/30", ch: "Voice", time: "Idle", status: "Idle", sc: "#F59E0B" },
                ].map((p, idx, arr) => (
                  <div key={p.name} onClick={() => navigate({ to: "/agents" })} className={`flex items-center gap-3 py-2.5 cursor-pointer hover:bg-white/[0.02] rounded-lg px-2 -mx-2 ${idx !== arr.length - 1 ? "border-b border-[#1C1C34]/50" : ""}`}>
                    <div className={`w-[30px] h-[30px] rounded-full bg-gradient-to-br ${p.grad} flex items-center justify-center text-white text-[10px] font-semibold flex-shrink-0`}>{p.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-[13px] font-medium truncate">{p.name}</div>
                      <div className="text-[#4A4A6A] text-[11px]">{p.ch} · {p.time}</div>
                    </div>
                    <span className="h-5 px-2 text-[10px] rounded-full flex-shrink-0 inline-flex items-center font-medium" style={{ background: p.sc + "1A", color: p.sc }}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Timeline */}
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm">Call Timeline</h3>
                <button onClick={() => navigate({ to: "/engage/call-history" })} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">View All Calls →</button>
              </div>
              <div className="mt-4">
                {scheduleCalls.map((r, idx, arr) => (
                  <div key={r.time} onClick={() => setOpenCall(r)} className={`flex items-center gap-3 py-2.5 cursor-pointer hover:bg-white/[0.02] rounded-lg px-2 -mx-2 ${idx !== arr.length - 1 ? "border-b border-[#1C1C34]/50" : ""}`}>
                    <span className="bg-[#0E0E1C] border border-[#1C1C34] rounded px-2 py-1 text-[10px] text-[#8B8FA8] font-mono w-14 text-center flex-shrink-0">{r.time}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-[13px] font-medium truncate">{r.name}</div>
                      <div className="text-[#4A4A6A] text-[11px]">{r.type}</div>
                    </div>
                    <span className="h-5 px-2 text-[10px] rounded-full flex-shrink-0 inline-flex items-center font-medium" style={{ background: r.sc + "1A", color: r.sc }}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 5: AI Recommendations */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Sparkles size={16} className="text-[#7B5CFC]" />
                <h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">AI Recommendations</h3>
                <span className="bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 text-[#9B84FF] text-[10px] px-2.5 py-1 rounded-full font-semibold">3 new insights</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1"><span className="bg-[#7B5CFC] w-5 h-1.5 rounded-full" /><span className="bg-[#1C1C34] w-1.5 h-1.5 rounded-full" /><span className="bg-[#1C1C34] w-1.5 h-1.5 rounded-full" /></div>
                <button className="w-7 h-7 rounded-lg border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/30"><ChevronLeft size={14} /></button>
                <button className="w-7 h-7 rounded-lg border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white hover:border-[#7B5CFC]/30"><ChevronRight size={14} /></button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { score: "91", scoreColor: "#22C55E", icon: TrendingUp, title: "Enable WhatsApp Follow-Up Sequences", desc: "Activate automated 24h post-appointment follow-ups.", impact: "+$12,400 recall revenue" },
                { score: "84", scoreColor: "#F59E0B", icon: MessageCircle, title: "Launch Inactive Patient Recall Campaign", desc: "87 patients haven't visited in 6+ months.", impact: "40–50 bookings" },
                { score: "88", scoreColor: "#7B5CFC", icon: Zap, title: "Activate Voice AI for Inbound Calls", desc: "Connect phone number to capture missed calls.", impact: "+16 bookings/mo" },
              ].map((r) => {
                const Icon = r.icon;
                return (
                  <div key={r.title} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5 hover:border-[#7B5CFC]/20 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-extrabold text-[32px] tracking-[-0.04em] leading-none" style={{ color: r.scoreColor }}>{r.score}</div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: r.scoreColor + "1F" }}>
                        <Icon size={16} style={{ color: r.scoreColor }} />
                      </div>
                    </div>
                    <h4 className="text-white text-[14px] font-semibold leading-snug mb-2">{r.title}</h4>
                    <p className="text-[#4A4A6A] text-[12px] leading-relaxed">{r.desc}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#1C1C34]">
                      <div className="flex items-center gap-2">
                        <span className="text-[#4A4A6A] text-[10px] uppercase tracking-wider">Impact</span>
                        <span className="text-xs font-semibold" style={{ color: r.scoreColor }}>{r.impact}</span>
                      </div>
                      <button className="text-[#7B5CFC] text-[11px] font-medium hover:text-[#9B84FF]">Apply →</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ROW 6 */}
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="text-white font-semibold text-sm">Agent Leaderboard</h3><span className="text-[#4A4A6A] text-[10px]">Ranked by volume</span></div>
              <div className="flex gap-3 mt-3 mb-5">
                {[{ v: "2", l: "Agents" }, { v: "2", l: "Active" }, { v: "0", l: "Calls" }].map((s) => (
                  <div key={s.l} className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-center flex-1"><div className="text-white font-bold text-lg leading-none">{s.v}</div><div className="text-[#4A4A6A] text-[10px] mt-1">{s.l}</div></div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { rank: "1", name: "Sarah", initials: "SA", grad: "from-[#7B5CFC]/50 to-[#00D4AA]/30", ready: "92%" },
                  { rank: "2", name: "Ella", initials: "EL", grad: "from-[#00D4AA]/50 to-[#7B5CFC]/30", ready: "87%" },
                ].map((a) => (
                  <div key={a.rank} className="bg-[#06060F] rounded-xl px-4 py-3 flex items-center gap-3">
                    <div className="text-[#4A4A6A] text-xs font-bold w-4 flex-shrink-0">{a.rank}</div>
                    <div className={`w-[34px] h-[34px] rounded-full bg-gradient-to-br ${a.grad} flex items-center justify-center text-white text-[11px] font-semibold flex-shrink-0`}>{a.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2"><span className="text-white text-sm font-medium">{a.name}</span><span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-1.5 py-0.5 rounded font-semibold">Live</span></div>
                      <div className="h-1 bg-[#1C1C34] rounded-full mt-2"><div className="h-1 bg-[#22C55E] rounded-full" style={{ width: a.ready }} /></div>
                    </div>
                    <div className="text-right flex-shrink-0"><div className="text-white text-base font-bold leading-none">0</div><div className="text-[#4A4A6A] text-[10px] mt-1">calls</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="text-white font-semibold text-sm">Lead Intelligence</h3><span className="text-[#4A4A6A] text-[10px]">AI-qualified hot leads</span></div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[{ v: "0", l: "Avg Score" }, { v: "0", l: "Signals" }, { v: "—", l: "Top Channel" }].map((s) => (
                  <div key={s.l} className="bg-[#06060F] rounded-lg p-3 text-center"><div className="text-white font-bold text-xl">{s.v}</div><div className="text-[#4A4A6A] text-[10px] mt-1">{s.l}</div></div>
                ))}
              </div>
              <div className="mt-5 py-4 text-center">
                <BarChart3 size={32} className="text-[#1C1C34] mx-auto" />
                <div className="text-[#4A4A6A] text-xs mt-2">No qualified leads yet</div>
                <div className="text-[#4A4A6A] text-[11px] mt-1">Leads with 60%+ scores appear here</div>
              </div>
            </div>

            <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
              <div className="flex items-center justify-between"><h3 className="text-white font-semibold text-sm">System Activity</h3><button onClick={() => setDashTab("activity")} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">Full Log →</button></div>
              <div className="grid grid-cols-4 gap-2 mt-4 mb-4">
                {[{ v: "2", l: "EVENTS" }, { v: "2", l: "SUCCESS" }, { v: "0", l: "WARNINGS" }, { v: "0", l: "INFO" }].map((s) => (
                  <div key={s.l} className="bg-[#06060F] rounded-lg px-2 py-2 text-center"><div className="text-white font-bold text-base">{s.v}</div><div className="text-[#4A4A6A] text-[10px] mt-0.5">{s.l}</div></div>
                ))}
              </div>
              <div className="space-y-1">
                {[{ event: "Agent Online", sub: "Sarah · Agent", time: "< 1 min ago" }, { event: "Agent Online", sub: "Ella · Agent", time: "< 1 min ago" }].map((a, idx, arr) => (
                  <div key={idx} className={`flex items-center gap-3 py-2 ${idx !== arr.length - 1 ? "border-b border-[#1C1C34]/40" : ""}`}>
                    <span className="w-1.5 h-1.5 bg-[#22C55E] rounded-full flex-shrink-0" />
                    <div className="flex-1 min-w-0"><div className="text-white text-xs font-medium">{a.event}</div><div className="text-[#4A4A6A] text-[11px]">{a.sub}</div></div>
                    <span className="text-[#4A4A6A] text-[10px] ml-auto">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ROW 7: Campaign Performance */}
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div><h3 className="text-white font-semibold text-[15px] tracking-[-0.02em]">Campaign Performance</h3><p className="text-[#4A4A6A] text-[11px] mt-0.5">Last 30 days · WhatsApp + SMS</p></div>
              <button onClick={() => navigate({ to: "/whatsapp/campaigns" })} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">View All Campaigns →</button>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <div style={{ width: "100%", height: 180 }}>
                  <ResponsiveContainer>
                    <BarChart data={[
                      { name: "Recall May", sent: 450, opened: 306, replied: 89 },
                      { name: "Promo Jun", sent: 280, opened: 168, replied: 42 },
                      { name: "Follow-up", sent: 320, opened: 246, replied: 78 },
                      { name: "Reminder", sent: 180, opened: 144, replied: 61 },
                      { name: "Newsletter", sent: 520, opened: 291, replied: 47 },
                      { name: "No-Show", sent: 95, opened: 82, replied: 71 },
                    ]} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1C1C34" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#4A4A6A", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
                      <Tooltip cursor={{ fill: "rgba(123,92,252,0.05)" }} contentStyle={{ background: "#141428", border: "1px solid #1C1C34", borderRadius: 12, color: "#fff", fontSize: 13, padding: 12 }} />
                      <Bar dataKey="sent" fill="#1C1C34" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="opened" fill="#7B5CFC" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                      <Bar dataKey="replied" fill="#00D4AA" fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-6 justify-center mt-3">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#1C1C34]" /><span className="text-[#8B8FA8] text-xs">Sent</span></div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#7B5CFC]" /><span className="text-[#8B8FA8] text-xs">Opened</span></div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm bg-[#00D4AA]" /><span className="text-[#8B8FA8] text-xs">Replied</span></div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { v: "8", l: "Campaigns", d: "this month", dc: "#4A4A6A", db: "#1C1C34" },
                    { v: "68%", l: "Avg Open Rate", d: "+4% ↑", dc: "#22C55E", db: "#22C55E1A" },
                    { v: "34%", l: "Reply Rate", d: "+2% ↑", dc: "#22C55E", db: "#22C55E1A" },
                    { v: "2,847", l: "Delivered", d: "97.2% delivery", dc: "#9B84FF", db: "#7B5CFC1F" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 text-center">
                      <div className="text-white font-[700] text-[22px] tracking-[-0.03em] leading-none">{s.v}</div>
                      <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1">{s.l}</div>
                      <span className="inline-block text-[10px] mt-2 px-1.5 py-0.5 rounded-full font-medium" style={{ background: s.db, color: s.dc }}>{s.d}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-2">Top Campaign</div>
                  <div className="bg-[#06060F] border border-[#22C55E]/20 rounded-xl p-3">
                    <div className="flex justify-between items-start"><span className="text-white text-xs font-semibold">Recall May Campaign</span><span className="text-[#22C55E] text-xs font-semibold">91% open</span></div>
                    <div className="text-[#4A4A6A] text-[11px] mt-1">450 recipients · 3 days ago</div>
                    <div className="h-1 bg-[#1C1C34] rounded-full mt-2 overflow-hidden"><div className="h-full bg-[#22C55E] rounded-full" style={{ width: "91%" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {dashTab === "channels" && (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {channelsTabData.map((ch) => {
            const Icon = ch.Icon;
            const live = ch.status === "Live";
            return (
              <div key={ch.name} onClick={() => navigate({ to: ch.to })} className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl p-5 cursor-pointer hover:border-[#7C5CFC]/25 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon size={24} style={{ color: ch.color }} />
                    <span className="text-white font-bold text-sm">{ch.name}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${live ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>{ch.status}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {ch.stats.map((s) => (
                    <div key={s.l} className="bg-[#06060F] rounded-lg p-2 text-center">
                      <div className="text-white text-sm font-bold">{s.v}</div>
                      <div className="text-[#4A4A6A] text-[9px] uppercase mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
                <button onClick={(e) => { e.stopPropagation(); navigate({ to: ch.to }); }} className="w-full h-8 mt-3 rounded-lg text-[#7B5CFC] text-xs hover:bg-[#7B5CFC]/[0.08] transition-colors">Open Channel →</button>
              </div>
            );
          })}
        </div>
      )}

      {dashTab === "agents" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {[{ l: "Active Agents", v: "3" }, { l: "Calls Today", v: "59" }, { l: "Avg Response", v: "3.2s" }].map((s) => (
                <div key={s.l} className="bg-[#16161F] border border-[#1E1E2E] rounded-xl px-4 py-2">
                  <div className="text-[#8B8FA8] text-[10px] uppercase">{s.l}</div>
                  <div className="text-white font-bold text-lg">{s.v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate({ to: "/agents", search: { action: "new" } as never })} className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6B4FE0] text-white text-sm font-semibold">+ New Agent</button>
          </div>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#8B8FA8] text-[10px] uppercase tracking-wider border-b border-[#1E1E2E]">
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium w-40">Readiness</th>
                  <th className="text-left px-4 py-3 font-medium">Channels</th>
                  <th className="text-right px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {agentsTabData.map((a) => (
                  <tr key={a.name} className="border-b border-[#1E1E2E]/50 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-[#8B8FA8]">{a.type}</td>
                    <td className="px-4 py-3"><span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${a.status === "Live" ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#F59E0B]/15 text-[#F59E0B]"}`}>{a.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-[#1E1E2E] rounded-full overflow-hidden"><div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${a.readiness}%` }} /></div>
                        <span className="text-[#8B8FA8] text-xs w-9">{a.readiness}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#8B8FA8] text-xs">{a.channels}</td>
                    <td className="px-4 py-3 text-right"><button onClick={() => navigate({ to: "/agents" })} className="text-[#7B5CFC] text-xs hover:text-[#9B84FF]">Configure →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {dashTab === "activity" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <select
              value={actFilter}
              onChange={(e) => setActFilter(e.target.value as typeof actFilter)}
              className="bg-[#16161F] border border-[#1E1E2E] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#7B5CFC]/50"
            >
              <option value="all">All</option>
              <option value="message">Messages</option>
              <option value="call">Calls</option>
              <option value="campaign">Campaigns</option>
              <option value="workflow">Workflows</option>
            </select>
            <span className="text-[#8B8FA8] text-xs">{filteredActivity.length} events</span>
          </div>
          <div className="space-y-2">
            {filteredActivity.map((e, idx) => {
              const cfg = {
                message: { Icon: MessageCircle, color: "#7B5CFC" },
                call: { Icon: Phone, color: "#00D4AA" },
                campaign: { Icon: Megaphone, color: "#F59E0B" },
                workflow: { Icon: GitBranch, color: "#3B82F6" },
              }[e.kind];
              const Icon = cfg.Icon;
              return (
                <div key={idx} className="bg-[#16161F] rounded-xl p-3 flex items-start gap-3 hover:bg-[#1C1C28] transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: cfg.color + "22" }}>
                    <Icon size={14} style={{ color: cfg.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm">{e.text}</div>
                    <div className="text-[#8B8FA8] text-xs mt-0.5">{e.time}</div>
                  </div>
                  {e.channel && (
                    <span className="bg-[#0D0D14] border border-[#1E1E2E] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full font-medium">{e.channel}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showImport && <ImportLeadsModal onClose={() => setShowImport(false)} />}
      {showConfirm && (
        <ConfirmAutopilotModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setAutopilot(true);
            setShowConfirm(false);
            toast.success("Autopilot enabled — AI handling all conversations");
          }}
        />
      )}
      {openCall && (
        <CallDetailModal
          call={openCall}
          onClose={() => setOpenCall(null)}
          onHistory={() => {
            setOpenCall(null);
            navigate({ to: "/engage/call-history" });
          }}
        />
      )}
    </div>
  );
}
