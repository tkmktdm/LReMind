"use client";
import Link from "next/link";
import { BaseContent } from "./base/BaseContent";

type Props = {
  id: number;
  url: string;
};

export const ItemBody = ({ id, url }: Props) => {
  return (
    <Link href={url} className="px-7">
      {/* <div className="w-full flex flex-col sm:flex-row border rounded-lg overflow-hidden"> */}
      <img
        className="object-cover w-full sm:w-1/5"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?auto=format&fit=crop&w=800&q=60"
        alt=""
      />
      <div className="flex flex-col w-full p-4">
        <h2 className="text-lg font-semibold">Title</h2>
        <p className="py-2">test</p>
        <p className="py-2">{id}</p>
      </div>
      {/* </div> */}
    </Link>
  );
};
