import { useAxios } from "@/hooks/useAxios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SearchProps } from "../components/work-container";
import { toast } from "sonner";

export const useGetWorkList = (search: SearchProps) => {
  const router = useRouter();
  const axios = useAxios();
  const queryFunction = async (pageParam: number) => {
    const response = await axios.get(`/api/client/work/w/task/list`, {
      params: {
        pageNum: pageParam + 1,
        workName: search.workName,
        startDate: search.dateRange.from,
        endDate: search.dateRange.to,
        taskStatusList: search.taskStatusList,
      },
      paramsSerializer: {
        indexes: null,
      },
    });
    return response;
  };

  const query = useInfiniteQuery({
    queryKey: ["GET", "work", "w", "task", "list", search],
    queryFn: ({ pageParam }) => queryFunction(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const totalCount = lastPage.data.data?.itemCnt ?? 0;

      if (Math.ceil(totalCount / 10) <= lastPageParam + 1) {
        return null;
      }

      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (query.isError) return null;
  if (query.isSuccess) {
    const responseCode = query.data.pages[0].data.code;

    switch (responseCode) {
      case 100:
        return {
          list: query.data.pages,
          itemCnt: query.data.pages[0].data.data.itemCnt as number,
          hasNextPage: query.hasNextPage,
          fetchNextPage: query.fetchNextPage,
          isLoading: query.isLoading,
          isFetchingNextPage: query.isFetchingNextPage,
          isFetching: query.isFetching,
          isPending: query.isPending,
          refetch: query.refetch,
        };
      case 822: // refresh토큰이 만료 된 경우
      case 825: // 정지 된 계정
      case 828: // 유효하지 않은 토큰
      case 852: // header에 토큰이 없는 경우
      case 855: // refresh토큰이 없는 경우
        localStorage.clear();
        toast.error("로그아웃 되었습니다. 로그인 페이지로 이동합니다.", {
          position: "top-center",
          id: "logout-toast",
        });
        router.replace("/login");
        break;
      default:
        return null;
    }
  }
  return null;
};
