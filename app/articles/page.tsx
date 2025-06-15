"use client";

import { ItemList } from "@/components/ItemList";
import { BaseContent } from "@/components/base/BaseContent";

export default function ArticleIndex() {
  const ItemPickList = [];
  for (let i = 0; i <= 2; i++) {
    ItemPickList.push(<ItemList key={i} id={i} url={`articles/${i}`} />);
  }
  return <BaseContent>{ItemPickList}</BaseContent>;
}
