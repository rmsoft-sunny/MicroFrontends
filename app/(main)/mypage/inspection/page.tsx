import PageTitle from "@/components/common/page-title";
import { InspectionHistoryMain } from "./components/main";

const InspectionHistoryPage = () => {
  return (
    <>
      <div className="h-full w-full">
        <PageTitle
          title="검수 내역"
          description="검수 내역을 확인 할 수 있습니다."
        />
        <InspectionHistoryMain />
      </div>
    </>
  );
};

export default InspectionHistoryPage;
