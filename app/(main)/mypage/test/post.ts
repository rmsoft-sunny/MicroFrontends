import { useAxios } from "@/hooks/useAxios";
import { useProject } from "@/hooks/useProject";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
interface Props {
  workIdx: number;
}
export const Api = () => {
  const axios = useAxios();
  const router = useRouter();
  const project = useProject();
  const projectCode = project?.path;

  const mutate = useMutation({
    mutationFn: async (options: Props) => {
      const res = await axios.post(
        `/api/project/${projectCode}/client/work/${options.workIdx}/w/task/request`,
        { workIdx: options.workIdx },
      );

      return res.data;
    },

    onSuccess: (res) => {
      const data = res.data;

      switch (res.code) {
        case 100:
          const roleType = data.roleType;
          // data.url에서 동적 세그먼트 값을 가져오기
          const segments = data.url.split("/").slice(-2);
          const value1 = segments[0];
          const value2 = segments[1] || ""; // 두 번째 세그먼트가 없을 경우 빈 문자열 처리
          router.push(
            `/text-working?task=${value1}&work=${value2}&roleType=${roleType}`,
          );
          break;
      }
    },
  });

  return mutate;
};
