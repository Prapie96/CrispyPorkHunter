import { Component, Dispatch, SetStateAction } from "react";
import LogoSection from "../logoSection";
import ShowListShops from "../showListShop";
import Image from "next/image";
import { StoreData } from "@/app/types/maptypes";
import { SearchBox } from "@mapbox/search-js-react";
interface SideBarProps {
  shopsDisplay: StoreData[];
  // title: string;
  onSearch: Dispatch<SetStateAction<string>>;
  selectedStore: StoreData | undefined;
  onSelected: (shop: StoreData) => void;
  onLimit: () => void;
  hasMore: boolean;
}

export default function SideBar({
  shopsDisplay,
  // title,
  onSearch,
  selectedStore,
  onSelected,
  onLimit,
  hasMore,
}: SideBarProps) {
  return (
    <aside className="block w-1/2  md:block relative md:w-1/4 text-white overflow-auto bg-yellow-50">
      {/* Logo */}
      <LogoSection />
      {/* Search Bar */}
      <div className="m-3 h-12 sticky top-0 ">
        {/* <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}
          options={{
            language: "th",
            country: "TH",
          }}
          onRetrieve={(res) => {
            const key = res.features[0].properties.name;
            const lng = res.features[0].geometry.coordinates[0];
            const lat = res.features[0].geometry.coordinates[1];
            onSelected();
          }}
        /> */}
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
        // title={title}
        selectedStore={selectedStore}
        setSelected={onSelected}
      />
      <button
        className="bg-amber-600 m-4 px-6 py-3 rounded-2xl mx-auto block text-white hover:bg-amber-800
       hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-default
      "
        onClick={onLimit}
        disabled={!hasMore}
        hidden={shopsDisplay.length === 0}
      >
        Load More
      </button>
    </aside>
  );
}
