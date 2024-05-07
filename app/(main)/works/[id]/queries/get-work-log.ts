import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { WorkTaskListType } from "../type";
import { ResType } from "@/types/type";
import { useUser } from "@/hooks/useUser";
import { RoleType } from "@/enums/enum-list";

interface GetWorkLogReqType {
  projectCode: string | null;
  workIdx: number;
  data: {
    pageNum: number;
    pageSize: number;
    taskStatusList: string[];
  };
}

export const useGetWorkLog = (
  req: GetWorkLogReqType,
  roleType: keyof typeof RoleType | undefined,
) => {
  const axios = useAxios();
  const { data } = useQuery({
    queryKey: ["GET", "project", "client", "work", "w", "task", "list", req],
    queryFn: async () => {
      const { projectCode, workIdx, data } = req;
      const res = await axios.get<
        ResType<{ itemCnt: number; itemList: WorkTaskListType[] }>
      >(`/api/project/${projectCode}/client/work/${workIdx}/w/task/list`, {
        params: data,
        paramsSerializer: {
          indexes: null,
        },
      });
      return res.data;
    },
    enabled:
      !!req.projectCode &&
      (roleType === "PROJECT_WORKER" || roleType === "WORKER"),
  });

  const itemCnt = useMemo(() => data?.data?.itemCnt ?? 0, [data]);
  const logList = useMemo(() => data?.data?.itemList ?? [], [data]);

  return { itemCnt, logList };
};
