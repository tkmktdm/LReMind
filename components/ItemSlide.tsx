import {
  AspectRatio,
  Stack,
  Heading,
  Card,
  CardBody,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
// import { useSearchParams } from "next/navigation";
// import { useSearchParams, useNavigation } from "next/navigation";
// import { useEffect, useState } from "react";
// import ColumnModal from "@/app/@modal/columns/[slug]/page";

type Props = {
  id: number;
  url: string;
};

export const ItemSlide = ({ id, url }: Props) => {
  const { onOpen } = useDisclosure();

  return (
    <AspectRatio
      ratio={1}
      minW="100%"
      key={id}
      sx={{
        scrollSnapAlign: "center",
        scrollSnapStop: "always",
      }}
    >
      <Card
        w="100%"
        direction={{ base: "column", sm: "column" }}
        overflow="hidden"
        variant="outline"
        onClick={onOpen}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "100%" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
        <Stack w="100%">
          <CardBody>
            <Heading size="md">Title</Heading>
            <Text py="2">test</Text>
            <Text py="2">{`${url}`}</Text>
          </CardBody>
        </Stack>
      </Card>
      {/* <ItemModal isOpen={isOpen} onClose={onClose} /> */}
    </AspectRatio>
  );
};
