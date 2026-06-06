import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle, BarChart, CalendarDays, CheckCircle, Clock, FileText, Globe,
  Megaphone, MessageSquare, MousePointer, RefreshCw, Reply, Send, Shield,
  Users, UserMinus, UserPlus, XCircle, Zap,
} from "lucide-react";
import {
  CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { BuyCreditsModal, SMSCampaignModal } from "@/components/sms/SmsModals";

export const Route = createFileRoute("/_dashboard/sms/")({ component: SmsDashboard });

const METRICS = [
  { icon: Users, color: "text-[#3B82F6]", value: "0", label: "Contacts", sub: "+0 today" },
  { icon: Send, color: "text-[#00D4AA]", value: "0", label: "Sent", sub: "This month" },
  { icon: CheckCircle, color: "text-[#22C55E]", value: "0%", label: "Delivery", sub: "0 delivered" },
  { icon: Reply, color: "text-[#F59E0B]", value: "0%", label: "Response", sub: "0 replies" },
  { icon: MousePointer, color: "text-[#7B5CFC]", value: "0%", label: "Click Rate", sub: "" },
  { icon: UserMinus, color: "text-[#FF4D6D]", value: "0%", label: "Opt-out", sub: "Healthy" },
];

const CHART = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => ({ d, s: 0, dl: 0, r: 0 }));

const QUICK = [
  { icon: Send, color: "text-[#3B82F6]", label: "New Campaign" },
  { icon: FileText, color: "text-[#00D4AA]", label: "Create Template" },
  { icon: UserPlus, color: "text-[#F59E0B]", label: "Import Contacts" },
  { icon: BarChart, color: "text-[#7B5CFC]", label: "View Analytics" },
  { icon: Users, color: "text-[#22C55E]", label: "Manage Contacts" },
  { icon: CalendarDays, color: "text-[#8B8FA8]", label: "Schedule Message" },
];

