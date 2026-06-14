// hooks/useHomeShops.ts
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { filterShopsByModeAndSearch } from "../utils/helper";
import { indexedRawShops } from "../consts/const";
import { ModeSelector } from "../types/mode_types";
import { StoreData } from "../types/shop_types";
import useShopsStorage from "./useShops";

export function useHomeShops() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const mode = (searchParams.get("mode") ?? "") as ModeSelector;

  const [selectedShop, setSelectedShop] = useState<StoreData | null>(null);
  const [amount, setAmount] = useState(10);

  const { localShopStorage, handleToggleLocalStorage, handleClearStorage } =
    useShopsStorage();

  const shopByModeAndSearch = filterShopsByModeAndSearch({
    rawShops: indexedRawShops,
    mode,
    search,
    storage: localShopStorage,
  });

  const filteredShops = shopByModeAndSearch.slice(0, amount);
  const canLoadMore = amount >= shopByModeAndSearch.length;

  return {
    mode,
    selectedShop,
    setSelectedShop,
    amount,
    setAmount,
    filteredShops,
    canLoadMore,
    localShopStorage,
    handleToggleLocalStorage,
    handleClearStorage,
  };
}
