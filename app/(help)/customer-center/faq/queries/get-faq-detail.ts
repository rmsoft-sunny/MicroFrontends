import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { FAQ } from "../../schema";

export const useGetFAQDetailQuery = (id: number) => {
  const axios = useAxios();

  const getFAQDetail = async (): Promise<ResType<FAQ>> => {
    const res = await axios.get<ResType<FAQ>>(`/api/client/faq/${id}`);

    return res.data;
  };

  return useQuery({
    queryKey: ["GET", "FAQDetail", id],
    queryFn: getFAQDetail,
  });
};
