import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { ResType } from "@/types/type";
import { RoleType } from "@/enums/enum-list";
import { useAxios } from "@/hooks/useAxios";
import { WorkTaskListType } from "../type";

interface GetValidateLogReqType {
  projectCode: string | null;
  workIdx: number;
  data: {
    pageNum: number;
    pageSize: number;
    taskStatusList: string[];
  };
}

export const useGetValidateLog = (
  req: GetValidateLogReqType,
  roleType: keyof typeof RoleType | undefined,
) => {
  const axios = useAxios();
  const { data } = useQuery({
    queryKey: ["GET", "project", "client", "work", "v", "task", "list", req],
    queryFn: async () => {
      const { projectCode, workIdx, data } = req;
      const res = await axios.get<
        ResType<{ itemCnt: number; itemList: WorkTaskListType[] }>
      >(`/api/project/${projectCode}/client/work/${workIdx}/v/task/list`, {
        params: data,
        paramsSerializer: {
          indexes: null,
        },
      });
      return res.data;
    },
    enabled: !!req.projectCode && roleType === "PROJECT_VALIDATOR",
  });

  const itemCnt = data?.data?.itemCnt ?? 0;
  const logList = useMemo(() => data?.data?.itemList ?? [], [data]);

  return { itemCnt, logList };
};
