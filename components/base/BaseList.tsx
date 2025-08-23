"use client";

import { ItemBody } from "../ItemBody";

type Props = {
  ids: number[];
  url: string;
};

export const BaseList = ({ ids, url }: Props) => {
  return (
    <div className="space-y-8 p-5">
      {ids.map((id) => (
        <ItemBody key={id} id={id} url={`${url}/${id}`} />
      ))}
    </div>
  );
};
// const list = [];
// for (let i = 0; i <= 2; i++) {
//   list.push(<ItemBody id={i} url={`${url}/${i}`} />);
// }
// return { list };
