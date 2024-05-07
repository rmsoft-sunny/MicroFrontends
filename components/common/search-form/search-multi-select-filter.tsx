import { Button } from "@/components/ui/button";
import { Command, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types/type";
import { Check, PlusCircle } from "lucide-react";

interface Props {
  title: string; // 옵션 명(title)
  name: string; // 옵션 명(key)
  options: SelectOption[]; // 선택 옵션
  selectedOption: string[]; // 선택된 값. option의 key(value)와 일치해야함
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  onSelect: (selected: string, name?: string) => void;
  onDelete: (selected: string, name?: string) => void;
}

const SearchMultiSelectFilter = ({
  title,
  name,
  open,
  options,
  selectedOption,
  setOpen,
  onSelect,
  onDelete,
}: Props) => {
  const onOpenChange = (openState: boolean) =>
    setOpen((prev: any) => ({ ...prev, [name]: openState }));

  const SelectedOption = ({ selected }: { selected: string }) => (
    <span
      className="cursor-pointer rounded-sm bg-slate-100 px-3 py-1 text-xs hover:bg-slate-200"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(selected, name);
      }}
    >
      {options.find((option) => option.value === selected)?.label}
    </span>
  );
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="border-dashed hover:bg-background"
        >
          <div className="flex items-center">
            <PlusCircle size={16} strokeWidth={1} className="mr-1" />
            {title}
          </div>
          {selectedOption.length > 0 && (
            <div className="ml-2 flex items-center gap-2 border-l pl-2">
              {selectedOption.length > 2 ? (
                <>
                  <SelectedOption selected={selectedOption[0]} /> ...외{" "}
                  {selectedOption.length - 1}
                </>
              ) : (
                selectedOption.map((selected) => (
                  <SelectedOption key={selected} selected={selected} />
                ))
              )}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Command className="gap-1">
          {options.map((option) => {
            const isSelected = selectedOption.includes(option.value);
            return (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => onSelect(option.value, name)}
                className={cn(
                  "flex cursor-pointer items-center gap-2",
                  isSelected && "bg-secondary",
                )}
              >
                <div className="flex w-4 items-center justify-center">
                  {isSelected && <Check size={16} />}
                </div>
                <div className="truncate pr-6">{option.label}</div>
              </CommandItem>
            );
          })}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchMultiSelectFilter;
