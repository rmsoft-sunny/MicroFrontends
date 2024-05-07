import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { WorkInfoType, WorkStatusType } from "../type";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

export const useGetWorkDetail = ({
  projectCode,
  workIdx,
}: {
  projectCode: string | null;
  workIdx: number;
}) => {
  const user = useUser();
  const roleType = user?.roleType;

  const axios = useAxios();

  const { data, isPending } = useQuery({
    queryKey: ["GET", "project", "client", "work", "vw", workIdx],
    queryFn: async () => {
      const res = await axios.get<ResType<WorkInfoType>>(
        `/api/project/${projectCode}/client/work/${workIdx}/vw`,
      );
      return res.data;
    },
    enabled: !!projectCode,
  });

  const workInfo = data?.data;

  const description = data?.data?.description ?? "";

  const projectQuestions = useMemo(
    () => data?.data?.projectQuestionList ?? [],
    [data?.data],
  );
  const workQuestions = useMemo(
    () => data?.data?.workQuestionList ?? [],
    [data?.data],
  );

  const getWorkStatus = useCallback((): WorkStatusType => {
    if (roleType === "PROJECT_WORKER" || roleType === "PROJECT_VALIDATOR") {
      return "CONFIRM";
    }

    if (
      workInfo?.requestStatus === "CONFIRM" ||
      workInfo?.requestStatus === "WAIT"
    )
      return workInfo?.requestStatus;

    if (workInfo?.applyYn === "N") return "CLOSED";
    if (workInfo?.availableYn === "Y") return "SUPPORTABLE";
    if (workInfo?.availableYn === "N") return "SUPPORTED";

    return workInfo?.requestStatus;
  }, [roleType, workInfo]);

  const workStatus = getWorkStatus();

  useEffect(() => {
    if (data?.code === 603) {
      toast.error("존재하지 않는 프로젝트입니다.");
      notFound();
    }
    if (data?.code === 1223) {
      toast.error("존재하지 않는 작업입니다.");
      notFound();
    }
  }, [data]);

  return {
    workInfo,
    description,
    projectQuestions,
    workQuestions,
    workStatus,
    isPending,
  };
};
