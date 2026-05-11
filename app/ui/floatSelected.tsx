"use client";
import { StoreData } from "../types/maptypes";
import Image from "next/image";
import { changeGoogleImageUrl } from "../utlis/helper";
import DetailStore from "./detailStore";
import ButtonUI from "./buttonUI";
import { useHandleToggle } from "../hooks/useToggle";
interface FloatSelectedProps {
  store: StoreData;
}

export default function FloatSelected({ store }: FloatSelectedProps) {
  const huntedControl = useHandleToggle("hunt", store);
  return (
    <div className="flex flex-col h-full ">
      <Image
        src={changeGoogleImageUrl(store.thumbnail)}
        alt={store.name}
        width={400}
        height={400}
        className="object-cover"
        priority
      />
      <div className="flex-1 p-4">
        <DetailStore store={store} />

        <div className="p-1 bg-amber-50 sticky bottom-0 z-10">
          <ButtonUI
            title={
              huntedControl.toggle
                ? "ล่าร้านนี้แล้ว (กดเพื่อยกเลิก)"
                : "คุณล่าร้านนี้หรือยัง?"
            }
            onClick={huntedControl.handleToggle}
            className={huntedControl.toggle ? "bg-green-600" : "bg-amber-600"}
          />
        </div>
      </div>
    </div>
  );
}
