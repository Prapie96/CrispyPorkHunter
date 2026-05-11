"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDistance } from "./utlis/helper";
import MapBox from "./ui/mapBox";
import FloatSelected from "./ui/floatSelected";
import FabClose from "./ui/fabclose";
import { InitialLocationType, StoreData } from "./types/maptypes";
import SideBar from "./ui/layout/sideBar";
import { IoCaretBackSharp } from "react-icons/io5";
import allstoreData from "@/app/const/places.json";
import { useStore } from "./้hooks/useStore";
export default function Home() {
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>();
  const { displayStores, search, setSearch, hasMore, handleLoadMore } =
    useStore();

  const handleSelectedStore = (store: StoreData | undefined) => {
    setSelectedStore(store);
  };
  return (
    <div className="bg-stone-50 h-screen overflow-hidden">
      <div className="flex  md:flex-row h-full w-full">
        <SideBar
          shopsDisplay={displayStores}
          // title={title}
          search={search}
          onSearch={setSearch}
          selectedStore={selectedStore}
          onSelected={handleSelectedStore}
          onLimit={handleLoadMore}
          hasMore={hasMore}
        />

        <div
          className={`fixed top-0 bottom-0 z-10 md:left-1/4 my-5 ml-2 flex items-center
                      transition-all duration-500 ease-in-out left-0
                      ${selectedStore ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}
                    `}
        >
          <div
            className={`relative w-96 h-full bg-amber-50 rounded-xl shadow-md text-black`}
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
          {/* <div className="top-0 sticky bg-amber-50 p-6 bg-linear-to-br from-amber-600 to-orange-800"></div> */}
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
