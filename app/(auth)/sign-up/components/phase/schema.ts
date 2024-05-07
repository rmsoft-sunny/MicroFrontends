import { validatePassword } from "@/types/type";
import * as z from "zod";

export const userIdRegex = /^[a-zA-Z0-9]{2,15}$/;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
export const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;

export const profileFormSchema = z
  .object({
    userId: z
      .string()
      .trim()
      .min(1, {
        message: "필수값입니다.",
      })
      .regex(userIdRegex, {
        message: "아이디는 영문+숫자 조합 2~15자리를 입력해주세요.",
      }),
    password: validatePassword,
    confirmPassword: validatePassword,
    nickname: z
      .string()
      .trim()
      .min(1, {
        message: "필수값입니다.",
      })
      .regex(nicknameRegex, {
        message:
          "닉네임은 공백을 제외한 한글+영문+숫자 조합 2~15 자리를 입력해주세요.",
      }),

    email: z
      .string({
        required_error: "이메일 형식이 올바르지 않습니다.",
      })
      .trim()
      .min(1, {
        message: "필수값입니다.",
      })
      .email({
        message: "이메일 형식이 올바르지 않습니다.",
      })
      .max(100, {
        message: "이메일은 100자를 초과할 수 없습니다.",
      }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호 확인과 일치해야 합니다.",
        path: ["password"], //검증 실패 시 오류를 발생시킬 경로를 지정
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "비밀번호와 일치해야 합니다.",
        path: ["confirmPassword"],
      });
    }
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const defaultValues: Partial<ProfileFormValues> = {
  userId: "",
  password: "",
  confirmPassword: "",
  nickname: "",
  email: "",
};
