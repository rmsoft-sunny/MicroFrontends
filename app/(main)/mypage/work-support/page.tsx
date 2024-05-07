import PageTitle from "@/components/common/page-title";
import React from "react";
import { WorkSupportContainer } from "./components/work-support-container";

//작업지원내역
const WorkSupport = () => {
  return (
    <div className="h-full w-full">
      <PageTitle
        title="작업 지원 내역"
        description="작업 지원 내역을 확인 할 수 있습니다."
      />
      <WorkSupportContainer />
    </div>
  );
};

export default WorkSupport;
