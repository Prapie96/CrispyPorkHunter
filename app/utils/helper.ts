import { keyLocalStorage } from "../consts/const";
import { FilterShopsProps, StorageLists, StoreData } from "../types/shop_types";

export const changeGoogleImageUrl = (url: string, size = 800) => {
  if (!url.includes("googleusercontent.com")) {
    return url;
  }
  return url.replace(/=w\d+-h\d+.*$/, `=w${size}-h${size}`);
};

export const checkOpeningToday = (shop: StoreData) => {
  const today = new Date().toLocaleString("th-TH", { weekday: "long" });
  const checkDay = shop.opening_hours.find((open) => open.day === today);

  if (!checkDay) return "ไม่ทราบเวลาทำการ";
  if (checkDay && checkDay.time === "ปิดทำการ") {
    return "วันนี้ร้านปิดทำการ";
  } else if (checkDay && checkDay.time !== "ปิดทำการ") {
    return `วันนี้ร้านเปิด: ${checkDay.time}`;
  }
};

export function filterShopsByModeAndSearch({
  rawShops,
  mode,
  search,
  storage,
}: FilterShopsProps) {
  return rawShops
    .filter((shop) => {
      //convert shop.name to lowercase
      const shopNameLower = shop.name.toLowerCase();
      //check with mode
      if (mode === "Save") {
        return storage.Save.some((nameShop) =>
          nameShop.includes(shopNameLower),
        );
      }
      if (mode === "Hunt") {
        return storage.Hunt.some((nameShop) =>
          nameShop.includes(shopNameLower),
        );
      }
      return true;
    })
    .filter((shop) => shop.name.toLowerCase().includes(search.toLowerCase()));
}


export const saveShopsIntoStorage = (data:StorageLists)=>{
  return localStorage.setItem(keyLocalStorage,JSON.stringify(data));
}