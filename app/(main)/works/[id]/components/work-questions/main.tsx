"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import QuestionText from "./question-text";
import QuestionFile from "./question-file";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { usePostWorkApplication } from "../../services/post-work-application";
import { ProjectQuestionListType, WorkQuestionListType } from "../../type";

import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useParams, useSearchParams } from "next/navigation";

// questionType에 따라 schema 생성
const SchemaGenerator = (questions: any[], type: "PROJECT" | "WORK") => {
  const AnswerSchema = questions.reduce((acc, question) => {
    let tmpSchema = z.object({});

    const key =
      type === "PROJECT"
        ? question.projectQuestionIdx
        : question.workQuestionIdx;
    const questionType = question.questionType;
    const required = question.requiredYn === "Y";

    if (questionType === "TEXT") {
      if (required) {
        tmpSchema = z.object({
          answer: z
            .string({ required_error: "필수값입니다." })
            .min(1, { message: "필수값입니다." }),
        });
      } else {
        tmpSchema = z.object({ answer: z.string() });
      }
    } else if (questionType === "FILE") {
      if (required) {
        tmpSchema = z.object({
          filename: z.string({ required_error: "필수값입니다." }),
          fileUrl: z.string({ required_error: "필수값입니다." }),
        });
      } else {
        tmpSchema = z.object({
          filename: z.string(),
          fileUrl: z.string(),
        });
      }
    }

    return {
      ...acc,
      [key]: required ? tmpSchema : tmpSchema.partial(),
    };
  }, {});

  return z.object(AnswerSchema);
};

const WorkQuestions = ({
  projectQuestions,
  workQuestions,
}: {
  projectQuestions: ProjectQuestionListType[];
  workQuestions: WorkQuestionListType[];
}) => {
  const { id: workIdx }: { id: string } = useParams();
  const params = useSearchParams();

  // schema / type 생성
  const ProjectAnswerSchema = SchemaGenerator(projectQuestions, "PROJECT");
  type ProjectAnswerType = z.infer<typeof ProjectAnswerSchema>;
  const WorkAnswerSchema = SchemaGenerator(workQuestions, "WORK");
  type WorkAnswerType = z.infer<typeof WorkAnswerSchema>;

  // 질문 확인 여부 checker
  const [checkAgr, setCheckAgr] = useState(false);
  const [checkErr, setCheckErr] = useState(false);

  // project/work questions form
  const projectForm = useForm<ProjectAnswerType>({
    resolver: zodResolver(ProjectAnswerSchema),
  });
  const workForm = useForm<WorkAnswerType>({
    resolver: zodResolver(WorkAnswerSchema),
  });

  const { mutate, isPending } = usePostWorkApplication();

  const onSubmit = async () => {
    const projectCode = params.get("c");

    if (!projectCode)
      return toast.error(
        "프로젝트 정보가 유효하지 않습니다. 재접속 후 다시 시도해주세요.",
      );

    // form error check
    const projectErr = await projectForm.trigger();
    const workErr = await workForm.trigger();

    if (!projectErr || !workErr) {
      return toast.error("응답하지 않은 필수 질문이 있습니다.");
    }

    if (!checkAgr) return setCheckErr(true);

    mutate(
      {
        projectCode,
        workIdx: Number(workIdx),
        data: {
          projectResponseQuestionList: Object.entries(projectForm.getValues())
            .map((answer) => ({
              questionIdx: answer[0],
              ...answer[1],
            }))
            .filter((answer) => answer.answer || answer.filename),
          workResponseQuestionList: Object.entries(workForm.getValues())
            .map((answer) => ({
              questionIdx: Number(answer[0]),
              ...answer[1],
            }))
            .filter((answer) => answer.answer || answer.filename),
        },
      },
      {
        onSuccess(res) {
          if (res.code === 100) {
            projectForm.reset();
            workForm.reset();
          }
        },
      },
    );
  };

  return (
    <div className="border-t">
      {(!!projectQuestions.length || !!workQuestions.length) && (
        <>
          <div className="p-6">
            <p className="font-semibold">아래의 질문에 답변해주세요.</p>
            <p className="text-sm text-slate-600">
              <span className=" text-destructive">*</span> 표시는 필수 응답
              질문입니다.
            </p>
          </div>
          <Form {...projectForm}>
            <form>
              <div className="flex flex-col gap-6 p-6">
                {projectQuestions.map((question) =>
                  question.questionType === "TEXT" ? (
                    <QuestionText
                      key={question.projectQuestionIdx}
                      form={projectForm}
                      question={question.question}
                      required={question.requiredYn === "Y"}
                      name={`${question.projectQuestionIdx}`}
                    />
                  ) : question.questionType === "FILE" ? (
                    <QuestionFile
                      key={question.projectQuestionIdx}
                      form={projectForm}
                      question={question.question}
                      required={question.requiredYn === "Y"}
                      name={`${question.projectQuestionIdx}`}
                    />
                  ) : (
                    <>-</>
                  ),
                )}
              </div>
            </form>
          </Form>
          <Form {...workForm}>
            <form>
              <div className="flex flex-col gap-6 p-6">
                {workQuestions.map((question) =>
                  question.questionType === "TEXT" ? (
                    <QuestionText
                      key={question.workQuestionIdx}
                      form={workForm}
                      question={question.question}
                      required={question.requiredYn === "Y"}
                      name={`${question.workQuestionIdx}`}
                    />
                  ) : question.questionType === "FILE" ? (
                    <QuestionFile
                      key={question.workQuestionIdx}
                      form={workForm}
                      question={question.question}
                      required={question.requiredYn === "Y"}
                      name={`${question.workQuestionIdx}`}
                    />
                  ) : (
                    <>-</>
                  ),
                )}
              </div>
            </form>
          </Form>
        </>
      )}
      <div className="flex items-center justify-end gap-4 bg-neutral-100 px-5 py-4">
        <div
          className={cn(
            "flex items-center gap-2",
            checkErr && "text-destructive",
          )}
        >
          <Checkbox
            id="agreement-check"
            checked={checkAgr}
            onCheckedChange={(val) => {
              setCheckAgr(!!val);
              setCheckErr(false);
            }}
          />
          <Label htmlFor="agreement-check">
            위 내용을 모두 확인하였습니다.
          </Label>
        </div>
        <Button disabled={isPending} onClick={onSubmit}>
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          참여하기
        </Button>
      </div>
    </div>
  );
};

export default WorkQuestions;
