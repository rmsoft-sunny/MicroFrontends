import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { WorkRequestReqType } from "../type";

export const usePostRequestValidate = () => {
  const [token] = useLocalStorage("access", "");

  const axios = useAxios();

  const mutation = useMutation({
    mutationFn: async ({
      projectCode,
      workIdx,
    }: {
      projectCode: string;
      workIdx: number;
    }) => {
      const res = await axios.post<ResType<WorkRequestReqType>>(
        `/api/project/${projectCode}/client/work/${workIdx}/v/task/validate/request`,
      );
      return res.data;
    },
    onSuccess(res) {
      switch (res.code) {
        case 100:
          if (token === "" || !token)
            return toast.error(
              "계정정보가 유효하지 않습니다. 관리자에게 문의하세요.",
            );

          const { url, workIdx, taskIdx, roleType, path } = res.data;
          window.open(
            `${url}?t=${encodeURIComponent(token)}&c=${path}&roleType=${roleType}&task=${taskIdx}&work=${workIdx}`,
          );
          break;
        case 1216:
          return toast.error("할당 가능한 일감이 없습니다.");
        case 1225:
          return toast.error(
            "작업 상태가 유효하지 않습니다. 관리자에게 문의하세요.",
          );
        case 1703:
          return toast.error(
            "해당 일감의 검수 권한이 없습니다. 관리자에게 문의하세요.",
          ); //해당 작업의 검수자x
        case 1707:
          return toast.error("검수 가능한 작업이 없습니다.");
        case 1709:
          return toast.error(
            "검수 URL이 존재하지 않습니다. 관리자에게 문의하세요.",
          );
        default:
          toast.error("검수를 시작할 수 없습니다. 관리자에게 문의하세요.");
      }
    },
  });
  return mutation;
};
