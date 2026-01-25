// "use cache";

import { Providers } from "./Providers";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import HeaderServer from "./HeaderServer";

import Footer from "./Footer";
import { Live2D } from "@/components/Live2D";
import dynamic from "next/dynamic";
import Script from "next/script";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LR Brother",
  description: "Liberuntime application",
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  // const Live2D = dynamic(
  //   () => import("@/components/Live2D").then((module) => module.Live2D),
  //   {
  //     ssr: false,
  //   }
  // );
  // const Live2DModal = React.memo(Live2D);

  return (
    <html lang="ja">
      <head>
        <script src="/live2d.min.js" defer></script>
        <script src="/live2dcubismcore.js" defer></script>
      </head>

      <body className={inter.className}>
        <Script src="/live2d.min.js" strategy="beforeInteractive" />
        <Providers>
          {/* <UserProvider user={user}> */}
          <Container minW="100%" minH={"6vh"} px={0} bg="white">
            <HeaderServer />
          </Container>

          <Container minW="100%" minH="94vh" px={0} bg="white" color="black">
            {modal}
            {children}
            <Box
              position="fixed"
              bottom={1}
              zIndex={1}
              pointerEvents="none" // ← 背面のタスク操作できるようにする
            >
              {/* <Live2D /> */}
            </Box>
          </Container>
          <Container minW="100%" px={0} bg="white">
            <Footer />
          </Container>
          {/* </UserProvider> */}
        </Providers>
      </body>
    </html>
  );
}
