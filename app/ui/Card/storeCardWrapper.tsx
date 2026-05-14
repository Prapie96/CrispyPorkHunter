import { ReactNode } from "react";
import StatCard from "./storeCard";
import { StoreData } from "@/app/types/maptypes";

interface StatCardWrapperProps {
  // children : ReactNode;
  huntedStoreLocalData: StoreData[];
}

export default function StatCardWrapper({
  huntedStoreLocalData,
}: StatCardWrapperProps) {
  const allHuntedStore = huntedStoreLocalData.length;
  const uniqueDistrictCount = new Set(huntedStoreLocalData.map(store=>store.district)).size;

  const cardDetails = [
    {title:"จำนวนร้านที่พิชิตได้",value:allHuntedStore,description:"จากร้านทั้งหมดในระบบ"},
    {title:"จำนวนเขตที่พิชิตได้",value:uniqueDistrictCount,description:"จากเขตทั้งหมดในระบบ"},   
  ];
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 w-full">
      {/* <StatCard
        titleCard={"จำนวนร้านที่พิชิตได้"}
        valueCard={allHuntedStore}
        description={"จากร้านทั้งหมดในระบบ"}
      /> */}
      {cardDetails.map((item,index)=>(
        <StatCard key={index} titleCard={item.title} valueCard={item.value} description={item.description}/>
      ))}
      
    </div>
  );
}

// <StatCard
//   titleCard={"จำนวนร้านที่พิชิตได้"}
//   valueCard={storeInLocalStorage.length}
//   description={"จากร้านทั้งหมดในระบบ"}
// />
