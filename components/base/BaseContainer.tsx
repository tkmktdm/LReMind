import { Container } from "@chakra-ui/react";
import React from "react";

export default function BaseContainer(children: React.ReactNode) {
  //   return <Container></Container>;
  return (
    <Container minW="100%" minH={"6vh"} px={0} bg="white">
      {children}
    </Container>
  );
}
