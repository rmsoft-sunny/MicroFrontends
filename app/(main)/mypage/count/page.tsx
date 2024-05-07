import PageTitle from "@/components/common/page-title";
import React from "react";
import { CalculationHistoryMain } from "./components/main";

//정산내역
const CalCulationHistoryPage = () => {
  return (
    <div className="h-full w-full">
      <PageTitle
        title="정산 내역"
        description="정산 내역을 확인 할 수 있습니다."
      />
      <CalculationHistoryMain />
    </div>
  );
};

export default CalCulationHistoryPage;
