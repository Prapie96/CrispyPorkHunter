type LatLng = { lat: number; lng: number };
export type Poi = { key: string; location: LatLng };

export type InitialLocationType = {
  longitude: number;
  latitude: number;
  zoom: number;
};
