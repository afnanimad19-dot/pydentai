import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Webhook, Key, Copy, Plus, Zap, Link as LinkIcon, Check, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_dashboard/api")({ component: ApiWebhooks });

const TABS = [
  { id: "keys", label: "API Keys" },
  { id: "webhooks", label: "Webhooks" },
  { id: "integrations", label: "Integrations" },
];

const INTEGRATIONS = [
  { name: "WhatsApp Business", desc: "Meta Cloud API integration", color: "#22C55E", connected: false, category: "Messaging" },
  { name: "Twilio", desc: "SMS and voice messaging", color: "#FF4D6D", connected: false, category: "Messaging" },
  { name: "SendGrid", desc: "Transactional & marketing email", color: "#3B82F6", connected: false, category: "Email" },
  { name: "Mailgun", desc: "Email API and SMTP", color: "#F59E0B", connected: false, category: "Email" },
  { name: "Stripe", desc: "Payments & subscriptions", color: "#7B5CFC", connected: false, category: "Payments" },
  { name: "HubSpot", desc: "CRM & contact sync", color: "#F97316", connected: false, category: "CRM" },
  { name: "Salesforce", desc: "Enterprise CRM", color: "#00D4AA", connected: false, category: "CRM" },
  { name: "Zapier", desc: "5,000+ app automations", color: "#FF4D00", connected: false, category: "Automation" },
  { name: "Make (Integromat)", desc: "Visual workflow builder", color: "#7B5CFC", connected: false, category: "Automation" },
  { name: "Slack", desc: "Team notifications", color: "#4A154B", connected: false, category: "Notifications" },
  { name: "Google Calendar", desc: "Appointment scheduling", color: "#4285F4", connected: false, category: "Calendar" },
  { name: "Calendly", desc: "Online booking", color: "#006BFF", connected: false, category: "Calendar" },
];

const WEBHOOKS = [
  { event: "message.received", url: "https://your-app.com/webhooks/wa", active: true },
];

function ApiWebhooks() {
  const [tab, setTab] = useState("keys");
  const [copied, setCopied] = useState(false);
  const apiKey = "pyd_live_sk_••••••••••••••••••••••••••••3a4b";

  return (
    <div className="font-sans px-6 py-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
          <Webhook size={22} className="text-[#7B5CFC]" />
        </div>
        <div>
          <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">API & Webhooks</h1>
          <p className="text-[#4A4A6A] text-sm">Programmatic access and integrations</p>
        </div>
      </div>

      <div className="flex gap-1 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? "bg-[#7B5CFC]/12 text-[#7B5CFC] border border-[#7B5CFC]/20 px-4 py-2 text-sm rounded-lg font-medium"
                : "bg-[#0B0B1A] border border-[#1C1C34] text-[#8B8FA8] hover:text-white px-4 py-2 text-sm rounded-lg"
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "keys" && (
        <div className="space-y-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Key size={16} className="text-[#7B5CFC]" />
                <span className="text-white font-semibold text-sm">Live API Key</span>
              </div>
              <button className="h-8 px-3 rounded-lg bg-[#7B5CFC] text-white text-xs font-semibold flex items-center gap-1.5">
                <Plus size={12} /> Generate New Key
              </button>
            </div>
            <div className="flex items-center gap-2 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2.5">
              <code className="text-[#8B8FA8] text-xs font-mono flex-1">{apiKey}</code>
              <button
                onClick={() => { navigator.clipboard.writeText(apiKey); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
                className="text-[#8B8FA8] hover:text-white flex items-center gap-1 text-xs"
              >
                {copied ? <><Check size={12} className="text-[#22C55E]" /> Copied</> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <p className="text-[#4A4A6A] text-xs mt-3">Keep this key secret. Do not commit it to version control. Use it as a Bearer token in the Authorization header.</p>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="text-white font-semibold text-sm mb-3">Quick Start</div>
            <pre className="bg-[#06060F] border border-[#1C1C34] rounded-lg p-4 text-[#8B8FA8] text-xs font-mono overflow-x-auto">
{`curl https://api.pydent.ai/v1/messages \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"to": "+971500000000", "text": "Hello"}'`}
            </pre>
          </div>
        </div>
      )}

      {tab === "webhooks" && (
        <div className="space-y-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <LinkIcon size={16} className="text-[#7B5CFC]" />
                <span className="text-white font-semibold text-sm">Webhook Endpoints</span>
              </div>
              <button className="h-8 px-3 rounded-lg bg-[#7B5CFC] text-white text-xs font-semibold flex items-center gap-1.5">
                <Plus size={12} /> Add Endpoint
              </button>
            </div>
            {WEBHOOKS.map((w) => (
              <div key={w.event} className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-medium">{w.event}</div>
                  <div className="text-[#8B8FA8] text-xs font-mono mt-0.5">{w.url}</div>
                </div>
                <span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2.5 py-1 rounded-full">{w.active ? "Active" : "Paused"}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "integrations" && (
        <div className="grid grid-cols-3 gap-4">
          {INTEGRATIONS.map((i) => (
            <div key={i.name} className="bg-[#0B0B1A] border border-[#1C1C34] hover:border-[#7B5CFC]/40 rounded-xl p-5 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${i.color}20`, borderColor: `${i.color}40`, borderWidth: 1 }}>
                  <Zap size={18} style={{ color: i.color }} />
                </div>
                <span className="text-[10px] text-[#4A4A6A] uppercase tracking-wider">{i.category}</span>
              </div>
              <div className="text-white font-semibold text-sm">{i.name}</div>
              <div className="text-[#8B8FA8] text-xs mt-1 mb-4">{i.desc}</div>
              <button className="w-full h-8 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] hover:text-white text-xs flex items-center justify-center gap-1.5">
                Connect <ExternalLink size={11} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
