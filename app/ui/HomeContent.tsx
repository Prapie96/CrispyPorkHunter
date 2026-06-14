"use client";

import { useState } from "react";
import { useHomeShops } from "../hooks/useHomeShops";
import { ModeSelector } from "../types/mode_types";
import MapRender from "./MapRender";
import ShopDetailFloat from "./ShopDetailFloat";
import Sidebar from "./SideBar";
import { FaBars, FaXmark } from "react-icons/fa6";

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
    districtShops,
  } = useHomeShops();
  //  md:relative md:top-0 md:left-0 md:h-full md:p-4
  return (
    <div className="w-screen h-dvh flex overflow-hidden relative">
      <div
        className={`
       transition-all duration-200 z-50
        absolute top-4
        ${isSidebarOpen ? "left-72 md:left-96 ml-4" : "left-4"}
       bg-amber-500 hover:bg-amber-600
        rounded-full shadow-md
      `}
      >
        <button
          className="p-3 text-xl text-white hover:cursor-pointer flex items-center justify-center w-11 h-11"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          {/* แสดง Icon เดียวกันทั้งจอเล็กและจอใหญ่เพื่อความสวยงามของปุ่มกลม */}
          {isSidebarOpen ? <FaXmark size={20} /> : <FaBars size={20} />}
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
