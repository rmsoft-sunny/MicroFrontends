import { useAxios } from "@/hooks/useAxios";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { SearchProps } from "../components/main";
import { toast } from "sonner";

export const useGetCalculationHistoryList = (search: SearchProps) => {
  const router = useRouter();
  const axios = useAxios();
  const queryFunction = async (pageParam: number) => {
    const response = await axios.get(`/api/client/calculate/list`, {
      params: {
        pageNum: pageParam + 1,
        workName: search.workName,
        startDate: search.dateRange.from,
        endDate: search.dateRange.to,
        paymentStatusTypeList: search.paymentStatusTypeList,
      },
      paramsSerializer: {
        indexes: null,
      },
    });
    return response;
  };
  const fetchResult = useInfiniteQuery({
    queryKey: ["GET", "calculate", "list", search],
    queryFn: ({ pageParam }) => queryFunction(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const totalCount = lastPage.data?.data?.itemCnt ?? 0;

      if (Math.ceil(totalCount / 10) <= lastPageParam + 1) {
        return null;
      }

      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
  if (fetchResult.isError) return null;
  if (fetchResult.isSuccess) {
    const responseCode = fetchResult.data.pages[0].data?.code;

    switch (responseCode) {
      case 100:
        return {
          list: fetchResult.data.pages,
          itemCnt: fetchResult.data.pages[0].data.data?.itemCnt as number,
          hasNextPage: fetchResult.hasNextPage,
          fetchNextPage: fetchResult.fetchNextPage,
          isLoading: fetchResult.isLoading,
          isFetchingNextPage: fetchResult.isFetchingNextPage,
          isFetching: fetchResult.isFetching,
          isPending: fetchResult.isPending,
          refetch: fetchResult.refetch,
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
