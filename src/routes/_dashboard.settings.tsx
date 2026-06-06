import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, User, Bell, Shield, CreditCard, Globe, Palette, Key } from "lucide-react";

export const Route = createFileRoute("/_dashboard/settings")({ component: SettingsPage });

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api", label: "API Keys", icon: Key },
];

function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="font-sans px-6 py-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
          <Settings size={22} className="text-[#7B5CFC]" />
        </div>
        <div>
          <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Settings</h1>
          <p className="text-[#4A4A6A] text-sm">Manage your account and preferences</p>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-[220px] flex-shrink-0 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-2 h-fit">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2.5 px-3 h-9 rounded-lg text-[13px] mb-0.5 ${
                  active ? "bg-[#7B5CFC]/[0.12] text-white" : "text-[#8B8FA8] hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={15} className={active ? "text-[#7B5CFC]" : ""} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6">
          {tab === "profile" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="text-white font-semibold text-lg mb-2">Profile</h2>
              <Field label="Full Name" defaultValue="Ahmad K." />
              <Field label="Email" defaultValue="syedimmad@gmail.com" type="email" />
              <Field label="Role" defaultValue="Owner" />
              <Field label="Phone" defaultValue="+971 50 000 0000" />
              <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">Save changes</button>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-3">
              <h2 className="text-white font-semibold text-lg mb-2">Notifications</h2>
              {["Email alerts", "Push notifications", "SMS alerts", "Weekly digest"].map((n) => (
                <Toggle key={n} label={n} defaultOn={n !== "SMS alerts"} />
              ))}
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="text-white font-semibold text-lg mb-2">Security</h2>
              <Field label="Current password" type="password" />
              <Field label="New password" type="password" />
              <Field label="Confirm new password" type="password" />
              <Toggle label="Two-factor authentication" defaultOn={false} />
              <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">Update password</button>
            </div>
          )}
          {tab === "billing" && (
            <div className="space-y-4">
              <h2 className="text-white font-semibold text-lg mb-2">Billing</h2>
              <div className="bg-[#06060F] border border-[#1C1C34] rounded-xl p-5">
                <div className="text-[#8B8FA8] text-xs uppercase mb-2">Current Plan</div>
                <div className="text-white font-bold text-2xl">Free Trial</div>
                <div className="text-[#4A4A6A] text-sm mt-1">14 days remaining</div>
                <a href="/pricing" className="inline-block mt-4 h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold leading-10">Upgrade Plan</a>
              </div>
            </div>
          )}
          {tab === "language" && (
            <div className="space-y-4 max-w-lg">
              <h2 className="text-white font-semibold text-lg mb-2">Language & Region</h2>
              <Select label="Language" options={["English", "العربية", "Français", "Español"]} />
              <Select label="Time zone" options={["GST (UAE)", "UTC", "EST", "PST"]} />
              <Select label="Date format" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
            </div>
          )}
          {tab === "appearance" && (
            <div className="space-y-4">
              <h2 className="text-white font-semibold text-lg mb-2">Appearance</h2>
              <div className="text-[#8B8FA8] text-sm">Dark theme is currently active. More themes coming soon.</div>
            </div>
          )}
          {tab === "api" && (
            <div className="space-y-4">
              <h2 className="text-white font-semibold text-lg mb-2">API Keys</h2>
              <p className="text-[#8B8FA8] text-sm">Manage API access in the API & Webhooks section.</p>
              <a href="/api" className="inline-block h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold leading-10">Go to API & Webhooks</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div>
      <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/40"
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">{label}</label>
      <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Toggle({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between bg-[#06060F] border border-[#1C1C34] rounded-lg px-4 py-3">
      <span className="text-white text-sm">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#7B5CFC]" : "bg-[#1C1C34]"}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
