// ui/Sidebar.tsx
import Logo from "./Logo";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import ListShops from "./ListShops";
import { ModeLocalStorage, ModeSelector } from "../types/mode_types";
import { ShopData } from "../types/shop_types";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  isOpen: boolean;
  shops: ShopData[];
  selectedShop: ShopData | null;
  onSelectedShop: Dispatch<SetStateAction<ShopData | null>>;
  amount: number;
  onLoadMore:  Dispatch<SetStateAction<number>>;
  canLoadMore: boolean;
  currentMode: ModeSelector;
  onClearShops:  (mode: ModeLocalStorage) => void;
  districtShops: Record<string,number>
}

export default function Sidebar({
  isOpen,
  shops,
  selectedShop,
  onSelectedShop,
  amount,
  onLoadMore,
  canLoadMore,
  currentMode,
  onClearShops,
  districtShops
}: SidebarProps) {
  return (
    <aside
      className={`bg-yellow-50 flex flex-col gap-4 overflow-y-auto overflow-x-hidden
        transition-all duration-200 relative ${isOpen ? "w-96" : "w-0"}`}
    >
      <div className="flex flex-col">
        <Logo />
        <NavBar />
      </div>
      {currentMode !== "Statistic" && <SearchBar />}
      <ListShops
        shops={shops}
        selected={selectedShop}
        onSelected={onSelectedShop}
        amount={amount}
        onLoadMore={onLoadMore}
        canLoadMore={canLoadMore}
        currentMode={currentMode}
        onClearShops={onClearShops}
        districtShops={districtShops}
      />
    </aside>
  );
}