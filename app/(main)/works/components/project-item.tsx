"use client";
import React, { useState } from "react";
import ProjectNoticeModal from "./notice-modal/main";

import { cn } from "@/lib/utils";
import { ProjectListType } from "../type";

import { Megaphone } from "lucide-react";

interface Props {
  project: ProjectListType;
}

const ProjectItem = ({ project }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <p className="bg-primary px-6 py-4 text-primary-foreground">
        {project.projectName}
      </p>

      <div
        className={cn(
          "flex px-6 py-4 text-sm",
          project.noticeTitle
            ? " cursor-pointer hover:underline"
            : "cursor-default",
        )}
        onClick={() => {
          project.noticeTitle && setModalOpen(true);
        }}
      >
        <Megaphone className="mr-2 h-5 w-4 shrink-0 text-primary" />
        <p className="max-w-full truncate">
          {project.noticeTitle || "공지사항이 없습니다."}
        </p>
      </div>
      <ProjectNoticeModal
        open={modalOpen}
        setOpen={setModalOpen}
        noticeIdx={project.noticeIdx}
        projectCode={project.projectCode}
      />
    </div>
  );
};

export default ProjectItem;
