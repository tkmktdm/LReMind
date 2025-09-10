"use client";

import { Stack, VStack } from "@chakra-ui/react";
import { ItemCardPage } from "@/components/ItemCardPage";
import { BaseModalContent } from "../../_components/Modal";
import { TaskEditPage } from "@/components/TaskEditPage";

export default function TaskShow() {
  const ItemPickList = [];
  ItemPickList.push(<TaskEditPage key={1} />);
  return (
    <BaseModalContent>
      <Stack>
        <VStack spacing={4}>{ItemPickList}</VStack>
      </Stack>
    </BaseModalContent>
  );
}
