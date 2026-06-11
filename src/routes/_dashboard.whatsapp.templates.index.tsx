import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, RefreshCw, Search, Megaphone, Bell, Shield, X, Plus } from "lucide-react";

export const Route = createFileRoute("/_dashboard/whatsapp/templates/")({ component: Templates });

type Template = { id: string; name: string; category: string; languages: string[]; status: "Draft" | "Pending" | "Approved" | "Rejected"; body: string; createdAt: string };


const STATS = [
  { label: "Total", value: "0" }, { label: "Approved", value: "0" },
  { label: "Pending", value: "0" }, { label: "Rejected", value: "0" },
  { label: "Marketing", value: "0" }, { label: "Utility", value: "0" },
  { label: "Auth", value: "0" }, { label: "Languages", value: "0" },
];

const TYPES = [
  { icon: Megaphone, color: "text-[#7B5CFC]", label: "Marketing" },
  { icon: Bell, color: "text-[#00D4AA]", label: "Utility" },
  { icon: Shield, color: "text-[#3B82F6]", label: "Auth" },
];

const LANGS = ["English", "Arabic (العربية)", "Hindi", "Tagalog", "Urdu", "French", "German"];

function Templates() {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [search, setSearch] = useState("");
  const [tName, setTName] = useState("");
  const [category, setCategory] = useState("marketing");
  const [langs, setLangs] = useState<string[]>(["English"]);
  const [headerType, setHeaderType] = useState<"none" | "text" | "image" | "video" | "document">("none");
  const [headerText, setHeaderText] = useState("");
  const [tab, setTab] = useState<"body" | "footer" | "buttons">("body");
  const [body, setBody] = useState("Hi {{name}}, welcome to {{clinic}}! Reply YES to confirm.");
  const [footer, setFooter] = useState("Reply STOP to opt out");
  const [autoOpt, setAutoOpt] = useState(true);
  const [btnType, setBtnType] = useState<"none" | "cta" | "quick">("none");
  const [ctaUrl, setCtaUrl] = useState({ label: "Book Now", url: "https://" });
  const [ctaPhone, setCtaPhone] = useState({ label: "Call Us", phone: "+9715" });
  const [quick, setQuick] = useState<string[]>(["Yes", "No"]);
  const [nameError, setNameError] = useState("");

  // CRITICAL: reset all fields whenever modal opens
  useEffect(() => {
    if (open) {
      setTName(""); setCategory("marketing"); setLangs(["English"]);
      setHeaderType("none"); setHeaderText("");
      setTab("body");
      setBody("Hi {{name}}, welcome to {{clinic}}! Reply YES to confirm.");
      setFooter("Reply STOP to opt out"); setAutoOpt(true);
      setBtnType("none"); setQuick(["Yes", "No"]);
      setNameError("");
    }
  }, [open]);

  const preview = body
    .replace(/{{name}}/g, "Ahmed")
    .replace(/{{clinic}}/g, "Smile Zone Dental")
    .replace(/{{date}}/g, "Thu, Jun 12")
    .replace(/{{time}}/g, "3:00 PM");

  const insertVar = (v: string) => setBody((b) => b + " " + v);

  const persist = (status: Template["status"]) => {
    if (!tName.trim()) { setNameError("Template name is required"); toast.error("Template name is required"); return false; }
    const newTemplate: Template = { id: crypto.randomUUID(), name: tName, category, languages: langs, status, body, createdAt: "just now" };
    setTemplates((prev) => [newTemplate, ...prev]);
    setOpen(false);
    return true;
  };

  const saveDraft = () => { if (persist("Draft")) toast.success("Template saved as draft"); };
  const submit = () => { if (persist("Pending")) toast.success("Submitted for WhatsApp approval — review takes 24-48 hours"); };

  const filtered = templates.filter((t) => !search || t.name.toLowerCase().includes(search.toLowerCase()));


  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center">
            <FileText size={22} className="text-[#3B82F6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-white font-bold text-[22px] tracking-[-0.03em]">Template Manager</h1>
              <span className="bg-[#22C55E]/12 border border-[#22C55E]/20 text-[#22C55E] text-[10px] px-2 py-0.5 rounded-full">Meta Approved</span>
            </div>
            <p className="text-[#4A4A6A] text-sm">Create, approve, and track WhatsApp message templates</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#4A4A6A] text-xs">Approved: 0</span>
          <span className="text-[#4A4A6A] text-xs">Rate: 0%</span>
          <button className="h-9 w-9 rounded-lg border border-[#1C1C34] hover:bg-[#1C1C34] flex items-center justify-center">
            <RefreshCw size={14} className="text-[#8B8FA8]" />
          </button>
          <button onClick={() => setOpen(true)} className="h-9 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ New Template</button>
        </div>
      </div>

      <div className="px-6 mb-5 grid grid-cols-8 gap-3">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
            <div className="text-white font-bold text-lg">{s.value}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-4 flex gap-3 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search templates..." className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-xs pl-8 pr-3 placeholder:text-[#4A4A6A]" />
        </div>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All Categories</option></select>
        <select className="h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-[#8B8FA8] text-xs px-3"><option>All Status</option></select>
        <div className="ml-auto text-[#4A4A6A] text-sm">{filtered.length} results</div>
      </div>

      <div className="px-6 pb-6">
        {filtered.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl py-20 flex flex-col items-center px-6">
            <div className="w-[72px] h-[72px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={36} className="text-[#3B82F6]/50" />
            </div>
            <div className="text-white font-bold text-xl tracking-[-0.02em] mb-2">Create Your First Template</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
              Design Meta-approved message templates with rich headers, buttons, and dynamic variables for automated messaging.
            </div>
            <div className="flex gap-4 justify-center mb-8">
              {TYPES.map((t) => (
                <div key={t.label} className="bg-[#06060F] border border-[#1C1C34] rounded-xl px-4 py-3 flex flex-col items-center gap-2 w-28">
                  <t.icon size={20} className={t.color} />
                  <span className="text-[#8B8FA8] text-xs">{t.label}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(true)} className="h-10 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">+ Create Template</button>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl divide-y divide-[#1C1C34]">
            {filtered.map((t) => (
              <div key={t.id} className="px-5 py-3 flex items-center gap-3">
                <FileText size={14} className="text-[#3B82F6]" />
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-[#4A4A6A] text-xs">{t.category} · {t.languages.join(", ")} · {t.createdAt}</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${t.status === "Approved" ? "bg-[#22C55E]/15 text-[#22C55E]" : t.status === "Pending" ? "bg-[#F59E0B]/15 text-[#F59E0B]" : t.status === "Rejected" ? "bg-[#FF4D6D]/15 text-[#FF4D6D]" : "bg-[#1C1C34] text-[#8B8FA8]"}`}>{t.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>


      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-[#16161F] border border-[#1E1E2E] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E1E2E]">
              <h2 className="text-white font-semibold text-base">Template Builder</h2>
              <button onClick={() => setOpen(false)} className="text-[#8B8FA8] hover:text-white"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-0">
              <div className="px-6 py-5 space-y-4 border-r border-[#1E1E2E]">
                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-1.5 block">Template Name</label>
                  <input value={tName} onChange={(e) => { setTName(e.target.value); if (e.target.value.trim()) setNameError(""); }} className={`w-full h-10 bg-[#0B0B1A] border rounded-lg px-3 text-white text-sm focus:outline-none ${nameError ? "border-[#FF4D6D]" : "border-[#1E1E2E] focus:border-[#22C55E]/40"}`} placeholder="appointment_reminder_v1" />
                  {nameError && <div className="text-[#FF4D6D] text-xs mt-1">{nameError}</div>}
                </div>


                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "marketing", label: "Marketing" },
                      { id: "utility", label: "Utility" },
                      { id: "authentication", label: "Authentication" },
                    ].map((c) => (
                      <button key={c.id} onClick={() => setCategory(c.id)} className={`h-10 rounded-lg border text-sm ${category === c.id ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>{c.label}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {LANGS.map((l) => {
                      const on = langs.includes(l);
                      return (
                        <button key={l} onClick={() => setLangs((s) => on ? s.filter((x) => x !== l) : [...s, l])} className={`text-xs px-3 py-1.5 rounded-full border ${on ? "bg-[#3B82F6]/12 text-[#3B82F6] border-[#3B82F6]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>{l}</button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[#8B8FA8] text-xs uppercase mb-2 block">Header Type</label>
                  <div className="flex flex-wrap gap-2">
                    {(["none", "text", "image", "video", "document"] as const).map((h) => (
                      <button key={h} onClick={() => setHeaderType(h)} className={`text-xs px-3 py-1.5 rounded-full border capitalize ${headerType === h ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30" : "bg-[#0B0B1A] text-[#8B8FA8] border-[#1E1E2E]"}`}>{h}</button>
                    ))}
                  </div>
                  {headerType === "text" && (
                    <input value={headerText} onChange={(e) => setHeaderText(e.target.value.slice(0, 60))} placeholder="Header text (max 60 chars)" className="mt-2 w-full h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                  )}
                  {headerType !== "none" && headerType !== "text" && (
                    <div className="mt-2 border-2 border-dashed border-[#1E1E2E] rounded-lg p-4 text-center text-[#4A4A6A] text-xs">
                      Upload {headerType === "image" ? "header image (JPG/PNG)" : headerType === "video" ? "video (MP4)" : "document (PDF)"}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex gap-1 border-b border-[#1E1E2E] mb-3">
                    {(["body", "footer", "buttons"] as const).map((t) => (
                      <button key={t} onClick={() => setTab(t)} className={`px-3 py-2 text-xs capitalize -mb-px border-b-2 ${tab === t ? "text-white border-[#22C55E]" : "text-[#8B8FA8] border-transparent"}`}>{t}</button>
                    ))}
                  </div>

                  {tab === "body" && (
                    <div className="space-y-2">
                      <textarea value={body} onChange={(e) => setBody(e.target.value.slice(0, 1024))} rows={5} className="w-full bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#22C55E]/40 resize-none" />
                      <div className="flex flex-wrap gap-2">
                        {["{{name}}", "{{clinic}}", "{{date}}", "{{time}}"].map((v) => (
                          <button key={v} onClick={() => insertVar(v)} className="bg-[#7B5CFC]/12 text-[#9B84FF] border border-[#7B5CFC]/20 text-xs px-3 py-1 rounded-full">{v}</button>
                        ))}
                        <button onClick={() => insertVar("{{custom}}")} className="bg-[#1C1C34] text-[#8B8FA8] text-xs px-3 py-1 rounded-full">+ Add Sample Variable</button>
                      </div>
                      <div className="text-[#4A4A6A] text-[11px]">{body.length} / 1024</div>
                    </div>
                  )}

                  {tab === "footer" && (
                    <div className="space-y-3">
                      <input value={footer} onChange={(e) => setFooter(e.target.value.slice(0, 60))} placeholder="Footer text" className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                      <label className="flex items-center gap-2 text-[#8B8FA8] text-xs">
                        <input type="checkbox" checked={autoOpt} onChange={(e) => setAutoOpt(e.target.checked)} /> Auto-append opt-out text
                      </label>
                    </div>
                  )}

                  {tab === "buttons" && (
                    <div className="space-y-3">
                      <select value={btnType} onChange={(e) => setBtnType(e.target.value as any)} className="w-full h-10 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-[#8B8FA8] text-sm">
                        <option value="none">None</option>
                        <option value="cta">Call to Action</option>
                        <option value="quick">Quick Reply</option>
                      </select>
                      {btnType === "cta" && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input value={ctaUrl.label} onChange={(e) => setCtaUrl({ ...ctaUrl, label: e.target.value })} placeholder="Label" className="w-1/3 h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                            <input value={ctaUrl.url} onChange={(e) => setCtaUrl({ ...ctaUrl, url: e.target.value })} placeholder="URL" className="flex-1 h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                          </div>
                          <div className="flex gap-2">
                            <input value={ctaPhone.label} onChange={(e) => setCtaPhone({ ...ctaPhone, label: e.target.value })} placeholder="Label" className="w-1/3 h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                            <input value={ctaPhone.phone} onChange={(e) => setCtaPhone({ ...ctaPhone, phone: e.target.value })} placeholder="Phone" className="flex-1 h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                          </div>
                        </div>
                      )}
                      {btnType === "quick" && (
                        <div className="space-y-2">
                          {quick.map((q, i) => (
                            <input key={i} value={q} onChange={(e) => setQuick((s) => s.map((x, idx) => idx === i ? e.target.value : x))} className="w-full h-9 bg-[#0B0B1A] border border-[#1E1E2E] rounded-lg px-3 text-white text-sm" />
                          ))}
                          {quick.length < 3 && (
                            <button onClick={() => setQuick([...quick, ""])} className="text-[#22C55E] text-xs flex items-center gap-1"><Plus size={12} /> Add Button</button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 bg-[#0B0B1A]">
                <div className="text-[#8B8FA8] text-xs uppercase mb-3">Live Preview</div>
                <div className="bg-[#06060F] border border-[#1E1E2E] rounded-3xl p-3">
                  <div className="bg-[#0E5C36] text-white rounded-t-2xl px-4 py-2 text-sm font-semibold">Your Clinic</div>
                  <div className="bg-[#0c1a14] min-h-[360px] p-3 rounded-b-2xl space-y-2">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%]">
                      {headerType === "text" && headerText && (
                        <div className="font-bold text-sm text-gray-800 mb-1">{headerText}</div>
                      )}
                      {headerType === "image" && (
                        <div className="h-24 bg-gray-300 rounded mb-2" />
                      )}
                      {headerType === "video" && (
                        <div className="h-24 bg-gray-700 rounded mb-2 flex items-center justify-center text-white text-xs">▶ Video</div>
                      )}
                      {headerType === "document" && (
                        <div className="h-12 bg-gray-200 rounded mb-2 flex items-center px-3 text-xs text-gray-700">📄 Document.pdf</div>
                      )}
                      <div className="text-sm text-gray-800 whitespace-pre-wrap">{preview}</div>
                      {footer && (
                        <div className="text-[11px] text-gray-500 mt-2">{footer}{autoOpt ? "" : ""}</div>
                      )}
                    </div>
                    {btnType === "cta" && (
                      <div className="space-y-1">
                        <div className="bg-white rounded-xl px-4 py-2 text-center text-[#0E5C36] text-sm font-medium">{ctaUrl.label}</div>
                        <div className="bg-white rounded-xl px-4 py-2 text-center text-[#0E5C36] text-sm font-medium">{ctaPhone.label}</div>
                      </div>
                    )}
                    {btnType === "quick" && (
                      <div className="space-y-1">
                        {quick.filter(Boolean).map((q, i) => (
                          <div key={i} className="bg-white rounded-xl px-4 py-2 text-center text-[#0E5C36] text-sm font-medium">{q}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#1E1E2E] flex justify-end gap-2">
              <button onClick={saveDraft} className="h-9 px-4 rounded-lg text-[#8B8FA8] hover:text-white text-sm">Save as Draft</button>
              <button onClick={submit} className="h-9 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold">Submit for Approval</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
