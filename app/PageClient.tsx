"use client";

import { Category as CategoryType } from "@/types/Category";
import { Task as TaskType } from "@/types/Task";
import { User } from "@/types/User";
import KanbanBoard from "../components/kanban/KanbanBoard";
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
import { useEffect, useState } from "react";

import { SortableItem } from "@/components/Swipeable/SortableItem";
import { SwipeableTask } from "@/components/Swipeable/SwipeableTask";
import { Task, TaskCard } from "@/components/TaskCard";
import {
  useDeleteTasks,
  useSortTasks,
  useStoreTasks,
  useTasks,
} from "@/hooks/useTasks";
import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";

type Props = {
  user: User | null;
  categoryData: any[];
  taskData: any[];
  token?: string;
  // categories: CategoryType[];
  // tasks: TaskType[];
};

export default function PageClient({
  user,
  categoryData,
  taskData,
  token,
}: Props) {
  // export default function PageClient({ user, categories, tasks }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createTitle, setCreateTitle] = useState("");
  const [createNotes, setCreateNotes] = useState("");

  console.log(createTitle);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const [tasks, setTasks] = useState<any[]>([]);
  console.log("user----");
  console.log(user);
  console.log(token);
  // const token = "QFSeLBAQLuor5uHdp6pmxLR9eLgscSnzdTGAKYcp00c3584c";
  // const token = "";

  const { data, isLoading, error } = useTasks(token || "");
  const sortTask = useSortTasks();
  const storeTask = useStoreTasks();
  const deleteTask = useDeleteTasks();
  // let isLogin = false;
  let isLogin = user ? true : false;

  // APIの結果を state に反映
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
    console.log(data);
  }, [data]);
  if (isLoading) return <p>タスク取得中...</p>;
  // if (error) return <p>エラーが発生しました</p>;
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.indexOf(active.id as number);
        const newIndex = items.indexOf(over.id as number);
        sortTask.mutate(active.id as string); // タスクを更新
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  const handleDelete = (id: string) => {
    deleteTask.mutate(id);
    setTasks((prev) => prev.filter((taskId) => taskId !== id));
  };

  const isSubmit = async () => {
    storeTask.mutate(
      {
        title: createTitle,
        notes: createNotes,
        token: token,
        userId: user?.id,
      } as Task,
      {
        onSuccess: () => {
          console.log("作成成功");
          onClose();
        },
        onError: (err) => {
          console.error("通信失敗: ", err);
          alert("送信できませんでした");
        },
      }
    );
  };

  return (
    <>
      {!isLogin ? (
        <Center>
          <Stack m={4}>
            <Text>サインアップかログインをしてください</Text>
            <Text>ログインを行うとタスク管理をすることができます！</Text>
          </Stack>
        </Center>
      ) : (
        <>
          <Text>Chat</Text>
          {/* TODO: live2dの画像を小さく、裏のタスクリストを選択できるようにしたい */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <SortableItem key={task.id} id={task.id}>
                  <SwipeableTask id={task.id} onDelete={handleDelete}>
                    <TaskCard
                      id={task.id}
                      url={`tasks/${task.id}`}
                      task={task}
                    />
                  </SwipeableTask>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>

          <Button onClick={onOpen} zIndex={100} m="0.5rem">
            <AddIcon />
          </Button>
          {/* 編集モーダル */}
          <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
            <ModalOverlay />
            <ModalContent w="100%" color={"black"}>
              <ModalHeader>タスク名の入力</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>タイトル</Text>
                <Input
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  placeholder="タイトル"
                  mb={3}
                />
                <Text>備考</Text>
                <Input
                  value={createNotes}
                  onChange={(e) => setCreateNotes(e.target.value)}
                  placeholder="備考"
                  mb={3}
                />
                <Button onClick={isSubmit} zIndex={100} m="0.5rem">
                  送信
                </Button>
              </ModalBody>
              {/* </form> */}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
