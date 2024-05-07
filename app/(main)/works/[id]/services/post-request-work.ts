import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { WorkRequestReqType } from "../type";

export const usePostRequestWork = () => {
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
        `/api/project/${projectCode}/client/work/${workIdx}/w/task/request`,
      );
      return res.data;
    },
    onSuccess(res) {
      switch (res.code) {
        case 100:
          if (token === "" || !token)
            return toast.error(
              "계정정보가 유효하지 않습니다. 다시 로그인해주세요.",
            );
          const { url, workIdx, taskIdx, roleType, path } = res.data;
          window.open(
            `${url}?t=${encodeURIComponent(token)}&c=${path}&roleType=${roleType}&task=${taskIdx}&work=${workIdx}`,
          );
          break;
        case 603:
          return toast.error("작업이 존재하지 않습니다.");
        case 1208:
          return toast.error(
            "계정이 존재하지 않습니다. 관리자에게 문의하세요.",
          );

        case 1209:
          return toast.error(
            "계정이 비활성화 되었습니다. 관리자에게 문의하세요.",
          );
        case 601:
        case 1210:
          return toast.error(
            "작업 URL이 존재하지 않습니다. 관리자에게 문의하세요.",
          );
        case 1212:
          return toast.error(
            "승인 된 작업자가 아닙니다. 관리자에게 문의하세요.",
          );
        case 1213:
        case 1216:
        case 1707:
        case 1708:
          return toast.error("잔여 일감이 없습니다.");
        case 1211:
        case 1214: // 일감 업데이트 오류
        case 1215: // 로그인 insert 오류
          return toast.error(
            "작업을 시작할 수 없습니다. 관리자에게 문의하세요.",
          );
        case 1225:
          return toast.error(
            "작업 상태가 유효하지 않습니다. 관리자에게 문의하세요.",
          );
        case 1703:
          return toast.error(
            "확인되지 않은 사용자입니다. 관리자에게 문의하세요.",
          );
        default:
          toast.error("작업을 시작할 수 없습니다. 관리자에게 문의하세요.");
      }
    },
  });

  return mutation;
};
