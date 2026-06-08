import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="bg-linear-to-br from-amber-600 to-orange-800 flex-col p-4 text-center">
      <div className="flex items-center text-sm md:text-2xl lg:text-3xl">
        <Image
          src={"/crispypork.png"}
          alt="Logo Crispy Pork"
          width={80}
          height={80}
        />
        <h1>Crispy pork Hunter</h1>
      </div>

      <p className="text-amber-100 text-sm opacity-90 text-nowrap">ตามล่าหมูกรอบทั่วราชอาณาจักรไทย</p>
    </div>
  );
}
