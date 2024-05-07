import * as z from "zod";

export interface SelectOption {
  label: string;
  value: string;
}

export interface ResType<T> {
  code: number;
  message: string | null;
  data: T;
}

export const validatePassword = z
  .string()
  .trim()
  .min(1, {
    message: "필수값입니다.",
  })
  .min(8, {
    message: "8~20자리를 입력해주세요.",
  })
  .max(20, {
    message: "8~20자리를 입력해주세요.",
  });
