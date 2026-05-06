import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { InitialLocationType, Poi } from "../types/maptypes";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface MapBoxProps {
  shops: Poi[];
  selected: Poi | null;
  onSelected: Dispatch<SetStateAction<Poi | null>>;
  viewState: InitialLocationType;
  setViewState: Dispatch<SetStateAction<InitialLocationType>>;
}

export default function MapBox({
  shops,
  selected,
  onSelected,
  viewState,
  setViewState,
}: MapBoxProps) {
  const isSelectedInShops = shops.some((shop) => shop.key === selected?.key);

  return (
    <Map
      {...viewState}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMove={(e) => setViewState(e.viewState)}
      cursor="default"
    >
      {shops.map((shop) => (
        <Marker
          key={shop.key}
          longitude={shop.location.lng}
          latitude={shop.location.lat}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            onSelected(shop);
            setViewState({
              latitude: shop.location.lat,
              longitude: shop.location.lng,
              zoom: 15,
            });
            console.log("Selected Pin Shop : ", shop);
          }}
        >
          <Image
            src="/crispypork.png"
            alt={"Pin CrispyPork on Map"}
            width={50}
            height={50}
            priority
          />
          <p className="bg-white text-amber-700 font-bold text-[12px] p-1 rounded shadow-md border border-amber-500 whitespace-nowrap">
            {shop.key}
          </p>
        </Marker>
      ))}

      {selected && !isSelectedInShops && (
        <Marker
          key={selected?.key}
          longitude={selected?.location.lng}
          latitude={selected?.location.lat}
          anchor="bottom"
        >
          <Image
            src="/crispypork.png"
            alt={"Pin CrispyPork on Map"}
            width={50}
            height={50}
            priority
          />
          <p className="bg-white text-amber-700 font-bold text-[12px] p-1 rounded shadow-md border border-amber-500 whitespace-nowrap">
            {selected?.key}
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
