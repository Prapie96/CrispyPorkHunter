import { ModeSelector } from "../types/mode_types";
import rawShops from "../consts/places.json";
export const initialTextSearchBar = "ค้นหาร้านหมูกรอบสุดเด็ด / ค้นหาตามจังหวัด / ค้นหาตามเขต";

export const initialLocation = {
  longitude: 100.5231,
  latitude: 13.7367,
  zoom: 11,
};

export const sizeIcon = 20;

export const mockupMode: ModeSelector[] = [
    "All",
    "Save",
    "Hunt",
    "Statistic",
  ] as const;

export const displayTitleMode: Record<(typeof mockupMode)[number], string> = {
    All: "ร้านเด็ดเจ็ดย่านน้ำ",
    Save: "ร้านที่รอไปตำ",
    Hunt: "ร้านที่ล่าไปแล้ว",
    Statistic: "สถิติการล่า",
  };

export const keyLocalStorage = "shopslocal";

export const indexedRawShops = rawShops.map((shop, index) => ({
  ...shop,
  id: index,
}));