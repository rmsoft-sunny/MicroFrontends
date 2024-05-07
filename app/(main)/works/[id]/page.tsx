import React from "react";
import PageBack from "./components/page-back";
import WorkDetailContents from "./components/main";

const WorksDetailPage = () => {
  return (
    <div className="mx-auto min-h-screen w-[1280px]">
      <PageBack />
      <WorkDetailContents />
    </div>
  );
};

export default WorksDetailPage;
