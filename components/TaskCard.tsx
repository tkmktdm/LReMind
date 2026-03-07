"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  Card,
  CardBody,
  chakra,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay, // ← Chakraのを使う！
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useStoreTasks, useUpdateTasks } from "@/hooks/useTasks";
import { storeTasks } from "@/app/api/task";
import { Category } from "@/types/Category";
import { DateTime, Settings, Info, Duration } from "luxon";
import moment from "moment";

export type Task = {
  id: number;
  title: string;
  notes: string;
  token?: string;
  user_id?: number;
  category_id?: number;
  // start_date?: DateTime;
  // end_date?: DateTime;
  // target_date?: DateTime;
  start_date?: string;
  end_date?: string;
  target_date?: string;
};

type Props = {
  id: number;
  url: string;
  task: Task;
  category: Category | null;
  categories: Category[];
};

export const TaskCard = ({ id, url, task, category, categories }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editTitle, setEditTitle] = useState(task ? task.title : "");
  const [editNotes, setEditNotes] = useState(task ? task.notes : "");
  const [editCategoryId, setEditCategoryId] = useState(
    task ? task.category_id : null,
  );

  const [editStartDate, setEditStartDate] = useState(
    task ? moment(task?.start_date).local().format("YYYY-MM-DDTHH:mm") : "",
  );
  const [editEndDate, setEditEndDate] = useState(
    task ? moment(task?.end_date).local().format("YYYY-MM-DDTHH:mm") : "",
  );
  const [editTargetDate, setEditTargetDate] = useState(
    task ? moment(task?.target_date).local().format("YYYY-MM-DDTHH:mm") : "",
  );
  const updateTask = useUpdateTasks();
  const storeTask = useStoreTasks();
  console.log("TaskCard------");
  console.log(task);
  console.log(category);
  console.log("TaskCard end------");

  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });
  const isSubmit = async () => {
    console.log(editStartDate);
    console.log(moment(editStartDate).format("YYYY-MM-DDTHH:mm"));
    console.log(editEndDate);
    console.log(moment(editEndDate).format("YYYY-MM-DDTHH:mm"));
    console.log(editTargetDate);
    console.log(moment(editTargetDate).format("YYYY-MM-DDTHH:mm"));
    // console.log(editStartDate);
    updateTask.mutate(
      {
        id: task.id,
        title: editTitle,
        notes: editNotes,
        category_id: editCategoryId,
        // start_date: editStartDate,
        // end_date: editEndDate,
        // target_date: editTargetDate,
        // 2017-06-01T08:30
        start_date:
          editStartDate && moment(editStartDate).isValid()
            ? moment(editStartDate).format("YYYY-MM-DDTHH:mm")
            : null,

        end_date:
          editEndDate && moment(editEndDate).isValid()
            ? moment(editEndDate).format("YYYY-MM-DDTHH:mm")
            : null,

        target_date:
          editTargetDate && moment(editTargetDate).isValid()
            ? moment(editTargetDate).format("YYYY-MM-DDTHH:mm")
            : null,
        // start_date: editStartDate
        //   ? moment(editStartDate).format("YYYY-MM-DDTHH:mm")
        //   : null,
        // end_date: editEndDate
        //   ? moment(editEndDate).format("YYYY-MM-DDTHH:mm")
        //   : null,
        // target_date: editTargetDate
        //   ? moment(editTargetDate).format("YYYY-MM-DDTHH:mm")
        //   : null,
      } as Task,
      {
        onSuccess: (res) => {
          console.log(res);
          console.log("更新成功");
          onClose();
        },
        onError: (err) => {
          console.error("通信失敗: ", err);
          alert("送信できませんでした");
        },
      },
    );
  };
  // const isSubmit = async () => {
  //   storeTask.mutate({ title: editTitle, notes: editNotes } as Task, {
  //     onSuccess: () => {
  //       console.log("作成成功");
  //       onClose();
  //     },
  //     onError: (err) => {
  //       console.error("通信失敗: ", err);
  //       alert("送信できませんでした");
  //     },
  //   });
  // };

  return (
    // <MagicLink w="100%" href={`${url}`}>
    <Card
      direction={{ base: "row", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <CardBody p="0">
        <HStack>
          <VStack w="100%" p="0.5rem" alignItems="flex-start">
            <Text p="5px">{category?.name}</Text>
            <Heading p="0.5rem" size="md">
              {id}: {task.title}
            </Heading>
            <VStack
              maxH="3rem" // ← 高さを制限
              overflowY="auto"
              align="flex-start"
              w="100%"
            >
              <Text p="5px">{task.notes}</Text>
              {/* <Text p="5px">7時00分から7時30分まで英語の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text> */}
            </VStack>
          </VStack>
          <Button onClick={onOpen} zIndex={100} m="0.5rem">
            モーダル
            <EditIcon />
          </Button>
          {/* 編集モーダル */}
          <Modal isOpen={isOpen} onClose={onClose} motionPreset="none">
            <ModalOverlay />
            <ModalContent w="100%" color={"black"}>
              {/* <form onSubmit={isSubmit}> */}
              <ModalHeader>タスク名の入力</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>カテゴリー</Text>
                <Select
                  placeholder="カテゴリー"
                  value={Number(editCategoryId)}
                  onChange={(e) => setEditCategoryId(Number(e.target.value))}
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
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="タイトル"
                  mb={3}
                />
                <Text>備考</Text>
                <Input
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="備考"
                  mb={3}
                />
                <Text>開始日</Text>
                <Input
                  type="datetime-local"
                  value={editStartDate}
                  onChange={(e) => setEditStartDate(e.target.value)}
                  mb={3}
                />
                <Text>期限日</Text>
                <Input
                  type="datetime-local"
                  value={editEndDate}
                  onChange={(e) => setEditEndDate(e.target.value)}
                  mb={3}
                />
                <Text>完了日</Text>
                <Input
                  type="datetime-local"
                  value={editTargetDate}
                  onChange={(e) => setEditTargetDate(e.target.value)}
                  mb={3}
                />
                <Button onClick={isSubmit} zIndex={100} m="0.5rem">
                  送信
                </Button>
              </ModalBody>
              {/* </form> */}
            </ModalContent>
          </Modal>
        </HStack>
      </CardBody>
    </Card>
    // </MagicLink>
  );
};
