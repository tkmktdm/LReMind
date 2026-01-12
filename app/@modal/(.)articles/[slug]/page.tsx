"use client";

import { Stack, VStack } from "@chakra-ui/react";
import { ItemCardPage } from "@/components/ItemCardPage";
import { BaseModalContent } from "../../_components/Modal";

export default function CategoryShow() {
  const ItemPickList = [];
  ItemPickList.push(<ItemCardPage key={1} />);
  return (
    <BaseModalContent>
      <Stack>
        <VStack spacing={4}>{ItemPickList}</VStack>
      </Stack>
    </BaseModalContent>
  );
}
