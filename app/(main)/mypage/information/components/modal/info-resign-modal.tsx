import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { InfoResignConfirmModal } from "./info-resign-confirm-modal";
import { useDeleteInfomation } from "../../services/delete-infomation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  password: z.string().trim().min(1, {
    message: "필수값입니다.",
  }),
});

interface Props {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
  onClose: () => void;
}

export const InfoResignModal = ({
  isOpenModal,
  setIsOpenModal,
  onClose,
}: Props) => {
  const [open, setOpen] = useState({
    password: false,
    modal: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useDeleteInfomation({ setOpen, onClose, setIsLoading }); //회원탈퇴

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      mutate({ pwd: form.getValues("password") });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <AlertDialogContent className="max-w-[400px] gap-6">
        <AlertDialogHeader>
          <AlertDialogTitle>회원 탈퇴</AlertDialogTitle>
          <AlertDialogDescription>
            회원 탈퇴를 위해 비밀번호를 재확인합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Input
                        type={open.password ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect="off"
                        min="0"
                        className="pr-10"
                        {...field}
                        disabled={isLoading}
                      />
                      <div className={cn("text-xs")}>
                        <FormMessage />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            {open.password ? (
              <Eye
                className={`absolute left-[340px] top-[112px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary`}
                onClick={() =>
                  setOpen((prevState) => ({
                    ...prevState,
                    password: false,
                  }))
                }
              />
            ) : (
              <EyeOff
                className={`absolute left-[340px] top-[112px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary`}
                onClick={() =>
                  setOpen((prevState) => ({
                    ...prevState,
                    password: true,
                  }))
                }
              />
            )}
            <div className="mt-4 flex w-full justify-end gap-2">
              <Button
                variant={"outline"}
                onClick={onClose}
                type="button"
                disabled={isLoading}
              >
                취소
              </Button>
              <Button
                variant={"destructive"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                탈퇴
              </Button>
            </div>
          </form>
        </Form>
        {open.modal && (
          <InfoResignConfirmModal
            isOpenModal={open.modal}
            setIsOpenModal={() => {
              setOpen((prevState) => ({ ...prevState, modal: true }));
            }}
            onClose={() =>
              setOpen((prevState) => ({ ...prevState, modal: false }))
            }
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
