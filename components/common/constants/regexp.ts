// email형식
export const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

// 숫자만 가능
export const numberOnlyRegex = /^\d+$/;

// 노멀텍스트(특수문자 불가능)
export const nomalTextOnlyRegex = /^[a-zA-Z0-9ㄱ-ㅎ가-힣\s]+$/;
