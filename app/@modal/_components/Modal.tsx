// app/@modal/Modal.tsx
"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function ModalLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={() => router.back()}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
