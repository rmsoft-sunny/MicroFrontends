import {
  nicknameRegex,
  passwordRegex,
} from "@/app/(auth)/sign-up/components/phase/schema";
import { nomalTextOnlyRegex } from "@/components/common/constants/regexp";
import { z } from "zod";
import banks from "@/constants/bank.json";
import { validatePassword } from "@/types/type";

export const InfoFormSchema = z.object({
  nickName: z
    .string({ required_error: "필수값입니다" })
    .min(2, { message: "2글자 이상 작성해주세요." })
    .max(15, { message: "15자 이하로 작성해주세요." })
    .regex(nicknameRegex, {
      message: "공백을 제외한 한글+영문+숫자 조합 2~15 자리를 입력해주세요.",
    }),
});

export type InfoFormType = z.infer<typeof InfoFormSchema>;

export const InfoPasswordFormSchema = z
  .object({
    password: validatePassword,
    newPassword: validatePassword,
    newPasswordCheck: validatePassword,
  })
  .superRefine(({ newPassword, newPasswordCheck }, ctx) => {
    if (newPassword !== newPasswordCheck) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "새로운 비밀번호와 일치해야 합니다.",
        path: ["newPasswordCheck"], //검증 실패 시 오류를 발생시킬 경로를 지정
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "새로운 비밀번호 확인과 일치해야 합니다.",
        path: ["newPassword"],
      });
    }
  });

export type InfoPasswordFormType = z.infer<typeof InfoPasswordFormSchema>;

const bankCodes = banks.map((bank) => bank.bankCode);

export const InfoAccountFormSchema = z.object({
  bank: z.enum([bankCodes[0], ...bankCodes.slice(1)], {
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "필수값입니다." };
      } else return { message: ctx.defaultError };
    },
  }),

  accountNumber: z
    .string({ required_error: "필수값입니다" })
    .min(1, { message: "필수값입니다" })
    .max(15, { message: "15자 이하로 작성해주세요." })
    .regex(nomalTextOnlyRegex, { message: "특수문자를 포함할 수 없습니다." }),
});

export type InfoAccountFormType = z.infer<typeof InfoAccountFormSchema>;
