import React from "react";

interface OpeningHoursProps {
  opening_hour: { day: string; time: string }[];
}

export default function OpeningHours({ opening_hour }: OpeningHoursProps) {
   if (!opening_hour || opening_hour.length === 0) return null;
  return (
    <section className="grid grid-cols-1 sm:grid-cols-7 gap-2 border-y-2 border-amber-400 py-3 my-2">
      {opening_hour.map((opening) => (
        <div key={opening.day} className="flex flex-col items-center">
          <span className="font-bold text-xs sm:text-sm">
            {opening.day.replace("วัน", "")}
          </span>
          <span className="text-xs text-gray-600">{opening.time}</span>
        </div>
      ))}
    </section>
  );
}
