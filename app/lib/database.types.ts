export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: number;
          name: string;
          dish: string;
          stars: number;
          text: string;
          created_at: string;
        };
        Insert: {
          name: string;
          dish: string;
          stars: number;
          text: string;
          created_at?: string;
        };
        Update: {
          name?: string;
          dish?: string;
          stars?: number;
          text?: string;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
