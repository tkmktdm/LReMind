"use client";

import { Box, Stack, HStack } from "@chakra-ui/layout";
import Link from "next/link";

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Header({ user }: any) {
  return (
    <header>
      <Box
        w="100%"
        h="6vh"
        // h="4rem"
        bg="gray.100"
        color="black"
        position="fixed"
        alignContent={"center"}
        zIndex={1000}
      >
        <HStack ml={4} mr={4}>
          <Box>
            <Link href="/">LR</Link>
          </Box>
          <Box>
            <Link href="/articles">Article</Link>
          </Box>
          <Box>
            <Link href="/events">Event</Link>
          </Box>
          <Box>
            <Link href="/brothers">Brother</Link>
          </Box>

          {user ? (
            <Box position={"fixed"} right={0}>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <p>{user.name}</p>
                </MenuButton>
                <Portal>
                  <MenuList px={4}>
                    <MenuItem color={"black"}>
                      <Link href="/profile">プロフィール</Link>
                    </MenuItem>
                    <MenuItem color={"black"}>
                      <Link href="/logout">ログアウト</Link>
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          ) : (
            <Box position={"fixed"} right={0}>
              <HStack spacing={4}>
                <Box>
                  <Link href="/register">Sign up</Link>
                </Box>
                <Box>
                  <Link href="/login">Login</Link>
                </Box>
              </HStack>
            </Box>
          )}
        </HStack>
      </Box>
    </header>
  );
}
