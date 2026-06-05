import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MessageCircle,
  FileText,
  MessageSquare,
  Megaphone,
  Bell,
  Shield,
  Clock,
  Eye,
  X,
  Type,
  Image as ImageIcon,
  Video,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/templates/new")({
  component: NewTemplate,
});

const CATEGORIES = [
  { id: "marketing", icon: Megaphone, color: "text-[#7B5CFC]", name: "MARKETING", desc: "Promotional messages, offers, and product updates", selected: true },
  { id: "utility", icon: Bell, color: "text-[#00D4AA]", name: "UTILITY", desc: "Transactional updates like order confirmations", selected: false },
  { id: "auth", icon: Shield, color: "text-[#3B82F6]", name: "AUTHENTICATION", desc: "OTP codes and verification messages", selected: false },
];

const HEADER_TYPES = [
  { icon: X, label: "None", selected: true },
  { icon: Type, label: "Text", selected: false },
  { icon: ImageIcon, label: "Image", selected: false },
  { icon: Video, label: "Video", selected: false },
  { icon: FileText, label: "Doc", selected: false },
];

const TABS = ["Header", "Body", "Footer", "Buttons"];

function NewTemplate() {
  return (
    <div className="h-[calc(100vh-56px)] flex overflow-hidden font-sans">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/whatsapp/templates" className="text-[#8B8FA8] hover:text-white text-sm">← Templates</Link>
          <MessageCircle size={16} className="text-[#22C55E]" />
          <span className="text-white font-semibold text-[18px]">Template Builder</span>
          <span className="text-[#4A4A6A] text-sm">Create WhatsApp message template</span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-[#8B8FA8] text-xs">33% Ready</span>
            <div className="w-20 h-1.5 bg-[#1C1C34] rounded overflow-hidden">
              <div className="h-full bg-[#F59E0B] rounded" style={{ width: "33%" }} />
            </div>
            <button disabled className="h-9 px-4 bg-[#22C55E] disabled:opacity-50 text-white text-sm font-semibold rounded-lg">Submit for Approval</button>
          </div>
        </div>

        {/* Section 1 */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mb-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full bg-[#3B82F6]/15 flex items-center justify-center">
              <FileText size={18} className="text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-white font-semibold text-[15px]">Template Configuration</div>
              <div className="text-[#4A4A6A] text-xs">Basic settings and categorization</div>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <label className="text-[#8B8FA8] text-xs uppercase">Template Name</label>
            <span className="text-amber-400 text-xs">Required</span>
          </div>
          <input
            placeholder="e.g., order_confirmation_v1"
            className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm placeholder:text-[#4A4A6A]"
          />
          <div className="text-[#4A4A6A] text-[11px] mt-1">Lowercase letters, numbers, and underscores only</div>

          <div className="text-[#8B8FA8] text-xs uppercase mt-5 mb-3">Template Category</div>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <div
                key={c.id}
                className={`relative bg-[#06060F] border rounded-xl p-4 cursor-pointer hover:border-[#3B82F6]/40 ${
                  c.selected ? "border-[#3B82F6] bg-[#3B82F6]/[0.05]" : "border-[#1C1C34]"
                }`}
              >
                {c.selected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#3B82F6] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <c.icon size={18} className={c.color} />
                <div className="text-white text-sm font-semibold mt-2">{c.name}</div>
                <div className="text-[#4A4A6A] text-xs mt-1">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <Clock size={12} className="text-[#4A4A6A]" />
            <span className="text-[#4A4A6A] text-[11px]">Requires Meta approval (24-48h)</span>
          </div>

          <div className="text-[#8B8FA8] text-xs uppercase mt-5 mb-2">Language</div>
          <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm">
            <option>🇺🇸 English</option>
          </select>
        </div>

        {/* Section 2 */}
        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#22C55E]/15 flex items-center justify-center">
              <MessageSquare size={18} className="text-[#22C55E]" />
            </div>
            <div>
              <div className="text-white font-semibold text-[15px]">Message Content</div>
              <div className="text-[#4A4A6A] text-xs">Build your template message</div>
            </div>
          </div>

          <div className="flex gap-1 mt-5 mb-4 bg-[#06060F] border border-[#1C1C34] rounded-lg p-1 w-fit">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
                  i === 0 ? "bg-[#1C1C34] text-white" : "text-[#8B8FA8] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="text-[#8B8FA8] text-xs uppercase mb-3">Header Type</div>
          <div className="grid grid-cols-5 gap-2">
            {HEADER_TYPES.map((h) => (
              <div
                key={h.label}
                className={`bg-[#06060F] border rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer ${
                  h.selected ? "border-[#7B5CFC] bg-[#7B5CFC]/[0.05]" : "border-[#1C1C34] hover:border-[#7B5CFC]/40"
                }`}
              >
                <h.icon size={18} className={h.selected ? "text-[#7B5CFC]" : "text-[#8B8FA8]"} />
                <span className="text-[11px] text-[#4A4A6A]">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right preview */}
      <div className="w-[320px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] flex flex-col">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-[#22C55E]" />
            <span className="text-white font-semibold text-sm">Live Preview</span>
          </div>
          <span className="bg-[#1C1C34] text-[#8B8FA8] text-[10px] px-2 py-0.5 rounded-full">Mobile</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
          <div className="bg-black rounded-[36px] w-[220px] h-[420px] border-4 border-[#1C1C34] overflow-hidden flex flex-col">
            <div className="h-6 bg-black flex items-center justify-center">
              <div className="w-16 h-3 bg-[#0B0B1A] rounded-full" />
            </div>
            <div className="bg-[#075E54] h-12 flex items-center gap-3 px-3">
              <span className="text-white text-xs">←</span>
              <div className="w-8 h-8 rounded-full bg-[#25D366]/30 flex items-center justify-center text-white text-xs">B</div>
              <div>
                <div className="text-white text-sm">Business</div>
                <div className="text-[#22C55E] text-[10px]">online</div>
              </div>
            </div>
            <div className="flex-1 bg-[#ECE5DD] flex items-center justify-center px-4">
              <div className="text-gray-400 text-[10px] text-center">Start building to see preview</div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#1C1C34]">
          <div className="text-[#4A4A6A] text-[10px] uppercase mb-3">Template Summary</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { l: "Category", v: "MARKETING" },
              { l: "Language", v: "English" },
              { l: "Variables", v: "0" },
              { l: "Buttons", v: "0/3" },
            ].map((s) => (
              <div key={s.l} className="bg-[#06060F] rounded-lg p-3">
                <div className="text-[#4A4A6A] text-[10px]">{s.l}</div>
                <div className="text-white text-xs font-semibold mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
