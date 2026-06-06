import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Users, FileText, Send, CalendarDays, Check } from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/campaigns/new")({ component: NewEmailCampaign });

const TYPES = [
  { id: "newsletter", name: "Newsletter", desc: "Regular content to subscribers" },
  { id: "promo", name: "Promotional", desc: "Drive sales and conversions" },
  { id: "transactional", name: "Transactional", desc: "Order confirmations, receipts" },
];

function NewEmailCampaign() {
  const [type, setType] = useState("newsletter");
  const [schedule, setSchedule] = useState<"now" | "later">("now");

  return (
    <div className="font-sans px-6 py-5 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/email/campaigns" className="text-[#8B8FA8] hover:text-white text-sm">← Campaigns</Link>
        <Mail size={16} className="text-[#6366F1]" />
        <span className="text-white font-semibold text-[18px]">Create Email Campaign</span>
        <div className="ml-auto flex gap-2">
          <button className="h-9 px-3 border border-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Save Draft</button>
          <button className="h-9 px-4 bg-[#6366F1] text-white text-sm font-semibold rounded-lg">Launch Campaign</button>
        </div>
      </div>

      <Section num="1" icon={FileText} title="Campaign Setup">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Campaign Name" placeholder="e.g., May Newsletter" />
          <Field label="From Name" placeholder="Your brand" />
          <Field label="From Email" placeholder="hello@yourdomain.com" />
          <Field label="Reply-To Email" placeholder="reply@yourdomain.com" />
        </div>
        <div className="text-[#8B8FA8] text-xs uppercase mt-5 mb-3">Campaign Type</div>
        <div className="grid grid-cols-3 gap-3">
          {TYPES.map((t) => {
            const selected = type === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setType(t.id)}
                className={`relative text-left bg-[#06060F] border rounded-xl p-4 ${
                  selected ? "border-[#6366F1] bg-[#6366F1]/[0.05]" : "border-[#1C1C34] hover:border-[#6366F1]/40"
                }`}
              >
                {selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#6366F1] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <div className="text-white text-sm font-semibold">{t.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{t.desc}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section num="2" icon={Mail} title="Content">
        <Field label="Subject Line" placeholder="Your eye-catching subject" />
        <div className="mt-3">
          <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Preheader</label>
          <input className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm" placeholder="Preview text shown after subject" />
        </div>
        <div className="mt-3">
          <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Email Body</label>
          <textarea className="w-full min-h-[180px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 text-white text-sm" placeholder="Write your email..." />
        </div>
      </Section>

      <Section num="3" icon={Users} title="Audience">
        <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm">
          <option>All subscribers</option>
          <option>New leads (last 30 days)</option>
          <option>VIP customers</option>
        </select>
      </Section>

      <Section num="4" icon={CalendarDays} title="Schedule">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setSchedule("now")} className={`text-left border rounded-xl p-4 ${schedule === "now" ? "border-[#6366F1] bg-[#6366F1]/[0.05]" : "border-[#1C1C34]"}`}>
            <Send size={18} className="text-[#6366F1]" />
            <div className="text-white text-sm font-semibold mt-2">Send Immediately</div>
            <div className="text-[#4A4A6A] text-xs mt-1">Launches as soon as you submit</div>
          </button>
          <button onClick={() => setSchedule("later")} className={`text-left border rounded-xl p-4 ${schedule === "later" ? "border-[#6366F1] bg-[#6366F1]/[0.05]" : "border-[#1C1C34]"}`}>
            <CalendarDays size={18} className="text-[#8B8FA8]" />
            <div className="text-white text-sm font-semibold mt-2">Schedule For Later</div>
            {schedule === "later" && <input type="datetime-local" className="mt-2 w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 text-[#8B8FA8] text-xs" />}
          </button>
        </div>
      </Section>
    </div>
  );
}

function Section({ num, icon: Icon, title, children }: { num: string; icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-[22px] h-[22px] rounded-full bg-[#6366F1] text-white text-xs font-bold flex items-center justify-center">{num}</div>
        <Icon size={14} className="text-[#8B8FA8]" />
        <span className="text-white font-semibold text-[15px]">{title}</span>
      </div>
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">{children}</div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">{label}</label>
      <input placeholder={placeholder} className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm placeholder:text-[#4A4A6A]" />
    </div>
  );
}
