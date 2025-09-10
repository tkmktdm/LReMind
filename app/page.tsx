"use client";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { SortableItem } from "@/components/Swipeable/SortableItem";
import { SwipeableTask } from "@/components/Swipeable/SwipeableTask";
import { Task, TaskCardBase } from "@/components/TaskCardBase";
import { TaskCard } from "@/components/TaskCard";

import dynamic from "next/dynamic";
import { Box, Stack } from "@chakra-ui/react";

export default function Home() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const [tasks, setTasks] = useState([0, 1, 2, 3, 4]);
  const task: Task = {
    id: 1,
    title: "aiueo",
    notes: "aiueo",
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active);
    console.log(over);
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);
        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      console.log(event);
    }
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((taskId) => taskId !== id));
  };

  const Live2D = dynamic(
    () => import("@/components/Live2D").then((module) => module.Live2D),
    {
      ssr: false,
    }
  );

  return (
    <>
      {/* TODO: live2dの画像を小さく、裏のタスクリストを選択できるようにしたい */}
      <Box position="fixed" bottom={1} zIndex={1}>
        <Live2D />
      </Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((id) => (
            <SortableItem key={id} id={id}>
              <SwipeableTask id={id} onDelete={handleDelete}>
                <TaskCard id={id} url={`tasks/${id}`} task={task} />
              </SwipeableTask>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
