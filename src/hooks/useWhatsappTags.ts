import { useEffect, useState } from "react";

export type WaTag = { id: string; name: string; color: string };

const TAGS_KEY = "wa_tags";
const ASSIGN_KEY = "wa_contact_tags";

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

function readTags(): WaTag[] {
  try { return JSON.parse(localStorage.getItem(TAGS_KEY) || "[]"); } catch { return []; }
}
function writeTags(t: WaTag[]) { localStorage.setItem(TAGS_KEY, JSON.stringify(t)); notify(); }

function readAssign(): Record<string, string[]> {
  try { return JSON.parse(localStorage.getItem(ASSIGN_KEY) || "{}"); } catch { return {}; }
}
function writeAssign(a: Record<string, string[]>) { localStorage.setItem(ASSIGN_KEY, JSON.stringify(a)); notify(); }

export function useWhatsappTags() {
  const [tags, setTags] = useState<WaTag[]>(() => (typeof window === "undefined" ? [] : readTags()));
  const [assignments, setAssignments] = useState<Record<string, string[]>>(() => (typeof window === "undefined" ? {} : readAssign()));

  useEffect(() => {
    const refresh = () => { setTags(readTags()); setAssignments(readAssign()); };
    listeners.add(refresh);
    refresh();
    return () => { listeners.delete(refresh); };
  }, []);

  return {
    tags,
    assignments,
    addTag: (t: Omit<WaTag, "id">) => {
      const next = [...readTags(), { ...t, id: crypto.randomUUID() }];
      writeTags(next);
    },
    updateTag: (id: string, patch: Partial<WaTag>) => {
      writeTags(readTags().map((t) => (t.id === id ? { ...t, ...patch } : t)));
    },
    removeTag: (id: string) => {
      writeTags(readTags().filter((t) => t.id !== id));
      const a = readAssign();
      Object.keys(a).forEach((k) => { a[k] = (a[k] || []).filter((x) => x !== id); });
      writeAssign(a);
    },
    setTags: (ts: WaTag[]) => writeTags(ts),
    contactTags: (contactId: string): string[] => assignments[contactId] || [],
    assignTag: (contactId: string, tagId: string) => {
      const a = readAssign();
      const cur = a[contactId] || [];
      if (!cur.includes(tagId)) a[contactId] = [...cur, tagId];
      writeAssign(a);
    },
    unassignTag: (contactId: string, tagId: string) => {
      const a = readAssign();
      a[contactId] = (a[contactId] || []).filter((x) => x !== tagId);
      writeAssign(a);
    },
    countForTag: (tagId: string): number => Object.values(assignments).filter((arr) => arr.includes(tagId)).length,
    contactsForTag: (tagId: string): string[] => Object.entries(assignments).filter(([, arr]) => arr.includes(tagId)).map(([id]) => id),
  };
}
