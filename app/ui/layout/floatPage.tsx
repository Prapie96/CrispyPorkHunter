import { IoCaretBackSharp } from "react-icons/io5";
import FabClose from "../fabclose";
import FloatSelected from "../floatSelected";
import { StoreData } from "@/app/types/maptypes";
import { Dispatch, SetStateAction } from "react";
import ButtonUI from "../buttonUI";

interface FloatPageProps {
  selectedStore: StoreData | undefined;
  setSelectedStore: Dispatch<SetStateAction<StoreData | undefined>>;
}

export default function FloatPage({
  selectedStore,
  setSelectedStore,
}: FloatPageProps) {
  return (
    <div
      className={`mb-5 fixed z-60 lg:left-100 mt-4 ml-2 flex items-center
                      transition-all duration-500 ease-in-out left-0
                      top-[calc(1rem+env(safe-area-inset-top))]
                      h-[calc(100dvh-3rem-env(safe-area-inset-top))]
                      ${selectedStore ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}
                    `}
    >
      <div
        className="relative w-80 sm:w-96 h-full flex flex-col bg-amber-50 rounded-xl shadow-md text-black
            overflow-auto 
          "
      >
        {selectedStore && (
          <>
            <FabClose setSelected={setSelectedStore} />
            <FloatSelected store={selectedStore} />
          </>
        )}
      </div>

      <button
        className={`flex  bg-amber-600 hover:bg-amber-800 w-5 h-10  items-center justify-center text-white
                rounded-r-xl cursor-pointer shadow-md `}
        onClick={() => setSelectedStore(undefined)}
      >
        <IoCaretBackSharp />
      </button>
    </div>
  );
}
