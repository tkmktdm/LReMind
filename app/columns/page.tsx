"use client";

import { Stack } from "@chakra-ui/react";
import { ItemCard } from "@/components/ItemCard";

export default function ColumnIndex() {
  const ItemPickCard = [];
  for (let i = 0; i <= 3; i++) {
    ItemPickCard.push(<ItemCard id={i} url={`columns/${i}`} />);
  }
  return (
    <Stack>
      <Stack
        spacing={4}
        mb="2rem"
        direction="row"
        flexWrap="wrap"
        justify="space-around"
        alignItems="center"
      >
        {ItemPickCard}
      </Stack>
    </Stack>
  );
}
