"use client";

import { Box, Stack } from "@chakra-ui/react";
import { ItemCard } from "@/components/ItemCard";
import { ItemList } from "@/components/ItemList";
import dynamic from "next/dynamic";
import React from "react";

export default function BrotherIndex() {
  const ItemPickCard = [];
  for (let i = 0; i <= 3; i++) {
    ItemPickCard.push(<ItemCard id={0} url={""} />);
  }
  const ItemPickList = [];
  for (let i = 0; i <= 2; i++) {
    ItemPickList.push(<ItemList id={0} url={""} />);
  }
  const Live2D = dynamic(
    () => import("@/components/Live2D").then((module) => module.Live2D),
    {
      ssr: false,
    }
  );
  // const Live2D = dynamic(() => import("@/components/Live2D"), {
  //   ssr: false,
  // });

  return (
    <Stack>
      <Box w="100%" position="fixed" zIndex="100">
        <Live2D />
      </Box>
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
