import { Separator } from "@/components/ui/separator";

export const ThirdSectionComponent = () => {
  return (
    <>
      <div className="mb-8 px-32 text-[30px] font-bold">
        AI에게 <span className="text-blue-500">데이터를 왜 가공</span>
        하나요?
      </div>
      <Separator className="h-[2px]" />
      <div className="mt-6 px-32 text-[20px]">
        AI에게 가르치기 위해 여러 데이터를 반복적으로 학습시켜주는 과정이
        필요하기 때문에 AI가 읽을 수 있도록 데이터를 가공하면 인공지능 성능
        향상에 도움이 됩니다.
      </div>
    </>
  );
};
