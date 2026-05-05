import { Poi } from "../types/maptypes";

interface ShowListShopsProps {
  listShops: Poi[];
  title: string;
  selectedStore: Poi | null;
  setSelected: (shop: Poi) => void;
}

export default function ShowListShops({
  listShops,
  title,
  selectedStore,
  setSelected,
}: ShowListShopsProps) {
  return (
    <>
      {listShops.length > 0 ? (
        <div className="">
          <p className="p-4 text-xl text-black">{title}</p>
          {listShops.map((shop) => (
            <div
              key={shop.key}
              className={`m-2 p-4 text-black  rounded-md shadow-2xs border-b-amber-500 hover:bg-gray-300 cursor-pointer
                 ${selectedStore?.key === shop.key ? "bg-linear-to-br from-amber-600 to-orange-800 shadow-md text-white" : "bg-amber-100"} 
                `}
              onClick={() => {
                setSelected(shop);
              }}
            >
              <p>ร้าน : {shop.key}</p>
              <p>ราคา : 200 บาท</p>
              <p>Rating : 5.00</p>
              <p>ตำแหน่ง : {shop.location.lat}</p>
              <p>ตำแหน่ง :{shop.location.lng}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          search ? "ไม่พบร้านที่ตรงกับคำค้นหา" : "ไม่มีร้านใกล้ตัวในระยะ 10 กม."
        </div>
      )}
    </>
  );
}
