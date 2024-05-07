import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
interface Props {
  name: string;
  title: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
export const InputTypText = ({
  name,
  title,
  placeholder,
  className,
  disabled,
}: Props) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              "flex min-w-28 flex-col text-base font-semibold text-slate-800",
              name === "accountPerson" ? "max-w-28" : "w-full",
            )}
          >
            <FormLabel>{title}</FormLabel>
            <Input
              type="text"
              value={field.value || ""}
              onChange={field.onChange}
              min="0"
              className={className}
              placeholder={placeholder}
              disabled={disabled}
            />
            <div className={cn("h-5 text-xs")}>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
