import { Dispatch, SetStateAction } from "react";
import { InitialLocationType, StoreData } from "../types/maptypes";

export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 6371;
  //1.เปลี่ยนองศาเป็น Radiant
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const rLat1 = (lat1 * Math.PI) / 180;
  const rLat2 = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
  return r * c;
}


export const changeGoogleImageUrl = (url:string,size=800)=>{
  if (!url.includes("googleusercontent.com")) {
    return url;
  }
  return url.replace(/=w\d+-h\d+.*$/, `=w${size}-h${size}`);
}


export const countDistrict = (listData:StoreData[])=>{
  return listData.reduce<Record<string, number>>((acc, cur) => {
    const district = cur.district ?? "unknown";
    acc[district] = (acc[district] || 0) + 1;
    return acc;
  }, {});
}