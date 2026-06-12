import React, { Dispatch, SetStateAction, useMemo } from "react";
import Image from "next/image";
import { StoreData } from "../types/shop_types";
import { changeGoogleImageUrl, checkOpeningToday } from "../utils/helper";
import {
  FaBookmark,
  FaMapPin,
  FaMoneyBill1Wave,
  FaStar,
  FaUser,
} from "react-icons/fa6";
import Detailsbasic from "./Detailsbasic";
import { MdLocalPhone, MdAccessTime } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";
import { greenBank, yellowStar, redPin, blueTel } from "../consts/color";
import { IoMdClose } from "react-icons/io";
import { sizeIcon } from "../consts/const";
import { ModeLocalStorage } from "../types/mode_types";
import { FaMapMarkedAlt } from "react-icons/fa";

interface FloatPageProps {
  shop: StoreData | null;
  isActive: boolean;
  onSelected: Dispatch<SetStateAction<StoreData | null>>;
  onToggle: (shopName: string, currentMode: ModeLocalStorage) => void;
  isSaved: boolean;
}

export default function FloatPage({
  shop,
  isActive,
  isSaved,
  onSelected,
  onToggle,
}: FloatPageProps) {
  if (!shop) return null;
  const openingStatus = checkOpeningToday(shop);
  const isOpen = openingStatus?.includes("เปิด");
  const detailsList = useMemo(
    () => [
      {
        id: 1,
        icon: FaMoneyBill1Wave,
        value: shop.pricing,
        color: greenBank,
      },
      {
        id: 2,
        icon: FaStar,
        value: shop.rating?.toFixed(1).toString(),
        color: yellowStar,
      },
      {
        id: 3,
        icon: FaMapPin,
        value: shop.location.address,
        color: redPin,
      },
      {
        id: 4,
        icon: MdLocalPhone,
        value: shop.contact?.phone,
        color: blueTel,
      },
      {
        id: 5,
        icon: RiGovernmentFill,
        value: shop.district,
      },
      {
        id: 6,
        icon: MdAccessTime,
        value: openingStatus,
        color: isOpen ? "#22c55e" : "#ef4444",
      },
    ],
    [shop, openingStatus, isOpen],
  );

  return (
    <div className="bg-amber-50 top-4 bottom-4 px-4 pt-4  w-96 absolute z-50 rounded-2xl overflow-y-auto flex flex-col">
      {/* Close Button */}
      <button
        className="absolute right-4 hover:cursor-pointer hover:opacity-70"
        onClick={() => onSelected(null)}
      >
        <IoMdClose size={sizeIcon + 10} color="black" />
      </button>
      <section className="text-black text-center flex flex-col gap-3">
        <Image
          //   src={changeGoogleImageUrl(shop.thumbnail)}
          src={"/vercel.svg"}
          alt={shop.name}
          width={400}
          height={400}
          className="object-cover rounded-xl bg-amber-500"
          priority
        />
        <section className="flex justify-between items-center">
          <button
            onClick={() => {
              onToggle(shop.name, "Save");
            }}
            className="p-4 inline-flex flex-col gap-1 items-center hover:bg-amber-100 rounded-2xl hover:cursor-pointer"
          >
            <FaBookmark size={20} color={isSaved ? yellowStar : "grey"} />
            บันทึกร้าน
          </button>
          <a
            className="inline-flex flex-col items-center justify-center p-2
             hover:bg-gray-100 rounded-2xl transition-colors focus:outline-none"
            href={shop.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaMapMarkedAlt size={20} color="blue" />
            Google Map
          </a>
        </section>
        <section className={"flex flex-col gap-4 text-left"}>
          <strong className={"text-2xl"}>{shop.name}</strong>
          {detailsList.map((info) => (
            <Detailsbasic
              key={info.id}
              icon={info.icon}
              sizeIcon={sizeIcon}
              detailStore={info.value}
              color={info.color}
            />
          ))}
        </section>
        {shop.opening_hours && shop.opening_hours.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-7 gap-2 border-y-2 border-amber-400 py-3 my-2">
            {shop.opening_hours.map((opening) => (
              <div key={opening.day} className="flex flex-col items-center">
                <span className="font-bold text-xs sm:text-sm">
                  {opening.day.replace("วัน", "")}
                </span>
                <span className="text-xs text-gray-600">{opening.time}</span>
              </div>
            ))}
          </section>
        )}
        {/**Reviews */}
        <strong className="text-xl text-left pl-2">ตัวอย่าง Reviews</strong>
        <div className="bottom-2 flex flex-col gap-2 p-2 text-left">
          {shop.reviews?.map((comment, index) => (
            <div
              key={`review-${index}`}
              className="w-full flex flex-col gap-2 mb-2"
            >
              <div className="flex gap-3 items-center">
                <FaUser size={sizeIcon} color="orange" />
                <p className="text-sm font-medium">
                  ผู้ใช้ไม่ระบุตัวตน {index + 1}
                </p>
              </div>
              <div className="bg-amber-300 rounded-2xl p-3 shadow-sm text-amber-900">
                <span>{comment}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Button Hunted */}
      <div className="sticky bottom-0 z-10 bg-amber-50 px-2 py-4 mt-auto flex justify-center items-center">
        <button
          onClick={() => onToggle(shop.name, "Hunt")}
          className={`p-3 w-full rounded-xl text-white font-bold transition-colors hover:cursor-pointer ${
            isActive
              ? "bg-green-600 hover:bg-green-700"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {isActive ? "ล่าแล้ว!" : "ตามล่าร้านนี้"}
        </button>
      </div>
    </div>
  );
}
