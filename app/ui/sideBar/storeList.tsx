import { StoreData } from "@/app/types/maptypes";
import { ModeSideBar } from "@/app/types/uitypes";
import { useState, useEffect } from "react";

interface StoreListPros {
  storeList: StoreData[];
  selectedStore: StoreData | undefined;
  onStoreSelected: (store: StoreData) => void;
  mode: ModeSideBar;
  storeInLocalStorage:StoreData[];
  onSetInLocalStorage : (storeInLocalStorage:StoreData[])=>void;
}

export default function StoreList({
  storeList,
  selectedStore,
  onStoreSelected,
  mode,
  storeInLocalStorage,
  onSetInLocalStorage
}: StoreListPros) {
  const displayTextMode: Record<ModeSideBar, string> = {
    default: "ร้านแนะนำ",
    saved: "ร้านที่บันทึก",
    hunt: "ร้านที่ล่าไปแล้ว",
    statistic: "สถิติ",
  };
//   const [storeInLocalStorage, setstoreInLocalStorage] = useState<StoreData[]>([]);
  useEffect(() => {
    const updateData = () => {
      const sourceMode = mode === "statistic" ? "hunt" : mode;
      const data = localStorage.getItem(sourceMode);
      onSetInLocalStorage(data ? JSON.parse(data) : []);
    };
    updateData();
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, [mode]);
  const displayData = mode === "default" ? storeList : storeInLocalStorage;
  return (
    <div>
      {displayData.length > 0 ? (
        <div className="">
          <p className="p-4 text-xl text-black">
            {displayTextMode[mode] ?? "ร้านหมูกรอบใกล้ฉัน"}
          </p>
          {displayData.map((shop) => (
            <div
              key={shop.name}
              className={`m-2 p-4 text-black  rounded-md shadow-2xs border-b-amber-500 hover:bg-gray-300 cursor-pointer
                 ${selectedStore?.name === shop.name ? "bg-linear-to-br from-amber-600 to-orange-800 shadow-md text-white" : "bg-amber-100"} 
                `}
              onClick={() => {
                onStoreSelected(shop);
              }}
            >
              {/* <DetailStore store={shop}/>  */}
              <p>ร้าน : {shop.name}</p>
              <p>ราคา :{shop.pricing}</p>
              <p>Rating :{shop.rating}</p>
              <p>ที่อยู่ : {shop.location.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xl text-black text-center mt-4">
          {!selectedStore && "ไม่พบร้านที่ค้นหา"}
        </div>
      )}
    </div>
  );
}
