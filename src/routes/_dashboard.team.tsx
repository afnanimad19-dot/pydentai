import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Users, UserPlus, Search, Mail, Shield, MoreVertical } from "lucide-react";

export const Route = createFileRoute("/_dashboard/team")({ component: TeamMembers });

const MEMBERS = [
  { name: "Ahmad K.", email: "syedimmad@gmail.com", role: "Owner", status: "Active", initials: "AK", color: "from-[#7B5CFC]/40 to-[#00D4AA]/30" },
];

const ROLES = ["Owner", "Admin", "Manager", "Agent", "Viewer"];

function TeamMembers() {
  const [invite, setInvite] = useState(false);

  return (
    <div className="font-sans px-6 py-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <Users size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Team Members</h1>
            <p className="text-[#4A4A6A] text-sm">Invite and manage your team</p>
          </div>
        </div>
        <button
          onClick={() => setInvite(true)}
          className="h-10 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2"
        >
          <UserPlus size={15} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          ["Total Members", "1"], ["Owners", "1"], ["Admins", "0"], ["Pending Invites", "0"],
        ].map(([l, v]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-5 py-4">
            <div className="text-[#8B8FA8] text-xs">{l}</div>
            <div className="text-white font-bold text-2xl mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            <input
              placeholder="Search members..."
              className="w-full h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs pl-8 pr-3 focus:outline-none focus:border-[#7B5CFC]/40"
            />
          </div>
          <select className="h-9 bg-[#06060F] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3 ml-auto">
            <option>All Roles</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-[1fr_1fr_120px_100px_60px] gap-4 px-5 py-3 text-[10px] uppercase tracking-wider text-[#4A4A6A] border-b border-[#1C1C34]">
          <div>Member</div><div>Email</div><div>Role</div><div>Status</div><div></div>
        </div>
        {MEMBERS.map((m) => (
          <div key={m.email} className="grid grid-cols-[1fr_1fr_120px_100px_60px] gap-4 px-5 py-4 items-center border-b border-[#1C1C34] last:border-b-0">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-semibold`}>{m.initials}</div>
              <span className="text-white text-sm font-medium">{m.name}</span>
            </div>
            <div className="text-[#8B8FA8] text-sm flex items-center gap-2"><Mail size={12} /> {m.email}</div>
            <div><span className="bg-[#F59E0B]/12 text-[#F59E0B] text-xs px-2.5 py-1 rounded-full flex items-center gap-1 w-fit"><Shield size={10} /> {m.role}</span></div>
            <div><span className="bg-[#22C55E]/12 text-[#22C55E] text-xs px-2.5 py-1 rounded-full">{m.status}</span></div>
            <button className="text-[#4A4A6A] hover:text-white"><MoreVertical size={16} /></button>
          </div>
        ))}
      </div>

      {invite && (
        <div onClick={() => setInvite(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl p-6 w-full max-w-md">
            <h2 className="text-white font-semibold text-lg mb-4">Invite a team member</h2>
            <div className="space-y-3">
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Email</label>
                <input type="email" placeholder="name@company.com" className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm" />
              </div>
              <div>
                <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Role</label>
                <select className="w-full h-10 bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 text-white text-sm">
                  {ROLES.filter(r => r !== "Owner").map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5 justify-end">
              <button onClick={() => setInvite(false)} className="h-9 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] text-sm">Cancel</button>
              <button onClick={() => setInvite(false)} className="h-9 px-4 rounded-lg bg-[#7B5CFC] text-white text-sm font-semibold">Send Invite</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
