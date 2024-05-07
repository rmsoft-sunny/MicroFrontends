"use client";

import Viewer from "@/components/common/editor/viewer";
import { useGetFAQDetailQuery } from "../queries/get-faq-detail";
import { Loader2 } from "lucide-react";

export default function FAQContent({ id }: { id: number }) {
  const { data, isPending } = useGetFAQDetailQuery(id);

  if (isPending)
    return (
      <div className="text-center">
        <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin" />
      </div>
    );

  return data?.data.content ? (
    <Viewer content={data?.data.content} className="min-h-8 bg-slate-100" />
  ) : (
    <span>FAQ를 불러오지 못했습니다. 다시 시도해주세요.</span>
  );
}
