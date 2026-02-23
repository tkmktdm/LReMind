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
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useStoreTasks, useUpdateTasks } from "@/hooks/useTasks";
import { storeTasks } from "@/app/api/task";

export type Task = {
  id: number;
  title: string;
  notes: string;
  token?: string;
  userId?: number;
};

type Props = {
  id: number;
  url: string;
  task: Task;
};

export const TaskCard = ({ id, url, task }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editTitle, setEditTitle] = useState(task ? task.title : "");
  const [editNotes, setEditNotes] = useState(task ? task.notes : "");
  const updateTask = useUpdateTasks();
  const storeTask = useStoreTasks();
  // console.log(task);

  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });
  const isSubmit = async () => {
    updateTask.mutate(
      { id: task.id, title: editTitle, notes: editNotes } as Task,
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
      }
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
