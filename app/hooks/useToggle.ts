import { useEffect, useState } from "react";
import { StoreData } from "../types/maptypes";
import { ModeToggleBar } from "../types/uitypes";

export function useHandleToggle(mode: ModeToggleBar, store: StoreData) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const updateData = () => {
      const data = localStorage.getItem(mode);
      const parsed = data ? JSON.parse(data) : [];
      const exists = parsed.some((item: any) => item.name === store.name);
      setToggle(exists);
    };
    updateData();
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, [store.name, mode]);

  const handleToggle = () => {
    const existingHuntStore = localStorage.getItem(mode);
    let parsedData: StoreData[] = existingHuntStore
      ? JSON.parse(existingHuntStore)
      : [];
    //check this store has data or not
    const isHasThisStore = parsedData.some(
      (item: StoreData) => store.name === item.name,
    );
    // if this store is in localstorage  will remove from localStorage
    if (isHasThisStore) {
      parsedData = parsedData.filter(
        (item: StoreData) => store.name !== item.name,
      );
      setToggle(false); // make state return initial
    } else {
      // if this store never hunted push it into [] localStorage
      parsedData.push(store);
      setToggle(true);
    }
    //save into localStorage with key
    localStorage.setItem(mode, JSON.stringify(parsedData));
    window.dispatchEvent(new Event("storage"));
  };

  return { toggle, setToggle, handleToggle };
}
