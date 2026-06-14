"use client";
import React, { useState } from "react";
import { initialTextSearchBar, sizeIcon } from "../consts/const";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";
export default function SearchBar() {
  const search = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const currentInputValue = search.get("search") || "";

  const handleSearch = (text: string) => {
    const params = new URLSearchParams(search);

    if (text) {
      params.set("search", text.toLowerCase());
    } else {
      params.delete("search");
    }
    replace(`${pathName}?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(search);
    params.delete("search");
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div
      className="relative flex items-center mx-4 rounded-md border border-amber-100 shadow-sm
    focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-500"
    >
      <input
        type="text"
        placeholder={initialTextSearchBar}
        value={currentInputValue}
        onChange={(e) => handleSearch(e.target.value)}
        className=" w-full h-full text-black p-2 pr-10 focus:outline-none bg-white"
        // defaultValue={search.get("search")?.toString()}
      />
      {currentInputValue && (
        <button onClick={handleClear} type="button">
          <MdClear
            size={sizeIcon}
            color="black"
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
          />
        </button>
      )}
    </div>
  );
}
