declare module "frappe-gantt" {
  export interface GanttTask {
    // target_date: boolean;
    id: string;
    name: string;
    title?: string;
    start?: string;
    end?: string;
    progress?: number;
    dependencies?: string;
    custom_class?: string;
  }

  export interface GanttOptions {
    view_mode?: "Day" | "Week" | "Month" | "Year";
    date_format?: string;
    on_click?: (task: GanttTask) => void;
    on_date_change?: (task: GanttTask, start: Date, end: Date) => void;
    on_progress_change?: (task: GanttTask, progress: number) => void;
    on_view_change?: (mode: string) => void;
  }

  export default class Gantt {
    constructor(
      element: HTMLElement,
      tasks: GanttTask[],
      options?: GanttOptions,
    );

    refresh(tasks: GanttTask[]): void;
    change_view_mode(mode: "Day" | "Week" | "Month" | "Year"): void;
  }
}
