import { StoreData } from "../types/maptypes";
import { MdAccessTime, MdLocalPhone } from "react-icons/md";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCircleChevronRight,
  FaMoneyBill1Wave,
  FaUser,
} from "react-icons/fa6";
import { FaMapPin } from "react-icons/fa";
import DetailStoreWithIcon from "./detailStoreWithIcon";
import { FaStar } from "react-icons/fa6";
import { RiGovernmentFill } from "react-icons/ri";
import { blueTel, greenBank, redPin, yellowStar } from "../const/color";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import Image from "next/image";
import { useRef } from "react";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { useHandleToggle } from "../hooks/useToggle";
import { scrollHorizontal } from "../utlis/helper";
import ButtonUI from "./buttonUI";
interface DetailStoreProps {
  store: StoreData;
}

export default function DetailStore({ store }: DetailStoreProps) {
  const savedControl = useHandleToggle("saved", store);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sizeIcon = 20;

  const today = new Date().toLocaleString("th-TH", { weekday: "long" });
  const checkDay = store.opening_hours.find((open) => open.day === today);
  const checkOpeningToday = () => {
    if (!checkDay) return "ไม่ทราบเวลาทำการ";
    if (checkDay && checkDay.time === "ปิดทำการ") {
      return "วันนี้ร้านปิดทำการ";
    } else if (checkDay && checkDay.time !== "ปิดทำการ") {
      return `วันนี้ร้านเปิด: ${checkDay.time}`;
    }
  };

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
    {
      icon: MdAccessTime,
      value: checkOpeningToday(),
      color: checkOpeningToday()?.includes("เปิด") ? "#22c55e" : "#ef4444",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <header className="space-y-4">
        <h1 className="text-2xl text-center">{store.name}</h1>

        <div className="flex justify-between items-center">
          <ButtonUI
            variant="ghost"
            onClick={savedControl.handleToggle}
            size={"sm"}
            className="ml-0 inline-flex flex-col gap-1 items-center hover:bg-amber-100 rounded-2xl"
          >
            <FaBookmark
              size={20}
              color={savedControl.toggle ? "orange" : "grey"}
            />
            บันทึกร้าน
          </ButtonUI>
          <a
            className="inline-flex flex-col items-center justify-center p-2
             hover:bg-gray-100 rounded-2xl transition-colors focus:outline-none"
            href={store.mapUrl}
            target="_blank"
          >
            <FaMapMarkedAlt size={20} color="blue" />
            Google Map
          </a>
        </div>
      </header>
      <section className="space-y-4">
        {detailsList.map((detail, index) => (
          <DetailStoreWithIcon
            key={index}
            icon={detail.icon}
            sizeIcon={sizeIcon}
            detailStore={detail.value}
            color={detail.color}
          />
        ))}
      </section>

      <section className="grid grid-cols-7 gap-4 border-y-2 border-amber-400">
        {store.opening_hours.map((day) => (
          <div key={day.day} className="flex flex-col items-center">
            <span className="font-bold">{day.day.slice(3)}</span>
            <span className="text-sm text-gray-600">{day.time}</span>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <div className="flex gap-2 text-xl items-center">
          <BiSolidFoodMenu size={sizeIcon} />
          <span>เมนู Hilight</span>
        </div>

        <div className="relative group">
          <button
            onClick={() => scrollHorizontal("left", scrollRef)}
            className="absolute left-2 top-1/2 -translate-y-3/4 z-10 bg-white/80 p-1 rounded-full shadow-md
             hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronLeft size={sizeIcon + 5} color="black" />
          </button>

          <div ref={scrollRef} className="flex flex-1 gap-2 overflow-auto">
            {store.menu_highlights.map((menu) => (
              <div className="relative flex shrink-0 cursor-grab">
                <Image
                  src={menu.menu_image}
                  alt={menu.menu_name}
                  width={400}
                  height={400}
                  className="rounded-xl object-cover w-full h-full"
                  priority
                />

                <div className="absolute bottom-0 right-0 p-2 bg-linear-to-t from-black/70 to-transparent rounded-b-lg">
                  <span className="text-white text-sm block truncate">
                    {menu.menu_name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollHorizontal("right", scrollRef)}
            className="absolute right-2 top-1/2 -translate-y-3/4 z-10 bg-white/80 p-1 rounded-full shadow-md
             hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight size={sizeIcon + 5} color="black" />
          </button>
          
        </div>
      </section>
      {/**Reviews */}
      <strong className="text-xl">ตัวอย่าง Reviews </strong>
      <div className="bottom-2 flex flex-col gap-2 p-2">
        {store.reviews?.map((comment, index) => (
          <div className="w-full h-full flex flex-col gap-3 ">
            <div className="flex gap-3">
              <FaUser size={sizeIcon} color={"orange"} />
              <p>ผู้ใช้ไม่ระบุตัวตน {index + 1}</p>
            </div>
            <div className="bg-amber-300 rounded-2xl p-3 shadow-2xs text-amber-800">
              <span key={index}>{comment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
