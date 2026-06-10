"use client";
// import styles from "./page.module.css";
import Logo from "./ui/Logo";
import ListShops from "./ui/ListShops";
import NavBar from "./ui/NavBar";
import SearchBar from "./ui/SearchBar";
import { useEffect, useRef, useState } from "react";
import rawShops from "./consts/places.json";
import { StoreData } from "./types/shop_types";
import MapRender from "./ui/MapRender";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const mode = searchParams.get("mode")??"";
  const [selectedShop, setSelectedShop] = useState<StoreData | null>(null);
  const [toggle, setToggle] = useState(true);
  const [amount, setAmount] = useState(10);
  
  const mouckUpShopsSaved = [
   { save:["ร้านข้าวหมูแดงสวนหลวง - ปู่เจ้า","อร่อยหมูกรอบหมูแดงโฮมเมด","ข้าวหมูแดงนายไซ"],
    hunted:["อร่อยหมูกรอบหมูแดงโฮมเมด","ข้าวหมูแดงนายไซ"]}
  ]
  const filteredShops = rawShops
    .filter((shop) =>{
      //For every shops in raw
      // if(search){
      //   return shop.name.toLowerCase().includes(search.toLowerCase());
      // }
      if(mode === 'save'){
          return mouckUpShopsSaved.some(key => key.save.includes(shop.name))
      }
      if(mode === 'hunt'){
          return mouckUpShopsSaved.some(key => key.hunted.includes(shop.name))
      }
      return true;
    }).filter((shop)=> shop.name.toLowerCase().includes(search.toLowerCase())) // just shops after mode 
    .slice(0, amount);

  const handleLoadMore = () => {
    //check if Can't load more
    if (amount >= rawShops.length) return;
    //load more increased with 10 shops
    setAmount((prev) => prev + 10);
  };

  return (
    <div className="w-screen h-dvh flex overflow-hidden">
      <div className="bg-linear-to-br from-amber-600 to-orange-800 p-3 sticky top-0 z-10">
        <button
          className="text-xl text-white hover:cursor-pointer"
          onClick={() => setToggle((prev) => !prev)}
        >
          =
        </button>
      </div>
      <aside
        className={`bg-yellow-50 flex flex-col gap-4 overflow-y-auto overflow-x-hidden
           transition-all duration-200
          ${toggle ? "w-96" : "w-0 "} 
        `}
      >
        <div className="flex flex-col">
          <Logo />
          <NavBar />
        </div>
        <SearchBar />
        <ListShops
          shops={filteredShops}
          onSelected={setSelectedShop}
          amount={amount}
          onLoadMore={handleLoadMore}
          canLoadMore={amount >= rawShops.length}
        />
      </aside>
      <main className="bg-stone-200 flex-1 relative">
        <MapRender
          shops={filteredShops}
          selected={selectedShop}
          onSelected={setSelectedShop}
          toggleVisible={toggle}
        />
      </main>
    </div>
  );
}
