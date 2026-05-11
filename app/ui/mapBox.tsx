import Map, { Marker, Popup, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { InitialLocationType, StoreData } from "../types/maptypes";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { initialLocation } from "../const/map";
import mapboxgl from "mapbox-gl";

interface MapBoxProps {
  shops: StoreData[];
  selected: StoreData | undefined;
  onSelected: (shop: StoreData) => void;
  // viewState: InitialLocationType;
  // setViewState: Dispatch<SetStateAction<InitialLocationType>>;
}

export default function MapBox({
  shops,
  selected,
  onSelected,
  // viewState,
  // setViewState,
}: MapBoxProps) {
  const isSelectedInShops = shops.some((shop) => shop.name === selected?.name);
  const [viewState, setViewState] = useState(initialLocation);

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (selected && mapRef.current) {
      // ใช้คำสั่ง flyTo เพื่อความสมูท (เป็น Imperative Command)
      const map = mapRef.current.getMap();
      map.flyTo({
        center: [selected.location.lng, selected.location.lat],
        zoom: 15,
        duration: 2000, // ความเร็วในการบิน (ms)
        essential: true,
      });
    }
  }, [selected]);
  // useEffect(() => {
  //   if (shops.length > 0 && mapRef.current) {
  //     const bounds = new mapboxgl.LngLatBounds();
  //     shops.forEach((shop) => bounds.extend([shop.location.lng, shop.location.lat]));
      
  //     mapRef.current.fitBounds(bounds, { padding: 50, duration: 1000 });
  //   }
  // }, [shops.length]);
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

      {/* {selected && (
                <Popup
                  key={selected.key}
                  longitude={selected.location.lng}
                  latitude={selected.location.lat}
                  anchor="bottom"
                  onClose={() => setSelected(null)}
                  offset={40}
                  closeOnClick = {false}
                >
                  <div className="p-2">
                    <h3 className="font-bold text-amber-800">
                      {selected.key}
                    </h3>
                    <p className="text-sm">คะแนน: ⭐ {20}</p>
                    <button className="bg-orange-500 text-white text-xs px-2 py-1 mt-2 rounded">
                      ดูรายละเอียด
                    </button>
                  </div>
                </Popup>
              )} */}
    </Map>
  );
}
