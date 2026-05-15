import { useEffect, useState } from "react";
import { StoreData } from "../types/maptypes";
import { ModeToggleBar } from "../types/uitypes";

export function useHandleToggle(mode: ModeToggleBar, store: StoreData) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const updateData = ()=>{
      const existingStore = localStorage.getItem(mode);
    let parsedData: string[] = existingStore ? JSON.parse(existingStore) : [];
    const nameSet = new Set(parsedData);
    const isAlreadyHas = nameSet.has(store.name);
    setToggle(isAlreadyHas);
    }
    updateData();
    window.addEventListener("storage", updateData);
    return () => window.removeEventListener("storage", updateData);
  }, [store.name,mode]);

  const handleToggle = () => {
    const existingStore = localStorage.getItem(mode);
    let parsedData: string[] = existingStore ? JSON.parse(existingStore) : [];
    //check this store has data or not
    const nameSet = new Set(parsedData);
    if (nameSet.has(store.name)) {
      nameSet.delete(store.name);
      setToggle(false);
    } else {
      nameSet.add(store.name);
      setToggle(true);
    }
    //save into localStorage with key
    localStorage.setItem(mode, JSON.stringify(Array.from(nameSet)));
    window.dispatchEvent(new Event("storage"));
  };

  return { toggle, setToggle, handleToggle };
}
