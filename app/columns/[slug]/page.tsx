"use client";

import { ItemCardPage } from "@/components/ItemCardPage";
import { BaseContent } from "@/components/base/BaseContent";

export default function ColumnShow() {
  const ItemPickList = [];
  ItemPickList.push(<ItemCardPage key={1} />);

  return <BaseContent>{ItemPickList}</BaseContent>;
}
