"use client";

import { Category, Category as CategoryType } from "@/types/Category";
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
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  useCategories,
  useDeleteCategories,
  useSortCategories,
  useStoreCategories,
} from "@/hooks/useCategories";

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
  type ModalType = "task" | "category" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const onOpen = (type: ModalType) => setActiveModal(type);
  const onClose = () => setActiveModal(null);
  const isOpen = (type: ModalType) => activeModal === type;
  // task
  const [createTitle, setCreateTitle] = useState("");
  const [createNotes, setCreateNotes] = useState("");
  const [createCategoryId, setCreateCategoryId] = useState(Number() || null);
  // category
  const [createName, setCreateName] = useState("");

  console.log(createTitle);
  console.log(createName);
  console.log(createCategoryId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const [tasks, setTasks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  console.log("user----");
  console.log(user);
  console.log(token);
  console.log("categories-----");
  // console.log(categories[0]);
  console.log(categories.find((category) => category.id === 14));

  const { data, isLoading, error } = useTasks(token || "");
  const sortTask = useSortTasks();
  const storeTask = useStoreTasks();
  const deleteTask = useDeleteTasks();

  const {
    data: dataCategory,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useCategories(token || "");
  const sortCategory = useSortCategories();
  const storeCategory = useStoreCategories();
  const deleteCategory = useDeleteCategories();
  // let isLogin = false;
  let isLogin = user ? true : false;

  // APIの結果を state に反映
  useEffect(() => {
    if (data) {
      setTasks(data);
    }
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (dataCategory) {
      setCategories(dataCategory);
    }
    console.log(dataCategory);
  }, [dataCategory]);

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

  const isSubmit = async (type: string) => {
    if (type === "task") {
      storeTask.mutate(
        {
          title: createTitle,
          notes: createNotes,
          token: token,
          user_id: user?.id,
          category_id: createCategoryId,
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
        },
      );
    } else if (type === "category") {
      storeCategory.mutate(
        {
          name: createName,
          user_id: user?.id,
        } as Category,
        {
          onSuccess: () => {
            console.log("作成成功");
            onClose();
          },
          onError: (err) => {
            console.error("通信失敗: ", err);
            alert("送信できませんでした");
          },
        },
      );
    }
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
                      category={categories.find(
                        (category) => category.id === task.category_id,
                      )}
                      categories={categories}
                    />
                  </SwipeableTask>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>

          <Button onClick={() => onOpen("task")} zIndex={100} m="0.5rem">
            <AddIcon />
          </Button>
          {/* 編集モーダル */}
          <Modal isOpen={isOpen("task")} onClose={onClose} motionPreset="none">
            <ModalOverlay />
            <ModalContent w="100%" color={"black"}>
              <ModalHeader>タスク名の入力</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>カテゴリー</Text>
                <Select
                  placeholder="カテゴリー"
                  value={Number(createCategoryId)}
                  onChange={(e) => setCreateCategoryId(Number(e.target.value))}
                >
                  {categories.map((category: Category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </Select>
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
                <Button
                  onClick={() => isSubmit("task")}
                  zIndex={100}
                  m="0.5rem"
                >
                  {/* <Button onClick={isSubmit} zIndex={100} m="0.5rem"> */}
                  送信
                </Button>
              </ModalBody>
              {/* </form> */}
            </ModalContent>
          </Modal>

          <Button onClick={() => onOpen("category")} zIndex={100} m="0.5rem">
            <AddIcon />
          </Button>
          {/* カテゴリモーダル */}
          <Modal
            isOpen={isOpen("category")}
            onClose={onClose}
            motionPreset="none"
          >
            <ModalOverlay />
            <ModalContent w="100%" color={"black"}>
              <ModalHeader>カテゴリー名の入力</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>カテゴリー</Text>
                <Input
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="タイトル"
                  mb={3}
                />
                <Button
                  onClick={() => isSubmit("category")}
                  zIndex={100}
                  m="0.5rem"
                >
                  {/* <Button onClick={isSubmitCategory} zIndex={100} m="0.5rem"> */}
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
