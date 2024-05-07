import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { NoticeListType } from "../type";

interface NoticeListReqType {
  projectCode: string | undefined;
  data: {
    pageNum: number;
    pageSize: number;
  };
}

export const useGetNoticeList = (req: NoticeListReqType) => {
  const axios = useAxios();
  const { data } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const { projectCode, data } = req;
      const res = await axios.get<
        ResType<{ itemCnt: number; itemList: NoticeListType[] }>
      >(`/api/project/${projectCode}/client/notice/list`, {
        params: data,
      });
      return res.data;
    },
    enabled: !!req.projectCode,
  });

  const itemCnt = data?.data?.itemCnt ?? 0;
  const noticeList = data?.data?.itemList ?? [];

  return { itemCnt, noticeList };
};
