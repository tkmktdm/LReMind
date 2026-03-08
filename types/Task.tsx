export type TaskGantt = {
  // id: string;
  // title: string;
  // notes?: string;
  // status?: number;
  // score?: number;
  // sort_order?: number;
  // priority?: number;
  // start_date?: Date;
  // end_date?: Date;
  // target_date?: Date;
  // user_id?: number;
  // category_id?: number;

  id: string;
  title?: string;
  name?: string;
  start?: string;
  end?: string;
  progress: 0;
} | null;

export type Task = {
  id: string;
  title: string;
  notes?: string;
  status?: number;
  score?: number;
  sort_order?: number;
  priority?: number;
  start_date?: string;
  end_date?: string;
  target_date?: string;
  // start_date?: Date;
  // end_date?: Date;
  // target_date?: Date;
  user_id?: number;
  category_id?: number;
  // title: string;
};
