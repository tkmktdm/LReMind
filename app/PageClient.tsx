"use client";

import { Category } from "@/types/Category";
import { Task } from "@/types/Task";
import { User } from "@/types/User";
import KanbanBoard from "../components/kanban/KanbanBoard";

type Props = {
  user: User | null;
  // categories: any[];
  // tasks: any[];
  categories: Category[];
  tasks: Task[];
};

export default function PageClient({ user, categories, tasks }: Props) {
  // 仮カンバン機能
  return <KanbanBoard categories={categories} tasks={tasks} />;
  // return (
  //   <>
  //     {/* <h1>カテゴリ一覧</h1>
  //     {categories.map((category) => (
  //       <div key={category?.id}>{category?.name}</div>
  //     ))}
  //     <h1>タスク一覧</h1>
  //     {tasks.map((task) => (
  //       <div key={task?.id}>{task?.title}</div>
  //     ))} */}
  //     {/* <h1>カテゴリ/タスク</h1>
  //     {categories.map((category) => (
  //       <>
  //         <div>
  //           <p>
  //             カテゴリー({category?.id})：{category?.name}
  //           </p>
  //         </div>
  //         <div>
  //           <p>
  //             タスク名：
  //             {
  //               tasks.find((task: Task) => {
  //                 return task?.category_id === category?.id;
  //               })?.title
  //             }
  //           </p>
  //           <p>
  //             説明：
  //             {
  //               tasks.find((task: Task) => {
  //                 return task?.category_id === category?.id;
  //               })?.notes
  //             }
  //           </p>
  //         </div>
  //       </>
  //     ))} */}
  //   </>
  // );
}
