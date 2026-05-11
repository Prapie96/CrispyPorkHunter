import { StoreData } from "@/app/types/maptypes";
import { ModeSideBar } from "@/app/types/uitypes";
import { useEffect, useState } from "react";

interface ModeSelectorProps {
  mode: ModeSideBar;
  onModeSelected: (mode: ModeSideBar) => void;
}

export default function ModeSelector({
  mode,
  onModeSelected,
}: ModeSelectorProps) {
  const modeSelectors: ModeSideBar[] = [
    "default",
    "saved",
    "hunt",
    "statistic",
  ];
  const displayTextMode: Record<ModeSideBar, string> = {
    default: "ร้านแนะนำ",
    saved: "ร้านที่บันทึก",
    hunt: "ร้านที่ล่าไปแล้ว",
    statistic: "สถิติ",
  };

  return (
    <div className="flex w-full text-black">
      {modeSelectors.map((selector) => (
        <button
          key={selector}
          onClick={() => onModeSelected(selector)}
          className={`flex-1 p-3 text-md text-center hover:cursor-pointer hover:bg-amber-100 
              ${selector === mode ? "border-b-2 border-amber-900 text-amber-900" : "border-b-2 border-transparent text-amber-700"}`}
        >
          {displayTextMode[selector]}
        </button>
      ))}
    </div>
  );
}
