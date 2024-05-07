"use client";

import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const ExampleComponent = () => {
  const axios = useAxios();

  const getWorkList = async (pageParam: number) => {
    const response = await axios.get(`/api/client/work/w/task/list`, {
      params: {
        pageNum: pageParam + 1,
      },
    });
    return response;
  };

  const query = useInfiniteQuery({
    queryKey: ["example"],
    queryFn: ({ pageParam }) => getWorkList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const totalCount = lastPage.data.data.itemCnt;

      if (Math.ceil(totalCount / 10) <= lastPageParam + 1) {
        return null;
      }

      return lastPageParam + 1;
    },
  });

  const onClick = () => {
    query.fetchNextPage();
    console.log("next page", query.hasNextPage);
  };

  return (
    <>
      <div>Component</div>
      <Button onClick={onClick} disabled={!query.hasNextPage}>
        더보기
      </Button>
    </>
  );
};
