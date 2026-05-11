import { useMemo, useState } from "react";
import allSortData from "@/app/const/places.json";
import { getDistance } from "../utlis/helper";
import { initialLocation } from "../const/map";

export function useStore() {
  const [search, setSearch] = useState<string>("");
  const [limitStore, setLimitStore] = useState<number>(10);

  // sort data
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
  }, []);

  // Filter search
  const displayStores = useMemo(() => {
    const searchText = search.trim().toLocaleLowerCase();
    const filterText = allSortData.filter((store) => {
      if (!searchText) return true;
      return (
        store.name.toLocaleLowerCase().includes(searchText) ||
        store.district?.includes(searchText) || store.location.address.includes(searchText)
      );
    });
    return filterText.slice(0, limitStore);
  }, [search, limitStore, processData]);
  //LoadMore
  const handleLoadMore = () => {
    if (hasMore) {
      setLimitStore((prev) => prev + 10);
    }
  };
  const hasMore = limitStore < allSortData.length;

  return {
    displayStores,
    search,
    setSearch,
    handleLoadMore,
    hasMore,
  };
}
