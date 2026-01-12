import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import {
  Stack,
  Card,
  CardBody,
  chakra,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";

type Props = {
  id: number;
  url: string;
};

export const ItemInputBox = ({ id, url }: Props) => {
  const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
    shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  });

  return (
    // <MagicLink w="100%" href={`${url}`}>
    <Card
      w="100%"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
    >
      <Stack w="100%">
        <CardBody>
          <VStack justifySelf={"left"}>
            <Heading w="100%" size="md">
              Title
            </Heading>
            <Text w="100%" py="2">
              test
            </Text>
            {/* <Text py="2">{`${id}`}</Text> */}
            <HStack>
              <MagicLink href={`${url}`}>
                <Button variant="outline">編集</Button>
              </MagicLink>
              <Button>削除</Button>
            </HStack>
          </VStack>
        </CardBody>
      </Stack>
    </Card>
    // </MagicLink>
  );
};
