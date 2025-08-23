"use client";

import { ItemCardPage } from "@/components/ItemCardPage";
// import { BaseModalContent } from "@/app/@modal/_components/Modal";

export default function ArticleShow() {
  const ItemPickList = [];
  ItemPickList.push(<ItemCardPage key={1} />);

  return (
    // <BaseModalContent>
    <div className="flex flex-col space-y-4">{ItemPickList}</div>
    // </BaseModalContent>
  );
}
