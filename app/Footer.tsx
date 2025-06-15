import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Footer() {
  return (
    <Box as="footer" w="100%" p={4} bg="gray.100" color="black">
      <Flex m={4} justify="space-around" align="flex-start">
        <Stack spacing={4}>
          <Text as="h3">LR Brother</Text>
        </Stack>
        <Stack spacing={4}>
          <Text as="h3" mb={10}>
            Service
          </Text>
          <Stack>
            <Link href="https://liberuntime.com">TeckBlog</Link>
            <Link href="https://misskey.liberuntime.com">Misskey</Link>
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <Text as="h3" mb={10}>
            Connection
          </Text>
          <Text>Mail</Text>
          <Link href="mailto:ao.lr.like.brothers@gmail.com">
            ao.lr.like.brothers
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
}
