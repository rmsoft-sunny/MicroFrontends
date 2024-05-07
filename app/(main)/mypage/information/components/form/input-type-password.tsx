import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  title: string;
  open: boolean;
  onOpenClick: () => void;
  onCloseClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const InputTypePassword = ({
  name,
  title,
  open,
  onOpenClick,
  onCloseClick,
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
              "flex flex-col text-base font-semibold text-slate-800",
            )}
          >
            <div className="relative grid  space-y-2">
              <FormLabel>{title}</FormLabel>
              <Input
                className="pr-10"
                type={open ? "text" : "password"}
                value={field.value || ""}
                onChange={field.onChange}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                min="0"
                disabled={disabled}
              />
              {open ? (
                <Eye
                  className={`${className} absolute left-[500px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary`}
                  onClick={onOpenClick}
                />
              ) : (
                <EyeOff
                  className={`${className} absolute left-[500px] h-5 w-5 cursor-pointer text-slate-400 hover:text-primary`}
                  onClick={onCloseClick}
                />
              )}
            </div>

            <div className={cn("h-5 text-xs")}>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    />
  );
};
