import { StoreData } from "@/app/types/maptypes";
import { ModeSideBar } from "@/app/types/uitypes";
import { useState, useEffect, useMemo } from "react";
import StatCard from "../Card/storeCard";
import StatCardWrapper from "../Card/storeCardWrapper";
import { countDistrict } from "@/app/utlis/helper";
import { displayTextMode } from "@/app/const/variant";

interface StoreListPros {
  storeList: StoreData[];
  selectedStore: StoreData | undefined;
  onStoreSelected: (store: StoreData) => void;
  mode: ModeSideBar;
}

export default function StoreList({
  storeList,
  selectedStore,
  onStoreSelected,
  mode,
}: StoreListPros) {
  const huntedDistrict = countDistrict(storeList);

  const renderEmptyData = () => {
    if ((mode === "statistic" || "saved") && storeList.length === 0)
      return "ยังไม่มีประวัติการกิน";
    if (storeList.length === 0) return "ไม่พบข้อมูลร้าน";
    return null;
  };

  return (
    <div className="text-black w-full h-full">
      {/* ---show title Mode --- */}
      <p className="p-4 text-xl ">
        {displayTextMode[mode] ?? "ร้านหมูกรอบใกล้ฉัน"}
      </p>
      {/* --- show statistic when  mode === statistic --- */}
      {mode === "statistic" && (
        <section className="p-5">
          <StatCardWrapper huntedStoreLocalData={storeList} />
          <strong>เขตที่พิชิตไปแล้ว</strong>
          {Object.entries(huntedDistrict).map(([district, amount]) => (
            <ul key={district}>
              <li>
                {district !== "unknown" ? district : "ไม่พบข้อมูลเขต"} :{" "}
                {amount}
              </li>
            </ul>
          ))}
        </section>
      )}

      {storeList.length > 0 && mode !== "statistic" ? (
        <>
          {storeList.map((shop) => (
            <div
              key={shop.name}
              className={`m-2 p-4 rounded-md shadow-2xs border-b-amber-500 hover:bg-gray-300 cursor-pointer
                 ${selectedStore?.name === shop.name ? "bg-linear-to-br from-amber-600 to-orange-800 shadow-md text-white" : "bg-amber-100"} 
                `}
              onClick={() => {
                onStoreSelected(shop);
              }}
            >
              <p>ร้าน : {shop.name}</p>
              <p>ราคา : {shop.pricing}</p>
              <p>Rating : {shop.rating} ⭐</p>
              <p>ที่อยู่ : {shop.location.address}</p>
            </div>
          ))}
        </>
      ) : (
        <div className="text-lg text-gray-500 text-center mt-10">
          {renderEmptyData()}
        </div>
      )}
    </div>
  );
}
