import { Bell, Phone, RefreshCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function TopBar() {
  const { user } = useAuth();
  const now = new Date();
  const greeting = getGreeting(now.getHours());
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const firstName =
    (user?.user_metadata?.first_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "there";
  const lastName = (user?.user_metadata?.last_name as string | undefined) ?? "";
  const initials = (
    (firstName?.[0] ?? "") + (lastName?.[0] ?? "")
  ).toUpperCase() || (user?.email?.[0]?.toUpperCase() ?? "U");

  return (
    <header className="h-14 bg-[#0B0B1A] border-b border-[#1C1C34] flex items-center px-6 gap-4 flex-shrink-0 font-sans">
      <div className="flex items-baseline gap-2">
        <span className="text-white text-[15px] font-semibold tracking-[-0.02em]">
          {greeting}, {firstName} 👋
        </span>
        <span className="text-[#4A4A6A] text-xs">{dateStr}</span>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="bg-[#06060F] border border-[#1C1C34] rounded-lg px-4 h-8 flex items-center gap-4 max-w-md">
          <Phone size={14} className="text-[#8B8FA8]" />
          <span className="text-[#8B8FA8] text-xs font-medium">
            Command Center
          </span>
          <div className="w-px h-3 bg-[#1C1C34]" />
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-xs text-[#22C55E]">0 Live</span>
          </div>
          <div className="w-px h-3 bg-[#1C1C34]" />
          <span className="text-xs text-[#4A4A6A]">0 Queued</span>
          <div className="w-px h-3 bg-[#1C1C34]" />
          <span className="text-xs text-[#8B8FA8]">2 Agents</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[11px] px-3 py-1 rounded-full font-medium">
          System Healthy
        </span>
        <RefreshCw
          size={15}
          className="text-[#4A4A6A] hover:text-white cursor-pointer"
        />
        <div className="relative">
          <Bell
            size={15}
            className="text-[#4A4A6A] hover:text-white cursor-pointer"
          />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#FF4D6D]" />
        </div>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7B5CFC]/40 to-[#00D4AA]/30 flex items-center justify-center text-white text-xs font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
