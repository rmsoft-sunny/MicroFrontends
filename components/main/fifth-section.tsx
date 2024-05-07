import { ChevronRight } from "lucide-react";
import Image from "next/image";

export const FifthSectionComponent = () => {
  return (
    <div className="h-[80%] w-[80%]">
      <div className="text-[30px] font-bold text-white">Point</div>
      <div className="py-8 text-[46px] font-bold text-white">
        포인트 지급 절차
      </div>
      <div className="mt-10 flex gap-8">
        <div className="h-[330px] w-[316px] rounded-bl-[16%] rounded-tr-[16%] border-[3px] border-white p-4">
          <div className="mb-6 text-[28px] font-bold text-white">01</div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <Image
                src="/icon/main-signup.svg"
                alt=""
                width={64}
                height={70}
              />
            </div>
            <div className="text-[28px] font-bold text-white">회원가입</div>
            <div className="text-[20px] text-white">데이터 라벨러 회원가입</div>
          </div>
        </div>
        <div className="flex items-center">
          <ChevronRight className="h-9 w-9 text-white" />
        </div>
        <div className="h-[330px] w-[316px] rounded-bl-[16%] rounded-tr-[16%] border-[3px] border-white p-4">
          <div className="mb-6 text-[28px] font-bold text-white">02</div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <Image src="/icon/work.svg" alt="" width={80} height={70} />
            </div>
            <div className="text-[28px] font-bold text-white">작업 시작</div>
            <div className="text-[20px] text-white">원하는 프로젝트를 시작</div>
          </div>
        </div>
        <div className="flex items-center">
          <ChevronRight className="h-9 w-9 text-white" />
        </div>
        <div className="h-[330px] w-[316px] rounded-bl-[16%] rounded-tr-[16%] border-[3px] border-white p-4">
          <div className="mb-6 text-[28px] font-bold text-white">03</div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <Image
                src="/icon/inspection.svg"
                alt=""
                width={100}
                height={80}
              />
            </div>
            <div className="text-[28px] font-bold text-white">검수 과정</div>
            <div className="text-[20px] text-white">작업 결과물을 검수</div>
          </div>
        </div>
        <div className="flex items-center">
          <ChevronRight className="h-9 w-9 text-white" />
        </div>
        <div className="h-[330px] w-[316px] rounded-bl-[16%] rounded-tr-[16%] border-[3px] border-white bg-white p-4">
          <div className="mb-6 text-[28px] font-bold text-slate-700">04</div>
          <div className="flex flex-col items-center gap-6">
            <div>
              <Image src="/icon/point.svg" alt="" width={80} height={72} />
            </div>
            <div className="text-[28px] font-bold text-slate-700">
              포인트 적립
            </div>
            <div className="text-[20px] text-slate-700">
              검수 통과 시 포인트 적립
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
