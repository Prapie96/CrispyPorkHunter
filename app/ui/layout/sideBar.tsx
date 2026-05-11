"use client";

import {
  Component,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import LogoSection from "../logoSection";
import ShowListShops from "../showListShop";
import Image from "next/image";
import { StoreData } from "@/app/types/maptypes";
import { SearchBox } from "@mapbox/search-js-react";
import ButtonUI from "../buttonUI";
import { IoMdClose } from "react-icons/io";
import { ModeSideBar } from "@/app/types/uitypes";
import DetailStore from "../detailStore";
interface SideBarProps {
  shopsDisplay: StoreData[];
  // title: string;
  search: string;
  onSearch: Dispatch<SetStateAction<string>>;
  selectedStore: StoreData | undefined;
  onSelected: (shop: StoreData | undefined) => void;
  onLimit: () => void;
  hasMore: boolean;
}

export default function SideBar({
  shopsDisplay,
  search,
  onSearch,
  selectedStore,
  onSelected,
  onLimit,
  hasMore,
}: SideBarProps) {
  const [mode, setMode] = useState<ModeSideBar>("default");
  const [storeHunt, setStoreHunt] = useState<StoreData[]>([]);
  const modeSelectors: ModeSideBar[] = ["default", "saved", "hunt"];
  const displayTextMode: Record<ModeSideBar, string> = {
    default: "ร้านแนะนำ",
    saved: "ร้านที่บันทึก",
    hunt: "ร้านที่ล่าไปแล้ว",
  };
  useEffect(() => {
    const getHuntStore = localStorage.getItem(mode);
    if (getHuntStore) {
      setStoreHunt(JSON.parse(getHuntStore));
    }
  }, [mode, selectedStore]);
  const countDistinct = storeHunt.reduce<Record<string, number>>(
    (acc, distinct) => {
      const key = distinct.district ?? "unknown";
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1;
      return acc;
    },
    {},
  );
  return (
    <aside className="block w-1/2  md:block relative md:w-1/4 text-white overflow-auto bg-yellow-50">
      {/* Logo */}
      <LogoSection />
      {/* Search Bar */}
      <div className="m-3 h-12 sticky top-0 group">
        <input
          id="search-input"
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="ค้นหาร้านหมูกรอบสุดเด็ด ค้นหาตามเขต"
          className="relative bg-stone-50 p-2 pl-8 w-full h-full rounded-md text-black border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-sm"
        />
        {search && (
          <IoMdClose
            size={24}
            color="grey"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
            onClick={() => {
              onSearch("");
              onSelected(undefined);
            }}
          />
        )}
      </div>
      {/* Mode Selector Bar */}
      <div
        className="flex w-full text-black"
        // onClick={() => setMode("saved")}
      >
        {modeSelectors.map((modeSelector) => (
          <button
            key={modeSelector}
            onClick={() => setMode(modeSelector)}
            className={`flex-1 p-3 text-xl text-center hover:cursor-pointer hover:bg-amber-100 
              ${modeSelector === mode ? "border-b-2 border-amber-900 text-amber-900" : "border-b-2 border-transparent text-amber-700"}`}
          >
            {displayTextMode[modeSelector]}
          </button>
        ))}
      </div>
      {/* Suggest Store */}
      {mode === "default" && (
        <ShowListShops
          listShops={shopsDisplay}
          selectedStore={selectedStore}
          setSelected={onSelected}
        />
      )}
      {mode === "hunt" && (
        <div className="text-black">
          {storeHunt && (
            <ShowListShops
              listShops={storeHunt}
              selectedStore={selectedStore}
              setSelected={onSelected}
              modeTitle={displayTextMode["hunt"]}
            />
          )}
          <button
            className="text-black mt-5 bg-amber-700 p-3 hover:cursor-pointer hover:bg-amber-950"
            onClick={() => {
              localStorage.clear();
              setStoreHunt([]);
            }}
          >
            Delete Saved
          </button>
          <h1 className="text-2xl">กินไปแล้ว : {storeHunt.length}</h1>
          <ul>
            {Object.entries(countDistinct).filter((i)=>i[0] !== "unknown").map(([name, amount]) => (
              <li key={name}>
                {name}: {amount} ตัว
              </li>
            ))}
          </ul>
        </div>
      )}
      <ButtonUI
        title="Load More"
        onClick={onLimit}
        disabled={!hasMore}
        hidden={shopsDisplay.length === 0}
      />
    </aside>
  );
}
{
  /* <SearchBox
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
        /> */
}
