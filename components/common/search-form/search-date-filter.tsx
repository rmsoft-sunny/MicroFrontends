"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Matcher } from "react-day-picker";
import { formatKST } from "@/utils/date-format";

interface Props {
  title: string // 옵션 명(title)
  name: string; // 옵션 명(key)
  selectedDate: Date | undefined // 선택된 값.
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<any>>
  onSelect: (value: Date | undefined, name?: string) => void;
  onDelete: (name?: string) => void
  fromDate?: Date;
  toDate?: Date;
  disabled?: Matcher | Matcher[]
}

const SearchDateFilter = ({
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
    <Popover
      open={open} onOpenChange={onOpenChange}
    >
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="border-dashed hover:bg-background">
          <div className="flex items-center">
            <CalendarIcon size={16} strokeWidth={1} className="mr-1" />
            {title}
          </div>
          {selectedDate &&
            <div className="border-l ml-2 pl-2">
              <div
                className="bg-slate-100 py-1 px-3 text-xs rounded-sm cursor-pointer truncate hover:bg-slate-200"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(name)
                }}
              >
                {formatKST(new Date(selectedDate), 'YYYY-MM-DD')}
              </div>
            </div>
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={(value) => onSelect(value, name)}
          fromDate={fromDate || new Date("1900-01-01")}
          toDate={toDate || new Date()}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDateFilter;