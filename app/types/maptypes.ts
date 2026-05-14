type LatLng = { lat: number; lng: number };

export type InitialLocationType = {
  longitude: number;
  latitude: number;
  zoom: number;
};

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
export type reviewsType = string[];
export type menu_highlightsType = {
  menu_name:string,
  menu_image:string
}
export type StoreData = {
  name : string,
  thumbnail: string,
  district: string| null
  location: LocationStore,
  contact: contactType| null,
  opening_hours: opening_hoursType[],
  pricing : string| null,
  rating : number| null,
  reviews:reviewsType| null,
  menu_highlights : menu_highlightsType[],
  mapUrl: string,
  _complete:boolean | null
}

