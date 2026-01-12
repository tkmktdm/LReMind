"use client";

import { Container, Stack, VStack } from "@chakra-ui/react";
import React, { ElementRef, ReactNode } from "react";

interface BaseContentProps {
  children: React.ReactNode;
}

export const BaseContent = ({ children }: BaseContentProps) => {
  return (
    <Stack m="2rem">
      <VStack spacing={4}>{children}</VStack>
    </Stack>
  );
};
