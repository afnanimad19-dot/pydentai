import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface WorkspaceData {
  workspaceId: string;
  role: string;
  workspace: { id: string; name: string; plan: string; settings: Record<string, string> | null };
}

export function useWorkspace() {
  const { user } = useAuth();
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    supabase
      .from('workspace_members')
      .select('role, workspace_id, workspaces(id, name, plan, settings)')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data: row }) => {
        if (row && row.workspaces) {
          setData({
            workspaceId: row.workspace_id,
            role: row.role,
            workspace: row.workspaces as any,
          });
        } else {
          setData(null);
        }
        setLoading(false);
      });
  }, [user]);

  return { ...data, loading };
}
