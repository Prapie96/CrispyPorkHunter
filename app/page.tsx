"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import FloatSelected from "./ui/floatSelected";
import FabClose from "./ui/fabclose";
import { StoreData } from "./types/maptypes";
import SideBar from "./ui/layout/sideBar";
import { IoCaretBackSharp } from "react-icons/io5";
import { useStore } from "./hooks/useStore";
import NewSideBar from "./ui/layout/newSideBar";
import SearchBox from "./ui/sideBar/searchbox";
import StoreList from "./ui/sideBar/storeList";
import ButtonUI from "./ui/buttonUI";
import ModeSelector from "./ui/sideBar/modeSelector";
import { ModeSideBar } from "./types/uitypes";
export default function Home() {
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>();
  const { displayStores, search, setSearch, hasMore, handleLoadMore } =
    useStore();

  const [mode, setMode] = useState<ModeSideBar>("default");
  const handleSelectedStore = (store: StoreData | undefined) => {
    setSelectedStore(store);
  };
    const [storeInLocalStorage, setstoreInLocalStorage] = useState<StoreData[]>([]);
  const disabledLoadMore = displayStores.length === 0;
  return (
    <div className="bg-stone-50 h-screen overflow-hidden">
      <div className="flex  md:flex-row h-full w-full">
        {/* <SideBar
          shopsDisplay={displayStores}
          search={search}
          onSearch={setSearch}
          selectedStore={selectedStore}
          onSelected={handleSelectedStore}
          onLimit={handleLoadMore}
          hasMore={hasMore}
        /> */}
        <NewSideBar>
          <ModeSelector mode={mode} onModeSelected={setMode} />
          {mode === "default" && (
            <SearchBox
              search={search}
              onSearch={setSearch}
              onSelected={handleSelectedStore}
            />
          )}
          {mode && (
            <StoreList
              storeList={displayStores}
              selectedStore={selectedStore}
              onStoreSelected={handleSelectedStore}
              mode={mode}
              storeInLocalStorage={storeInLocalStorage}
              onSetInLocalStorage={setstoreInLocalStorage}
            />
          )}

          {mode !== "statistic" && (
            <ButtonUI
              title="Load More"
              onClick={handleLoadMore}
              disabled={!hasMore || disabledLoadMore}
              hidden={displayStores.length === 0}
            />
          )}
        </NewSideBar>
        <div
          className={`fixed top-0 bottom-0 z-10 md:left-1/4 mt-4 ml-2 flex items-center
                      transition-all duration-500 ease-in-out left-0
                      ${selectedStore ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}
                    `}
        >
          <div
            className="relative w-96 h-full flex flex-col bg-amber-50 rounded-xl shadow-md text-black
            overflow-auto custom-scrollbar 
          "
          >
            {selectedStore && (
              <>
                <FabClose setSelected={setSelectedStore} />
                <FloatSelected store={selectedStore} />
              </>
            )}
          </div>

          <div
            className={`flex  bg-amber-800 w-5 h-10  items-center justify-center text-white
                rounded-r-xl cursor-pointer shadow-md `}
            onClick={() => setSelectedStore(undefined)}
          >
            <IoCaretBackSharp />
          </div>
        </div>
        <main className="flex-1  bg-[#E5E7EB] ">
          <div className="w-full h-full">
            {/* <MapBox
              shops={displayStores}
              selected={selectedStore}
              onSelected={handleSelectedStore}
              // viewState={viewState}
              // setViewState={setViewState}
            /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
