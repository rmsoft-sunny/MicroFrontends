"use client";
import React from "react";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import StateTabs from "./components/state-tabs";
import ProjectsProgress from "./components/projects-progress";
import ProjectsSupportable from "./components/projects-supportable";
import ProjectsClosed from "./components/projects-closed";

import { useWorkTab } from "@/store/use-work-tab-store";
import { useProjectList } from "./queries/get-projects";
import { Loader2 } from "lucide-react";

const WorksMainPage = () => {
  // 탭의 위치를 state(+ storage)에 저장하여 상세페이지에 다녀와도 탭 위치가 고정
  const workTab = useWorkTab();

  const {
    projectCnts,
    joinProjectWorkList,
    availableProjectWorkList,
    closedProjectWorkList,
    isPending,
  } = useProjectList();

  return (
    <div className="mx-auto my-6 min-h-screen w-[1280px]">
      <Tabs defaultValue="in-progress" value={workTab}>
        <StateTabs projectCnts={projectCnts} />
        <TabsContent value="in-progress">
          {isPending ? 
            <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin" />
            :
            <ProjectsProgress projects={joinProjectWorkList} />
          }
        </TabsContent>
        <TabsContent value="supportable">
          {isPending ? 
            <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin" />
            :
            <ProjectsSupportable projects={availableProjectWorkList} />
          }
        </TabsContent>
        <TabsContent value="closed">
          {isPending ? 
            <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin" />
            :
            <ProjectsClosed projects={closedProjectWorkList} />
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorksMainPage;
