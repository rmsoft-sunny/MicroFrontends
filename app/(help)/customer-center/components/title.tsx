import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function Title({
  text,
  className,
  ...props
}: { text: string } & HTMLAttributes<HTMLHeadElement>) {
  return (
    <h2
      {...props}
      className={cn("w-full border-b px-4 py-3 text-lg font-bold", className)}
    >
      {text}
    </h2>
  );
}
