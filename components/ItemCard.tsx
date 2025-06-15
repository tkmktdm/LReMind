"use client";

import {
  Stack,
  Box,
  Heading,
  Card,
  CardBody,
  Image,
  Text,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import { ItemModal } from "@/components/ItemModal";
// import { useSearchParams } from "next/navigation";
// import { useSearchParams, useNavigation } from "next/navigation";
// import { useEffect, useState } from "react";
// import ColumnModal from "@/app/@modal/columns/[slug]/page";

type Props = {
  id: number;
  url: string;
};

export const ItemCard = ({ id, url }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [searchParams, setSearchParams] = useSearchParams();

  // // モーダルを開く関数
  // const openModal = () => {
  //   onOpen();
  //   // setSearchParams({ modal: url }, { replace: false });

  //   // URLにモーダルを開いていることを示すクエリパラメータを追加
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.set("modal", url);
  //   setSearchParams(newSearchParams, { replace: false });
  // };

  // // モーダルを閉じる関数
  // const closeModal = () => {
  //   onClose();
  //   // URLからモーダルに関するクエリパラメータを削除
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.delete("modal");
  //   setSearchParams(newSearchParams, { replace: true });
  // };

  // // URLのクエリパラメータに基づいてモーダルの状態を設定
  // useEffect(() => {
  //   const modalParam = searchParams.get("modal");
  //   if (modalParam === id.toString()) {
  //     onOpen();
  //   } else if (isOpen) {
  //     onClose();
  //   }
  // }, [searchParams, id, isOpen, onOpen, onClose]);

  // const openModal = () => {
  //   setModalOpen(true);
  //   // URLにモーダルを開いていることを示すクエリパラメータを追加
  //   setSearchParams({ modal: "open" }, { replace: false });
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  //   // URLからモーダルに関するクエリパラメータを削除
  //   const newSearchParams = new URLSearchParams(searchParams);
  //   newSearchParams.delete("modal");
  //   setSearchParams(newSearchParams, { replace: true });
  // };

  // // URLのクエリパラメータに基づいてモーダルの状態を設定
  // useState(() => {
  //   if (searchParams.get("modal") === "open") {
  //     setModalOpen(true);
  //   }
  // }, [searchParams]);

  // const [router, setRouter] = useState(null);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // // const [searchParams, setSearchParams] = useSearchParams();

  // const MagicLink = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  //   shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
  // });

  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams);
  // router.replace(`${params.toString()}`);
  // // useEffect(() => {
  // // const router = useNavigation();

  // //   if (isOpen) {
  // //     router.push(url);
  // //   } else {
  // //     router.back();
  // //   }
  // // }, [isOpen, url]);
  // const openModal = () => {
  //   // setSearchParams(true);
  //   const openParams = new URLSearchParams(searchParams);
  //   onOpen();
  //   setSearchParams(openParams);
  //   // useRouter.push(url);
  //   // router.push(url);
  // };
  // const closeModal = () => {
  //   // setSearchParams(false);
  //   const closeParams = new URLSearchParams(searchParams);
  //   onClose();
  //   setSearchParams(closeParams);
  //   // router.push("/");
  // };

  return (
    <Box>
      <Show above="sm">
        {/* <ColumnModal id={id} url={url} /> */}
        <Card
          w="100%"
          direction={{ base: "column", sm: "column" }}
          overflow="hidden"
          variant="outline"
          onClick={onOpen}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "100%" }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt=""
          />
          <Stack w="100%">
            <CardBody>
              <Heading size="md">Title</Heading>
              <Text py="2">test</Text>
              <Text py="2">{`${id}`}</Text>
              <Text py="2">{`${url}`}</Text>
            </CardBody>
          </Stack>
        </Card>
        <ItemModal isOpen={isOpen} onClose={onClose} />
      </Show>
      {/* スマホサイズはItemSlideで実装 */}
    </Box>
  );
};
