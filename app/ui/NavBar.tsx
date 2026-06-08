import React from "react";

export default function NavBar() {
  const mockupMode = ["recommended", "saved", "hunted", "statistic"] as const;
  const displayNameMode: Record<(typeof mockupMode)[number], string> = {
    recommended: "ร้านเด็ด",
    saved: "บันทึก",
    hunted: "ล่าแล้ว",
    statistic: "สถิติ",
  };

  return (
    <div className="grid grid-cols-4 text-md text-amber-700 ">
      {mockupMode.map((mode) => (
        <button
          key={mode}
          className="px-4 py-4  
          hover:cursor-pointer hover:bg-amber-600 hover:text-white text-sm whitespace-nowrap"
        >
          <span>{displayNameMode[mode]}</span>
        </button>
      ))}
    </div>
  );
}
