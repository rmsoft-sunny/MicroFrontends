import React from "react";

const WorksHeader = ({ hasButton }: { hasButton?: boolean }) => {
  return (
    <div
      className={`grid grid-cols-[700px_120px_140px_140px_auto] items-center gap-2 border-t p-3`}
    >
      <div className="text-center font-semibold">작업명</div>
      <div className="text-center font-semibold ">참여자</div>
      <div className="text-center font-semibold ">진행률</div>
      <div className="text-center font-semibold ">포인트</div>
      {hasButton && <div className="w-[88px]"></div>}
    </div>
  );
};

export default WorksHeader;
