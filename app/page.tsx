"use client";
// import styles from "./page.module.css";
import Logo from "./ui/Logo";
import ListShops from "./ui/ListShops";
import NavBar from "./ui/NavBar";
import SearchBar from "./ui/SearchBar";
import {useState } from "react";
import rawShops from "./consts/places.json";
import { StoreData } from "./types/shop_types";
import MapRender from "./ui/MapRender";
import { useSearchParams } from "next/navigation";
import FloatPage from "./ui/FloatPage";
import { FaCaretLeft } from "react-icons/fa6";
import { sizeIcon } from "./consts/const";
import {ModeSelector } from "./types/mode_types";
import { filterShopsByModeAndSearch } from "./utils/helper";
import useShopsStorage from "./hooks/useShops";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const mode = searchParams.get("mode") ?? "";

  const [selectedShop, setSelectedShop] = useState<StoreData | null>(null);
  const [toggle, setToggle] = useState(true);
  const [amount, setAmount] = useState(10);

  //Custom hook for logic shops in Localstorage
  const { localShopStorage, handleToggleLocalStorage, handleClearStorage } =
    useShopsStorage();

  const shopByModeAndSearch = filterShopsByModeAndSearch({
    rawShops,
    mode,
    search,
    storage: localShopStorage,
  });
  const filteredShops = shopByModeAndSearch.slice(0, amount);
  return (
    <div className="w-screen h-dvh flex overflow-hidden">
      <div className="bg-linear-to-br from-amber-600 to-orange-800 p-3 sticky top-0 z-10">
        <button
          className="text-xl text-white hover:cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          =
        </button>
      </div>
      <aside
        className={`bg-yellow-50 flex flex-col gap-4 overflow-y-auto overflow-x-hidden
           transition-all duration-200 relative
          ${toggle ? "w-96" : "w-0 "} 
        `}
      >
        <div className="flex flex-col">
          <Logo />
          <NavBar />
        </div>
        <SearchBar />
        <ListShops
          shops={filteredShops}
          selected={selectedShop}
          onSelected={setSelectedShop}
          amount={amount}
          onLoadMore={setAmount}
          canLoadMore={amount >= shopByModeAndSearch.length}
          currentMode={mode as ModeSelector}
          onClearShops={handleClearStorage}
        />
      </aside>
      {selectedShop && (
        <div className="relative left-4">
          <FloatPage
            shop={selectedShop}
            onSelected={setSelectedShop}
            onToggle={handleToggleLocalStorage}
            isActive={localShopStorage.Hunt?.includes(selectedShop.name)}
            isSaved={localShopStorage.Save.includes(selectedShop.name)}
          />
          <button
            className="bg-amber-600 absolute py-4 left-96 z-40 top-1/2 rounded-r-2xl hover:cursor-pointer hover:bg-amber-700"
            onClick={() => setSelectedShop(null)}
          >
            <FaCaretLeft size={sizeIcon} color={"white"} />
          </button>
        </div>
      )}
      <main className="bg-stone-200 flex-1 relative">
        <MapRender
          shops={filteredShops}
          selected={selectedShop}
          onSelected={setSelectedShop}
          toggleVisible={toggle}
        />
      </main>
    </div>
  );
}
