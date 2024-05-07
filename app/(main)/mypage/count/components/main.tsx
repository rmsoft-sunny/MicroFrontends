"use client";

import { DateRange } from "react-day-picker";
import { useState, useEffect, useRef } from "react";
import { useGetCalculationHistoryList } from "../queries/get-list";
import { CountCard } from "./card";
import { CalculationHistorySearch } from "./search";
import { CalculationHistoryTable } from "./table";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchProps {
  paymentStatusTypeList: string[];
  dateRange: DateRange;
  workName: string;
}

export const initialSearch = {
  paymentStatusTypeList: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  workName: "",
};

export const CalculationHistoryMain = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // 전체 검색어를 관리하는 state
  const [search, setSearch] = useState<SearchProps>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useUser();
  const getCalculationHistoryList = useGetCalculationHistoryList(search);

  // 리스트가 없다면 아무것도 표시하지 않는다
  if (getCalculationHistoryList === null) return;

  // 더보기 클릭
  const onMoreClick = () => {
    if (!getCalculationHistoryList.hasNextPage) return;
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;
    setIsLoading(true);

    setTimeout(() => {
      // 다음 페이지를 가져온다
      getCalculationHistoryList.fetchNextPage();
      if (buttonRef.current === null) return;
      if (getCalculationHistoryList.hasNextPage === true) {
        buttonRef.current.disabled = false;
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <CountCard />
      <CalculationHistorySearch search={search} setSearch={setSearch} />
      <div className="pb-16">
        <CalculationHistoryTable {...getCalculationHistoryList} />
        <Button
          onClick={onMoreClick}
          disabled={
            !getCalculationHistoryList.hasNextPage ||
            getCalculationHistoryList.isFetchingNextPage
          }
          ref={buttonRef}
          className="w-full bg-white px-4 py-3 text-primary hover:bg-secondary"
        >
          {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          <p className="flex items-center gap-1 text-base font-bold">
            <Plus className={cn(isLoading && "hidden", "h-5 w-5")} /> 더 보기
          </p>
        </Button>
      </div>
    </div>
  );
};
