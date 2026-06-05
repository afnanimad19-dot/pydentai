import { Lock } from "lucide-react";

export function PremiumBanner() {
  return (
    <div className="bg-[#F59E0B]/[0.06] border border-[#F59E0B]/20 rounded-xl px-5 py-3 mb-6 flex items-center gap-3">
      <Lock size={14} className="text-[#F59E0B]" />
      <span className="text-[#F59E0B] text-sm">
        This is a Pro feature. Upgrade your plan to unlock full access.
      </span>
      <button className="ml-auto h-8 px-3 rounded-lg bg-[#F59E0B] hover:bg-[#D88A09] text-white text-xs font-semibold">
        Upgrade to Pro
      </button>
    </div>
  );
}
