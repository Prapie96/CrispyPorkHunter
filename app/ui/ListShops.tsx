import React, { Dispatch, SetStateAction, useState } from "react";
import ShopCards from "./ShopCards";
import { StoreData } from "../types/shop_types";
import { ModeLocalStorage, ModeSelector } from "../types/mode_types";
import { mockupMode, sizeIcon } from "../consts/const";
import { ImBin } from "react-icons/im";
import { redPin } from "../consts/color";

interface ListShopsProps {
  shops: StoreData[];
  selected: StoreData | null;
  onSelected: Dispatch<SetStateAction<StoreData | null>>;
  amount: number;
  onLoadMore: Dispatch<SetStateAction<number>>;
  canLoadMore: boolean;
  currentMode: ModeSelector;
  onClearShops: (mode: ModeLocalStorage) => void;
}

export default function ListShops({
  shops,
  selected,
  onSelected,
  amount,
  onLoadMore,
  canLoadMore,
  currentMode,
  onClearShops,
}: ListShopsProps) {
  const displayTitleMode: Record<(typeof mockupMode)[number], string> = {
    All: "ร้านเด็ดเจ็ดย่านน้ำ",
    Save: "ร้านที่รอไปตำ",
    Hunt: "ร้านที่ล่าไปแล้ว",
    Statistic: "สถิติการล่า",
  };
  return (
    <div className="p-4 flex flex-col gap-2">
      
      <section className="flex justify-between">
        <p className="text-amber-700">
          {displayTitleMode[currentMode] ?? displayTitleMode["All"]}
        </p>
        {(currentMode === "Save" || currentMode === "Hunt") && (
          <button
            className="hover:cursor-pointer hover:opacity-50"
            onClick={() => onClearShops(currentMode as ModeLocalStorage)}
          >
            <ImBin size={sizeIcon} color={redPin} />
          </button>
        )}
      </section>
      {/* Show Shop Cards */}
      {shops.slice(0, amount).map((shop) => (
        <ShopCards
          key={shop.name}
          shop={shop}
          selected={selected}
          onClick={onSelected}
        />
      ))}
      {/* Click Load More Button */}
      <button
        onClick={() => onLoadMore((prev) => prev + 10)}
        disabled={canLoadMore}
        className="bg-amber-600 text-white mx-auto my-2 p-4 rounded-2xl shadow-sm
        hover:cursor-pointer hover:bg-amber-700
        disabled:bg-gray-400 disabled:cursor-default
      "
      >
        <p>ดูร้านเพิ่มเติม</p>
      </button>
    </div>
  );
}
