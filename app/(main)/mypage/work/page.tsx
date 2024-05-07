import PageTitle from "@/components/common/page-title";
import { WorkContainer } from "./components/work-container";

//작업내역
const WorkSupport = () => {
  return (
    <div className="h-full w-full">
      <PageTitle
        title="작업 내역"
        description="작업 내역을 확인 할 수 있습니다."
      />
      <WorkContainer />
    </div>
  );
};

export default WorkSupport;
