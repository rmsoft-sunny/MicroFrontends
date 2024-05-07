import Image from "next/image";

export const SecondSectionComponent = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-semibold text-[#707070]/80">
          We are hiring
        </h1>
        <div className="py-8 text-[46px] font-bold text-slate-700">
          AI를 함께 키워갈 <span className="text-blue-500">크라우드 워커</span>
          를 모집합니다
        </div>
        <div className="text-[34px] text-slate-700">
          데이터를 가공하여 AI에게 학습시켜주세요
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-10 pr-40">
        <div className="mt-32">
          <Image
            src="https://clive-staging-resource.s3.ap-northeast-2.amazonaws.com/main/CK_ti122a17708-(1)(2).jpg"
            alt="robot-hand"
            width={400}
            height={600}
          />
        </div>
        <div className="grid gap-5">
          <div className="flex items-center gap-4 text-slate-700">
            <div className="w-[120px] text-[28px] font-bold">자격요건</div>
            <div className="w-[260px] border-b-2 border-blue-400 text-2xl font-semibold text-blue-500">
              남녀노소 누구나
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <div className="w-[120px] text-[28px] font-bold">장소</div>
            <div className="w-[260px] border-b-2 border-blue-400 text-2xl font-semibold text-blue-500">
              컴퓨터가 있는 곳(재택가능)
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <div className="w-[120px] text-[28px] font-bold">시간</div>
            <div className="w-[260px] border-b-2 border-blue-400 text-2xl font-semibold text-blue-500">
              내가 하고 싶을 때
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
