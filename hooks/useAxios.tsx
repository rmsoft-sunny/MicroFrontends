import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const useAxios = () => {
  const router = useRouter();
  const [token] = useLocalStorage("access", "");
  const instance = axios.create({
    headers: { Authorization: token },
  });

  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 404:
            toast.error("요청에 실패하였습니다. 잘못된 요청 경로 입니다.", {
              position: "top-center",
              id: "logout-toast",
            });
            localStorage.clear();
            router.replace("/login");
            break;
          case 405:
            return toast.error(
              "요청에 실패하였습니다. 허용되지 않은 메서드입니다.",
            );
          case 500:
            return toast.error(
              "서버와 연결 할 수 없습니다. 잠시 후 다시 시도해주세요.",
            );
          case 821:
            localStorage.clear();
            toast.error("요청 권한이 없는 계정입니다.", {
              id: "logout-toast",
            });
            router.replace("/login");
            break;
          case 820: // 존재하지 않는 ID
          case 822: // refresh토큰이 만료 된 경우
          case 825: // 정지 된 계정
          case 828: // 유효하지 않은 토큰
          case 852: // header에 토큰이 없는 경우
          case 855: // refresh토큰이 없는 경우
            localStorage.clear();
            toast.error("로그아웃 되었습니다. 로그인 페이지로 이동합니다.", {
              id: "logout-toast",
            });
            router.replace("/login");
            break;
          default:
            return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
};
