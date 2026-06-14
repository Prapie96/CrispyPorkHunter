import { ModeSelector } from "./mode_types";

export type LocationStore = {
  address : string,
  lat : number,
  lng:number,
}
export type contactType = {phone : string | null}
export type opening_hoursType = {
  day:string,
  time:string,
}

export type menu_highlightsType = {
  menu_name:string,
  menu_image:string
}
export type ShopData = {
  id:number,
  name : string,
  thumbnail: string,
  district: string| null
  location: LocationStore,
  contact: contactType| null,
  opening_hours: opening_hoursType[],
  pricing : string| null,
  rating : number| null,
  reviews:string[]| null,
  menu_highlights : menu_highlightsType[],
  mapUrl: string,
  _complete:boolean | null
}


export interface StorageLists {
  Save: string[];
  Hunt: string[];
}


export interface FilterShopsProps{
  rawShops: ShopData[],
  mode: string,
  search: string,
  storage: StorageLists
}