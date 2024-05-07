import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { GetProjectListResType } from "../type";

export const useProjectList = () => {
  const axios = useAxios();
  const { data, isPending } = useQuery({
    queryKey: ["GET", "client", "vw","work", "list"],
    queryFn: async () => {
      const res = await axios.get<ResType<GetProjectListResType>>(
        `/api/client/work/vw/list`,
      );
      return res.data;
    },
  });

  const projectCnts = {
    joinProjectWorkList: data?.data?.joinProjectWorkList?.itemCnt ?? 0,
    availableProjectWorkList:
      data?.data?.availableProjectWorkList?.itemCnt ?? 0,
  };

  const joinProjectWorkList = useMemo(
    () => data?.data?.joinProjectWorkList?.itemList ?? [],
    [data],
  );
  const availableProjectWorkList = useMemo(
    () => data?.data?.availableProjectWorkList?.itemList ?? [],
    [data],
  );
  const closedProjectWorkList = useMemo(
    () => data?.data?.closedProjectWorkList?.itemList ?? [],
    [data],
  );

  return {
    projectCnts,
    joinProjectWorkList,
    availableProjectWorkList,
    closedProjectWorkList,
    isPending,
  };
};
