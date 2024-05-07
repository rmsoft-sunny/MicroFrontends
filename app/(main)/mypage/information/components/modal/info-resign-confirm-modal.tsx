import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  onClose: () => void;
}

export const InfoResignConfirmModal = ({
  isOpenModal,
  setIsOpenModal,
  onClose,
}: Props) => {
  const router = useRouter();

  const onResign = () => {
    toast.success("탈퇴되었습니다.");
    onClose();
    router.push("/");
  };

  return (
    <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>회원 탈퇴 완료</AlertDialogTitle>
          <AlertDialogDescription>
            이용해주셔서 감사합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button className="w-full" onClick={onResign}>
            홈으로 이동하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
