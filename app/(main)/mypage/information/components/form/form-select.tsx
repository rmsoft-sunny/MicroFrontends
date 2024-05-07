import { useFormContext } from "react-hook-form";
import banks from "@/constants/bank.json";

import { cn } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

interface Props {
  title: string;
  disabled?: boolean;
  placeholder?: string;
}

const sorttedBanks = banks.sort((a, b) =>
  a.bankTitle.localeCompare(b.bankTitle),
);

export const FormSelect = ({ title, disabled, placeholder }: Props) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="bank"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{title}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "flex items-center gap-2 text-slate-800 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                )}
                aria-label="Select account"
                disabled={disabled}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sorttedBanks.map((bank) => (
                <SelectItem
                  key={bank.bankCode}
                  value={bank.bankCode}
                  className="flex cursor-pointer items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
                >
                  {bank.bankTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
