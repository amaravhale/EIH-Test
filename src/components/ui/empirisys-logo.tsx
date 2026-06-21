import React from "react";
import { cn } from "@/lib/utils";

interface EmpirisysLogoProps {
  className?: string;
  textSize?: number;
  iconSize?: number;
}

export function EmpirisysLogo({ 
  className, 
  textSize = 32, 
  iconSize = 38 
}: EmpirisysLogoProps) {
  return (
    <div className={cn("relative flex items-baseline font-sans select-none tracking-tighter leading-none text-[#0F292E] dark:text-white", className)}>
      <span style={{ fontSize: textSize }} className="font-bold">emp</span>
      <div className="relative inline-flex items-baseline">
        <span 
          className="absolute w-full text-center flex justify-center font-normal" 
          style={{ 
            fontSize: iconSize, 
            top: `-${textSize * 0.25}px`,
            left: 0,
            lineHeight: 0
          }}
        >
          ∞
        </span>
        <span style={{ fontSize: textSize }} className="font-bold">ırı</span>
      </div>
      <span style={{ fontSize: textSize }} className="font-bold">sys</span>
    </div>
  );
}
