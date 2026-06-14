import React from "react";
import { ShopData } from "../types/shop_types";
import { RiGovernmentFill } from "react-icons/ri";
import { sizeIcon } from "../consts/const";
import { FaCrown } from "react-icons/fa6";
import { yellowStar } from "../consts/color";
import { findMostVisited, rankCrispyHunter } from "../utils/helper";
import { StatCard } from "./StatCard";

interface StatisticsProps {
  shops: ShopData[];
  districtShops: Record<string, number>;
}

export default function Statistics({ shops, districtShops }: StatisticsProps) {
  const totalDistricts = Object.keys(districtShops).filter(
    (district) => district !== "ไม่พบเขต",
  ).length;
  const { mostVisitedDistricts, maxCount } = findMostVisited(districtShops);
  const currentRank = rankCrispyHunter(shops.length);
  const RankIcon = currentRank.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="ล่าไปแล้ว" value={shops.length} subText="ร้าน" />

        <StatCard title="บุกไปแล้ว" value={totalDistricts} subText="เขต" />

        <StatCard
          title={
            <>
              <FaCrown size={sizeIcon} className="text-yellow-300 shrink-0" />
              <span>เขตโปรดของคุณ</span>
            </>
          }
          value={mostVisitedDistricts}
          subText={`(${maxCount} ร้าน)`}
        />

        <StatCard
          title={
            <>
              <RankIcon
                size={sizeIcon}
                className={`${currentRank.iconColor} shrink-0`}
              />
              <span>ระดับนักล่า</span>
            </>
          }
          value={currentRank.label}
          subText={
            shops.length >= 12 ? "คุณคือตัวจริง!" : "กินเพิ่มเพื่อเลื่อนขั้น"
          }
          minHeight="min-h-[110px]"
        />
      </div>
      <div className="text-white bg-amber-700 p-4 rounded-xl shadow-md md:text-xl">
        <p className="mb-3 font-semibold text-lg border-b border-amber-600 pb-2">
          เขตทั้งหมดที่ล่า
        </p>
        <div className="flex flex-col gap-2">
          {Object.entries(districtShops).map(([district, count]) => (
            <div
              key={district}
              className="flex justify-between items-center gap-4 bg-amber-800 bg-opacity-20 p-2 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <RiGovernmentFill size={sizeIcon} color={yellowStar} />
                <p className="text-base">{district}</p>
              </div>
              <p className="text-base font-medium">{count} ร้าน</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
