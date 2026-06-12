import { ModeSelector } from "../types/mode_types";

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

export const keyLocalStorage = "shopslocal";