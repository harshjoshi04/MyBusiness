import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider as TooltipProvider2,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

interface TooltipProviderProp {
  children: React.ReactNode;
  title: string;
  isOpen: Boolean;
}

const TooltipProvider: FC<TooltipProviderProp> = ({
  children,
  title,
  isOpen,
}) => {
  return (
    <TooltipProvider2 delayDuration={100} disableHoverableContent={!isOpen}>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side="left"
          className={twMerge(`hidden translate-x-2`, isOpen && "block")}
          align="start"
        >
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider2>
  );
};

export default TooltipProvider;
