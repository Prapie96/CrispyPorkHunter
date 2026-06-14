import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Map, { Marker, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { initialLocation } from "../consts/const";
import { ShopData } from "../types/shop_types";
import Image from "next/image";
interface MapRenderProps {
  shops: ShopData[];
  selected: ShopData | null;
  onSelected: Dispatch<SetStateAction<ShopData | null>>;
  toggleVisible:boolean;
}

export default function MapRender({ shops, selected , onSelected,toggleVisible}: MapRenderProps) {
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    if (selected && mapRef.current) {
      const map = mapRef.current?.getMap();
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
  },[toggleVisible])
  return (
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
          onClick={()=>onSelected(shop)}
          className="hover: cursor-pointer flex flex-col justify-center items-center"
        >
          <Image
            src="/PinCripyPorkMap.png"
            alt={"Pin CrispyPork on Map"}
            width={80}
            height={80}
            priority
          />
          <div className="bg-amber-50 text-amber-600 rounded-md p-2 border border-amber-700 text-sm">
            <p>{shop.name}</p>
          </div>
        </Marker>
      ))}
    </Map>
  );
}
