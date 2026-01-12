"use client";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  Stack,
  Card,
  CardBody,
  Image,
  chakra,
  Heading,
  Text,
} from "@chakra-ui/react";

type Props = {
  id: number;
  url: string;
};

export const ItemCardBase = ({ id, url }: Props) => {
  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });

  return (
    <MagicLink w="100%" href={`${url}`}>
      <Card
        w="100%"
        direction={{ base: "row", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack w="50%">
          <Image
            objectFit="cover"
            // maxW={{ base: "20%", sm: "10%" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=100&h=100&q=60"
            alt=""
          />
        </Stack>
        <Stack w="50%">
          <CardBody p="0">
            <Heading p="0.5rem" size="md">
              Title
            </Heading>
            <Text p="0.5rem">test</Text>
          </CardBody>
        </Stack>
      </Card>
    </MagicLink>
  );
};
