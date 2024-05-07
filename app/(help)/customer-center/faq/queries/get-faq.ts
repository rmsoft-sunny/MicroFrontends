import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";
import { ResType } from "@/types/type";
import { FAQList } from "../../schema";

export const useGetFAQQuery = () => {
  const axios = useAxios();

  const getFAQ = async (): Promise<ResType<FAQList>> => {
    const res = await axios.get<ResType<FAQList>>("/api/client/faq/list");

    return res.data;
  };

  return useQuery({
    queryKey: ["GET", "FAQ"],
    queryFn: getFAQ,
  });
};
