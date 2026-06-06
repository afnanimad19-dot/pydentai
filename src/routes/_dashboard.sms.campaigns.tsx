import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageSquare, RefreshCw, Search, Send } from "lucide-react";
import { SMSCampaignModal } from "@/components/sms/SmsModals";

export const Route = createFileRoute("/_dashboard/sms/campaigns")({ component: SmsCampaigns });

const METRICS = [
  { l: "Total", v: "0", sub: "0 drafts" },
  { l: "Active", v: "0", sub: "Sending now" },
  { l: "Scheduled", v: "0", sub: "Queued" },
  { l: "Sent", v: "0", sub: "0 delivered" },
  { l: "Delivery", v: "0%", sub: "Low", subColor: "text-[#FF4D6D]" },
  { l: "Click Rate", v: "0%", sub: "0 clicks" },
  { l: "Reply Rate", v: "0%", sub: "0 replies" },
  { l: "Failed", v: "0", sub: "Healthy", subColor: "text-[#22C55E]" },
];

const TABS = ["All", "Draft", "Scheduled", "Sending", "Completed", "Paused", "Failed"];

type Campaign = { id: string; name: string; status: string };

function SmsCampaigns() {
  const [open, setOpen] = useState(false);
  const [smsStatus, setSmsStatus] = useState("All");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const filtered = useMemo(
    () => (smsStatus === "All" ? campaigns : campaigns.filter((c) => c.status === smsStatus)),
    [campaigns, smsStatus],
  );

  const addCampaign = (c: { name: string; status: string }) =>
    setCampaigns((prev) => [{ id: crypto.randomUUID(), ...c }, ...prev]);

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#F59E0B]/15 flex items-center justify-center">
            <Send size={22} className="text-[#F59E0B]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Campaigns</h1>
            <p className="text-[#4A4A6A] text-sm">Create, manage & track campaigns · {campaigns.length} total</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ New Campaign</button>
        </div>
      </div>

      <div className="px-6 mb-5 overflow-x-auto flex gap-3">
        {METRICS.map((m) => (
          <div key={m.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 text-center min-w-[120px]">
            <div className="text-white font-bold text-xl">{m.v}</div>
            <div className="text-[#8B8FA8] text-xs">{m.l}</div>
            <div className={`text-[10px] ${m.subColor ?? "text-[#4A4A6A]"}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-3 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input placeholder="Search campaigns..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#3B82F6]/40" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All Status</option></select>
        <div className="ml-auto text-[#4A4A6A] text-xs">{filtered.length} results</div>
      </div>

      <div className="px-6 mb-4 flex gap-1">
        {TABS.map((label) => {
          const count = label === "All" ? campaigns.length : campaigns.filter((c) => c.status === label).length;
          const active = smsStatus === label;
          return (
            <button key={label} onClick={() => setSmsStatus(label)} className={active
              ? "bg-[#3B82F6]/12 text-[#3B82F6] border border-[#3B82F6]/20 px-3 py-1 text-xs rounded-full"
              : "border border-[#1C1C34] text-[#4A4A6A] hover:text-white px-3 py-1 text-xs rounded-full"}>{label} {count}</button>
          );
        })}
      </div>

      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
            <MessageSquare size={48} className="text-[#1C1C34] mb-4" />
            <div className="text-white text-lg font-semibold mb-2">No campaigns yet</div>
            <div className="text-[#4A4A6A] text-sm text-center mb-8">Get started by creating your first SMS campaign</div>
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold">+ Create Campaign</button>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
            {filtered.map((c) => (
              <div key={c.id} className="flex items-center justify-between px-5 py-3">
                <div className="text-white text-sm font-medium">{c.name}</div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C1C34] text-[#8B8FA8]">{c.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <SMSCampaignModal open={open} onClose={() => setOpen(false)} onCreate={addCampaign} />
    </div>
  );
}
