import React, { createContext, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type DragHandleListeners = Record<string, React.EventHandler<any>>;

const DragHandleContext = createContext<DragHandleListeners>({});

export const useDragHandle = () => useContext(DragHandleContext);

export const SortableItem = ({
  id,
  children,
}: {
  id: number;
  children: React.ReactNode;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: "5px",
  };

  return (
    <DragHandleContext.Provider value={listeners ?? {}}>
      <div ref={setNodeRef} style={style} {...attributes}>
        {children}
      </div>
    </DragHandleContext.Provider>
  );
};
