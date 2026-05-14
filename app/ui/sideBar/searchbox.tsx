import { IoMdClose } from "react-icons/io";
import { StoreData } from "../../types/maptypes";

interface SearchBoxProps {
  search: string;
  onSearch: (text: string) => void;
  onSelected: (store: StoreData | undefined) => void;
}

export default function SearchBox({
  search,
  onSearch,
  onSelected,
}: SearchBoxProps) {
  return (
    <div className="mx-3 my-3 h-12 relative group">
      <input
        id="search-input"
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="ค้นหาร้านหมูกรอบสุดเด็ด ค้นหาตามเขต"
        className=" p-2 pl-8 w-full h-full rounded-md text-black border border-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-sm"
      />
      {search && (
        <IoMdClose
          size={24}
          color="grey"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          onClick={() => {
            onSearch("");
            onSelected(undefined);
          }}
        />
      )}
    </div>
  );
}
