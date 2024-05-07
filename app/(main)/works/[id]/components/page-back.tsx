"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PageBack = () => {
  const router = useRouter();
  return (
    <div
      className="my-4 flex w-fit cursor-pointer items-center gap-2 text-lg font-semibold"
      onClick={() => router.push("/works")}
    >
      <ArrowLeft />
      뒤로가기
    </div>
  );
};

export default PageBack;
