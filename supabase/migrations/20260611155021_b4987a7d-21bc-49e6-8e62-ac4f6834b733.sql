
CREATE TABLE IF NOT EXISTS public.knowledge_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES public.ai_agents(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  source_type text NOT NULL DEFAULT 'manual',
  is_active boolean NOT NULL DEFAULT true,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.knowledge_entries TO authenticated;
GRANT ALL ON public.knowledge_entries TO service_role;

ALTER TABLE public.knowledge_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workspace members can view knowledge entries"
  ON public.knowledge_entries FOR SELECT TO authenticated
  USING (public.is_workspace_member(workspace_id));

CREATE POLICY "Workspace members can insert knowledge entries"
  ON public.knowledge_entries FOR INSERT TO authenticated
  WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Workspace members can update knowledge entries"
  ON public.knowledge_entries FOR UPDATE TO authenticated
  USING (public.is_workspace_member(workspace_id))
  WITH CHECK (public.is_workspace_member(workspace_id));

CREATE POLICY "Workspace members can delete knowledge entries"
  ON public.knowledge_entries FOR DELETE TO authenticated
  USING (public.is_workspace_member(workspace_id));

CREATE INDEX IF NOT EXISTS idx_knowledge_entries_workspace ON public.knowledge_entries(workspace_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_entries_agent ON public.knowledge_entries(agent_id);

CREATE TRIGGER trg_knowledge_entries_updated_at
  BEFORE UPDATE ON public.knowledge_entries
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.messages ALTER COLUMN created_at SET DEFAULT now();
