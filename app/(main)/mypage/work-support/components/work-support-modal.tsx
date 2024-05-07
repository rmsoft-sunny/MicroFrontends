import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Row } from "@tanstack/react-table";

interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  rejectMsg: any;
}
export const WorkSupportModal = ({
  isModalOpen,
  onClose,
  rejectMsg,
}: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <AlertDialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>반려 사유</AlertDialogTitle>
          <p className="basicFont">{rejectMsg}</p>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction disabled={loading} onClick={onClose}>
            {loading && <Loader2 className="z mr-2 h-4 w-4 animate-spin" />}
            닫기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
