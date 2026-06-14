// ui/ShopDetailFloat.tsx
import { FaCaretLeft } from "react-icons/fa6";
import FloatPage from "./FloatPage";
import { sizeIcon } from "../consts/const";
import { StorageLists, ShopData } from "../types/shop_types";
import { ModeLocalStorage } from "../types/mode_types";
import { Dispatch, SetStateAction } from "react";

interface ShopDetailFloatProps {
  selectedShop: ShopData | null;
  onClose: Dispatch<SetStateAction<ShopData | null>>;
  onToggleStorage: (shopName: string, currentMode: ModeLocalStorage) => void;
  localShopStorage: StorageLists;
}

export default function ShopDetailFloat({
  selectedShop,
  onClose,
  onToggleStorage,
  localShopStorage,
}: ShopDetailFloatProps) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out
        absolute top-0 z-50 h-full
        ${selectedShop ? "opacity-100 left-6 w-full" : "w-0 opacity-0 pointer-events-none -left-full"}
        
        md:relative md:top-auto md:h-auto md:w-auto
        ${selectedShop ? "md:left-4" : "md:-left-96"}
        
        `}
    >
      <FloatPage
        shop={selectedShop}
        onSelected={onClose}
        onToggle={onToggleStorage}
        isActive={localShopStorage.Hunt?.includes(selectedShop?.name ?? "")}
        isSaved={localShopStorage.Save?.includes(selectedShop?.name ?? "")}
      />
      <button
        className="absolute py-4 left-96 z-40 top-1/2 -translate-y-1/2 rounded-r-2xl bg-amber-600 
        hover:cursor-pointer hover:bg-amber-700"
        onClick={() => onClose(null)}
      >
        <FaCaretLeft size={sizeIcon} color="white" />
      </button>
    </div>
  );
}
