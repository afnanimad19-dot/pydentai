import { createFileRoute } from "@tanstack/react-router";
import { Users2, LayoutGrid, Users, Shield, Settings, Bot, Activity, Search, Filter, BarChart2, CheckCircle, Star, UserPlus, Phone, TrendingUp, MessageSquare, Crown, Eye } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/_dashboard/engage/team")({ component: Team });

const M: any[] = [
  [LayoutGrid, "#7B5CFC", "0", "Total Teams"], [Users, "#3B82F6", "0", "Members"],
  [Shield, "#8B8FA8", "0", "Admins"], [Settings, "#F59E0B", "0", "Managers"],
  [Bot, "#00D4AA", "0", "Agents"], [Activity, "#22C55E", "0%", "Active"],
];

const GAUGES: any[] = [[87, "#7B5CFC", "Efficiency"], [92, "#22C55E", "Response"], [78, "#3B82F6", "Conversion"]];

function Team() {
  return (
    <div className="font-sans flex overflow-hidden h-[calc(100vh-56px)]">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="flex justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 flex items-center justify-center"><Users2 size={22} className="text-[#7B5CFC]" /></div>
            <div><h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Team Management</h1><p className="text-[#4A4A6A] text-sm">Orchestrate your team's performance and collaboration</p></div>
          </div>
          <div className="flex gap-2 items-center"><span className="bg-[#F59E0B]/12 text-[#F59E0B] text-xs px-2.5 py-1 rounded-full">Owner</span><button className="h-9 px-4 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">Create Team</button></div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-5">
          {M.map(([Icon, c, v, l]: any) => (
            <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-4 text-center">
              <Icon size={16} style={{ color: c }} className="mx-auto" />
              <div className="text-[#22C55E] text-[10px] mt-1">↗ 0</div>
              <div className="text-white font-bold text-xl mt-1">{v}</div>
              <div className="text-[#4A4A6A] text-[10px]">{l}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-5">
          <div className="relative flex-1"><Search size={14} className="absolute left-3 top-2.5 text-[#4A4A6A]" /><input placeholder="Search teams..." className="w-full bg-[#0B0B1A] border border-[#1C1C34] rounded-lg pl-9 pr-3 py-2 text-sm text-[#8B8FA8]" /></div>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] text-[#8B8FA8] flex items-center justify-center"><Filter size={14} /></button>
        </div>

        <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#7B5CFC]/10 border border-[#7B5CFC]/20 rounded-2xl flex items-center justify-center mb-5"><Users2 size={32} className="text-[#7B5CFC]/50" /></div>
          <div className="text-white text-lg font-semibold mb-2">No teams yet</div>
          <p className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">Create your first team to start organizing your workforce and collaborating effectively</p>
          <button className="h-10 px-5 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">Create Your First Team ✨</button>
        </div>
      </div>

      <div className="w-[300px] flex-shrink-0 border-l border-[#1C1C34] bg-[#0B0B1A] overflow-y-auto px-5 py-5">
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-4"><BarChart2 size={14} className="text-[#7B5CFC]" /><span className="text-white font-semibold text-sm">Team Performance</span></div>
          <div className="flex justify-between">
            {GAUGES.map(([v, c, l]: any) => (
              <div key={l} className="flex flex-col items-center">
                <ResponsiveContainer width={70} height={70}>
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v }]} startAngle={90} endAngle={90 - (v * 3.6)}>
                    <RadialBar dataKey="v" fill={c} cornerRadius={4} background={{ fill: "#1C1C34" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="text-white font-bold text-xs -mt-10">{v}%</div>
                <div className="text-[#4A4A6A] text-[11px] mt-7">{l}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-[#06060F] rounded-xl p-3 flex items-center gap-2"><CheckCircle size={14} className="text-[#22C55E]" /><div><div className="text-white text-sm font-bold">156</div><div className="text-[#4A4A6A] text-[10px]">Calls Completed</div></div></div>
            <div className="bg-[#06060F] rounded-xl p-3 flex items-center gap-2"><Star size={14} className="text-[#F59E0B]" /><div><div className="text-white text-sm font-bold">42</div><div className="text-[#4A4A6A] text-[10px]">Leads Converted</div></div></div>
          </div>
        </div>

        <div className="mb-5 pt-4 border-t border-[#1C1C34]">
          <div className="flex items-center"><Activity size={14} className="text-[#00D4AA]" /><span className="text-white font-semibold text-sm ml-2">Recent Activity</span><button className="ml-auto text-[#7B5CFC] text-xs">View All →</button></div>
          <div className="space-y-3 mt-3">
            {[[UserPlus, "#00D4AA", "New member joined the team", "2 hours ago"], [Phone, "#22C55E", "Call completed by Agent", "3 hours ago"], [TrendingUp, "#7B5CFC", "Lead converted successfully", "5 hours ago"], [MessageSquare, "#3B82F6", "New message received", "1 day ago"]].map(([Icon, c, e, t]: any, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${c}25` }}><Icon size={14} style={{ color: c }} /></div>
                <div><div className="text-white text-xs font-medium">{e}</div><div className="text-[#4A4A6A] text-[10px] mt-0.5">{t}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1C1C34]">
          <div className="flex items-center gap-2 mb-4"><Shield size={14} className="text-[#3B82F6]" /><span className="text-white font-semibold text-sm">Role Distribution</span></div>
          {[[Crown, "#F59E0B", "Owner"], [Shield, "#3B82F6", "Admin"], [Settings, "#22C55E", "Manager"], [Bot, "#7B5CFC", "Agent"], [Eye, "#8B8FA8", "Viewer"]].map(([Icon, c, r]: any) => (
            <div key={r} className="flex justify-between items-center py-2 border-b border-[#1C1C34]/50 last:border-0">
              <div className="flex items-center gap-2"><Icon size={14} style={{ color: c }} /><span className="text-[#8B8FA8] text-sm">{r}</span></div>
              <span className="text-white text-sm font-semibold">0</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
