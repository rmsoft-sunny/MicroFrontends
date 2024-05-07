import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

interface Props {
  prePwd: string;
  pwd: string;
}

export const usePostPasswordService = () => {
  const axios = useAxios();
  const postPassword = async ({ prePwd, pwd }: Props) => {
    const response = await axios.put("/api/client/user/pwd", { prePwd, pwd });
    return response;
  };

  const mutation = useMutation({
    mutationFn: postPassword,
  });

  return mutation;
};
