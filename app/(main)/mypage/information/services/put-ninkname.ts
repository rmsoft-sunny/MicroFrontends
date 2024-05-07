import { useAxios } from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

interface Props {
  nickname: string;
}

export const usePutNickname = ({
  form,
  setNickName,
}: {
  form: any;
  setNickName: Dispatch<SetStateAction<string>>;
}) => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (options: Props) => {
      const res = await axios.put(`/api/client/user/nickname`, {
        nickname: options.nickname,
      });

      return res.data;
    },
    onSuccess: (res) => {
      switch (res.code) {
        case 100:
          toast.success("수정되었습니다.");
          setNickName("");
          form.reset();
          queryClient.removeQueries({
            queryKey: ["GET", "client", "user", "info"],
          });
          break;

        default:
          toast.error("수정에 실패했습니다. 관리자에게 문의하세요.");
      }
    },
  });
  const mutate = async (options: Props) => {
    await mutation.mutateAsync(options);
  };

  return {
    mutate,
    isPending: mutation.isPending,
  };
};
