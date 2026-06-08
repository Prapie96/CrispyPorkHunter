"use client";
// import styles from "./page.module.css";
import Logo from "./ui/Logo";
import ListShops from "./ui/ListShops";
import NavBar from "./ui/NavBar";
import SearchBar from "./ui/SearchBar";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { initialLocation } from "./consts/const";
import { useEffect, useRef, useState } from "react";
import crispyShops from "./consts/places.json";
import { StoreData } from "./types/shop_types";
import Image from "next/image";
export default function Home() {
  const mapRef = useRef<MapRef>(null);
  const [shops, setShops] = useState<StoreData[]>([]);
  const [selectedShop, setSelectedShop] = useState<StoreData | null>(null);
  useEffect(() => {
    const recommendedShops = crispyShops.slice(0, 10);
    setShops(recommendedShops);
  }, []);
  useEffect(() => {
    if (selectedShop && mapRef.current) {
      const map = mapRef.current?.getMap();
      map.flyTo({
        center: [selectedShop.location.lng, selectedShop.location.lat],
        zoom: 15,
        duration: 2000,
        essential: true,
      });
    }
  }, [selectedShop]);
  return (
    <div className="w-screen h-dvh flex">
      <aside className="bg-yellow-50 flex flex-col w-96 gap-4 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col">
          <Logo />
          <NavBar />
        </div>
        <SearchBar />
        {/* Show List Shops  */}
        <ListShops shops={shops} onSelected={setSelectedShop} />
      </aside>
      <main className="bg-stone-200 flex-1 relative">
        <Map
          initialViewState={initialLocation}
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          cursor="default"
        >
          {shops.map((shop) => (
            <Marker
              key={shop.name}
              longitude={shop.location.lng}
              latitude={shop.location.lat}
            >
              <Image
                src="/PinCripyPorkMap.png"
                alt={"Pin CrispyPork on Map"}
                width={80}
                height={80}
                priority
              />
              <div className="bg-amber-50 text-amber-600 rounded-md p-2 border border-amber-700 ">
                <p>{shop.name}</p>
              </div>
            </Marker>
          ))}
        </Map>
      </main>
    </div>
  );
}
