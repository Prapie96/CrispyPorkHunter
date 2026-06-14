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
  onLoadMore: Dispatch<SetStateAction<number>>;
  canLoadMore: boolean;
  currentMode: ModeSelector;
  onClearShops: (mode: ModeLocalStorage) => void;
  districtShops: Record<string, number>;
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
  districtShops,
}: SidebarProps) {
  return (
    <aside
      className={`bg-yellow-50 flex flex-col gap-4
        transition-all duration-200 relative ${isOpen ? "w-72 md:w-96" : "w-0 overflow-hidden"}
        
        `}
    >
      <div className="flex flex-col">
        <Logo />
        <div className="flex flex-col gap-2">
          <NavBar />
          {currentMode !== "Statistic" && <SearchBar />}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
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
      </div>
    </aside>
  );
}
