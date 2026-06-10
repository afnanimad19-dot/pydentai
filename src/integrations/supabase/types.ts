export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_agents: {
        Row: {
          channels: string[] | null
          config: Json | null
          created_at: string | null
          id: string
          model: string
          name: string
          readiness_score: number | null
          status: string
          system_prompt: string | null
          type: string
          updated_at: string | null
          voice_provider: string | null
          voice_provider_agent_id: string | null
          workspace_id: string
        }
        Insert: {
          channels?: string[] | null
          config?: Json | null
          created_at?: string | null
          id?: string
          model?: string
          name: string
          readiness_score?: number | null
          status?: string
          system_prompt?: string | null
          type: string
          updated_at?: string | null
          voice_provider?: string | null
          voice_provider_agent_id?: string | null
          workspace_id: string
        }
        Update: {
          channels?: string[] | null
          config?: Json | null
          created_at?: string | null
          id?: string
          model?: string
          name?: string
          readiness_score?: number | null
          status?: string
          system_prompt?: string | null
          type?: string
          updated_at?: string | null
          voice_provider?: string | null
          voice_provider_agent_id?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_agents_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      call_logs: {
        Row: {
          agent_id: string | null
          contact_id: string | null
          created_at: string | null
          direction: string
          duration_seconds: number
          id: string
          outcome: string | null
          provider_call_id: string | null
          recording_url: string | null
          sentiment_score: number | null
          status: string
          transcript: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          agent_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          direction: string
          duration_seconds?: number
          id?: string
          outcome?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          sentiment_score?: number | null
          status: string
          transcript?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          agent_id?: string | null
          contact_id?: string | null
          created_at?: string | null
          direction?: string
          duration_seconds?: number
          id?: string
          outcome?: string | null
          provider_call_id?: string | null
          recording_url?: string | null
          sentiment_score?: number | null
          status?: string
          transcript?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_logs_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_logs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_logs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          audience_filter: Json | null
          audience_type: string | null
          channel: string
          created_at: string | null
          custom_content: Json | null
          delivered_count: number
          failed_count: number
          id: string
          name: string
          scheduled_at: string | null
          sent_count: number
          status: string
          template_id: string | null
          type: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          audience_filter?: Json | null
          audience_type?: string | null
          channel: string
          created_at?: string | null
          custom_content?: Json | null
          delivered_count?: number
          failed_count?: number
          id?: string
          name: string
          scheduled_at?: string | null
          sent_count?: number
          status?: string
          template_id?: string | null
          type?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          audience_filter?: Json | null
          audience_type?: string | null
          channel?: string
          created_at?: string | null
          custom_content?: Json | null
          delivered_count?: number
          failed_count?: number
          id?: string
          name?: string
          scheduled_at?: string | null
          sent_count?: number
          status?: string
          template_id?: string | null
          type?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_configs: {
        Row: {
          channel: string
          connected_at: string | null
          created_at: string | null
          credentials: Json | null
          id: string
          is_active: boolean
          provider: string | null
          settings: Json | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          channel: string
          connected_at?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          is_active?: boolean
          provider?: string | null
          settings?: Json | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          channel?: string
          connected_at?: string | null
          created_at?: string | null
          credentials?: Json | null
          id?: string
          is_active?: boolean
          provider?: string | null
          settings?: Json | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_configs_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          assigned_agent_id: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          last_contacted_at: string | null
          lead_score: number | null
          metadata: Json | null
          name: string | null
          phone: string | null
          source_channel: string | null
          status: string
          tags: string[] | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          assigned_agent_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          last_contacted_at?: string | null
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          source_channel?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          assigned_agent_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          last_contacted_at?: string | null
          lead_score?: number | null
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          source_channel?: string | null
          status?: string
          tags?: string[] | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_assigned_agent_id_fkey"
            columns: ["assigned_agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          agent_id: string | null
          assigned_human_id: string | null
          channel: string
          contact_id: string
          created_at: string | null
          external_id: string | null
          id: string
          metadata: Json | null
          resolved_at: string | null
          status: string
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          agent_id?: string | null
          assigned_human_id?: string | null
          channel: string
          contact_id: string
          created_at?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          resolved_at?: string | null
          status?: string
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          agent_id?: string | null
          assigned_human_id?: string | null
          channel?: string
          contact_id?: string
          created_at?: string | null
          external_id?: string | null
          id?: string
          metadata?: Json | null
          resolved_at?: string | null
          status?: string
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      knowledge_chunks: {
        Row: {
          agent_id: string | null
          chunk_index: number
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          source_name: string
          workspace_id: string
        }
        Insert: {
          agent_id?: string | null
          chunk_index: number
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_name: string
          workspace_id: string
        }
        Update: {
          agent_id?: string | null
          chunk_index?: number
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          source_name?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_chunks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_chunks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: Json
          content_type: string
          conversation_id: string
          created_at: string | null
          direction: string
          external_id: string | null
          id: string
          sender_type: string
          status: string | null
          workspace_id: string
        }
        Insert: {
          content: Json
          content_type: string
          conversation_id: string
          created_at?: string | null
          direction: string
          external_id?: string | null
          id?: string
          sender_type: string
          status?: string | null
          workspace_id: string
        }
        Update: {
          content?: Json
          content_type?: string
          conversation_id?: string
          created_at?: string | null
          direction?: string
          external_id?: string | null
          id?: string
          sender_type?: string
          status?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          category: string | null
          channel: string
          content: Json
          created_at: string | null
          external_id: string | null
          id: string
          language: string
          name: string
          status: string | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          category?: string | null
          channel: string
          content: Json
          created_at?: string | null
          external_id?: string | null
          id?: string
          language?: string
          name: string
          status?: string | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          category?: string | null
          channel?: string
          content?: Json
          created_at?: string | null
          external_id?: string | null
          id?: string
          language?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          agent_id: string
          created_at: string | null
          edges: Json
          id: string
          name: string
          nodes: Json
          published_at: string | null
          status: string
          updated_at: string | null
          version: number
          workspace_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          edges?: Json
          id?: string
          name: string
          nodes?: Json
          published_at?: string | null
          status?: string
          updated_at?: string | null
          version?: number
          workspace_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          edges?: Json
          id?: string
          name?: string
          nodes?: Json
          published_at?: string | null
          status?: string
          updated_at?: string | null
          version?: number
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflows_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          role: string
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: string
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          role?: string
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner_id: string | null
          plan: string
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          owner_id?: string | null
          plan?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          plan?: string
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_workspace_id: { Args: never; Returns: string }
      has_workspace_role: {
        Args: { _roles: string[]; _workspace_id: string }
        Returns: boolean
      }
      is_workspace_member: { Args: { _workspace_id: string }; Returns: boolean }
      user_has_role: { Args: { roles: string[] }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
