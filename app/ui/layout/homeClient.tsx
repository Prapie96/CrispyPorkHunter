"use client";

import { StoreData } from "@/app/types/maptypes";
import { useState } from "react";
import FloatPage from "./floatPage";
import NewSideBar from "./newSideBar";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBox from "../mapBox";
import { useStore } from "@/app/hooks/useStore";
import ButtonUI from "../buttonUI";
import ModeSelector from "../sideBar/modeSelector";
import SearchBox from "../sideBar/searchbox";
import StoreList from "../sideBar/storeList";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaAnglesLeft } from "react-icons/fa6";

export default function HomeClient() {
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>();
  const {
    displayStores,
    search,
    setSearch,
    hasMore,
    handleLoadMore,
    mode,
    setMode,
    clearHistory
  } = useStore();
  const disabledLoadMore = displayStores.length === 0;
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="bg-stone-50 h-dvh w-screen overflow-hidden relative">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-[calc(1rem+env(safe-area-inset-top))]  z-50 bg-amber-500 text-white p-2 rounded-md shadow-md hover:bg-amber-600 
            transition-colors
            ${isSidebarOpen ? "left-[calc(75vw+8px)] sm:left-96" : "left-2"}
            `}
        title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      >
        {isSidebarOpen ? <FaAnglesLeft /> : <RxHamburgerMenu />}
      </button>

      <div className="flex h-full w-full relative">
        <NewSideBar isOpen={isSidebarOpen}>
          <div className="sticky top-0 bg-yellow-50">
            <ModeSelector mode={mode} onModeSelected={setMode} />
            {mode === "default" && (
              <SearchBox
                search={search}
                onSearch={setSearch}
                onSelected={setSelectedStore}
              />
            )}
          </div>
          {mode && (
            <StoreList
              storeList={displayStores}
              selectedStore={selectedStore}
              onStoreSelected={setSelectedStore}
              mode={mode}
              onClearHistory={clearHistory}
            />
          )}

          {mode !== "statistic" && (
            <ButtonUI
              variant="primary"
              size="lg"
              children={"Load More"}
              onClick={handleLoadMore}
              disabled={!hasMore || disabledLoadMore}
              hidden={displayStores.length === 0}
              className="mx-auto mb-2"
            />
          )}
        </NewSideBar>

        <FloatPage
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />

        <main className="flex-1  bg-[#E5E7EB] ">
          <MapBox
            shops={displayStores}
            selected={selectedStore}
            onSelected={setSelectedStore}
            sideBarVisible={isSidebarOpen}
          />
        </main>
      </div>
    </div>
  );
}
