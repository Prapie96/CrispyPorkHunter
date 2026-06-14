import React, { useEffect, useState } from "react";
import {StorageLists } from "../types/shop_types";
import { keyLocalStorage } from "../consts/const";
import { ModeLocalStorage } from "../types/mode_types";
import { saveShopsIntoStorage } from "../utils/helper";

export default function useShopsStorage() {
  
  const [localShopStorage, setLocalShopStorage] = useState<StorageLists>({
    Save: [],
    Hunt: [],
  });
  // Fetch shops from localStorage when initial Page
  useEffect(() => {
    const shopsFromStorage = localStorage.getItem(keyLocalStorage);
    //set into state
    if (shopsFromStorage) {
      setLocalShopStorage(JSON.parse(shopsFromStorage));
    }
  }, []);

  const handleToggleLocalStorage = (
    shopName: string,
    currentMode: ModeLocalStorage,
  ) => {
    // If hasn't current Mode
    if (!currentMode) return;
    // set new Data into state
    setLocalShopStorage((prev) => {
      const shopsDataList = prev[currentMode] || []; //get data in state access by currentMode to search key
      let newShopsList = [...shopsDataList];
      const isExistShop = shopsDataList.includes(shopName);
      if (isExistShop) {
        newShopsList = newShopsList.filter((name) => name !== shopName);
      } else {
        newShopsList.push(shopName);
      }
      //update by currentMode
      const updatedShopsInState = {
        ...prev,
        [currentMode]: newShopsList,
      };
      //save into LocalStorage
      saveShopsIntoStorage(updatedShopsInState);
      return updatedShopsInState;
    });
  };
  // Clear Shops in LocalStorage with key by currentMode
  const handleClearStorage = (currentMode: ModeLocalStorage) => {
    if (!currentMode) return;
    //update data in state with key give value = []
    setLocalShopStorage((prev) => {
      const removeShops = {
        ...prev,
        [currentMode]: [],
      };
      //save into LocalStorage
      saveShopsIntoStorage(removeShops);
      return removeShops;
    });
  };
  return {
    localShopStorage,
    handleToggleLocalStorage,
    handleClearStorage,
  };
}
