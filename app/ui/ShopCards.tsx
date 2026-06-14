import React, { Dispatch, SetStateAction } from "react";
import { ShopData } from "../types/shop_types";

interface ShopCardsProps {
  shop: ShopData;
  selected:ShopData | null;
  onClick: Dispatch<SetStateAction<ShopData | null>>;
}

export default function ShopCards({ shop , selected, onClick }: ShopCardsProps) {
  return (
    <div
      className={`w-full p-4 rounded-md 
     hover:bg-gray-300 hover:cursor-pointer shadow-sm
       ${selected?.name === shop.name ? 'bg-linear-to-br from-amber-600 to-orange-700 text-white':'bg-amber-100 text-black' }
     `}
      onClick={()=>onClick(shop)}
    >
      <p>ร้าน : {shop.name}</p>
      <p>ราคา : {shop.pricing ?? "ไม่ปรากฎข้อมูล"}</p>
      <p>เรทติ้ง : {shop.rating ?? "ไม่ปรากฎข้อมูล"} </p>
      <p>ที่อยู่ : {shop.location.address}</p>
    </div>
  );
}
