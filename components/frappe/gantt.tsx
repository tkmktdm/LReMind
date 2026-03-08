"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Gantt from "frappe-gantt";
import { Task, TaskGantt } from "@/types/Task";
import moment from "moment";
import { useUpdateTasks } from "@/hooks/useTasks";

export default function GanttTask({
  taskData,
  onDateChange,
}: {
  taskData: any;
  onDateChange?: (task: Task, start: Date, end: Date) => void;
}) {
  const ganttRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [rowHeight, setRowHeight] = useState(0);
  const onDateChangeRef = useRef(onDateChange);
  const pendingUpdateRef = useRef<{
    task: Task;
    start: Date;
    end: Date;
  } | null>(null);
  const updateTask = useUpdateTasks();

  useEffect(() => {
    onDateChangeRef.current = onDateChange;
  });

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
    console.log(tasks);
    // console.log(end);

    const handleMouseUp = () => {
      const pending = pendingUpdateRef.current;
      if (!pending) return;
      pendingUpdateRef.current = null;

      const { task, start, end } = pending;
      onDateChangeRef.current?.(task, start, end);

      updateTask.mutate(
        {
          id: task.id,
          title: task.title,
          // title: task.name,
          start_date:
            start && moment(start).isValid()
              ? moment(start).format("YYYY-MM-DDTHH:mm")
              : undefined,
          end_date:
            end && moment(end).isValid()
              ? moment(end).format("YYYY-MM-DDTHH:mm")
              : undefined,
        } as Task,
        {
          onSuccess: (res) => {
            console.log(res);
            console.log("更新成功");
          },
          onError: (err) => {
            console.error("通信失敗: ", err);
            alert("送信できませんでした");
          },
        },
      );
    };

    ganttRef.current.addEventListener("mouseup", handleMouseUp);

    new Gantt(ganttRef.current, tasks, {
      view_mode: "Day",
      date_format: "YYYY-MM-DD",
      //   language: "ja",
      on_date_change: (task, start, end) => {
        pendingUpdateRef.current = { task, start, end };
      },
    });

    const header = ganttRef.current?.querySelector(
      ".grid-header",
    ) as HTMLElement | null;
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const firstRow = ganttRef.current?.querySelector(
      ".grid-row",
    ) as SVGRectElement | null;
    if (firstRow) {
      setRowHeight(firstRow.getBBox().height);
    }

    return () => {
      ganttRef.current?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [tasks]);

  return (
    <Box display="flex" h="auto">
      {/* 左：タスクリスト */}
      <Box w="250px" borderRight="1px solid #eee" p={2}>
        <Box h={`${headerHeight}px`} borderBottom="1px solid #eee" />
        {tasks.map((task) => (
          <Box
            w={"100%"}
            key={task?.id}
            h={rowHeight > 0 ? `${rowHeight}px` : undefined}
            display="flex"
            alignItems="center"
            borderBottom="1px solid #f0f0f0"
          >
            {task?.name}
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
