
REVOKE EXECUTE ON FUNCTION public.has_workspace_role(uuid, text[]) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.is_workspace_member(uuid) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_workspace_role(uuid, text[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_workspace_member(uuid) TO authenticated, service_role;

DROP POLICY IF EXISTS "Workspace members can insert knowledge entries" ON public.knowledge_entries;
DROP POLICY IF EXISTS "Workspace members can update knowledge entries" ON public.knowledge_entries;
DROP POLICY IF EXISTS "Workspace members can delete knowledge entries" ON public.knowledge_entries;

CREATE POLICY "Privileged roles can insert knowledge entries"
  ON public.knowledge_entries FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));

CREATE POLICY "Privileged roles can update knowledge entries"
  ON public.knowledge_entries FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));

CREATE POLICY "Privileged roles can delete knowledge entries"
  ON public.knowledge_entries FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
