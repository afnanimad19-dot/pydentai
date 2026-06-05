import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, RefreshCw, Phone } from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/setup")({
  component: Setup,
});

const TABS = ["Connected Numbers", "+ Add New Number", "Quick Actions"];

const STEPS = [
  { num: "1", title: "Meta Business Manager", desc: "Sign up and verify your business" },
  { num: "2", title: "WhatsApp Business API", desc: "Apply for cloud API access" },
  { num: "3", title: "Connect & Verify", desc: "Add your number and verify webhook" },
];

function Setup() {
  const [tab, setTab] = useState(0);

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#8B8FA8]/15 flex items-center justify-center">
            <Settings size={22} className="text-[#8B8FA8]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">WhatsApp Business</h1>
            <p className="text-[#4A4A6A] text-sm">Manage connected numbers, AI agents, and messaging settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button className="h-9 px-3 border border-[#1C1C34] hover:bg-[#1C1C34] text-[#8B8FA8] text-sm rounded-lg">Sync from Settings</button>
          <button className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Add Number</button>
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1 w-fit">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                tab === i ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 0 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border-2 border-dashed border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-2xl flex items-center justify-center mb-6">
              <Phone size={36} className="text-[#22C55E]/50" />
            </div>
            <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">No Numbers Connected</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-xs mb-8">
              Connect your first WhatsApp Business number to start receiving messages
            </div>
            <button className="h-11 px-6 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Connect WhatsApp Number</button>

            <div className="flex gap-6 mt-8 pt-8 border-t border-[#1C1C34] justify-center w-full">
              {STEPS.map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-7 h-7 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold flex items-center justify-center">
                    {s.num}
                  </div>
                  <div className="text-white text-xs font-semibold">{s.title}</div>
                  <div className="text-[#4A4A6A] text-[11px] max-w-[120px]">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 1 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
            <div className="text-white font-semibold text-[15px] mb-4">Connect WhatsApp Business Number</div>
            <div className="space-y-4">
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Phone Number</label>
                <div className="flex">
                  <span className="h-10 px-3 bg-[#06060F] border border-[#1C1C34] border-r-0 rounded-l-lg flex items-center text-[#8B8FA8] text-sm">+971</span>
                  <input className="flex-1 h-10 bg-[#06060F] border border-[#1C1C34] rounded-r-lg px-3 text-white text-sm" placeholder="50 123 4567" />
                </div>
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Business Name</label>
                <input className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Webhook URL</label>
                <input
                  className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm"
                  defaultValue="https://pydent.ai/api/webhooks/whatsapp"
                />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Verify Token</label>
                <input className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm" />
              </div>
              <button className="w-full h-11 mt-2 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Connect Number</button>
            </div>
          </div>
        </div>
      )}

      {tab === 2 && (
        <div className="px-6 pb-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-8 text-center text-[#4A4A6A]">
            Quick actions coming soon
          </div>
        </div>
      )}
    </div>
  );
}
