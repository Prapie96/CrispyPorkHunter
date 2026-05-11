"use client";

import { StoreData } from "../types/maptypes";
import Image from "next/image";
import { changeGoogleImageUrl } from "../utlis/helper";
import DetailStore from "./detailStore";
import ButtonUI from "./buttonUI";
import { title } from "process";
import { useEffect, useState } from "react";
import { ActionButtonLocalStorage } from "../types/uitypes";
interface FloatSelectedProps {
  store: StoreData;
}

export default function FloatSelected({ store }: FloatSelectedProps) {
  const [isHunted, setIsHunted] = useState(false);
  // Check status isHunted when user change store
  useEffect(() => {
    const getLocalData = JSON.parse(localStorage.getItem("hunt") || "[]");
    const checkStoreName = getLocalData.some(
      (item: StoreData) => item.name === store.name,
    );
    setIsHunted(checkStoreName);
  }, [store.name]);

  const handleToggleHunt = () => {
    const existingHuntStore = localStorage.getItem("hunt");
    let parsedData: StoreData[] = existingHuntStore
      ? JSON.parse(existingHuntStore)
      : [];
    //check this store has hunted or not
    const isHunted = parsedData.some(
      (item: StoreData) => store.name === item.name,
    );
    // if this store is hunted will remove from localStorage
    if (isHunted) {
      parsedData = parsedData.filter(
        (item: StoreData) => store.name !== item.name,
      );
      setIsHunted(false); // make state return initial
    } else {
      // if this store never hunted push it into [] localStorage
      parsedData.push(store);
      setIsHunted(true);
    }
    //save into localStorage with key
    localStorage.setItem("hunt", JSON.stringify(parsedData));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="mx-4 overflow-auto">
      <Image
        src={changeGoogleImageUrl(store.thumbnail)}
        alt={store.name}
        width={400}
        height={400}
        className="object-cover"
        priority
      />
      <div className="mt-4">
        <DetailStore store={store} />
        <ButtonUI
          title={
            isHunted
              ? "ล่าร้านนี้แล้ว (กดเพื่อยกเลิก)"
              : "คุณล่าร้านนี้หรือยัง?"
          }
          onClick={handleToggleHunt}
          className={isHunted ? "bg-green-600" : "bg-amber-600"}
        />
      </div>
    </div>
  );
}

// const handleToggleHunt = ()=>{
//     const existingHuntStore = localStorage.getItem("hunt");
//     let parsedStore: StoreData[] = existingHuntStore ? JSON.parse(existingHuntStore) : [];
//     const isHasStore = parsedStore.some((item:StoreData)=> item.name === store.name);
//     if(isHasStore){
//       parsedStore = parsedStore.filter((item:StoreData)=> item.name !== store.name);
//       setIsHunted(false);
//     }else{
//       parsedStore.push(store);
//       setIsHunted(true);
//     }
//     localStorage.setItem("hunt",JSON.stringify(parsedStore));
//     window.dispatchEvent(new Event("storage"));
//   }
