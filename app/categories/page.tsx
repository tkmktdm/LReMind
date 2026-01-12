"use client";

import { ItemInputBox } from "@/components/ItemInputBox";
import { ItemList } from "@/components/ItemList";
import { BaseContent } from "@/components/base/BaseContent";
import { Box, Button, Flex } from "@chakra-ui/react";

export default function CategoryIndex() {
  // const ItemPickList = [];
  // for (let i = 0; i <= 2; i++) {
  //   ItemPickList.push(
  //     <>
  //       <Box display="flex">
  //         <p>title</p>
  //         <p>notes</p>

  //         <div className="m-14 flex w-fit flex-col gap-4">
  //           <Button>編集</Button>
  //           <Button variant="outline">削除</Button>
  //         </div>
  //       </Box>
  //     </>
  //   );
  // }
  const ItemPickList = [];
  for (let i = 0; i <= 2; i++) {
    ItemPickList.push(<ItemInputBox key={i} id={i} url={`categories/${i}`} />);
  }
  return <BaseContent>{ItemPickList}</BaseContent>;
}
