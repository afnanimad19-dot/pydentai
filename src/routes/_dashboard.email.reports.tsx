import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Mail, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/reports")({ component: EmailReports });

const STEPS = [
  ["1", "Configure Provider", "Connect SendGrid, Mailgun, or SES"],
  ["2", "Create Campaign", "Pick a list and design your email"],
  ["3", "See Reports", "Track opens, clicks & deliverability"],
] as const;

function EmailReports() {
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#6366F1]/15 flex items-center justify-center">
            <BarChart3 size={22} className="text-[#6366F1]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Email Reports</h1>
            <p className="text-[#4A4A6A] text-sm">Delivery metrics, engagement rates & campaign performance</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <span className="bg-[#22C55E]/12 text-[#22C55E] text-[10px] px-2.5 py-1 rounded-full">Live</span>
          <span className="h-9 px-3 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs flex items-center">May 7–Jun 6</span>
          <button className="h-9 w-9 rounded-lg bg-[#0B0B1A] border border-[#1C1C34] flex items-center justify-center text-[#8B8FA8]"><RefreshCw size={14} /></button>
          <button className="h-9 px-4 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">Export</button>
        </div>
      </div>

      <div className="px-6">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-24 flex flex-col items-center">
          <Mail size={56} className="text-[#1C1C34] mb-5" />
          <div className="text-white font-bold text-xl mb-2">No Email Reports Yet</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-md mb-8">Send your first email campaign to see analytics here.</p>

          <div className="flex gap-6 justify-center flex-wrap">
            {STEPS.map(([n, t, d]) => (
              <div key={n} className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-5 py-4 text-center w-[200px]">
                <div className="w-7 h-7 rounded-full bg-[#6366F1]/15 text-[#6366F1] font-bold text-sm mx-auto mb-2 flex items-center justify-center">{n}</div>
                <div className="text-white text-sm font-semibold">{t}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{d}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-center mt-6">
            <button className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold">Configure Provider</button>
            <button className="h-10 px-5 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm hover:text-white">Create Campaign</button>
          </div>
        </div>
      </div>
    </div>
  );
}
