"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import ProjectItem from "./project-item";
import ProjectTaskItem from "./project-task-item";
import WorksHeader from "./works-header";

import { ProjectListType } from "../type";
import { useIntersectionObserver } from "usehooks-ts";

interface Props {
  projects: ProjectListType[];
}

const status = "JOIN";

const ProjectsProgress = ({ projects }: Props) => {
  const LASTPAGE = Math.ceil(projects.length / 5);

  const router = useRouter();
  const [page, setPage] = useState(1);

  const { ref } = useIntersectionObserver({
    onChange: (isInView) => isInView && page < LASTPAGE && setPage(page + 1),
  });

  return (
    <>
      {projects.length ? (
        projects.slice(0, page * 5).map((project) => (
          <div
            key={project.projectIdx}
            className="mt-4 overflow-hidden rounded-md border bg-background shadow-sm"
          >
            <ProjectItem project={project} />
            <WorksHeader hasButton={true} />
            <div
              className={
                "cursor-pointer transition-transform hover:scale-[1.005]"
              }
              onClick={() =>
                router.push(
                  `/works/${project.workDTOList[0].workIdx}?c=${project.projectCode}`,
                )
              }
            >
              <ProjectTaskItem work={project.workDTOList[0]} status={status} />
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-md border bg-background p-6 text-center shadow-sm">
          참여 중인 프로젝트가 없습니다.
        </div>
      )}
      <div ref={ref} className="h-[1rem]" />
    </>
  );
};

export default ProjectsProgress;
