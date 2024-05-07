"use client";

import { DateRange } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { useGetWorkList } from "../queries/get-list";
import { WorkSearch } from "./work-search";
import { WorkTable } from "./work-table";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchProps {
  taskStatusList: string[];
  dateRange: DateRange;
  workName: string;
}

export const initialSearch = {
  taskStatusList: [],
  dateRange: {
    from: undefined,
    to: undefined,
  },
  workName: "",
};

export const WorkContainer = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // 전체 검색어를 관리하는 state
  const [search, setSearch] = useState<SearchProps>(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useUser();
  const getWorkList = useGetWorkList(search);

  // 역할이 사용자가 아니면 로그인 페이지로 이동
  useEffect(() => {
    if (userInfo === null) return;
    if (userInfo.roleType === "PROJECT_VALIDATOR") {
      router.replace("/login");
    }
  }, [userInfo, router]);

  // 리스트가 없다면 아무것도 표시하지 않는다
  if (getWorkList === null) return;

  // 더보기 클릭
  const onMoreClick = () => {
    if (!getWorkList.hasNextPage) return;
    if (buttonRef.current === null) return;
    buttonRef.current.disabled = true;
    setIsLoading(true);

    setTimeout(() => {
      // 다음 페이지를 가져온다
      getWorkList.fetchNextPage();
      if (buttonRef.current === null) return;
      if (getWorkList.hasNextPage === true) {
        buttonRef.current.disabled = false;
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <WorkSearch search={search} setSearch={setSearch} />
      <div className="pb-16">
        <WorkTable {...getWorkList} />

        <Button
          onClick={onMoreClick}
          disabled={!getWorkList.hasNextPage || getWorkList.isFetchingNextPage}
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
