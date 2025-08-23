"use client";
import BaseContainer from "@/components/base/BaseContainer";
import { BaseList } from "@/components/base/BaseList";
import dynamic from "next/dynamic";

export default function Home() {
  const Live2D = dynamic(
    () => import("@/components/Live2D").then((module) => module.Live2D),
    {
      ssr: false,
    }
  );
  return (
    <BaseContainer>
      <div className="fixed">
        <Live2D />
      </div>
      <BaseList ids={[0, 1, 2]} url="articles" />
    </BaseContainer>
  );
}
