"use client";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

export const LastSectionComponent = () => {
  const [token] = useLocalStorage("access", "");

  return (
    <>
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="/image/clive-main-bottom.png"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
          priority={true}
        />
      </AspectRatio>
      <div className="absolute top-[10%] flex w-full justify-center text-[50px] font-bold text-slate-700">
        지금 &nbsp;<span className="text-primary">클리브웍스</span>를
        시작해보세요
      </div>
      <div className="absolute bottom-[10%] right-[5%] flex flex-col gap-6">
        <Button
          className="h-[68px] w-[260px] rounded-full border-none bg-blue-800 text-[28px] font-bold text-white hover:text-blue-800"
          variant="outline"
        >
          <Link href={token === "" ? "/login" : "/works"} prefetch>
            시작하기
          </Link>
        </Button>
      </div>
    </>
  );
};
