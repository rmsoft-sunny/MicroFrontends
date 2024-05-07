import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostFileUpload = () => {
  const axios = useAxios();
  const mutate = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post(
        `/api/contents/file/upload?metaType=ANSWER`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return res.data;
    },
    onSuccess(res) {
      switch (res.code) {
        case 100:
          return;
        case 301:
          return toast.error("파일 용량은 최대 5MB 입니다.");
        default:
          toast.error("파일 업로드에 실패했습니다. 관리자에게 문의하세요.");
      }
    },
  });

  return mutate;
};
