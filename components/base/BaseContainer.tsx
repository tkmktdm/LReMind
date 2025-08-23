"use client";

export default function BaseContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-w-full min-h-[6vh] px-0 bg-white">{children}</div>;
}
