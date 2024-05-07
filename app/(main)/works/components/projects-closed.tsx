"use client";
import React, { useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

import ProjectItem from "./project-item";
import ProjectTaskItem from "./project-task-item";
import WorksHeader from "./works-header";

import { ProjectListType } from "../type";

interface Props {
  projects: ProjectListType[];
}

const status = "END";
const ProjectsClosed = ({ projects }: Props) => {
  const LASTPAGE = Math.ceil(projects.length / 5);
  const [page, setPage] = useState(1);

  const { ref } = useIntersectionObserver({
    onChange: (isInView) => isInView && page < LASTPAGE && setPage(page + 1),
  });

  return (
    <div className="pointer-events-none opacity-60 grayscale-[20%]">
      {projects.length ? (
        projects.slice(0, page * 5).map((project) => (
          <div
            key={project.projectIdx}
            className="my-4 overflow-hidden rounded-md border bg-background shadow-sm"
          >
            <ProjectItem project={project} />
            <WorksHeader />
            {project.workDTOList.map((work: any) => (
              <div key={work.workIdx} className={"cursor-default"}>
                <ProjectTaskItem work={work} status={status} />
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="rounded-md border bg-background p-6 text-center shadow-sm">
          마감 된 프로젝트가 없습니다.
        </div>
      )}
      <div ref={ref} className="h-[1rem]" />
    </div>
  );
};

export default ProjectsClosed;
