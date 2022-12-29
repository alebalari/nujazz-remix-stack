export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_uuid: string
          created_at: string | null
          modified_at: string | null
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          user_uuid: string
          created_at?: string | null
          modified_at?: string | null
          first_name?: string | null
          last_name?: string | null
        }
        Update: {
          user_uuid?: string
          created_at?: string | null
          modified_at?: string | null
          first_name?: string | null
          last_name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
