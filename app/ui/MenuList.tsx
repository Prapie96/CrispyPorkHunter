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
  return (
    <section className={"flex flex-col gap-2 items-start"}>
      <strong>รายการอาหาร</strong>
      <div className=" flex flex-row gap-2 overflow-x-auto  border-red-300 border">
        {menuItems.map((menu, index) => (
          <Image
            key={menu.menu_name}
            src={menuBasePath + index + ".jpg"}
            alt={menu.menu_name}
            width={300}
            height={200}
            className="object-cover rounded-md w-auto h-auto"
            priority
          />
        ))}
      </div>
    </section>
  );
}
