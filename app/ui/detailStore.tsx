import { StoreData } from "../types/maptypes";
import { MdLocalPhone } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import DetailStoreWithIcon from "./detailStoreWithIcon";
import { FaStar } from "react-icons/fa6";
interface DetailStoreProps {
  store: StoreData;
}

export default function DetailStore({ store }: DetailStoreProps) {
  const sizeIcon = 20;
  const detailsList = [
    {
      icon: FaMoneyBill1Wave,
      value: store.pricing,
    },
    {
      icon: FaStar,
      value: store.rating?.toFixed(1).toString(),
    },
    {
      icon: FaMapPin,
      value: store.location.address,
    },
    {
      icon: MdLocalPhone,
      value: store.contact?.phone,
    },
    {
        icon:FaMapPin,
        value: store.district,
    }
  ];
  return (
    <div className="grid grid-cols-1 gap-4">
      <h1 className="text-2xl text-center">{store.name}</h1>
      {detailsList.map((detail, index) => (
        <DetailStoreWithIcon
          key={index}
          icon={detail.icon}
          sizeIcon={sizeIcon}
          detailStore={detail.value}
        />
      ))}
    </div>
  );
}
