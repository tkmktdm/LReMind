"use client";

import { TaskBox } from "@/components/TaskBox";
import { BaseContent } from "@/components/base/BaseContent";

export default function TaskIndex() {
  const TaskList = [];
  for (let i = 0; i <= 5; i++) {
    TaskList.push(<TaskBox id={i} url={`events/${i}`} />);
  }
  return <BaseContent>{TaskList}</BaseContent>;
}
