export const userIdRegex = /^[a-zA-Z0-9]{2,15}$/;
export const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;

//영문+숫자+특수문자(! @ # $ % & * ?)조합 8~20자리를 입력해주세요.
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
