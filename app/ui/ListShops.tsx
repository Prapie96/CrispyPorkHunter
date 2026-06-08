import React, { Dispatch, SetStateAction } from "react";
import ShopCards from "./ShopCards";
import { StoreData } from "../types/shop_types";

interface ListShopsProps {
  shops: StoreData[];
  onSelected: Dispatch<SetStateAction<StoreData | null>>;
}

export default function ListShops({ shops, onSelected }: ListShopsProps) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <p className="text-amber-700">ร้านเด็ดเจ็ดย่านน้ำ</p>
      {/* Show Shop Cards */}
      {shops.slice(0, 10).map((shop) => (
        <ShopCards
          key={shop.name}
          shop={shop}
          onClick={onSelected}
        />
      ))}
    </div>
  );
}
