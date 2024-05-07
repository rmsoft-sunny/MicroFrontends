import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

// 회원탈퇴 api
interface Options {
  pwd: string;
}
interface Props {
  setOpen: Dispatch<
    SetStateAction<{
      password: boolean;
      modal: boolean;
    }>
  >;
  onClose: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const useDeleteInfomation = ({
  setOpen,
  onClose,
  setIsLoading,
}: Props) => {
  const axios = useAxios();
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: async (options: Options) => {
      const res = await axios.delete(`/api/client/user/delete`, {
        data: {
          pwd: options.pwd,
        },
      });

      return res.data;
    },

    onSuccess: (res) => {
      switch (res.code) {
        case 100:
          setTimeout(() => {
            setOpen((prevState) => ({ ...prevState, modal: true }));
            localStorage.clear();
            toast.success("회원탈퇴가 완료되었습니다.");
            onClose();
            router.replace("/login");
          }, 1000);
          break;
        case 601:
          setTimeout(() => {
            setIsLoading(false);
            toast.error("비밀번호를 확인해주세요.");
          }, 1000);
          break;
        case 1007:
          setTimeout(() => {
            setIsLoading(false);
            toast.error("기존 비밀번호가 일치하지 않습니다.");
          }, 1000);
          break;

        default:
          setTimeout(() => {
            setIsLoading(false);
            toast.error("관리자에게 문의해주세요.");
          }, 1000);
          break;
      }
    },

    onError: (error) => {
      toast.error("관리자에게 문의해주세요.");
    },
  });

  return mutate;
};
