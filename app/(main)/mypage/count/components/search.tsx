"use client";
import SearchDateRangeFilter from "@/components/common/search-form/search-date-range-filter";
import SearchInputFilter from "@/components/common/search-form/search-input-filter";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { SearchProps, initialSearch } from "./main";
import { PaymentStatusType, PaymentStatusTypeEnum } from "@/enums/enum-list";
import { cn } from "@/lib/utils";
import SearchMultiSelectFilter from "@/components/common/search-form/search-multi-select-filter";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";

interface Props {
  search: SearchProps;
  setSearch: React.Dispatch<React.SetStateAction<SearchProps>>;
}

// 검색 옵션 SELECT 가능한 형태로 가공
const calculationSelectOption = Object.keys(PaymentStatusType).map((key) => {
  return { value: key, label: PaymentStatusTypeEnum.get(key) };
});

// 메인 컴포넌트
export const CalculationHistorySearch = ({ setSearch, search }: Props) => {
  // 날짜기간 열고 닫기 상태 관리
  const [open, setOpen] = useState({ taskState: false, dateRange: false });

  // 작업 명 검색 컨트롤러
  const [workName, setWorkName] = useState("");

  // 클릭 시 상태 검색
  const onSelectStatus = (selected: string) => {
    setSearch((prev) => ({
      ...prev,
      paymentStatusTypeList: prev.paymentStatusTypeList.includes(selected)
        ? prev.paymentStatusTypeList.filter((item) => item !== selected)
        : [...prev.paymentStatusTypeList, selected],
    }));

    // 선택 바 닫기
    setOpen((prevState) => ({ ...prevState, taskState: false }));
  };

  // 클릭 시 상태 검색 제거
  const onDeleteStatus = (deleteValue: string) => {
    queryClient.removeQueries({
      queryKey: ["GET", "calculate", "list"],
    });
    setSearch((prev) => ({
      ...prev,
      paymentStatusTypeList: prev.paymentStatusTypeList.includes(deleteValue)
        ? prev.paymentStatusTypeList.filter((item) => item !== deleteValue)
        : [...prev.paymentStatusTypeList, deleteValue],
    }));
    // 선택 바 닫기
    setOpen((prevState) => ({ ...prevState, taskState: false }));
  };

  // 작업명 검색
  const onInputDebounce = (data: string) => {
    setSearch((prev) => ({
      ...prev,
      workName: data,
    }));
  };

  // date range 삭제
  const onDeleteDateRange = () => {
    setSearch((prev) => ({
      ...prev,
      dateRange: {
        from: undefined,
        to: undefined,
      },
    }));
    queryClient.removeQueries({
      queryKey: ["GET", "calculate", "list"],
    });
  };

  // date range 선택
  const onSelectDateRange = (value: DateRange | undefined) => {
    if (value === undefined) return;
    setSearch((prev) => ({
      ...prev,
      dateRange: {
        from: value.from,
        to: value.to,
      },
    }));
  };

  // Reset 클릭
  const queryClient = useQueryClient();
  const onResetClick = () => {
    setWorkName("");
    setSearch(initialSearch);
    queryClient.removeQueries({
      queryKey: ["GET", "calculate", "list"],
    });
  };

  // reset 버튼 활성화 판단
  const enableReset = _.isEqual(search, initialSearch);

  return (
    <>
      <div className="flex gap-2">
        <SearchMultiSelectFilter
          title="상태"
          name="taskState"
          open={open.taskState}
          setOpen={setOpen}
          options={calculationSelectOption}
          selectedOption={search.paymentStatusTypeList}
          onSelect={onSelectStatus}
          onDelete={onDeleteStatus}
        />
        <SearchInputFilter
          name="workName"
          placeholder="작업명"
          setValue={setWorkName}
          value={workName}
          onSubmit={onInputDebounce}
        />
        <SearchDateRangeFilter
          title="정산기간"
          name="dateRange"
          open={open.dateRange}
          setOpen={setOpen}
          selectedDate={search.dateRange}
          onSelect={onSelectDateRange}
          onDelete={onDeleteDateRange}
        />
        <Button
          onClick={onResetClick}
          variant="secondary"
          className={cn(enableReset && "hidden", "bg-white")}
        >
          초기화
        </Button>
      </div>
    </>
  );
};
