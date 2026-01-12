"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  Stack,
  Card,
  CardBody,
  Image,
  chakra,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Box,
  Input,
  Textarea,
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

export type Task = {
  id: number;
  title: string;
  notes: string;
  user_id?: number;
};

type Props = {
  id: number;
  url: string;
  task: Task;
  // onUpdate: (updatedTask: Task) => void;
};

export const TaskCardBase = ({ id, url, task }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editTitle, setEditTitle] = useState(task ? task.title : "");
  const [editNotes, setEditNotes] = useState(task ? task.notes : "");

  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });

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
              朝に勉強をする {id}
            </Heading>
            <VStack
              maxH="3rem" // ← 高さを制限
              overflowY="auto"
              align="flex-start"
              w="100%"
            >
              <Text p="5px">7時00分から7時30分まで英語の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text>
              <Text p="5px">動詞と形容詞の勉強をする</Text>
            </VStack>
          </VStack>
          <Button
            onClick={onOpen}
            zIndex={100}
            m="0.5rem"
            data-drag-cancel // ← これを付けるとドラッグ対象外になる
          >
            モーダル
            <EditIcon />
          </Button>
          {/* 編集モーダル */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>タスク名の入力</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="タイトル"
                  mb={3}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </HStack>
      </CardBody>
    </Card>
    // </MagicLink>
  );
};
