import React from "react";
import { ModeSelector } from "../types/mode_types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { mockupMode } from "../consts/const";

export default function NavBar() {
  const displayNameMode: Record<(typeof mockupMode)[number], string> = {
    All: "ร้านเด็ด",
    Save: "บันทึก",
    Hunt: "ล่าแล้ว",
    Statistic: "สถิติ",
  };
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  //function to set and delete url
  const handleSelect = (mode: ModeSelector) => {
    //Parse string url into Object to get  Key : Value
    const params = new URLSearchParams(searchParams);
    //if has mode in url or hasn't delete url
    if (mode && mode !== "All") {
      params.set("mode", mode);
    } else {
      params.delete("mode");
    }
    //Navigate Page by using Replace to go Page following mode
    replace(`${pathName}?${params.toString()}`);
  };
  //get currentMode from searchParams
  const currentMode = searchParams.get("mode") || "All";
  
  const currentIndexOfMode = mockupMode.indexOf(currentMode as ModeSelector);
  return (
    <div className="relative grid grid-cols-4 text-md text-amber-700  ">
      {mockupMode.map((mode) => (
        <button
          key={mode}
          className={`px-4 py-4 z-10 hover:cursor-pointer hover:bg-amber-600/10 text-sm whitespace-nowrap transition-colors duration-200
          ${mode === currentMode ? "font-bold text-amber-800" : "bg-transparent text-amber-700"}
          `}
          onClick={() => handleSelect(mode)}
        >
          <span>{displayNameMode[mode]}</span>
        </button>
      ))}
      {/* Active underline Indicator */}
      <div className="absolute bottom-0 h-0.5 bg-amber-600 transition-all duration-300 ease-in-out"
        style={{
          width: "25%",
          transform: `translateX(${currentIndexOfMode * 100}%)`
        }}
      />
    </div>
  );
}
