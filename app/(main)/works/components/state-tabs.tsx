"use client";
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useWorkTabActions } from "../../../../store/use-work-tab-store";

interface Props {
  projectCnts: {
    joinProjectWorkList: number;
    availableProjectWorkList: number;
  };
}

const StateTabs = ({ projectCnts }: Props) => {
  const { setWorkTab } = useWorkTabActions();
  return (
    <TabsList className="mb-4 gap-2">
      <TabsTrigger value="in-progress" asChild>
        <Button
          variant={"outline_fill"}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setWorkTab("in-progress");
          }}
        >
          참여 중
          <span className="ml-2">{projectCnts?.joinProjectWorkList ?? 0}</span>
        </Button>
      </TabsTrigger>
      <TabsTrigger value="supportable" asChild>
        <Button
          variant={"outline_primary"}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setWorkTab("supportable");
          }}
        >
          참여 가능
          <span className="ml-2">
            {projectCnts?.availableProjectWorkList ?? 0}
          </span>
        </Button>
      </TabsTrigger>
      <TabsTrigger value="closed" asChild>
        <Button
          variant={"outline"}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setWorkTab("closed");
          }}
        >
          마감
        </Button>
      </TabsTrigger>
    </TabsList>
  );
};

export default StateTabs;
