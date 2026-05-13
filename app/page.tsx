"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { StoreData } from "./types/maptypes";
import { useStore } from "./hooks/useStore";
import NewSideBar from "./ui/layout/newSideBar";
import SearchBox from "./ui/sideBar/searchbox";
import StoreList from "./ui/sideBar/storeList";
import ButtonUI from "./ui/buttonUI";
import ModeSelector from "./ui/sideBar/modeSelector";
import MapBox from "./ui/mapBox";
import FloatPage from "./ui/layout/floatPage";
export default function Home() {
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>();
  const {
    displayStores,
    search,
    setSearch,
    hasMore,
    handleLoadMore,
    mode,
    setMode,
  } = useStore();

  const handleSelectedStore = (store: StoreData | undefined) => {
    setSelectedStore(store);
  };
  const disabledLoadMore = displayStores.length === 0;
  return (
    <div className="bg-stone-50 h-screen overflow-hidden">
      <div className="flex  md:flex-row h-full w-full">
        <NewSideBar>
          <div className="bg-stone-50 sticky top-0">
            <ModeSelector mode={mode} onModeSelected={setMode} />
            {mode === "default" && (
              <SearchBox
                search={search}
                onSearch={setSearch}
                onSelected={handleSelectedStore}
              />
            )}
          </div>
          {mode && (
            <StoreList
              storeList={displayStores}
              selectedStore={selectedStore}
              onStoreSelected={handleSelectedStore}
              mode={mode}
            />
          )}

          {mode !== "statistic" && (
            <ButtonUI
              variant="primary"
              size="lg"
              title="Load More"
              onClick={handleLoadMore}
              disabled={!hasMore || disabledLoadMore}
              hidden={displayStores.length === 0}
            />
          )}
        </NewSideBar>
        <FloatPage
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
        />
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
