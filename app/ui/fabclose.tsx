import { Dispatch, SetStateAction } from "react";
import { Poi } from "../types/maptypes";

interface FabCloseProps {
  setSelected: Dispatch<SetStateAction<Poi | null>>;
}

export default function FabClose({ setSelected }: FabCloseProps) {
  return (
    <div className=" relative w-full h-20">
      <div className="absolute right-2 top-3 flex items-center justify-center w-8 h-8 rounded-full bg-white">
        <button
          className="text-2xl hover:bg-gray-200 w-full rounded-full"
          onClick={() => setSelected(null)}
        >
          X
        </button>
      </div>
    </div>
  );
}
