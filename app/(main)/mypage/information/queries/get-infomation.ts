import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// 내정보 조회 api
export const useGetInfomation = () => {
  const axios = useAxios();

  const { data } = useQuery({
    queryKey: ["GET", "client", "user", "info"],
    queryFn: async () => {
      const res = await axios.get(`/api/client/user/info`);

      return res.data;
    },
  });

  const itemList = useMemo(() => data?.data ?? [], [data]);

  return { itemList };
};
