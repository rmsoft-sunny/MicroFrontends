"use client";

import { useRef, useState } from "react";
import { WorkSupportSearch } from "./work-support-search";
import { WorkSupportTable } from "./work-support-table";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { useGetWorkSupportList } from "../queries/get-list";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SearchProps {
  requestStatusTypeList: string[];
  dateRange: DateRange;
  workName: string;
}

export const initialSearch = {
  requestStatusTypeList: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  workName: "",
};

export const WorkSupportContainer = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // 전체 검색어를 관리하는 state
  const [search, setSearch] = useState<SearchProps>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  // 리스트 조회
  const getList = useGetWorkSupportList(search);

  // 리스트가 없다면 아무것도 표시하지 않는다
  if (getList === null) return;

  // 더보기 클릭
  const onMoreClick = () => {
    if (!getList.hasNextPage) return;
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;
    setIsLoading(true);

    setTimeout(() => {
      // 다음 페이지를 가져온다
      getList.fetchNextPage();
      if (buttonRef.current === null) return;
      if (getList.hasNextPage === true) {
        buttonRef.current.disabled = false;
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <WorkSupportSearch search={search} setSearch={setSearch} />
      <div className="pb-16">
        <WorkSupportTable {...getList} />

        <Button
          onClick={onMoreClick}
          disabled={!getList.hasNextPage || getList.isFetchingNextPage}
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
