
-- 1) Fix privilege escalation: scope role checks to the current workspace + harden search_path
CREATE OR REPLACE FUNCTION public.user_has_role(VARIADIC roles text[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = auth.uid()
      AND workspace_id = public.current_workspace_id()
      AND role = ANY(roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.current_workspace_id()
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT workspace_id
  FROM public.workspace_members
  WHERE user_id = auth.uid()
  ORDER BY joined_at ASC NULLS LAST
  LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_workspace()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (NEW.id, NEW.owner_id, 'owner');
  RETURN NEW;
END;
$$;

-- 2) Restrict EXECUTE on SECURITY DEFINER helpers (revoke from anon/public; keep for authenticated since RLS policies invoke them)
REVOKE EXECUTE ON FUNCTION public.user_has_role(text[]) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.current_workspace_id() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_workspace() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.user_has_role(text[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_workspace_id() TO authenticated, service_role;

-- 3) Add INSERT policy on call_logs
CREATE POLICY "call_logs_insert" ON public.call_logs
FOR INSERT TO authenticated
WITH CHECK (
  workspace_id = public.current_workspace_id()
  AND public.user_has_role(VARIADIC ARRAY['agent','admin','owner'])
);

-- 4) Realtime authorization: restrict channel subscriptions to workspace members.
-- Convention: channel topic must be `workspace:<workspace_id>`.
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "realtime_workspace_members_read" ON realtime.messages;
CREATE POLICY "realtime_workspace_members_read" ON realtime.messages
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.workspace_members wm
    WHERE wm.user_id = auth.uid()
      AND ('workspace:' || wm.workspace_id::text) = realtime.topic()
  )
);
