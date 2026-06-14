// hooks/useHomeShops.ts
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { filterShopsByModeAndSearch } from "../utils/helper";
import { indexedRawShops } from "../consts/const";
import { ModeSelector } from "../types/mode_types";
import { ShopData } from "../types/shop_types";
import useShopsStorage from "./useShops";

export function useHomeShops() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const mode = (searchParams.get("mode") ?? "") as ModeSelector;

  const [selectedShop, setSelectedShop] = useState<ShopData | null>(null);
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

  // calculate เขต (district counts)
  const districtShops = shopByModeAndSearch.reduce(
    (acc, shop) => {
      const distinct = shop.district ?? "ไม่พบเขต";
      acc[distinct] = (acc[distinct] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

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
    districtShops,
  };
}
