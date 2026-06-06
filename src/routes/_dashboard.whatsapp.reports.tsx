import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BarChart3, RefreshCw, Search } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Tooltip,
} from "recharts";

export const Route = createFileRoute("/_dashboard/whatsapp/reports")({ component: Reports });

const METRICS = [
  { label: "Contacts", value: "0" }, { label: "Total Msgs", value: "0" },
  { label: "Sent", value: "0" }, { label: "Received", value: "0" },
  { label: "Delivered", value: "0", sub: "+0%" }, { label: "Read Rate", value: "0.0%" },
  { label: "Reply Rate", value: "0.0%" }, { label: "Resp Time", value: "0m" },
  { label: "Bounce", value: "0.0%" }, { label: "Campaigns", value: "0" },
];

const TABS = [
  { id: "delivery", label: "Delivery" },
  { id: "engagement", label: "Engagement" },
  { id: "campaigns", label: "Campaigns" },
  { id: "ai", label: "AI Intel" },
  { id: "data", label: "Data Table" },
] as const;

const DELIVERY = [
  { d: "Mon", v: 84 }, { d: "Tue", v: 88 }, { d: "Wed", v: 91 },
  { d: "Thu", v: 94 }, { d: "Fri", v: 96 }, { d: "Sat", v: 92 }, { d: "Sun", v: 89 },
];

const ENGAGEMENT = [
  { d: "W1", open: 38, reply: 12 }, { d: "W2", open: 44, reply: 16 },
  { d: "W3", open: 48, reply: 18 }, { d: "W4", open: 52, reply: 21 },
];

const CAMPAIGNS = [
  { name: "Promo A", sent: 320, opened: 220, replied: 80 },
  { name: "Welcome", sent: 410, opened: 360, replied: 120 },
  { name: "Reminder", sent: 280, opened: 230, replied: 60 },
];

const ROWS = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1, contact: `Contact ${i + 1}`, campaign: ["Promo A", "Welcome", "Reminder"][i % 3],
  status: ["Delivered", "Read", "Replied"][i % 3], time: `${i + 1}m ago`,
}));

function Reports() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("delivery");
  const [q, setQ] = useState("");
  const filtered = ROWS.filter((r) => r.contact.toLowerCase().includes(q.toLowerCase()));

  const exportCsv = () => {
    const csv = "id,contact,campaign,status,time\n" + ROWS.map((r) => `${r.id},${r.contact},${r.campaign},${r.status},${r.time}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "whatsapp-report.csv"; a.click();
    URL.revokeObjectURL(url); toast.success("Exported");
  };

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
            <BarChart3 size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Reports</h1>
            <p className="text-[#4A4A6A] text-sm">Real-time delivery funnel · Engagement analytics · Campaign intelligence · AI insights</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-[#22C55E] text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" /> Live
              </span>
              <span className="text-[#4A4A6A] text-xs">0 msgs</span>
              <span className="text-[#4A4A6A] text-xs">0 contacts</span>
              <span className="text-[#4A4A6A] text-xs">Score: 0</span>
              <span className="text-[#4A4A6A] text-xs">May 3 – Jun 2</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button onClick={exportCsv} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Export</button>
        </div>
      </div>

      <div className="px-6 mb-4 overflow-x-auto">
        <div className="flex gap-3 min-w-max">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 flex-shrink-0 min-w-[110px]">
              <div className="text-[#4A4A6A] text-[10px] uppercase">{m.label}</div>
              <div className="text-white font-bold text-lg mt-1">{m.value}</div>
              {m.sub && <div className="text-[#22C55E] text-[10px]">{m.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 flex gap-1 border-b border-[#1C1C34] mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={tab === t.id
              ? "text-white border-b-2 border-[#22C55E] px-4 py-2.5 text-sm font-medium -mb-px"
              : "text-[#8B8FA8] hover:text-white px-4 py-2.5 text-sm"}
          >{t.label}</button>
        ))}
      </div>

      <div className="px-6 pb-6">
        {tab === "delivery" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Delivery Rate (last 7 days)</div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={DELIVERY}>
                <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                <XAxis dataKey="d" stroke="#4A4A6A" fontSize={11} />
                <YAxis stroke="#4A4A6A" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34", borderRadius: 8 }} />
                <Area dataKey="v" stroke="#22C55E" fill="#22C55E" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === "engagement" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Open Rate & Reply Rate</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={ENGAGEMENT}>
                <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                <XAxis dataKey="d" stroke="#4A4A6A" fontSize={11} />
                <YAxis stroke="#4A4A6A" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34", borderRadius: 8 }} />
                <Line dataKey="open" stroke="#3B82F6" strokeWidth={2} dot={false} />
                <Line dataKey="reply" stroke="#00D4AA" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === "campaigns" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-4">Per-Campaign Comparison</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={CAMPAIGNS}>
                <CartesianGrid stroke="#1C1C34" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#4A4A6A" fontSize={11} />
                <YAxis stroke="#4A4A6A" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B1A", border: "1px solid #1C1C34", borderRadius: 8 }} />
                <Bar dataKey="sent" fill="#7B5CFC" />
                <Bar dataKey="opened" fill="#3B82F6" />
                <Bar dataKey="replied" fill="#00D4AA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {tab === "ai" && (
          <div className="grid grid-cols-4 gap-4">
            {[
              { l: "AI Response Accuracy", v: "94%", c: "text-[#22C55E]" },
              { l: "Avg Confidence", v: "0.87", c: "text-[#3B82F6]" },
              { l: "Auto-Resolution Rate", v: "76%", c: "text-[#00D4AA]" },
              { l: "Escalation Rate", v: "12%", c: "text-[#F59E0B]" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
                <div className={`text-2xl font-bold ${s.c}`}>{s.v}</div>
                <div className="text-[#8B8FA8] text-xs mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "data" && (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="relative w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contacts..." className="w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg pl-8 pr-3 text-white text-xs" />
              </div>
              <button onClick={exportCsv} className="h-9 px-4 rounded-lg bg-[#22C55E] text-white text-xs font-semibold">Export CSV</button>
            </div>
            <table className="w-full text-sm">
              <thead className="text-[#4A4A6A] text-[10px] uppercase">
                <tr><th className="text-left py-2">#</th><th className="text-left">Contact</th><th className="text-left">Campaign</th><th className="text-left">Status</th><th className="text-left">Time</th></tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-[#1C1C34]">
                    <td className="py-2 text-[#8B8FA8]">{r.id}</td>
                    <td className="text-white">{r.contact}</td>
                    <td className="text-[#8B8FA8]">{r.campaign}</td>
                    <td className="text-[#22C55E] text-xs">{r.status}</td>
                    <td className="text-[#4A4A6A]">{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
