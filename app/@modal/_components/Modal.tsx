"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function BaseModalContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleClose = () => {
    onClose();
    router.back();
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
}
