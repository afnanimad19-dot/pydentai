import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle, BookOpen, Building, CheckCircle, Eye, FileText, FlaskConical,
  Lightbulb, Mail, MousePointer, PlusCircle, Send, Server, Sparkles,
  TrendingUp, Type, User, Users, Zap,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/email/test")({ component: EmailTest });

const STATS = [
  { icon: PlusCircle, c: "text-[#3B82F6]", v: "24", l: "Tests Today", sub: "+5" },
  { icon: CheckCircle, c: "text-[#22C55E]", v: "23", l: "Delivered", sub: "96%" },
  { icon: Zap, c: "text-[#F59E0B]", v: "142ms", l: "Avg Latency", sub: "-12ms" },
  { icon: Eye, c: "text-[#3B82F6]", v: "68%", l: "Open Rate", sub: "+1%" },
  { icon: MousePointer, c: "text-[#7B5CFC]", v: "24%", l: "Click Rate", sub: "+3%" },
  { icon: AlertTriangle, c: "text-[#FF4D6D]", v: "1", l: "Bounced", sub: "4%" },
  { icon: FileText, c: "text-[#8B8FA8]", v: "12", l: "Templates" },
  { icon: Server, c: "text-[#00D4AA]", v: "3", l: "Providers", sub: "Active" },
];

const VARS = [
  { icon: User, l: "{{first_name}}" }, { icon: User, l: "{{last_name}}" },
  { icon: Mail, l: "{{email}}" }, { icon: Building, l: "{{company}}" },
  { icon: Building, l: "{{address}}" }, { icon: User, l: "{{current_date}}" },
];

const HTML = `<div style="padding:32px;background:#f5f5f7;">
  <div style="background:white;padding:24px;border-radius:8px;">
    <h1 style="color:#6366F1;">Welcome, {{first_name}}!</h1>
    <p style="color:#666;line-height:1.6;">
      This is a test email from your email marketing platform...
    </p>
  </div>
</div>`;

const TIPS = [
  "Test with multiple email providers (Gmail, Outlook, Yahoo)",
  "Check both desktop and mobile rendering",
  "Verify all links and CTAs work correctly",
  "Test personalization with real variable values",
];

