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
import { InitialLocationType, Poi } from "./types/maptypes";
import SideBar from "./ui/layout/sideBar";
import { IoCaretBackSharp } from "react-icons/io5";
export default function Home() {
  const [viewState, setViewState] = useState<InitialLocationType>({
    longitude: initialLocation.longitude,
    latitude: initialLocation.latitude,
    zoom: initialLocation.zoom,
  });
  const [search, setSearch] = useState<string | null>(null);
  const [selectedStore, setSelectedStore] = useState<Poi | null>(null);
  const nearbyStores = crispyPorkShops
    .map((shop) => {
      const distance = getDistance(
        initialLocation.latitude,
        initialLocation.longitude,
        shop.location.lat,
        shop.location.lng,
      );
      return {
        ...shop,
        distance,
      };
    })
    .filter((shop) => shop.distance <= 10)
    .sort((a, b) => a.distance - b.distance);

  const filteredShop = crispyPorkShops.filter((shop) => {
    if (!search) return;
    const shopName = shop.key.toLocaleLowerCase();
    const trimSearch = search?.trim().toLocaleLowerCase();
    return shopName.includes(trimSearch);
  });
  console.log("Search Result :", filteredShop);
  const displayShops = search ? filteredShop : nearbyStores;
  const title = search ? "ร้านที่ค้นหา" : "ร้านใกล้ฉัน";
  useEffect(() => {
    console.log("shops nearby :", nearbyStores);
  }, []);
  const handleSelectedShop = (shop: Poi) => {
    setSelectedStore(shop);
    setViewState((prev) => ({
      ...prev,
      longitude: shop.location.lng,
      latitude: shop.location.lat,
      zoom: 18,
      transitionDuration: 2000,
    }));
  };

  return (
    <div className="bg-stone-50 h-screen overflow-hidden">
      <div className="flex  md:flex-row h-full w-full">
        <SideBar
          shopsDisplay={displayShops}
          title={title}
          onSearch={setSearch}
          selectedStore={selectedStore}
          onSelected={handleSelectedShop}
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
                <FloatSelected shop={selectedStore} />
              </>
            )}
          </div>

          <div
            className={`flex  bg-amber-800 w-5 h-10  items-center justify-center text-white
                rounded-r-xl cursor-pointer shadow-md `}
            onClick={() => setSelectedStore(null)}
          >
            <IoCaretBackSharp />
          </div>
        </div>

        <main className="flex-1  bg-[#E5E7EB] ">
          <div className="w-full h-full">
            <MapBox
              shops={nearbyStores}
              selected={selectedStore}
              setSelected={setSelectedStore}
              viewState={viewState}
              setViewState={setViewState}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
