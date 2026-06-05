import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  FileText,
  Megaphone,
  Bell,
  Send,
  Check,
  Users,
  User,
  CalendarDays,
  LayoutTemplate,
  Circle,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/campaigns/new")({
  component: NewCampaign,
});

const TYPES = [
  { id: "marketing", icon: Megaphone, color: "text-[#7B5CFC]", name: "Marketing", desc: "Promotional campaigns & offers", rate: "Avg. 45% open rate", selected: false },
  { id: "utility", icon: Bell, color: "text-[#00D4AA]", name: "Utility", desc: "Transactional updates", rate: "Avg. 72% open rate", selected: false },
  { id: "broadcast", icon: Send, color: "text-[#F59E0B]", name: "Broadcast", desc: "General announcements", rate: "Avg. 38% open rate", selected: true },
];

const AUDIENCE = [
  { icon: User, color: "text-[#7B5CFC]", name: "Individual", desc: "Select specific contacts", selected: true },
  { icon: Users, color: "text-[#00D4AA]", name: "Lead Group", desc: "All members of a group", selected: false },
  { icon: Megaphone, color: "text-[#F59E0B]", name: "All Leads", desc: "Broadcast to everyone", selected: false },
];

const CHECKLIST = ["Campaign Name", "Send From", "Message Content", "Recipients"];

const TIMES = [
  { time: "Tue–Thu 10:00–12:00", rate: "+72%" },
  { time: "Mon–Wed 14:00–16:00", rate: "+65%" },
  { time: "Fri 09:00–11:00", rate: "+58%" },
];

