export type Task = {
  id: string;
  title: string;
  notes?: string;
  status?: number;
  score?: number;
  sort_order?: number;
  priority?: number;
  start_date?: Date;
  end_date?: Date;
  target_date?: Date;
  user_id?: number;
  category_id?: number;
  // title: string;
} | null;
