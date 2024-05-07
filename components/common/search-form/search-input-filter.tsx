"use client";
import React, { useEffect, useRef } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Props {
  name: string; // 옵션 명(key)
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (value: string, name?: string) => void; // 입력값 검색 조건에 반영
  label?: string | React.ReactNode;
  className?: string;
  placeholder?: string;
  maxLength?: number;
}

const SearchInputFilter = ({
  label,
  name,
  value,
  setValue,
  placeholder = "",
  className,
  onSubmit,
  maxLength,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setDebouncedValue(e.target.value);
  };

  useEffect(() => {
    onSubmit(debouncedValue.trim(), name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="flex items-center gap-2">
      {label && <Label>{label}</Label>}
      <Input
        ref={ref}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={cn("w-[220px] bg-background", className)}
        maxLength={maxLength || 100}
      />
    </div>
  );
};

export default SearchInputFilter;
