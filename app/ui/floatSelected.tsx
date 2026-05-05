import { Poi } from "../types/maptypes";

interface FloatSelectedProps {
  shop: Poi;
}

export default function FloatSelected({ shop }: FloatSelectedProps) {
  return (
    <div className=" border-amber-900 border-2 mx-4 p-5">
      <p>ร้าน : {shop.key}</p>
      <p>ราคา : 200 บาท</p>
      <p>Rating : 5.00</p>
      <p>ตำแหน่ง : {shop.location.lat}</p>
      <p>ตำแหน่ง :{shop.location.lng}</p>
    </div>
  );
}
