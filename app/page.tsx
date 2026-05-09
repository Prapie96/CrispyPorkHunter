"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { getDistance } from "./utlis/helper";
import MapBox from "./ui/mapBox";
import { crispyPorkShops, initialLocation } from "./const/map";
import FloatSelected from "./ui/floatSelected";
import FabClose from "./ui/fabclose";
import { InitialLocationType,StoreData } from "./types/maptypes";
import SideBar from "./ui/layout/sideBar";
import { IoCaretBackSharp } from "react-icons/io5";
import storeData from "@/app/const/places.json";
export default function Home() {
  const [viewState, setViewState] = useState(initialLocation);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>();
  const [search, setSearch] = useState<string>("");
  const [limitStore, setLimitStore] = useState<number>(10);
  const sortedStores = storeData
    .map((store) => {
      const distance = getDistance(
        initialLocation.latitude,
        initialLocation.longitude,
        store.location.lat,
        store.location.lng,
      );
      return { ...store, distance };
    })
    // .filter((store) => store.distance <= 10)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limitStore);

  const displayShops = sortedStores.filter((store) => {
    if (search.trim() === null) return sortedStores;

    return store.name.includes(search.trim().toLocaleLowerCase()) || store.district?.includes(search.trim().toLocaleLowerCase());
  });

  const handleSelectedStore = (store: StoreData) => {
    setSelectedStore(store);
    setViewState({
      latitude: store.location.lat,
      longitude: store.location.lng,
      zoom: 15,
    });
  };
  const loadingMoreStore = () => {
    if (limitStore >= storeData.length) {
      console.log("ไม่สามารถโหลดข้อมูลร้านค้าเพิ่มได้แล้ว");
      return;
    }
    setLimitStore((prev) => prev + 10);
  };
  const hasMore = limitStore < storeData.length;
  return (
    <div className="bg-stone-50 h-screen overflow-hidden">
      <div className="flex  md:flex-row h-full w-full">
        <SideBar
          shopsDisplay={displayShops}
          // title={title}
          onSearch={setSearch}
          selectedStore={selectedStore}
          onSelected={handleSelectedStore}
          onLimit={loadingMoreStore}
          hasMore = {hasMore}
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
          {/* <div className="w-full h-full">
            <MapBox
              shops={sortedStores}
              selected={selectedStore}
              onSelected={handleSelectedStore}
              viewState={viewState}
              setViewState={setViewState}
            />
          </div> */}
        </main>
      </div>
    </div>
  );
}
