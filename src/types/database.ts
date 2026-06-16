export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      competitors: {
        Row: {
          id: string
          organisation_id: string
          name: string
          slug: string
          description: string | null
          website: string | null
          logo_url: string | null
          sector: string
          sub_sector: string | null
          employee_count_range: string | null
          revenue_range: string | null
          headquarters: string | null
          founded_year: number | null
          overall_score: number
          threat_level: "low" | "medium" | "high" | "critical"
          tracking_status: "active" | "watchlist" | "archived"
          ai_summary: string | null
          ai_summary_updated_at: string | null
          metadata: Json
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          name: string
          slug: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          sector: string
          sub_sector?: string | null
          employee_count_range?: string | null
          revenue_range?: string | null
          headquarters?: string | null
          founded_year?: number | null
          overall_score?: number
          threat_level?: "low" | "medium" | "high" | "critical"
          tracking_status?: "active" | "watchlist" | "archived"
          ai_summary?: string | null
          ai_summary_updated_at?: string | null
          metadata?: Json
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          name?: string
          slug?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          sector?: string
          sub_sector?: string | null
          employee_count_range?: string | null
          revenue_range?: string | null
          headquarters?: string | null
          founded_year?: number | null
          overall_score?: number
          threat_level?: "low" | "medium" | "high" | "critical"
          tracking_status?: "active" | "watchlist" | "archived"
          ai_summary?: string | null
          ai_summary_updated_at?: string | null
          metadata?: Json
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      signals: {
        Row: {
          id: string
          organisation_id: string
          title: string
          description: string
          content: string | null
          category: "tender" | "regulation" | "industry" | "competitive" | "technology" | "economic"
          sub_category: string | null
          source_name: string
          source_url: string | null
          source_type: "rss" | "api" | "scrape" | "manual" | "ai_generated"
          relevance_score: number
          lifecycle_status: "discovered" | "reviewed" | "validated" | "actionable" | "archived"
          assigned_to: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          published_at: string | null
          deadline: string | null
          tags: string[]
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organisation_id: string
          title: string
          description: string
          content?: string | null
          category: "tender" | "regulation" | "industry" | "competitive" | "technology" | "economic"
          sub_category?: string | null
          source_name: string
          source_url?: string | null
          source_type?: "rss" | "api" | "scrape" | "manual" | "ai_generated"
          relevance_score?: number
          lifecycle_status?: "discovered" | "reviewed" | "validated" | "actionable" | "archived"
          assigned_to?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          published_at?: string | null
          deadline?: string | null
          tags?: string[]
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          organisation_id?: string
          title?: string
          description?: string
          content?: string | null
          category?: "tender" | "regulation" | "industry" | "competitive" | "technology" | "economic"
          sub_category?: string | null
          source_name?: string
          source_url?: string | null
          source_type?: "rss" | "api" | "scrape" | "manual" | "ai_generated"
          relevance_score?: number
          lifecycle_status?: "discovered" | "reviewed" | "validated" | "actionable" | "archived"
          assigned_to?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          published_at?: string | null
          deadline?: string | null
          tags?: string[]
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
