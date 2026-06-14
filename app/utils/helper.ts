import { keyLocalStorage } from "../consts/const";
import { FilterShopsProps, StorageLists, ShopData } from "../types/shop_types";
import { FaEgg, FaCrosshairs, FaDragon } from "react-icons/fa6";
export const changeGoogleImageUrl = (url: string, size = 800) => {
  if (!url.includes("googleusercontent.com")) {
    return url;
  }
  return url.replace(/=w\d+-h\d+.*$/, `=w${size}-h${size}`);
};

export const checkOpeningToday = (shop: ShopData) => {
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
      if (mode === "Hunt" || mode === "Statistic") {
        return storage.Hunt.some((nameShop) =>
          nameShop.includes(shopNameLower),
        );
      }
      return true;
    })
    .filter((shop) => shop.name.toLowerCase().includes(search.toLowerCase()));
}

export const saveShopsIntoStorage = (data: StorageLists) => {
  return localStorage.setItem(keyLocalStorage, JSON.stringify(data));
};

export const findMostVisited = (districtShops: Record<string, number>) => {
  let mostVisitedDistricts = "ยังไม่มีข้อมูล";
  let maxCount = 0;
  Object.entries(districtShops).forEach(([district, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostVisitedDistricts = district;
    }
  });
  return { mostVisitedDistricts, maxCount };
};

export const rankCrispyHunter = (shopCount: number) => {
  if (shopCount >= 12) {
    return {
      label: "ปรมาจารย์นักล่า",
      icon: FaDragon,
      iconColor: "text-red-700",
    };
  } else if (shopCount >= 6) {
    return {
      label: "นักล่าร้านเด็ด",
      icon: FaCrosshairs, 
      iconColor: "text-lime-300", 
    };
  } else {
    return {
      label: "นักล่าฝึกหัด",
      icon: FaEgg, 
      iconColor: "text-yellow-300", 
    };
  }
};
