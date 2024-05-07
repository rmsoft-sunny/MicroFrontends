import { RequestStatusType, RoleType, TaskStatusType } from "@/enums/enum-list";

export interface WorkQuestionListType {
  workIdx: number;
  workQuestionIdx: number;
  question: string;
  questionType: string;
  requiredYn: "Y" | "N";
}

export interface ProjectQuestionListType {
  projectIdx: number;
  projectQuestionIdx: number;
  code: string;
  question: string;
  questionType: string;
  requiredYn: "Y" | "N";
}

export interface WorkInfoType {
  projectCode: string;
  workIdx: number;
  userIdx: number;
  workName: string;
  projectName: string;
  noticeIdx: number;
  noticeTitle: string;
  summary: string;
  applyYn: "Y" | "N";
  requestStatus: keyof typeof RequestStatusType | null;
  joinWorkerCnt: number;
  progress: number;
  minUnitPrice: number;
  maxUnitPrice: number;
  description: string;
  projectQuestionList: ProjectQuestionListType[];
  workQuestionList: WorkQuestionListType[];
  availableYn?: "Y" | "N"; // 지원 가능여부
}

export interface WorkTaskListType {
  taskIdx: number;
  taskStatus: keyof typeof TaskStatusType;
  point: number;
  startDate: string;
  endDate: string;
}

export interface WorkRequestReqType {
  url: string;
  taskIdx: number;
  workIdx: number;
  roleType: keyof typeof RoleType;
  path: string;
}

export type WorkStatusType =
  | "WAIT"
  | "CONFIRM"
  | "REJECT"
  | "CLOSED"
  | "SUPPORTABLE"
  | "SUPPORTED"
  | null
  | undefined;
