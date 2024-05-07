"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetFAQQuery } from "../queries/get-faq";
import FAQAccordion from "./faq-accordion";
import { FAQList } from "../../schema";
import { Accordion } from "@/components/ui/accordion";

const LIST_CATEGORY = {
  inquiryFaqList: "문의",
  loginFaqList: "로그인",
  pointFaqList: "포인트",
  workFaqList: "작업",
} as const;

export default function FAQTab() {
  const { data, isPending } = useGetFAQQuery();

  const categories =
    ((data?.data && Object.keys(data.data).sort()) as (keyof FAQList)[]) || [];

  return (
    <Tabs defaultValue={categories[0] || ""} key={data?.code}>
      <TabsList className="block h-[54px] w-full justify-start rounded-none border-b bg-background p-0">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="rounded-none border-primary px-6 py-4 text-sm font-bold data-[state=active]:border-b-2 data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            {LIST_CATEGORY[category]}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent
          key={category}
          value={category}
          className="mt-0 min-h-[441px] px-4"
        >
          <Accordion type="single" collapsible>
            {data?.data && data.data[category]?.length ? (
              data.data[category]?.map((faq) => (
                <FAQAccordion
                  key={faq.faqIdx}
                  title={faq.title}
                  id={faq.faqIdx}
                />
              ))
            ) : isPending ? (
              <p className="mt-2 px-2 py-4 text-center text-sm">
                데이터를 불러오는 중입니다.
              </p>
            ) : (
              <p className="mt-2 px-2 py-4 text-center text-sm">
                데이터가 없습니다.
              </p>
            )}
            <div className="h-12 p-3"></div>
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
