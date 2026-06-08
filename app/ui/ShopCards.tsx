import React, { Dispatch, SetStateAction } from "react";
import { StoreData } from "../types/shop_types";

interface ShopCardsProps {
  shop: StoreData;
  onClick: Dispatch<SetStateAction<StoreData | null>>;
}

export default function ShopCards({ shop, onClick }: ShopCardsProps) {
  return (
    <div
      className="bg-amber-100 w-full p-4 rounded-md text-black
     hover:bg-gray-300 hover:cursor-pointer shadow-sm"
      onClick={()=>onClick(shop)}
    >
      <p>ร้าน : {shop.name}</p>
      <p>ราคา : {shop.pricing}</p>
      <p>เรทติ้ง : {shop.rating} </p>
      <p>ที่อยู่ : {shop.location.address}</p>
    </div>
  );
}
