import {StoreData } from "../types/maptypes";

interface ShowListShopsProps {
  listShops: StoreData[];
  // title: string;
  selectedStore: StoreData | undefined;
  setSelected: (shop: StoreData) => void;
}

export default function ShowListShops({
  listShops,
  // title,
  selectedStore,
  setSelected,
}: ShowListShopsProps) {
  return (
    <>
      {listShops.length > 0 ? (
        <div className="">
          <p className="p-4 text-xl text-black">{'ร้านหมูกรอบใกล้ฉัน'}</p>
          {listShops.map((shop) => (
            <div
              key={shop.name}
              className={`m-2 p-4 text-black  rounded-md shadow-2xs border-b-amber-500 hover:bg-gray-300 cursor-pointer
                 ${selectedStore?.name === shop.name ? "bg-linear-to-br from-amber-600 to-orange-800 shadow-md text-white" : "bg-amber-100"} 
                `}
              onClick={() => {
                setSelected(shop);
              }}
            >
              <p>ร้าน : {shop.name}</p>
              <p>ราคา :{shop.pricing}</p>
              <p>Rating :{shop.rating}</p>
              <p>ที่อยู่ : {shop.location.address}</p>
              {/* <p>ตำแหน่ง :{shop.location.lng}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-xl text-black text-center mt-4">
          {!selectedStore && "ไม่พบร้านที่ค้นหา"}
        </div>
      )}
    </>
  );
}
