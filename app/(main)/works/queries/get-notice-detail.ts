import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { NoticeDetailType } from "../type";

export const useGetNoticeDetail = ({
  noticeIdx,
  projectCode,
}: {
  noticeIdx: number | undefined;
  projectCode: string | undefined;
}) => {
  const axios = useAxios();
  const query = useQuery({
    queryKey: ["GET", "project", "client", "notice", noticeIdx, projectCode],
    queryFn: async () => {
      const res = await axios.get<ResType<NoticeDetailType>>(
        `/api/project/${projectCode}/client/notice/${noticeIdx}`,
      );
      return res.data;
    },
    enabled: !!noticeIdx && !!projectCode,
  });

  return query;
};
