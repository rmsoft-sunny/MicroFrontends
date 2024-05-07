import { ReactNode } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TootipProps {
  label: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}

export const CommonTooltip = ({
  label,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: TootipProps) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            className="border border-slate-300 bg-white text-slate-700"
          >
            <p className="font-semibold capitalize">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
