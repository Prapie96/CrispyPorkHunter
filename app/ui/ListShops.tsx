import React, { Dispatch, SetStateAction, useState } from "react";
import ShopCards from "./ShopCards";
import { StoreData } from "../types/shop_types";

interface ListShopsProps {
  shops: StoreData[];
  onSelected: Dispatch<SetStateAction<StoreData | null>>;
  amount: number;
  onLoadMore: () => void;
  canLoadMore : boolean
}

export default function ListShops({ shops, onSelected, amount , onLoadMore, canLoadMore}: ListShopsProps) {
   
  return (
    <div className="p-4 flex flex-col gap-2">
      <p className="text-amber-700">ร้านเด็ดเจ็ดย่านน้ำ</p>
      {/* Show Shop Cards */}
      {shops.slice(0, amount).map((shop) => (
        <ShopCards
          key={shop.name}
          shop={shop}
          onClick={onSelected}
        />
      ))}
      {/* Click Load More Button */}
      <button 
      onClick={onLoadMore}
      disabled = {canLoadMore}
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