function NewCampaign() {
  return (
    <div className="h-[calc(100vh-56px)] flex overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/whatsapp/campaigns" className="text-[#8B8FA8] hover:text-white text-sm">← Campaigns</Link>
          <MessageCircle size={16} className="text-[#22C55E]" />
          <span className="text-white font-semibold text-[18px]">Create Campaign</span>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#4A4A6A] text-xs">
              <Users size={12} /> 0
            </div>
            <div className="flex items-center gap-1 text-[#4A4A6A] text-xs">
              <LayoutTemplate size={12} /> 0
            </div>
            <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Save Draft</button>
            <button disabled className="h-9 px-4 bg-[#22C55E] disabled:opacity-50 text-white text-sm font-semibold rounded-lg">Launch Campaign</button>
          </div>
        </div>

        {/* Section 1 */}
        <SectionHeader num="1" icon={FileText} title="Campaign Setup" />
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mt-3 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[#8B8FA8] text-xs uppercase">Campaign Name</label>
                <span className="text-[#4A4A6A] text-xs">0/80</span>
              </div>
              <input
                placeholder="e.g., Spring Sale 2026"
                className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm placeholder:text-[#4A4A6A]"
              />
            </div>
            <div>
              <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Business Account</label>
              <select className="w-full h-10 bg-[#06060F] border border-[#FF4D6D]/40 rounded-lg px-3 text-[#FF4D6D] text-sm">
                <option>No numbers connected</option>
              </select>
            </div>
          </div>

          <div className="text-[#8B8FA8] text-xs uppercase tracking-wider mt-5 mb-3">Campaign Type</div>
          <div className="grid grid-cols-3 gap-3">
            {TYPES.map((t) => (
              <div
                key={t.id}
                className={`relative bg-[#06060F] border rounded-xl p-4 cursor-pointer hover:border-[#22C55E]/40 ${
                  t.selected ? "border-[#22C55E] bg-[#22C55E]/[0.05]" : "border-[#1C1C34]"
                }`}
              >
                {t.selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <t.icon size={20} className={t.color} />
                <div className="text-white text-sm font-semibold mt-2">{t.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{t.desc}</div>
                <div className="text-[#22C55E] text-[11px] mt-2">{t.rate}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <SectionHeader num="2" icon={MessageCircle} title="Message Content" />
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mt-3 mb-6">
          <div className="text-[#8B8FA8] text-xs uppercase mb-2">Approved Template</div>
          <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm">
            <option>Select a template...</option>
          </select>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1C1C34]" />
            <span className="text-[#4A4A6A] text-xs">OR WRITE CUSTOM</span>
            <div className="flex-1 h-px bg-[#1C1C34]" />
          </div>

          <div className="text-[#8B8FA8] text-xs uppercase mb-2">Custom Message</div>
          <textarea
            placeholder="Type your message here..."
            className="w-full min-h-[120px] bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 text-white text-sm placeholder:text-[#4A4A6A]"
          />
        </div>

        {/* Section 3 */}
        <SectionHeader num="3" icon={Users} title="Audience" />
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mt-3 mb-6">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {AUDIENCE.map((a) => (
              <div
                key={a.name}
                className={`relative bg-[#06060F] border rounded-xl p-4 cursor-pointer hover:border-[#22C55E]/40 ${
                  a.selected ? "border-[#22C55E] bg-[#22C55E]/[0.05]" : "border-[#1C1C34]"
                }`}
              >
                {a.selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <a.icon size={18} className={a.color} />
                <div className="text-white text-sm font-semibold mt-2">{a.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{a.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-3">
            <input
              placeholder="Search contacts..."
              className="flex-1 h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-xs"
            />
            <button className="text-[#22C55E] text-xs">Select All</button>
            <button className="text-[#4A4A6A] text-xs">Clear</button>
          </div>
          <div className="bg-[#06060F] border border-[#1C1C34]/50 rounded-xl p-8 text-center text-[#4A4A6A] text-sm">No contacts found</div>
        </div>

        {/* Section 4 */}
        <SectionHeader num="4" icon={CalendarDays} title="Schedule" />
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mt-3 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[#22C55E] bg-[#22C55E]/[0.05] rounded-xl p-4 cursor-pointer">
              <Send size={18} className="text-[#22C55E]" />
              <div className="text-white text-sm font-semibold mt-2">Send Immediately</div>
              <div className="text-[#4A4A6A] text-xs mt-1">Campaign starts as soon as you launch</div>
            </div>
            <div className="border border-[#1C1C34] rounded-xl p-4 cursor-pointer hover:border-[#22C55E]/40">
              <CalendarDays size={18} className="text-[#8B8FA8]" />
              <div className="text-white text-sm font-semibold mt-2">Schedule For Later</div>
              <input
                type="datetime-local"
                className="mt-2 w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 text-[#8B8FA8] text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right preview */}
      <div className="w-[320px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] flex flex-col">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center gap-3">
          <MessageCircle size={16} className="text-[#22C55E]" />
          <div>
            <div className="text-white font-semibold text-sm">Campaign Preview</div>
            <div className="text-[#4A4A6A] text-xs">WhatsApp Business</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col items-center px-5 py-6">
          <div className="bg-[#06060F] border-2 border-[#1C1C34] rounded-[32px] w-[200px] h-[360px] overflow-hidden flex flex-col">
            <div className="bg-[#075E54] h-12 flex items-center px-3 gap-2">
              <span className="text-white text-xs">←</span>
              <div className="w-7 h-7 rounded-full bg-[#25D366]/30" />
              <span className="text-white text-xs font-medium">Business</span>
            </div>
            <div className="flex-1 bg-[#ECE5DD] flex items-center justify-center px-4">
              <div className="text-gray-400 text-[10px] text-center">Select a template or write a message</div>
            </div>
          </div>

          <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 mt-4 w-full">
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-wider mb-3">Delivery Forecast</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-white font-bold text-xl">0</div>
                <div className="text-[#4A4A6A] text-[10px]">Recipients</div>
              </div>
              <div>
                <div className="text-white font-bold text-xl">~1 min</div>
                <div className="text-[#4A4A6A] text-[10px]">Est. Duration</div>
              </div>
            </div>
            <div className="bg-[#22C55E]/10 text-[#22C55E] text-xs text-center py-2 rounded-lg mt-2">Est. cost: ~$0.00 USD</div>
          </div>

          <div className="mt-4 w-full">
            <div className="flex justify-between mb-2">
              <span className="text-[#4A4A6A] text-[10px] uppercase">Readiness</span>
              <span className="text-white text-xs">0%</span>
            </div>
            <div className="space-y-1.5">
              {CHECKLIST.map((c) => (
                <div key={c} className="flex items-center gap-2">
                  <Circle size={12} className="text-[#1C1C34]" />
                  <span className="text-[#4A4A6A] text-xs">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="text-[#4A4A6A] text-[10px] uppercase mb-2">Best Sending Times</div>
            <div className="space-y-1.5">
              {TIMES.map((t) => (
                <div key={t.time} className="flex justify-between">
                  <span className="text-[#8B8FA8] text-xs">{t.time}</span>
                  <span className="text-[#22C55E] text-xs font-semibold">{t.rate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ num, icon: Icon, title }: { num: string; icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[22px] h-[22px] rounded-full bg-[#22C55E] text-white text-xs font-bold flex items-center justify-center">{num}</div>
      <Icon size={14} className="text-[#8B8FA8]" />
      <span className="text-white font-semibold text-[15px]">{title}</span>
    </div>
  );
}
