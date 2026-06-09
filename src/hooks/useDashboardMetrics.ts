import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface DayBucket { name: string; conv: number; qual: number }
interface SourceBucket { name: string; value: number; fill: string }

interface DashboardMetrics {
  totalContacts: number;
  activeConversations: number;
  messagesToday: number;
  activeAgents: number;
  weeklyChart: DayBucket[];
  sourceChart: SourceBucket[];
}

const CHANNEL_COLORS: Record<string, string> = {
  whatsapp: '#7B5CFC',
  voice: '#00D4AA',
  sms: '#F59E0B',
  instagram: '#FF4D6D',
  email: '#3B82F6',
};

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function useDashboardMetrics() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    async function load() {
      setLoading(true);
      try {
        const [contactsRes, convRes, msgsRes, agentsRes, weekConvRes] = await Promise.all([
          supabase.from('contacts').select('id', { count: 'exact', head: true }),
          supabase.from('conversations').select('id', { count: 'exact', head: true }).eq('status', 'open'),
          supabase.from('messages').select('id', { count: 'exact', head: true })
            .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
          supabase.from('ai_agents').select('id', { count: 'exact', head: true }).eq('status', 'active'),
          supabase.from('conversations')
            .select('channel, created_at')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
        ]);

        const dayBuckets: Record<string, { conv: number; qual: number }> = {};
        const orderedDays: string[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
          const name = DAY_NAMES[d.getDay()];
          dayBuckets[name] = { conv: 0, qual: 0 };
          orderedDays.push(name);
        }
        const channelTotals: Record<string, number> = {};
        (weekConvRes.data ?? []).forEach((row: any) => {
          const dayName = DAY_NAMES[new Date(row.created_at).getDay()];
          if (dayBuckets[dayName]) {
            dayBuckets[dayName].conv++;
            if (row.channel === 'whatsapp') dayBuckets[dayName].qual++;
          }
          channelTotals[row.channel] = (channelTotals[row.channel] ?? 0) + 1;
        });

        const weeklyChart: DayBucket[] = orderedDays.map((name) => ({
          name, conv: dayBuckets[name].conv, qual: dayBuckets[name].qual,
        }));

        const total = Object.values(channelTotals).reduce((s, n) => s + n, 0) || 1;
        const sourceChart: SourceBucket[] = Object.entries(channelTotals).map(([ch, n]) => ({
          name: ch.charAt(0).toUpperCase() + ch.slice(1),
          value: Math.round((n / total) * 100),
          fill: CHANNEL_COLORS[ch] ?? '#8B8FA8',
        }));
        const finalSourceChart = sourceChart.length > 0 ? sourceChart : [
          { name: 'WhatsApp', value: 100, fill: '#7B5CFC' },
        ];

        setMetrics({
          totalContacts: contactsRes.count ?? 0,
          activeConversations: convRes.count ?? 0,
          messagesToday: msgsRes.count ?? 0,
          activeAgents: agentsRes.count ?? 0,
          weeklyChart,
          sourceChart: finalSourceChart,
        });
      } catch (e) {
        console.error('useDashboardMetrics error', e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user]);

  return { metrics, loading };
}
