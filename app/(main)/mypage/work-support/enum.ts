import { Enums } from "@/enums/enum";

const statusType = {
  APPROVAL: "승인",
  REJECT: "반려",
  PROGRESS: "대기",
};

export const statusTypeEnum = new Enums(statusType);

const workStatusType = {
  APPROVAL: "승인",
  REJECT: "반려",
  PROGRESS: "진행중",
};

export const workStatusTypeEnum = new Enums(workStatusType);

const countStatusType = {
  APPROVAL: "완료",
  PROGRESS: "예정",
};

export const countStatusTypeEnum = new Enums(countStatusType);