function EmailTest() {
  return (
    <div className="font-sans h-[calc(100vh-56px)] overflow-y-auto">
      <div className="h-12 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0">
        <FlaskConical size={16} className="text-[#6366F1]" />
        <span className="text-white font-semibold text-sm">Email Testing Lab</span>
        <span className="text-[#4A4A6A] text-xs">Test, preview, and validate your email campaigns before sending</span>
        <div className="ml-auto flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="text-[#22C55E] text-xs">Provider: Operational</span>
          <span className="text-[#4A4A6A] text-xs">Latency: 142ms</span>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-[#1C1C34] grid grid-cols-8 gap-3">
        {STATS.map((s) => (
          <div key={s.l} className="bg-[#06060F] rounded-lg p-3">
            <s.icon size={14} className={s.c} />
            <div className="text-white font-bold text-lg mt-1">{s.v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{s.l}</div>
            {s.sub && <div className="text-[#8B8FA8] text-[10px]">{s.sub}</div>}
          </div>
        ))}
      </div>

      <div className="flex flex-1">
        <div className="flex-1 px-6 py-5">
          <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1 mb-5 w-fit">
            {["Compose Test", "Test History", "Quick Templates", "Test Settings"].map((t, i) => (
              <button key={t} className={`px-4 py-2 rounded-md text-sm font-medium ${i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"}`}>{t}</button>
            ))}
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#6366F1]/15 flex items-center justify-center"><Mail size={18} className="text-[#6366F1]" /></div>
              <div>
                <div className="text-white font-semibold text-[15px]">Compose Test Email</div>
                <div className="text-[#4A4A6A] text-xs">Create and send a test email to verify your configuration</div>
              </div>
              <select className="ml-auto h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-[#8B8FA8] text-sm"><option>Default provider</option></select>
            </div>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3"><Users size={14} className="text-[#3B82F6]" /><span className="text-white text-sm font-semibold">Recipient Details</span></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Recipient Email *</label>
                  <input placeholder="test@example.com" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                </div>
                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Recipient Name</label>
                  <input placeholder="John Doe" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                </div>
              </div>
            </div>

            <div className="mb-5 pt-4 border-t border-[#1C1C34]">
              <div className="flex items-center gap-2 mb-3"><Mail size={14} className="text-[#22C55E]" /><span className="text-white text-sm font-semibold">Sender Details</span></div>
              <div className="grid grid-cols-3 gap-4">
                <input defaultValue="noreply@yourdomain.com" className="h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <input defaultValue="pydent.ai" className="h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <input placeholder="support@yourdomain.com" className="h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
              </div>
            </div>

            <div className="mb-5 pt-4 border-t border-[#1C1C34]">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2"><Type size={14} className="text-[#F59E0B]" /><span className="text-white text-sm font-semibold">Subject Line</span></div>
                <span className="text-[#4A4A6A] text-xs">21/60 chars</span>
              </div>
              <div className="flex gap-2">
                <input defaultValue="Test Email from pydent.ai" className="flex-1 h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <button className="h-10 px-3 rounded-xl border border-[#1C1C34] text-[#8B8FA8] text-xs flex items-center gap-1.5"><Sparkles size={12} /> AI Suggest</button>
              </div>
            </div>

            <div className="mb-5 pt-4 border-t border-[#1C1C34]">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2"><FileText size={14} className="text-[#7B5CFC]" /><span className="text-white text-sm font-semibold">Email Content (HTML)</span></div>
                <span className="text-[#4A4A6A] text-xs">108 words</span>
              </div>
              <div className="flex gap-2 mb-3">
                <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs flex items-center gap-1.5"><Sparkles size={12} /> AI Compose</button>
                <button className="h-8 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-xs">AI Improve</button>
                <select className="h-8 bg-[#06060F] border border-[#1C1C34] rounded-lg px-2 text-[#8B8FA8] text-xs"><option>Professional</option></select>
              </div>
              <div className="flex items-center gap-1 mb-2 p-2 bg-[#06060F] border border-[#1C1C34] rounded-lg">
                <button className="w-7 h-7 rounded text-[#8B8FA8] hover:text-white font-bold text-xs">B</button>
                <button className="w-7 h-7 rounded text-[#8B8FA8] italic hover:text-white text-xs">I</button>
                <button className="w-7 h-7 rounded text-[#8B8FA8] text-xs">🔗</button>
                <button className="w-7 h-7 rounded text-[#8B8FA8] text-xs">🖼</button>
                <button className="ml-auto h-7 px-3 text-[#8B8FA8] text-xs">HTML</button>
              </div>
              <pre className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 font-mono text-xs text-[#8B8FA8] min-h-[180px] overflow-y-auto leading-relaxed whitespace-pre-wrap">{HTML}</pre>
            </div>

            <div className="pt-4 border-t border-[#1C1C34]">
              <div className="flex items-center gap-2"><Users size={14} className="text-[#00D4AA]" /><span className="text-white text-sm font-semibold">Personalization Variables</span></div>
              <p className="text-[#4A4A6A] text-[11px] mt-1 mb-3">Click to insert merge tags. {"{{first_name}}"} and {"{{last_name}}"} use Recipient Name.</p>
              <div className="grid grid-cols-3 gap-2">
                {VARS.map((v) => (
                  <button key={v.l} className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 hover:border-[#6366F1]/40 flex items-center gap-2 text-left">
                    <v.icon size={12} className="text-[#4A4A6A]" />
                    <span className="text-[#8B8FA8] text-xs">{v.l}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C34] flex items-center justify-between mt-5">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-[#8B8FA8] text-sm"><input type="checkbox" defaultChecked /> Track Opens</label>
                <label className="flex items-center gap-2 text-[#8B8FA8] text-sm"><input type="checkbox" defaultChecked /> Track Clicks</label>
              </div>
              <button className="h-10 px-5 rounded-lg bg-[#6366F1] text-white text-sm font-semibold flex items-center gap-2"><Send size={14} /> Send Test Email</button>
            </div>
          </div>
        </div>

        <div className="w-[360px] flex-shrink-0 border-l border-[#1C1C34] flex flex-col overflow-y-auto">
          <div className="px-5 py-5 border-b border-[#1C1C34]">
            <div className="flex items-center gap-2 mb-4"><TrendingUp size={14} className="text-[#6366F1]" /><span className="text-white font-semibold text-sm">Test Results</span></div>
            <div className="text-center py-6">
              <FileText size={36} className="text-[#1C1C34] mx-auto mb-2" />
              <div className="text-[#4A4A6A] text-sm">No test has been run yet</div>
              <div className="text-[#4A4A6A] text-xs">Send a test email to see results here</div>
            </div>
          </div>

          <div className="px-5 py-5 border-b border-[#1C1C34]">
            <div className="flex items-center gap-2 mb-4">
              <Eye size={14} className="text-[#22C55E]" />
              <span className="text-white font-semibold text-sm">Live Preview</span>
              <div className="ml-auto flex gap-1">
                <button className="px-2 py-0.5 rounded text-xs bg-[#1C1C34] text-white">Desktop</button>
                <button className="px-2 py-0.5 rounded text-xs text-[#8B8FA8]">Mobile</button>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-[#1C1C34]">
              <div className="h-10 bg-gray-50 flex items-center px-4 gap-2 border-b border-gray-100">
                <Mail size={14} className="text-[#6366F1]" />
                <span className="text-gray-800 text-xs font-semibold">pydent.ai</span>
                <span className="text-gray-400 text-[10px]">to: recipient@email.com</span>
              </div>
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="text-gray-800 text-sm font-medium">Test Email from pydent.ai</div>
              </div>
              <div className="px-4 py-4">
                <h1 className="text-[#6366F1] text-center mb-4 font-semibold">Welcome, 👋</h1>
                <div className="bg-gray-50 rounded p-4 text-gray-600 text-xs leading-relaxed">This is a test email from your email marketing platform...</div>
                <div className="text-center mt-4"><button className="bg-[#6366F1] text-white px-4 py-2 rounded text-xs">View Dashboard</button></div>
                <div className="text-gray-400 text-[10px] text-center mt-4">Sent from pydent.ai •</div>
              </div>
            </div>
          </div>

          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-3"><Lightbulb size={14} className="text-[#F59E0B]" /><span className="text-white font-semibold text-sm">Testing Best Practices</span></div>
            <div className="space-y-2">
              {TIPS.map((t) => (
                <div key={t} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
                  <span className="text-[#8B8FA8] text-xs">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 py-4 bg-[#06060F] border-t border-[#1C1C34]">
            <div className="flex items-center gap-2 mb-2"><BookOpen size={14} className="text-[#3B82F6]" /><span className="text-white text-sm font-medium">Email Infrastructure Guide</span></div>
            <p className="text-[#4A4A6A] text-xs leading-relaxed">Configure SPF, DKIM, and DMARC records for your domain. Add SMTP providers like SendGrid, Mailgun, or Amazon SES to start sending campaigns with high deliverability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
