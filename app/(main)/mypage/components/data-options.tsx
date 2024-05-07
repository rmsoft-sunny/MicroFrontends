import { TaskStatusTypeEnum, TaskStatusType } from "@/enums/enum-list";

export const workSupportTableOptions = [
  { value: "CONFIRM", label: "승인" },
  { value: "WAIT", label: "대기" },
  { value: "REJECT", label: "반려" },
];

export const workTableOptions = Object.keys(TaskStatusType).map((key) => {
  return { value: key, label: TaskStatusTypeEnum.get(key) };
});
