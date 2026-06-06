import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BarChart, Clock, FileText, Mail, RefreshCw, Search, Send, Shield,
  TrendingUp, Users, Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/campaigns")({ component: EmailCampaigns });

const METRICS = [
  ["Total", "0"], ["Sent", "0"], ["Drafts", "0"], ["Scheduled", "0"],
  ["Open Rate", "0.0%", "+2.3%", "text-[#22C55E]"],
  ["Click Rate", "0.0%"], ["Bounce", "0.8%"], ["Delivered", "99.2%"],
] as const;

const TABS = ["All 0", "Active", "Drafts 0", "Sent", "Scheduled"];

const ACTIONS = [
  { icon: Send, c: "text-[#7B5CFC]", l: "Create Campaign", d: "Start a new email campaign" },
  { icon: FileText, c: "text-[#3B82F6]", l: "Manage Templates", d: "Edit or create templates" },
  { icon: Users, c: "text-[#00D4AA]", l: "Import Contacts", d: "Add new subscribers" },
  { icon: BarChart, c: "text-[#F59E0B]", l: "View Analytics", d: "Detailed performance reports" },
  { icon: Zap, c: "text-[#22C55E]", l: "A/B Testing", d: "Optimize with split tests" },
  { icon: RefreshCw, c: "text-[#F97316]", l: "Automation", d: "Set up drip campaigns" },
];

const TIMES = [
  ["Tuesday", "10:00 AM", "28.4%"],
  ["Thursday", "2:00 PM", "25.1%"],
  ["Wednesday", "11:00 AM", "23.7%"],
  ["Monday", "9:00 AM", "22.3%"],
] as const;

function EmailCampaigns() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="font-sans flex overflow-hidden h-[calc(100vh-56px)]">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
              <Mail size={22} className="text-[#6366F1]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Campaigns</h1>
              <p className="text-[#4A4A6A] text-sm">Manage, track & optimize your campaigns</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/email/templates" className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center">Templates</Link>
            <Link to="/email/contacts" className="h-9 px-3 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white flex items-center">Contacts</Link>
            <Link to="/email/campaigns/new" className="h-9 px-4 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold flex items-center">+ New Campaign</Link>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-3 mb-5">
          {METRICS.map(([l, v, sub, color]) => (
            <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
              <div className="text-white font-bold text-lg">{v}</div>
              <div className="text-[#8B8FA8] text-xs">{l}</div>
              {sub && <div className={`text-[10px] ${color}`}>{sub}</div>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-1">
            {TABS.map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)} className={i === activeTab
                ? "bg-[#6366F1]/12 text-[#6366F1] border border-[#6366F1]/20 px-3 py-1 text-xs rounded-full"
                : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{t}</button>
            ))}
          </div>
          <div className="relative ml-4 flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            <input placeholder="Search campaigns..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#6366F1]/40" />
          </div>
          <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3 ml-auto"><option>Newest</option></select>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <Mail size={48} className="text-[#1C1C34] mb-4" />
          <div className="text-white text-lg font-semibold mb-2">No Campaigns Found</div>
          <div className="text-[#4A4A6A] text-sm text-center mb-8">Create your first campaign to start engaging your audience with targeted emails.</div>
          <Link to="/email/campaigns/new" className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold flex items-center">+ Create Campaign</Link>
        </div>
      </div>

      <div className="w-[280px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] overflow-y-auto p-5">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3"><TrendingUp size={14} className="text-[#6366F1]" /><span className="text-white text-sm font-semibold">Performance Overview</span></div>
          <div className="space-y-3">
            {[
              ["Avg Open Rate", "0.0%", "Industry: 21.3%"],
              ["Avg Click Rate", "0.0%", "Industry: 2.6%"],
              ["List Growth", "—", "Total subscribers"],
            ].map(([l, v, sub]) => (
              <div key={l}>
                <div className="flex justify-between"><span className="text-[#8B8FA8] text-xs">{l}</span><span className="text-white text-xs font-semibold">{v}</span></div>
                <div className="text-[#4A4A6A] text-[10px]">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 pt-4 border-t border-[#1C1C34]">
          <div className="flex items-center gap-2 mb-3"><Zap size={14} className="text-[#6366F1]" /><span className="text-white text-sm font-semibold">Quick Actions</span></div>
          <div className="space-y-2">
            {ACTIONS.map((a) => (
              <button key={a.l} className="w-full flex items-center gap-3 py-2.5 px-3 bg-[#06060F] rounded-lg hover:bg-[#1C1C34] text-left">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center"><a.icon size={14} className={a.c} /></div>
                <div>
                  <div className="text-white text-xs font-medium">{a.l}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{a.d}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5 pt-4 border-t border-[#1C1C34]">
          <div className="flex items-center gap-2 mb-3"><Clock size={14} className="text-[#6366F1]" /><span className="text-white text-sm font-semibold">Best Sending Times</span></div>
          <div className="space-y-2">
            {TIMES.map(([d, t, r]) => (
              <div key={d} className="flex justify-between items-center bg-[#06060F] rounded-lg px-3 py-2">
                <div>
                  <div className="text-white text-xs font-medium">{d}</div>
                  <div className="text-[#4A4A6A] text-[10px]">{t}</div>
                </div>
                <div className="text-[#22C55E] text-xs font-semibold">{r}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1C1C34]">
          <div className="flex items-center gap-2 mb-3"><Shield size={14} className="text-[#22C55E]" /><span className="text-white text-sm font-semibold">Domain Health</span></div>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-[#8B8FA8] text-xs">Verified Domains</span><span className="text-white text-xs font-semibold">0</span></div>
            <div className="flex justify-between"><span className="text-[#8B8FA8] text-xs">Contact Lists</span><span className="text-white text-xs font-semibold">1</span></div>
            <div className="flex justify-between"><span className="text-[#8B8FA8] text-xs">Deliverability Score</span><span className="text-[#22C55E] text-xs font-semibold">99.2%</span></div>
          </div>
          <button className="w-full mt-3 h-8 border border-[#1C1C34] text-[#8B8FA8] text-xs rounded-lg hover:text-white">Manage Domains</button>
        </div>
      </div>
    </div>
  );
}
