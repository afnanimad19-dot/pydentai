import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle,
  FileText,
  FolderPlus,
  Globe,
  Inbox,
  LayoutGrid,
  List,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";

export const Route = createFileRoute("/_dashboard/agents/documents")({
  component: DocumentsPage,
});

type Doc = { id: string; name: string; size: string; project: string; status: "Ready" | "Processing" };
type Project = { id: string; name: string };

function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function DocumentsPage() {
  const [view, setView] = useState<"projects" | "list" | "grid">("projects");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [docs, setDocs] = useState<Doc[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showScrape, setShowScrape] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = docs.filter(
    (d) =>
      (status === "All" || d.status === status) &&
      d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Doc[] = Array.from(files).map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      size: fmtSize(f.size),
      project: projects[0]?.name ?? "Default",
      status: "Processing",
    }));
    setDocs((d) => [...next, ...d]);
    setShowUpload(false);
    // simulate processing
    setTimeout(() => {
      setDocs((all) =>
        all.map((d) => (next.find((n) => n.id === d.id) ? { ...d, status: "Ready" } : d)),
      );
    }, 1200);
  };

  const totalMB = docs.length ? (docs.length * 0.5).toFixed(1) : "0.0";
  const ready = docs.filter((d) => d.status === "Ready").length;
  const processing = docs.filter((d) => d.status === "Processing").length;

  const STATS: [string, string][] = [
    [String(docs.length), "Total Docs"],
    [String(projects.length), "Projects"],
    ["0", "FAQs"],
    [String(ready), "Ready"],
    [String(processing), "Processing"],
    [String(docs.length - ready - processing), "Pending"],
    [String(docs.length), "Assigned"],
    [`${totalMB} MB`, "Storage"],
  ];

  return (
    <div className="font-sans">
      <div className="px-6 pt-6 pb-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#7B5CFC]/15 border border-[#7B5CFC]/20 flex items-center justify-center">
            <BookOpen size={22} className="text-[#7B5CFC]" />
          </div>
          <div>
            <div className="text-white font-bold text-[22px] tracking-[-0.03em]">Document Library</div>
            <div className="text-[#4A4A6A] text-sm mt-0.5">
              Centralized knowledge hub · AI-powered document management & delivery
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm">Sync</button>
          <button className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm">Export CSV</button>
          <button
            onClick={() => setShowScrape(true)}
            className="h-9 px-3 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm"
          >
            Scrape URL
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2"
          >
            <Upload size={14} />
            Upload
          </button>
        </div>
      </div>

      <div className="px-6 mb-2 grid grid-cols-8 gap-3">
        {STATS.map(([v, l]) => (
          <div key={l} className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl px-4 py-3 text-center">
            <div className="text-white font-bold text-lg leading-none">{v}</div>
            <div className="text-[#4A4A6A] text-[10px] uppercase tracking-[0.06em] mt-1.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="px-6 mb-5">
        <div className="bg-[#1C1C34] h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-[#7B5CFC] rounded-full transition-all"
            style={{ width: `${docs.length ? (ready / docs.length) * 100 : 0}%` }}
          />
        </div>
        <div className="text-[#4A4A6A] text-[10px] text-right mt-1">
          {docs.length ? Math.round((ready / docs.length) * 100) : 0}% parsed
        </div>
      </div>

      <div className="px-6 mb-4 flex items-center gap-3 flex-wrap">
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {(["projects", "list", "grid"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize flex items-center gap-1 ${
                view === v ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {v === "list" ? <List size={12} /> : v === "grid" ? <LayoutGrid size={12} /> : "Projects"}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg p-1">
          {["All", "Ready", "Processing", "Pending"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                status === s ? "bg-[#7B5CFC] text-white" : "text-[#8B8FA8] hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A6A]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents..."
              className="w-full h-9 bg-[#0B0B1A] border border-[#1C1C34] rounded-lg text-white text-sm pl-9 pr-3 placeholder:text-[#4A4A6A] focus:outline-none focus:border-[#7B5CFC]/40"
            />
          </div>
          <button
            onClick={() => setShowNewProject(true)}
            className="h-9 px-4 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-1"
          >
            <FolderPlus size={14} /> New Project
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        {docs.length === 0 ? (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl flex flex-col items-center justify-center py-20">
            <Inbox size={48} className="text-[#1C1C34] mx-auto mb-4" />
            <div className="text-white text-lg font-semibold mb-2">Your library is empty</div>
            <div className="text-[#4A4A6A] text-sm text-center max-w-sm mb-8">
              Upload your first document or scrape a website to start building your AI-powered knowledge base.
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowScrape(true)}
                className="h-10 px-4 rounded-lg border border-[#1C1C34] text-[#8B8FA8] hover:text-white text-sm flex items-center gap-2"
              >
                <Globe size={14} />
                Scrape URL
              </button>
              <button
                onClick={() => setShowUpload(true)}
                className="h-10 px-5 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] text-white text-sm font-semibold flex items-center gap-2"
              >
                <Upload size={14} />
                Upload Documents
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-xl overflow-hidden">
            <div className="bg-[#06060F] h-10 grid grid-cols-12 items-center text-[10px] uppercase tracking-wider text-[#4A4A6A] px-4">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Project</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1"></div>
            </div>
            {filtered.map((d) => (
              <div
                key={d.id}
                className="border-t border-[#1C1C34] grid grid-cols-12 items-center px-4 py-3 hover:bg-[#06060F]/60"
              >
                <div className="col-span-5 flex items-center gap-2 text-white text-sm">
                  <FileText size={14} className="text-[#7B5CFC]" />
                  {d.name}
                </div>
                <div className="col-span-2 text-[#8B8FA8] text-xs">{d.project}</div>
                <div className="col-span-2 text-[#8B8FA8] text-xs">{d.size}</div>
                <div className="col-span-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      d.status === "Ready"
                        ? "bg-[#22C55E]/12 text-[#22C55E]"
                        : "bg-amber-500/12 text-amber-400"
                    }`}
                  >
                    {d.status === "Ready" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle size={10} /> Ready
                      </span>
                    ) : (
                      "Processing"
                    )}
                  </span>
                </div>
                <button
                  onClick={() => setDocs((all) => all.filter((x) => x.id !== d.id))}
                  className="col-span-1 text-[#4A4A6A] hover:text-[#FF4D6D] flex justify-end"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {showUpload && (
        <Modal title="Upload Documents" onClose={() => setShowUpload(false)}>
          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-[#1C1C34] hover:border-[#7B5CFC]/40 rounded-xl py-12 flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload size={32} className="text-[#7B5CFC] mb-3" />
            <div className="text-white font-semibold text-sm">Drop files here or click to browse</div>
            <div className="text-[#4A4A6A] text-xs mt-1">PDF, DOCX, TXT, MD up to 20MB</div>
          </div>
          <div className="text-[#4A4A6A] text-xs mt-3">Files will be parsed and added to your knowledge base.</div>
        </Modal>
      )}

      {showScrape && (
        <Modal title="Scrape URL" onClose={() => setShowScrape(false)}>
          <ScrapeForm
            onSubmit={(url) => {
              setDocs((d) => [
                {
                  id: `${Date.now()}`,
                  name: url.replace(/^https?:\/\//, "").slice(0, 60),
                  size: "—",
                  project: projects[0]?.name ?? "Default",
                  status: "Processing",
                },
                ...d,
              ]);
              setShowScrape(false);
            }}
          />
        </Modal>
      )}

      {showNewProject && (
        <Modal title="New Project" onClose={() => setShowNewProject(false)}>
          <NewProjectForm
            onCreate={(name) => {
              setProjects((p) => [...p, { id: `${Date.now()}`, name }]);
              setShowNewProject(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0B0B1A] border border-[#1C1C34] rounded-2xl w-full max-w-[480px] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1C1C34] flex items-center justify-between">
          <div className="text-white font-semibold">{title}</div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-[#8B8FA8] hover:text-white flex items-center justify-center">
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function ScrapeForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState("");
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[#8B8FA8] text-xs uppercase mb-1.5">Website URL</div>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/page"
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
        />
      </div>
      <button
        disabled={!url.trim()}
        onClick={() => onSubmit(url)}
        className="w-full h-10 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] disabled:bg-[#1C1C34] disabled:text-[#4A4A6A] text-white text-sm font-semibold flex items-center justify-center gap-2"
      >
        <Globe size={14} /> Scrape
      </button>
    </div>
  );
}

function NewProjectForm({ onCreate }: { onCreate: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="space-y-4">
      <div>
        <div className="text-[#8B8FA8] text-xs uppercase mb-1.5">Project Name</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Dental Services"
          className="w-full bg-[#06060F] border border-[#1C1C34] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7B5CFC]/60"
        />
      </div>
      <button
        disabled={!name.trim()}
        onClick={() => onCreate(name.trim())}
        className="w-full h-10 rounded-lg bg-[#7B5CFC] hover:bg-[#6047DB] disabled:bg-[#1C1C34] disabled:text-[#4A4A6A] text-white text-sm font-semibold"
      >
        Create Project
      </button>
    </div>
  );
}
