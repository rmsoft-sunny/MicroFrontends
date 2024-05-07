import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

export const FourthSectionComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold text-[#707070]/80">
          A variety of projects
        </h1>

        <div className="py-8 text-[46px] font-bold text-slate-700">
          AI 성장을 위한 <span className="text-blue-800">다양한 프로젝트</span>
        </div>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex h-[220px] w-full items-start justify-center gap-16">
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-[80px] w-[304px] rounded-full bg-blue-800 text-[28px]",
            )}
          >
            수집 메타데이터 입력
          </div>

          <div className="h-[180px] w-[180px] rounded-full shadow-xl">
            <Image
              src="https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/main/mainImg4.jpg"
              width={200}
              height={200}
              priority={true}
              alt="ai-image"
              className="rounded-full"
            />
          </div>

          <div className="flex h-[80px] w-[170px] items-center justify-center rounded-full border-2 border-blue-800 bg-white text-[28px] font-semibold text-blue-800 hover:bg-none">
            수동 전사
          </div>
          <div className="h-[180px] w-[180px] rounded-full shadow-xl">
            <Image
              src="https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/main/mainImg5.jpg"
              width={200}
              height={200}
              priority={true}
              alt="ai-image"
              className="rounded-full"
            />
          </div>
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-[80px] w-[304px] rounded-full bg-blue-800 text-[28px]",
            )}
          >
            텍스트 발화 문장 분류
          </div>
        </div>
        <div className="flex w-full items-end justify-center gap-20">
          <div className="h-[180px] w-[180px] rounded-full shadow-xl ">
            <Image
              src="https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/main/mainImg6.jpg"
              width={200}
              height={200}
              priority={true}
              alt="ai-image"
              className="rounded-full"
            />
          </div>
          <div className="flex h-[80px] w-[254px] items-center justify-center rounded-full border-2 border-blue-800 bg-white text-[28px] font-semibold text-blue-800 hover:bg-none">
            음성 데이터 정제
          </div>
          <div
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-[80px] w-[196px] rounded-full bg-blue-800 text-[28px]",
            )}
          >
            일본어 번역
          </div>
          <div
            className={cn(
              "flex h-[80px] w-[196px] items-center justify-center rounded-full border-2 border-blue-800 bg-white text-[28px] font-semibold text-blue-800 hover:bg-none",
            )}
          >
            중국어 번역
          </div>
        </div>
      </div>
    </>
  );
};
