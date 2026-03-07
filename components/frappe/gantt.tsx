"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Gantt from "frappe-gantt";
import { Task, TaskGantt } from "@/types/Task";
import moment from "moment";

export default function GanttTask({ taskData }: any) {
  const ganttRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const tasks: any[] = useMemo(() => {
    return (taskData ?? [])
      .filter(Boolean)
      .map((task: Task) => {
        if (!task) return null;
        const start = task.start_date
          ? moment(String(task.start_date)).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD");
        const end = task.end_date
          ? moment(String(task.end_date)).format("YYYY-MM-DD")
          : moment().add(1, "days").format("YYYY-MM-DD");
        return {
          id: String(task.id),
          name: task.title,
          start,
          end,
          progress: 0,
        } as TaskGantt;
      })
      .filter(Boolean);
  }, [taskData]);

  useEffect(() => {
    if (!ganttRef.current || tasks.length === 0) return;

    ganttRef.current.innerHTML = "";

    new Gantt(ganttRef.current, tasks, {
      view_mode: "Day",
      date_format: "YYYY-MM-DD",
      //   language: "ja",
    });

    const header = ganttRef.current?.querySelector(
      ".grid-header",
    ) as HTMLElement | null;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, [tasks]);

  return (
    <Box display="flex" h="500px">
      {/* 左：タスクリスト */}
      <Box w="250px" borderRight="1px solid #eee" p={2}>
        <Box h={`${headerHeight}px`} borderBottom="1px solid #eee" />
        {tasks.map((task) => (
          <Box
            w={"100%"}
            key={task?.id}
            py={2}
            borderBottom="1px solid #f0f0f0"
          >
            {task?.name}: {headerHeight}
            {/* {task?.name}: {headerHeight} */}
          </Box>
        ))}
      </Box>

      {/* 右：ガント */}
      <Box flex="1" w="80%">
        <div ref={ganttRef} style={{ height: "100%" }} />
      </Box>
    </Box>
  );
}
