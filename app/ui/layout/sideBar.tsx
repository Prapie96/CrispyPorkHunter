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
  const [storeInLocalStorage, setstoreInLocalStorage] = useState<StoreData[]>(
    [],
  );
  const modeSelectors: ModeSideBar[] = [
    "default",
    "saved",
    "hunt",
    "statistic",
  ];
  const displayTextMode: Record<ModeSideBar, string> = {
    default: "ร้านแนะนำ",
    saved: "ร้านที่บันทึก",
    hunt: "ร้านที่ล่าไปแล้ว",
    statistic: "สถิติ",
  };

  useEffect(() => {
    const updateData = () => {
      const sourceMode = mode === "statistic" ? "hunt" : mode;
      const data = localStorage.getItem(sourceMode);
      setstoreInLocalStorage(data ? JSON.parse(data) : []);
    };
    updateData();
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, [mode, selectedStore]);
  const countDistinct = storeInLocalStorage.reduce<Record<string, number>>(
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
  const countProvince = storeInLocalStorage.reduce<Record<string, number>>(
    (acc, store) => {
      const bangkok = store.location.address.includes("กรุงเทพมหานคร");
      const samutprakarn = store.location.address.includes("สมุทรปราการ");
      if (bangkok) {
        if (!acc["bangkok"]) acc["bangkok"] = 0;
        acc["bangkok"] += 1;
      } else if (samutprakarn) {
        if (!acc["samutprakarn"]) acc["samutprakarn"] = 0;
        acc["samutprakarn"] += 1;
      }
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
            className={`flex-1 p-3 text-md text-center hover:cursor-pointer hover:bg-amber-100 
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
     
      {/* show Store from Mode Selected*/}
      {mode && (
        <div className="text-black">
          {storeInLocalStorage && (
            <ShowListShops
              listShops={storeInLocalStorage}
              selectedStore={selectedStore}
              setSelected={onSelected}
              modeTitle={displayTextMode[mode]}
            />
          )}
          <button
            className="text-black mt-5 bg-amber-700 p-3 hover:cursor-pointer hover:bg-amber-950"
            onClick={() => {
              localStorage.clear();
              setstoreInLocalStorage([]);
            }}
          >
            Delete Saved
          </button>
        </div>
      )}
      {mode === "statistic" && (
        <div className="w-full h-full text-black p-4">
          <h1 className="text-2xl">กินไปแล้ว : {storeInLocalStorage.length}</h1>
          <ul>
            <p>จำนวนเขตที่กินไปแล้ว</p>
            {Object.entries(countDistinct)
              .filter((i) => i[0] !== "unknown")
              .map(([name, amount]) => (
                <li key={name}>
                  {name}: {amount}
                </li>
              ))}
            <p>จำนวนจังหวัดที่กินไปแล้ว</p>
            {Object.entries(countProvince).map(([name, amount]) => (
              <li key={name}>
                {name === "bangkok" ? "กรุงเทพมหานคร" : "สมุทรปราการ"}: {amount}
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
