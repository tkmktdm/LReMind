"use client";

import { Container, Stack, VStack } from "@chakra-ui/react";
import React, { ElementRef, ReactNode } from "react";

interface BaseContentProps {
  children: React.ReactNode;
}

export const BaseContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-full">{children}</div>;
};
