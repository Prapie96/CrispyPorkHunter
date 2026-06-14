import React, { Dispatch, SetStateAction } from "react";
import ShopCards from "./ShopCards";
import { ShopData } from "../types/shop_types";
import { ModeLocalStorage, ModeSelector } from "../types/mode_types";
import { mockupMode, sizeIcon } from "../consts/const";
import { ImBin } from "react-icons/im";
import { redPin } from "../consts/color";
import Statistics from "./Statistics";

interface ListShopsProps {
  shops: ShopData[];
  selected: ShopData | null;
  onSelected: Dispatch<SetStateAction<ShopData | null>>;
  amount: number;
  onLoadMore: Dispatch<SetStateAction<number>>;
  canLoadMore: boolean;
  currentMode: ModeSelector;
  onClearShops: (mode: ModeLocalStorage) => void;
  districtShops: Record<string, number>;
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
  districtShops,
}: ListShopsProps) {
  const displayTitleMode: Record<(typeof mockupMode)[number], string> = {
    All: "ร้านเด็ดเจ็ดย่านน้ำ",
    Save: "ร้านที่รอไปตำ",
    Hunt: "ร้านที่ล่าไปแล้ว",
    Statistic: "สถิติการล่า",
  };

  function renderByMode(mode: ModeSelector, shops: ShopData[]) {
    console.log("mode :", mode);
    
    if (mode !== "Statistic") {
      return (
        <div className="flex flex-col gap-2">
          {shops.map((shop) => (
            <ShopCards
              key={shop.name}
              shop={shop}
              selected={selected}
              onClick={onSelected}
            />
          ))}
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
    } else {
      return <Statistics shops={shops} districtShops={districtShops} />;
    }
  }

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
      {renderByMode(currentMode, shops)}
    </div>
  );
}
