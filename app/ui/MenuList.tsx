import React from "react";
import Image from "next/image";

interface MenuHighlightsProps {
  menuItems: { menu_name: string }[];
  menuBasePath: string;
}

export default function MenuList({
  menuItems,
  menuBasePath,
}: MenuHighlightsProps) {
  if(menuItems.length === 0){
    return;
  }
  return (
    <section className={"flex flex-col gap-3"}>
      <strong className="text-lg font-bold text-gray-800 tracking-wide px-1">
        รายการอาหาร
      </strong>
      <div
        className="flex flex-row gap-3 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory 
           scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-amber-100"
      >
        {menuItems.map((menu, index) => (
          <Image
            key={menu.menu_name}
            src={menuBasePath + index + ".jpg"}
            alt={`รูปภาพเมนูที่ ${index + 1}`}
            width={300}
            height={300}
            className="w-52 h-52 object-cover rounded-2xl shadow-sm border border-gray-100 shrink-0 snap-start transition-transform duration-200 active:scale-95"
            priority
            
          />
        ))}
      </div>
    </section>
  );
}
