import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetCalculationAmount = () => {
  const axios = useAxios();
  const router = useRouter();
  const queryFunction = async () => {
    const response = await axios.get("/api/client/calculate/amount");
    return response;
  };
  const fetchResult = useQuery({
    queryFn: queryFunction,
    queryKey: ["GET", "calculate", "amount"],
  });

  if (fetchResult.isError) return null;
  if (fetchResult.isSuccess) {
    const responseCode = fetchResult.data.data.code;

    switch (responseCode) {
      case 100:
        return fetchResult.data.data.data;
      case 822: // refresh토큰이 만료 된 경우
      case 825: // 정지 된 계정
      case 828: // 유효하지 않은 토큰
      case 852: // header에 토큰이 없는 경우
      case 855: // refresh토큰이 없는 경우
        localStorage.clear();
        toast.error("로그아웃 되었습니다. 로그인 페이지로 이동합니다.", {
          position: "top-center",
          id: "logout-toast",
        });
        router.replace("/login");
        break;
      default:
        return null;
    }
  }
  return null;
};
