import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import { UseMutateFunction } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useUser } from "@/hooks/useUser";
import { usePostRequestWork } from "../services/post-request-work";
import { usePostRequestValidate } from "../services/post-request-validate";

const WorkRequestButton = ({ className }: { className?: string }) => {
  const { id: workIdx }: { id: string } = useParams();
  const params = useSearchParams();

  const user = useUser();
  const roleType = user?.roleType;

  const { mutate: mutateReqWork, isPending: isPendingReqWork } =
    usePostRequestWork();
  const { mutate: mutateReqValidate, isPending: isPendingReqValidate } =
    usePostRequestValidate();

  const handleRequest = (
    mutate: UseMutateFunction<
      any,
      Error,
      {
        projectCode: string;
        workIdx: number;
      }
    >,
  ) => {
    const projectCode = params.get("c");
    if (!projectCode)
      return toast.error(
        "프로젝트 정보가 유효하지 않습니다. 재접속 후 다시 시도해주세요.",
      );
    mutate({ projectCode, workIdx: Number(workIdx) });
  };
  return (
    <>
      {roleType === "PROJECT_VALIDATOR" ? (
        <Button
          onClick={() => handleRequest(mutateReqValidate)}
          disabled={isPendingReqValidate}
          className={className}
        >
          검수 시작하기
        </Button>
      ) : (
        <Button
          onClick={() => handleRequest(mutateReqWork)}
          disabled={isPendingReqWork}
          className={className}
        >
          작업 시작하기
        </Button>
      )}
    </>
  );
};

export default WorkRequestButton;
