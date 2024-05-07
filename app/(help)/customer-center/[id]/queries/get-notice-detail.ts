import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Notice } from "../../schema";
import { ResType } from "@/types/type";

export const useGetNoticeDetailQuery = (id: string) => {
  const axios = useAxios();

  const getNoticeDetail = async () => {
    const res = await axios.get<ResType<Notice>>(`/api/client/notice/${id}`);

    return res.data;
  };

  return useQuery({
    queryKey: ["GET", "noticeDetail", id],
    queryFn: getNoticeDetail,
  });
};
