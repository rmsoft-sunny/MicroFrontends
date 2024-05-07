import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const FirstSectionComponent = () => {
  return (
    <>
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="/image/clive-main.png"
          alt="Photo by Drew Beamer"
          fill
          className="object-cover"
          priority={true}
        />
      </AspectRatio>
      <div className="absolute left-[20%] top-1/4 flex w-[600px] flex-col text-white transition-all duration-300 2xl:left-[15%] 2xl:top-[30%]">
        <div className="p-4 text-3xl font-bold transition-all duration-300 2xl:text-[46px]">
          쉽게 일하고 쉽게 벌자 !
        </div>
        <div className="p-4">
          <div className="text-xl font-bold transition-all duration-300 2xl:text-3xl">
            언제 어디서나 누구나 할 수 있는 <br /> AI 데이터 구축 크라우드 소싱
            프로젝트
          </div>
        </div>
      </div>
    </>
  );
};
