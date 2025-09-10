"use client";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/Swipeable/SortableItem";
import { SwipeableTask } from "@/components/Swipeable/SwipeableTask";
import { Task, TaskCardBase } from "@/components/TaskCardBase";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([0, 1, 2, 3, 4, 5]);
  const task: Task = {
    // { id: number; title: string; notes: string; }
    id: 1,
    title: "aiueo",
    notes: "aiueo",
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((taskId) => taskId !== id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((id) => (
          <SortableItem key={id} id={id}>
            <SwipeableTask id={id} onDelete={handleDelete}>
              <TaskCardBase
                id={id}
                url={`tasks/${id}`}
                task={task}
                // onUpdate={}
              />
            </SwipeableTask>
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
}
