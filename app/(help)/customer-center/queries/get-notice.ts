import { useAxios } from "@/hooks/useAxios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { NoticeList } from "../schema";
import { ResType } from "@/types/type";

export const useGetNoticeQuery = () => {
  const axios = useAxios();

  const getNotice = async (pageParam: number) => {
    const res = await axios.get<
      ResType<{ itemCnt: number; itemList: NoticeList }>
    >("/api/client/notice/list", {
      params: {
        pageNum: pageParam,
      },
    });

    return res.data?.data;
  };

  return useInfiniteQuery({
    queryKey: ["GET", "notice"],
    queryFn: ({ pageParam }) => getNotice(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const totalCount = lastPage?.itemCnt ?? 0;

      if (Math.ceil(totalCount / 10) <= lastPageParam) {
        return null;
      }

      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
