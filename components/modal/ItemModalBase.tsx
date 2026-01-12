import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

export default function ItemModalBase() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* モーダル */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder="タスク名を入力してください" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              追加
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
