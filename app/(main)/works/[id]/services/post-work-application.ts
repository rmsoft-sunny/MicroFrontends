import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostWorkAppReqType {
  projectCode: string;
  workIdx: number;
  data: {
    projectResponseQuestionList: {
      answer?: string;
      filename?: string;
      fileUrl?: string;
      questionIdx: number;
    }[];
    workResponseQuestionList: {
      answer?: string;
      filename?: string;
      fileUrl?: string;
      questionIdx: number;
    }[];
  };
}

export const usePostWorkApplication = () => {
  const axios = useAxios();
  const router = useRouter();
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (req: PostWorkAppReqType) => {
      const { projectCode, workIdx, data } = req;
      const res = await axios.post(
        `/api/project/${projectCode}/client/work/${workIdx}/apply`,
        data,
      );
      return res.data;
    },
    onSuccess: (res) => {
      switch (res.code) {
        case 100:
          client.refetchQueries({
            queryKey: ["GET", "project", "client", "work", "vw"],
          });
          toast.success("신청이 완료되었습니다.");
          break;
        case 201:
        case 203:
          return toast.error("제출에 실패했습니다. 관리자에게 문의하세요.");
        case 1150:
          return toast.error(
            "이미 신청 완료 된 프로젝트입니다. 하나의 프로젝트 당 하나의 작업만 참여 신청 가능합니다.",
          );
        case 1153:
        case 1157:
          return toast.error("응답하지 않은 필수 질문이 있습니다.");
        case 1152:
        case 1156:
          return toast.error("제출에 실패했습니다. 관리자에게 문의하세요.");
        case 1154:
          toast.error(
            "작업 신청을 위해 계좌 인증이 필요합니다. 계좌 인증 페이지로 이동합니다.",
          );
          router.push("/mypage/information");
          break;
        default:
          toast.error("제출에 실패했습니다. 관리자에게 문의하세요.");
      }
    },
    onError() {
      toast.error("제출에 실패했습니다. 관리자에게 문의하세요.");
    },
  });

  return mutation;
};
