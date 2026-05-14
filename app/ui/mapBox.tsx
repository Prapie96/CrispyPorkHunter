import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { InitialLocationType, StoreData } from "../types/maptypes";
import Image from "next/image";
import {useEffect, useRef, useState } from "react";
import { initialLocation } from "../const/map";
import mapboxgl from "mapbox-gl";

interface MapBoxProps {
  shops: StoreData[];
  selected: StoreData | undefined;
  onSelected: (shop: StoreData) => void;
  sideBarVisible : boolean;
}

export default function MapBox({
  shops,
  selected,
  onSelected,
  sideBarVisible
}: MapBoxProps) {
  const isSelectedInShops = shops.some((shop) => shop.name === selected?.name);
  const [viewState, setViewState] = useState(initialLocation);

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (selected && mapRef.current) {
      const map = mapRef.current.getMap();
      map.flyTo({
        center: [selected.location.lng, selected.location.lat],
        zoom: 15,
        duration: 2000,
        essential: true,
      });
    }
  }, [selected]);

  useEffect(()=>{
    const map = mapRef.current;
    setTimeout(()=>{
      map?.resize();
    },350)
  },[sideBarVisible])


  return (
    <Map
      ref={mapRef}
      {...viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewState(e.viewState)}
      cursor="default"
    >
      {shops.map((shop) => (
        <Marker
          key={shop.name}
          longitude={shop.location.lng}
          latitude={shop.location.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onSelected(shop);
            console.log("Selected Pin Shop : ", shop);
          }}
        >
          <Image
            src="/PinCripyPorkMap.png"
            alt={"Pin CrispyPork on Map"}
            width={80}
            height={80}
            priority
          />
          <p className="bg-white text-amber-700 font-bold text-[10px] p-1 rounded shadow-md border border-amber-500 whitespace-nowrap">
            {shop.name}
          </p>
        </Marker>
      ))}

      {selected && !isSelectedInShops && (
        <Marker
          key={selected?.name}
          longitude={selected?.location.lng}
          latitude={selected?.location.lat}
          anchor="bottom"
        >
          <Image
            src="/PinCripyPorkMap.png"
            alt={"Pin CrispyPork on Map"}
            width={80}
            height={80}
            priority
          />
          <p className="bg-white text-amber-700 font-bold text-[12px] p-1 rounded shadow-md border border-amber-500 whitespace-nowrap">
            {selected?.name}
          </p>
        </Marker>
      )}
    </Map>
  );
}
