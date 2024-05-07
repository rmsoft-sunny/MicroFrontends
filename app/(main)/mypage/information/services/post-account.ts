import { useAxios } from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface Props {
  account: string;
  bankType: string;
}

export const usePostAccountService = () => {
  const axios = useAxios();
  const postAccount = async (options: Props) => {
    const { account, bankType } = options;

    const res = await axios.post(`/api/client/user/account`, {
      account,
      bankType,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: postAccount,
  });

  return {
    mutation,
    isPending: mutation.isPending,
  };
};
