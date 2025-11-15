// "use cache";

import { Providers } from "./Providers";
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Box, Container } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import { Live2D } from "@/components/Live2D";
import dynamic from "next/dynamic";

import Script from "next/script";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

async function fetchUser() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // 本番用URLを環境変数で設定
  const response = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
  });
  console.log(response);
  if (response && response.ok) return response.json();
  return null;
}

export const metadata: Metadata = {
  title: "LR Brother",
  description: "Liberuntime application",
};
// const user = await getUser();
export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const user = await fetchUser();
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
          <Container minW="100%" minH={"6vh"} px={0} bg="white">
            <Header user={user} />
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
        </Providers>
      </body>
    </html>
  );
}
