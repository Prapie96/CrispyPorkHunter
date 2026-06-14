import React from "react";

interface StatCardProps {
  title: React.ReactNode; // รองรับการส่ง Icon + ข้อความ เข้ามาพร้อมกัน
  value: string | number;
  subText: string;
  minHeight?: string;
}

export function StatCard({
  title,
  value,
  subText,
  minHeight = "min-h-30",
}: StatCardProps) {
  return (
    <div
      className={`text-white bg-amber-600 p-4 rounded-xl shadow-md flex flex-col justify-center items-center w-full ${minHeight}`}
    >
      <div className="text-xs md:text-sm opacity-90 font-light flex items-center justify-center gap-1.5 text-center w-full">
        {title}
      </div>

      <span className="text-lg md:text-xl font-bold my-1.5 truncate max-w-full text-center">
        {value}
      </span>

      <p className="text-xs opacity-85 font-light text-center">{subText}</p>
    </div>
  );
}
