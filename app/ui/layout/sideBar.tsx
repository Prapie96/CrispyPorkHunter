import { Component, Dispatch, SetStateAction } from "react";
import LogoSection from "../logoSection";
import ShowListShops from "../showListShop";
import Image from "next/image";
import { Poi } from "@/app/types/maptypes";

interface SideBarProps {
  shopsDisplay: Poi[];
  title: string;
  onSearch: Dispatch<SetStateAction<string | null>>;
  selectedStore: Poi | null;
  onSelected: (shop: Poi) => void;
}

export default function SideBar({
  shopsDisplay,
  title,
  onSearch,
  selectedStore,
  onSelected,
}: SideBarProps) {
  return (
    <aside className="block w-1/2  md:block relative md:w-1/4 text-white overflow-auto bg-yellow-50">
      {/* Logo */}
      <LogoSection />
      {/* Search Bar */}
      <div className="m-3 h-12 sticky top-0 ">
        <Image
          src={"/zoom.png"}
          alt="Icon"
          width={20}
          height={20}
          className=" absolute z-10 bottom-3 left-2"
        />
        <input
          id="search-input"
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="ค้นหาร้านหมูกรอบสุดเด็ด"
          className="relative bg-stone-50 p-2 pl-8 w-full h-full rounded-md text-black border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-sm"
        />
      </div>
      {/* Suggest Store */}
      <ShowListShops
        listShops={shopsDisplay}
        title={title}
        selectedStore={selectedStore}
        setSelected={onSelected}
      />
    </aside>
  );
}
