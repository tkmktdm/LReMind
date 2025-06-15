"use client";
import { ItemColumnCard } from "@/components/ItemColumnCard";
import { BaseModalContent } from "../../_components/Modal";
import { Stack, VStack } from "@chakra-ui/react";

export default function ColumnShow() {
  const ItemPickList = [];
  const index = 1;
  // URLを変更する
  ItemPickList.push(<ItemColumnCard key={1} url={`/columns/${index}`} />);
  return (
    <BaseModalContent>
      <Stack>
        <VStack>{ItemPickList}</VStack>
      </Stack>
    </BaseModalContent>
  );
}
