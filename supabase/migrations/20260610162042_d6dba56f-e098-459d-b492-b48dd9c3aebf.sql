
-- Helper: check role within a specific workspace
CREATE OR REPLACE FUNCTION public.has_workspace_role(_workspace_id uuid, VARIADIC _roles text[])
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = auth.uid()
      AND workspace_id = _workspace_id
      AND role = ANY(_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_workspace_member(_workspace_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE user_id = auth.uid() AND workspace_id = _workspace_id
  );
$$;

-- workspace_members
DROP POLICY IF EXISTS workspace_members_insert ON public.workspace_members;
DROP POLICY IF EXISTS workspace_members_update ON public.workspace_members;
DROP POLICY IF EXISTS workspace_members_delete ON public.workspace_members;
CREATE POLICY workspace_members_insert ON public.workspace_members
  FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'owner', 'admin'));
CREATE POLICY workspace_members_update ON public.workspace_members
  FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'owner', 'admin'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'owner', 'admin'));
CREATE POLICY workspace_members_delete ON public.workspace_members
  FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'owner'));

-- ai_agents
DROP POLICY IF EXISTS ai_agents_insert ON public.ai_agents;
DROP POLICY IF EXISTS ai_agents_update ON public.ai_agents;
DROP POLICY IF EXISTS ai_agents_delete ON public.ai_agents;
CREATE POLICY ai_agents_insert ON public.ai_agents FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'owner', 'admin'));
CREATE POLICY ai_agents_update ON public.ai_agents FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'owner', 'admin'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'owner', 'admin'));
CREATE POLICY ai_agents_delete ON public.ai_agents FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'owner', 'admin'));

-- contacts
DROP POLICY IF EXISTS contacts_insert ON public.contacts;
DROP POLICY IF EXISTS contacts_update ON public.contacts;
DROP POLICY IF EXISTS contacts_delete ON public.contacts;
CREATE POLICY contacts_insert ON public.contacts FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY contacts_update ON public.contacts FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY contacts_delete ON public.contacts FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- conversations
DROP POLICY IF EXISTS conversations_insert ON public.conversations;
DROP POLICY IF EXISTS conversations_update ON public.conversations;
DROP POLICY IF EXISTS conversations_delete ON public.conversations;
CREATE POLICY conversations_insert ON public.conversations FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY conversations_update ON public.conversations FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY conversations_delete ON public.conversations FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- messages (insert only existed)
DROP POLICY IF EXISTS messages_insert ON public.messages;
CREATE POLICY messages_insert ON public.messages FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
        AND public.has_workspace_role(c.workspace_id, 'agent', 'admin', 'owner')
    )
  );

-- call_logs
DROP POLICY IF EXISTS call_logs_insert ON public.call_logs;
DROP POLICY IF EXISTS call_logs_update ON public.call_logs;
DROP POLICY IF EXISTS call_logs_delete ON public.call_logs;
CREATE POLICY call_logs_insert ON public.call_logs FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY call_logs_update ON public.call_logs FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'agent', 'admin', 'owner'));
CREATE POLICY call_logs_delete ON public.call_logs FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- campaigns
DROP POLICY IF EXISTS campaigns_insert ON public.campaigns;
DROP POLICY IF EXISTS campaigns_update ON public.campaigns;
DROP POLICY IF EXISTS campaigns_delete ON public.campaigns;
CREATE POLICY campaigns_insert ON public.campaigns FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY campaigns_update ON public.campaigns FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY campaigns_delete ON public.campaigns FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- templates
DROP POLICY IF EXISTS templates_insert ON public.templates;
DROP POLICY IF EXISTS templates_update ON public.templates;
DROP POLICY IF EXISTS templates_delete ON public.templates;
CREATE POLICY templates_insert ON public.templates FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY templates_update ON public.templates FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY templates_delete ON public.templates FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- channel_configs
DROP POLICY IF EXISTS channel_configs_insert ON public.channel_configs;
DROP POLICY IF EXISTS channel_configs_update ON public.channel_configs;
DROP POLICY IF EXISTS channel_configs_delete ON public.channel_configs;
CREATE POLICY channel_configs_insert ON public.channel_configs FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY channel_configs_update ON public.channel_configs FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY channel_configs_delete ON public.channel_configs FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'owner'));

-- workflows
DROP POLICY IF EXISTS workflows_insert ON public.workflows;
DROP POLICY IF EXISTS workflows_update ON public.workflows;
DROP POLICY IF EXISTS workflows_delete ON public.workflows;
CREATE POLICY workflows_insert ON public.workflows FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY workflows_update ON public.workflows FOR UPDATE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'))
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY workflows_delete ON public.workflows FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));

-- knowledge_chunks
DROP POLICY IF EXISTS knowledge_chunks_insert ON public.knowledge_chunks;
DROP POLICY IF EXISTS knowledge_chunks_delete ON public.knowledge_chunks;
CREATE POLICY knowledge_chunks_insert ON public.knowledge_chunks FOR INSERT TO authenticated
  WITH CHECK (public.has_workspace_role(workspace_id, 'admin', 'owner'));
CREATE POLICY knowledge_chunks_delete ON public.knowledge_chunks FOR DELETE TO authenticated
  USING (public.has_workspace_role(workspace_id, 'admin', 'owner'));
