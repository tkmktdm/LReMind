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

export const ItemList = ({ id, url }: Props) => {
  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });

  return (
    <MagicLink w="100%" href={`${url}`}>
      <Card
        w="100%"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "20%" }}
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />
        <Stack w="100%">
          <CardBody>
            <Heading size="md">Title</Heading>
            <Text py="2">test</Text>
            <Text py="2">{`${id}`}</Text>
          </CardBody>
        </Stack>
      </Card>
    </MagicLink>
  );
};
