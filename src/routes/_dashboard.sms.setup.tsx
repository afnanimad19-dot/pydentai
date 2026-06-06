import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Circle, Info, Link2, Settings, Zap } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/sms/setup")({ component: SmsSetup });

const CHECKLIST = ["SMS Provider", "AI Agent", "AI Enabled", "Auto-Respond"];
const BULLETS = [
  "The incoming message triggers your AI agent",
  "Agent uses its knowledge base and persona to craft a response",
  "Response is sent back via SMS automatically",
  "Conversation is tracked and can be viewed in the inbox",
];

function SmsSetup() {
  const navigate = useNavigate();
  const [smsSetupTab, setSmsSetupTab] = useState<"provider" | "ai" | "templates" | "compliance">("provider");
  const [aiEnabled, setAiEnabled] = useState(false);
  const [autoRespond, setAutoRespond] = useState(false);
  const [stopKw, setStopKw] = useState(true);
  const [tcpa, setTcpa] = useState(true);
  return (
    <div className="font-sans pb-6">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#8B8FA8]/15 flex items-center justify-center">
            <Settings size={22} className="text-[#8B8FA8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">SMS Setup</h1>
              <span className="bg-[#F59E0B]/12 border border-[#F59E0B]/20 text-[#F59E0B] text-[10px] px-2.5 py-1 rounded-full">Setup Required</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Configure your SMS provider and AI agent responses</p>
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-2 gap-5">
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3"><Link2 size={14} className="text-[#3B82F6]" /><span className="text-white font-semibold text-sm">Provider Status</span></div>
          <div className="text-[#4A4A6A] text-xs mb-4">Select and configure an SMS provider</div>
          <div className="bg-[#06060F] border border-[#F59E0B]/20 rounded-xl p-4 text-[#4A4A6A] text-sm">Choose a provider from the Provider tab to start sending SMS messages.</div>
        </div>
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-semibold text-sm">Setup Progress</div>
            <div className="text-[#4A4A6A] text-xs">0 of 4</div>
          </div>
          <div className="h-2 bg-[#1C1C34] rounded-full mb-5"><div className="h-full w-0 bg-[#3B82F6] rounded-full" /></div>
          <div className="grid grid-cols-2 gap-3">
            {CHECKLIST.map((c) => (
              <div key={c} className="bg-[#06060F] rounded-lg px-4 py-2.5 flex items-center gap-3">
                <Circle size={16} className="text-[#1C1C34]" />
                <span className="text-[#8B8FA8] text-sm">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mb-5">
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1 w-fit">
          {[["ai", "AI Agent"], ["provider", "Provider"], ["settings", "Settings"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k as typeof tab)} className={`px-4 py-2 rounded-md text-sm font-medium ${tab === k ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"}`}>{l}</button>
          ))}
        </div>
      </div>

      {tab === "ai" && (
        <div className="px-6 space-y-4">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 flex items-center justify-center"><Bot size={18} className="text-[#3B82F6]" /></div>
              <div className="text-white font-semibold text-[15px]">AI Agent Configuration</div>
            </div>
            <div className="text-[#4A4A6A] text-xs">Assign an AI agent to automatically respond to incoming SMS messages</div>

            <div className="flex justify-between items-start py-5 border-b border-[#1C1C34] mt-3">
              <div>
                <div className="text-white text-sm font-medium">Enable AI Responses</div>
                <div className="text-[#4A4A6A] text-xs mt-1 max-w-lg">When enabled, your AI agent will automatically respond to incoming SMS messages</div>
              </div>
              <div className="bg-[#1C1C34] w-10 h-5 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#4A4A6A]" /></div>
            </div>

            <div className="mt-5 mb-4">
              <div className="text-[#8B8FA8] text-xs uppercase mb-2">Select AI Agent</div>
              <select className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-2.5 w-full text-[#4A4A6A] text-sm"><option>No agent assigned</option></select>
              <div className="text-[#4A4A6A] text-[11px] mt-1.5">The selected agent will use its knowledge base to respond to messages</div>
            </div>

            <div className="flex justify-between items-start py-5 border-t border-[#1C1C34]">
              <div>
                <div className="text-white text-sm font-medium">Auto-respond to Incoming Messages</div>
                <div className="text-[#4A4A6A] text-xs mt-1">Automatically send AI responses when new SMS messages are received</div>
              </div>
              <div className="bg-[#1C1C34] w-10 h-5 rounded-full relative"><div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-[#4A4A6A]" /></div>
            </div>

            <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-4 mt-4">
              <div className="flex items-center gap-2 mb-3"><Info size={14} className="text-[#3B82F6]" /><span className="text-white text-sm font-medium">How it works</span></div>
              <div className="text-[#8B8FA8] text-sm mb-2">When someone replies to your SMS campaign or sends a message to your number:</div>
              <div className="space-y-1.5 mt-2">
                {BULLETS.map((b) => (
                  <div key={b} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#3B82F6] mt-2 flex-shrink-0" />
                    <span className="text-[#8B8FA8] text-sm">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-5"><Zap size={14} className="text-[#3B82F6]" /><span className="text-white font-semibold text-sm">Response Settings</span></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[#8B8FA8] text-xs uppercase mb-2">Response Delay (seconds)</div>
                <input defaultValue="2" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <div className="text-[#4A4A6A] text-[11px] mt-1.5">Add a natural delay before sending AI response</div>
              </div>
              <div>
                <div className="text-[#8B8FA8] text-xs uppercase mb-2">Max Response Length (chars)</div>
                <input defaultValue="320" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-xl px-3 text-white text-sm" />
                <div className="text-[#4A4A6A] text-[11px] mt-1.5">Limit response length (160 = 1 SMS segment)</div>
              </div>
            </div>
            <button className="mt-4 h-9 px-4 rounded-lg bg-[#3B82F6] text-white text-sm font-semibold">Save Settings</button>
          </div>
        </div>
      )}

      {tab !== "ai" && (
        <div className="px-6">
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-16 flex flex-col items-center text-center">
            <Settings size={40} className="text-[#1C1C34] mb-3" />
            <div className="text-white text-lg font-semibold mb-1">{tab === "provider" ? "Provider Configuration" : "Settings"}</div>
            <div className="text-[#4A4A6A] text-sm max-w-sm">{tab === "provider" ? "Connect Twilio, Vonage, or another SMS provider to start sending messages." : "Advanced sending limits, opt-out rules, and webhooks."}</div>
          </div>
        </div>
      )}
    </div>
  );
}
