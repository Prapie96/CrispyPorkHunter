import { useEffect, useMemo, useState } from "react";
import allSortData from "@/app/const/places.json";
import { getDistance } from "../utlis/helper";
import { initialLocation } from "../const/map";
import { ModeSideBar } from "../types/uitypes";
import { StoreData } from "../types/maptypes";


export function useStore() {
  const [search, setSearch] = useState<string>("");
  const [limitStore, setLimitStore] = useState<number>(10);
  const [mode,setMode] = useState<ModeSideBar>("default"); // state Mode to store when button click
  const [storeInLocalStrage,setStoreInLocalstorage] = useState<StoreData[]>([]); // state for store StoreData[] 

  //get stores in LocalStorage when mode change
  useEffect(() => {
    const updateData = () => {
      const sourceMode = mode === "statistic" ? "hunt" : mode; // if mode === statistic will use data from mode hunt
      const data = localStorage.getItem(sourceMode); // get data using key from mode
      const parsedData : string[] = data ? JSON.parse(data) : [];
      const nameSet = new Set(parsedData);
      const mappedStores = allSortData.filter((store)=> nameSet.has(store.name));
      setStoreInLocalstorage(mappedStores); //set data into state
    };
    updateData(); //call to use function
    window.addEventListener("storage", updateData); //add event listener
    return () => window.removeEventListener("storage", updateData); //clear EventListener
  }, [mode,storeInLocalStrage]);

  //listener when data cleared
  const clearHistory = (targetMode:Exclude<ModeSideBar,"default" | "statistic">)=>{
    localStorage.removeItem(targetMode);
    setStoreInLocalstorage([]);
  }



  // sort data compare initialState location
  const processData = useMemo(() => {
    return allSortData
      .map((store) => {
        return {
          ...store,
          distance: getDistance(
            initialLocation.latitude,
            initialLocation.longitude,
            store.location.lat,
            store.location.lng,
          ),
        };
      })
      .sort((a, b) => a.distance - b.distance);
  }, [allSortData,initialLocation]);


  const searchStoreData = useMemo(() => {
    const searchText = search.trim().toLocaleLowerCase();
    const filterText = processData.filter((store) => {
      if (!searchText) return true;
      return (
        store.name.toLocaleLowerCase().includes(searchText) ||
        store.district?.includes(searchText) ||
        store.location.address.includes(searchText)
      );
    });
    return filterText;
  }, [search, processData]);

  const sliceSearchStore = searchStoreData.slice(0,limitStore);
  const sliceStoreInLocal = storeInLocalStrage.slice(0,limitStore);
  const displayStores = mode === "default" ? sliceSearchStore : sliceStoreInLocal;

  //make LoadMore change on Which dataSource we using
  const currentTotalLength = mode === "default" ? searchStoreData.length : storeInLocalStrage.length;
  const hasMore = limitStore < currentTotalLength;

  //LoadMore
  const handleLoadMore = () => {
    if (hasMore) {
      setLimitStore((prev) => prev + 10);
    }
  };


  return {
    displayStores ,
    search,
    setSearch,
    handleLoadMore,
    hasMore,
    mode,
    setMode,
    clearHistory,
  };
}