function SmsDashboard() {
  const navigate = useNavigate();
  const [campOpen, setCampOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const quickHandlers: Record<string, () => void> = {
    "New Campaign": () => setCampOpen(true),
    "Create Template": () => navigate({ to: "/sms/templates" }),
    "Import Contacts": () => navigate({ to: "/sms/contacts" }),
    "View Analytics": () => navigate({ to: "/sms/reports" }),
    "Manage Contacts": () => navigate({ to: "/sms/contacts" }),
    "Schedule Message": () => setCampOpen(true),
  };
  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center">
            <MessageSquare size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Marketing</h1>
              <span className="bg-[#F59E0B]/12 border border-[#F59E0B]/20 text-[#F59E0B] text-[10px] px-2.5 py-1 rounded-full">Setup Required</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Send targeted campaigns and manage your SMS marketing</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8] hover:text-white"><RefreshCw size={14} /></button>
          <button className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Export</button>
          <button onClick={() => navigate({ to: "/sms/setup" })} className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Setup</button>
          <button onClick={() => setCampOpen(true)} className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ New Campaign</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-6 gap-3">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
            <m.icon size={16} className={m.color} />
            <div className="text-white font-bold text-xl mt-1">{m.value}</div>
            <div className="text-[#8B8FA8] text-xs">{m.label}</div>
            {m.sub && <div className="text-[#4A4A6A] text-[10px]">{m.sub}</div>}
          </div>
        ))}
      </div>

      <div className="px-6 grid grid-cols-12 gap-5 pb-6">
        <div className="col-span-8 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="text-white font-semibold text-sm">Message Activity</div>
              <div className="ml-auto flex gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"/>Sent</span>
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#22C55E]"/>Delivered</span>
                <span className="flex items-center gap-1.5 text-[#8B8FA8]"><span className="w-2 h-2 rounded-full bg-[#00D4AA]"/>Replied</span>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={CHART}>
                  <CartesianGrid stroke="#1C1C34" />
                  <XAxis dataKey="d" stroke="#4A4A6A" fontSize={11} />
                  <YAxis stroke="#4A4A6A" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34" }} />
                  <Line type="monotone" dataKey="s" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="dl" stroke="#22C55E" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="r" stroke="#00D4AA" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[#4A4A6A] text-xs text-center mt-2">Connect SMS provider to start tracking message activity</div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-3">
              <Megaphone size={14} className="text-[#F59E0B]" />
              <span className="text-white font-semibold text-sm ml-2">Campaign Performance</span>
              <button className="ml-auto text-[#3B82F6] text-xs">View All →</button>
            </div>
            <div className="py-12 text-center">
              <Megaphone size={40} className="text-[#1C1C34] mx-auto mb-3" />
              <div className="text-[#4A4A6A] text-sm">No campaigns yet</div>
              <div className="text-[#4A4A6A] text-xs">Create your first campaign to see performance</div>
              <button onClick={() => setCampOpen(true)} className="h-8 px-3 rounded-lg bg-[#3B82F6] text-white text-xs font-semibold mt-4">+ Create Campaign</button>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center mb-3">
              <span className="text-white font-semibold text-sm">Recent Campaigns</span>
              <button onClick={() => setCampOpen(true)} className="ml-auto text-[#8B8FA8] text-xs hover:text-white">+ New</button>
            </div>
            <div className="py-10 text-center">
              <Megaphone size={32} className="text-[#1C1C34] mx-auto mb-3" />
              <div className="text-[#4A4A6A] text-sm">No campaigns yet</div>
              <div className="text-[#4A4A6A] text-xs">Create your first SMS campaign</div>
              <button onClick={() => setCampOpen(true)} className="h-8 px-3 rounded-lg bg-[#3B82F6] text-white text-xs font-semibold mt-4">+ Create Campaign</button>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm">Delivery Status</div>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: CheckCircle, color: "text-[#22C55E]", v: "0", l: "Delivered" },
                { icon: Clock, color: "text-[#F59E0B]", v: "0", l: "Pending" },
                { icon: XCircle, color: "text-[#FF4D6D]", v: "0", l: "Failed" },
              ].map((d) => (
                <div key={d.l} className="bg-[#06060F] rounded-xl p-4 text-center">
                  <d.icon size={20} className={`${d.color} mx-auto mb-2`} />
                  <div className="text-white font-bold text-xl">{d.v}</div>
                  <div className="text-[#4A4A6A] text-[10px] uppercase mt-1">{d.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#7B5CFC]" />
              <span className="text-white font-semibold text-sm">Credits & Usage</span>
            </div>
            <div className="text-[#3B82F6] font-extrabold text-[36px] tracking-[-0.04em] text-center mt-3">50,000</div>
            <div className="text-[#4A4A6A] text-xs text-center mb-4">Credits Remaining</div>
            <div className="flex justify-between">
              <span className="text-[#8B8FA8] text-xs">Used this month</span>
              <span className="text-white text-xs font-semibold">0</span>
            </div>
            <div className="h-1.5 bg-[#1C1C34] rounded-full mt-2"><div className="h-full w-0 bg-[#3B82F6] rounded-full" /></div>
            <div className="text-[#4A4A6A] text-[10px] mt-1 mb-4">0.0% of 50,000 monthly limit</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#06060F] rounded-lg p-3 text-center">
                <div className="text-[#22C55E] font-bold text-lg">0</div>
                <div className="text-[#4A4A6A] text-[10px]">Active</div>
              </div>
              <div className="bg-[#06060F] rounded-lg p-3 text-center">
                <div className="text-[#F59E0B] font-bold text-lg">0</div>
                <div className="text-[#4A4A6A] text-[10px]">Scheduled</div>
              </div>
            </div>
            <button onClick={() => setCreditsOpen(true)} className="w-full mt-3 h-9 border border-[#3B82F6]/30 text-[#3B82F6] text-sm rounded-xl hover:bg-[#3B82F6]/[0.06]">Buy More Credits</button>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Quick Actions</div>
            <div className="grid grid-cols-3 gap-2">
              {QUICK.map((q) => (
                <button key={q.label} className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-3 flex flex-col items-center gap-1.5 hover:border-[#3B82F6]/30 transition-all">
                  <q.icon size={18} className={q.color} />
                  <span className="text-[10px] text-[#8B8FA8] text-center">{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Provider Status</div>
            <div className="bg-[#06060F] border border-[#F59E0B]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
                  <MessageSquare size={18} className="text-[#3B82F6]" />
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">SMS Provider</div>
                  <div className="text-[#4A4A6A] text-xs">Not configured</div>
                </div>
                <span className="bg-[#F59E0B]/12 text-[#F59E0B] text-[10px] px-2 py-0.5 rounded-full">Setup Required</span>
              </div>
              <button className="w-full h-9 mt-3 border border-[#1C1C34] text-[#8B8FA8] rounded-xl text-sm hover:text-white">Configure Provider</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-[#06060F] rounded-lg p-3">
                <Shield size={14} className="text-[#22C55E]" />
                <div className="text-[#8B8FA8] text-xs mt-1">Compliance</div>
                <div className="text-[#22C55E] text-xs font-medium">TCPA Ready</div>
              </div>
              <div className="bg-[#06060F] rounded-lg p-3">
                <Globe size={14} className="text-[#3B82F6]" />
                <div className="text-[#8B8FA8] text-xs mt-1">Coverage</div>
                <div className="text-white text-xs font-medium">200+ Countries</div>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <AlertTriangle size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
              <span className="text-[#F59E0B] text-xs">Setup Required — Connect an SMS provider to start sending campaigns.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
