"use client";

import { useState } from "react";
import { useHomeShops } from "../hooks/useHomeShops";
import { ModeSelector } from "../types/mode_types";
import MapRender from "./MapRender";
import ShopDetailFloat from "./ShopDetailFloat";
import Sidebar from "./SideBar";

export default function HomeContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
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
    districtShops
  } = useHomeShops();

  return (
    <div className="w-screen h-dvh flex overflow-hidden relative">
      <div className="bg-linear-to-br from-amber-600 to-orange-800 p-2 md:p-3 sticky top-0 z-10">
        <button
          className="text-xl text-white hover:cursor-pointer"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          =
        </button>
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        shops={filteredShops}
        selectedShop={selectedShop}
        onSelectedShop={setSelectedShop}
        amount={amount}
        onLoadMore={setAmount}
        canLoadMore={canLoadMore}
        currentMode={mode as ModeSelector}
        onClearShops={handleClearStorage}
        districtShops={districtShops}
      />

      <ShopDetailFloat
        selectedShop={selectedShop}
        onClose={setSelectedShop}
        onToggleStorage={handleToggleLocalStorage}
        localShopStorage={localShopStorage}
      />

      <main className="bg-stone-200 flex-1 relative">
        <MapRender
          shops={filteredShops}
          selected={selectedShop}
          onSelected={setSelectedShop}
          toggleVisible={isSidebarOpen}
        />
      </main>
    </div>
  );
}
