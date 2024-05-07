import React from "react";

import Viewer from "@/components/common/editor/viewer";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Loader2 } from "lucide-react";

const emptyContent =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

const WorkDescription = ({
  description,
  isPending,
}: {
  description: string;
  isPending: boolean;
}) => {
  return (
    <ScrollArea className="h-[420px] overflow-y-auto">
      {isPending ? (
        <Loader2 className="mx-auto my-6 h-5 w-5 animate-spin" />
      ) : !description || description === emptyContent ? (
        <div className="p-4">작업 설명이 없습니다.</div>
      ) : (
        <Viewer content={description} />
      )}
    </ScrollArea>
  );
};

export default WorkDescription;
