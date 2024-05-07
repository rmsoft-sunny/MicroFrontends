import React, { useEffect, useState } from "react";

import { DialogContent } from "@/components/ui/dialog";

import NoticeDetail from "./notice-detail";
import NoticeListTable from "./notice-list-table";
import { Dialog } from "@radix-ui/react-dialog";

const ProjectNoticeModal = ({
  open,
  setOpen,
  noticeIdx,
  projectCode,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noticeIdx: number | undefined;
  projectCode: string | undefined;
}) => {
  const [state, setState] = useState<"LIST" | "DETAIL">("DETAIL");
  const [selectedNoticeIdx, setSelectedNoticeIdx] = useState(noticeIdx);

  const backToList = () => {
    setState("LIST");
  };

  const selectNotice = (noticeIdx: number) => {
    setSelectedNoticeIdx(noticeIdx);
    setState("DETAIL");
  };

  useEffect(() => {
    setSelectedNoticeIdx(noticeIdx);
    setState("DETAIL");
  }, [open, noticeIdx]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={"max-w-[calc(1080px+48px)]"}>
        {state === "LIST" ? (
          <NoticeListTable
            selectNotice={selectNotice}
            projectCode={projectCode}
          />
        ) : (
          <NoticeDetail
            noticeIdx={selectedNoticeIdx}
            projectCode={projectCode}
            backToList={backToList}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectNoticeModal;
