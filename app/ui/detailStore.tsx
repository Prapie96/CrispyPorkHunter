import { StoreData } from "../types/maptypes";
import { MdLocalPhone } from "react-icons/md";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import DetailStoreWithIcon from "./detailStoreWithIcon";
import { FaStar } from "react-icons/fa6";
import { RiGovernmentFill } from "react-icons/ri";
import { blueTel, greenBank, redPin, yellowStar } from "../const/color";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
interface DetailStoreProps {
  store: StoreData;
}

export default function DetailStore({ store }: DetailStoreProps) {
  const sizeIcon = 20;
  const detailsList = [
    {
      icon: FaMoneyBill1Wave,
      value: store.pricing,
      color: greenBank,
    },
    {
      icon: FaStar,
      value: store.rating?.toFixed(1).toString(),
      color: yellowStar,
    },
    {
      icon: FaMapPin,
      value: store.location.address,
      color: redPin,
    },
    {
      icon: MdLocalPhone,
      value: store.contact?.phone,
      color: blueTel,
    },
    {
      icon: RiGovernmentFill,
      value: store.district,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4">
      <h1 className="text-2xl text-center">{store.name}</h1>
      <div className=" flex mx-5 gap-5 justify-end ">
        {/* <FaBookmark /> */}
        <span className="hover:cursor-pointer place-items-center text-sm">
          <FaRegBookmark size={20} />
          บันทึกร้าน
        </span>

        <a
          className="hover:cursor-pointer place-items-center text-sm"
          href={store.mapUrl}
          target="_blank"
        >
          <FaMapMarkedAlt size={20} color="blue" />
          Google Map
        </a>
      </div>
      {detailsList.map((detail, index) => (
        <DetailStoreWithIcon
          key={index}
          icon={detail.icon}
          sizeIcon={sizeIcon}
          detailStore={detail.value}
          color={detail.color}
        />
      ))}
    </div>
  );
}
