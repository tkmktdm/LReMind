"use client";

import { ItemList } from "@/components/ItemList";
import { BaseContent } from "@/components/base/BaseContent";

export default function TaskIndex() {
  const ItemPickList = [];
  for (let i = 0; i <= 2; i++) {
    ItemPickList.push(<ItemList id={i} url={`tasks/${i}`} />);
  }
  return <BaseContent>{ItemPickList}</BaseContent>;
}
