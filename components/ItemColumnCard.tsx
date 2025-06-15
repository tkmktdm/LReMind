"use client";

import {
  Stack,
  Box,
  Heading,
  Card,
  CardBody,
  Image,
  chakra,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";

type Props = {
  // id: number;
  url: string;
};

export const ItemColumnCard = ({ url }: Props) => {
  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });
  const { onOpen } = useDisclosure();

  return (
    <MagicLink w="100%" href={`${url}`}>
      <Card
        w="100%"
        direction={{ base: "column", sm: "column" }}
        overflow="hidden"
        variant="outline"
        onClick={onOpen}
      >
        <Stack w="100%">
          <CardBody p={0}>
            <Stack display="flex" alignItems="center" justify="end">
              <Image
                bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
                objectFit="cover"
                maxW={{ base: "100%", sm: "100%" }}
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt=""
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-b, transparent, rgba(0, 0, 0, 0.7))"
              />
              <Text size="md" position={"absolute"} color="white">
                Title
              </Text>
            </Stack>
          </CardBody>
        </Stack>
      </Card>
    </MagicLink>
  );
};
