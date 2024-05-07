import { nicknameRegex } from "@/app/(auth)/sign-up/components/phase/schema";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface GetNickNameCheckReqType {
  nickName: string;
}

interface Props {
  nickName: string;
  setCheck: Dispatch<
    SetStateAction<{
      nickName: boolean;
      sameNickName: boolean;
    }>
  >;
}
const getNickNameCheck = async (nickName: string) => {
  try {
    const res = await axios.get(
      `/api/client/auth/chk/nickname/duplicate?nickname=${nickName}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error while checking nickname duplication:", error);
    throw error;
  }
};

export const UseCheckNicknameAvailability = () => {
  return {
    checkNicknameAvailability: async (
      nickName: string,
      setCheck: Props["setCheck"],
    ) => {
      const nicknameCheck = z.string().trim().regex(nicknameRegex);
      const checkResult = nicknameCheck.safeParse(nickName).success;

      if (checkResult) {
        try {
          const res = await getNickNameCheck(nickName);

          if (res.code === 100) {
            toast.success("사용 가능한 닉네임 입니다.", {
              id: "nickname",
              duration: 1500,
            });
            setCheck((prevState: any) => ({
              ...prevState,
              nickName: false,
              sameNickName: true,
            }));
          } else if (res.code === 1008) {
            toast.error("이미 존재하는 닉네임 입니다.", {
              id: "nickname",
              duration: 1500,
            });
            setCheck((prevState: any) => ({
              ...prevState,
              nickName: false,
              sameNickName: false,
            }));
          } else {
            toast.error(
              "닉네임은 공백을 제외한 한글+영문+숫자 조합 2~15 자리를 입력해주세요.",
              { id: "nickname" },
            );
            setCheck((prevState: any) => ({
              ...prevState,
              nickName: false,
              sameNickName: false,
            }));
          }
        } catch (error) {
          console.error("Error while checking nickname duplication:", error);
        }
      }
    },
  };
};
