import { Dispatch, SetStateAction } from "react";
import { StoreData } from "../types/maptypes";
import { IoCloseOutline } from "react-icons/io5";

interface FabCloseProps {
  setSelected: Dispatch<SetStateAction<StoreData | undefined>>;
}

export default function FabClose({ setSelected }: FabCloseProps) {
  return (
    <div className=" relative w-full h-20">
      <div className="absolute right-2 top-3 w-8 h-8 rounded-full bg-white hover:bg-gray-200 ">
        <button
          className="flex items-center justify-center w-full h-full text-2xl  rounded-full cursor-pointer"
          onClick={() => setSelected(undefined)}
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
}
