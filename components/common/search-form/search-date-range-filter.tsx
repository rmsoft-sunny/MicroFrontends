"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange, Matcher } from "react-day-picker";
import { formatKST } from "@/utils/date-format";

interface Props {
  title: string // 옵션 명(title)
  name: string; // 옵션 명(key)
  selectedDate: DateRange | undefined // 선택된 값.
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  onSelect: (value: DateRange | undefined, name?: string) => void;
  onDelete: (name?: string) => void
  fromDate?: Date;
  toDate?: Date;
  disabled?: Matcher | Matcher[]
}

const SearchDateRangeFilter = ({
  title,
  name,
  open,
  selectedDate,
  setOpen,
  onSelect,
  onDelete,
  fromDate,
  toDate,
  disabled
}: Props) => {
  const onOpenChange = (openState: boolean) => setOpen((prev: any) => ({ ...prev, [name]: openState }))

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="border-dashed hover:bg-background"
        >
          <div className="flex items-center">
            <CalendarIcon size={16} strokeWidth={1} className="mr-1" />
            {title}
          </div>
          {selectedDate?.from && (
            <div className="ml-2 border-l pl-2">
              <div
                className="cursor-pointer truncate rounded-sm bg-slate-100 px-3 py-1 text-xs hover:bg-slate-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(name);
                }}
              >
                {formatKST(new Date(selectedDate.from), "YYYY-MM-DD")}
                {selectedDate?.to &&
                  ` - ${formatKST(new Date(selectedDate.to), "YYYY-MM-DD")}`}
              </div>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="range"
          captionLayout="dropdown-buttons"
          defaultMonth={selectedDate?.from}
          selected={selectedDate}
          onSelect={(value) => onSelect(value, name)}
          fromDate={fromDate || new Date("1900-01-01")}
          toDate={toDate || new Date()}
          disabled={disabled}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDateRangeFilter;