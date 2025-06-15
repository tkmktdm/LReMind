"use client";

import { Stack, VStack, HStack, Box } from "@chakra-ui/react";
import { ItemList } from "@/components/ItemList";
import { ItemColumnCard } from "@/components/ItemColumnCard";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { BaseContent } from "@/components/base/BaseContent";

export default function Home() {
  const ItemPickSlide = [];
  for (let i = 0; i <= 2; i++) {
    ItemPickSlide.push(<ItemColumnCard url={`columns/${i}`} />);
  }

  const ArticlePickList = [];
  for (let i = 0; i <= 2; i++) {
    ArticlePickList.push(<ItemList id={i} url={`articles/${i}`} />);
  }

  return (
    <Stack spacing={8} p={5} bg="white">
      <HStack spacing={4} w="100%" h="80vh">
        {/* Items */}
        <VStack w="20%" h="80%" alignItems="stretch">
          {ItemPickSlide.map((item, index) => (
            <Box key={index} w="100%" flex="1" alignContent="center">
              {item}
            </Box>
          ))}
        </VStack>
        {/* Calendar */}
        <VStack w="80%" h="100%" spacing={4} flex="1" overflow="hidden">
          <Box w="100%" h="100%" overflow="auto" alignContent={"center"}>
            <FullCalendar
              locale={"ja"}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              height="auto"
              contentHeight="auto"
            />
          </Box>
        </VStack>
      </HStack>

      {/* Article List */}
      <BaseContent>{ArticlePickList}</BaseContent>
    </Stack>
  );
}
