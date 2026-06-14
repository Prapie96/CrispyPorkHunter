"use client";
import React, { useState } from "react";
import { initialTextSearchBar } from "../consts/const";
import { useRouter,usePathname,useSearchParams } from "next/navigation";
export default function SearchBar() {
  const search = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();
  const handleSearch = (text:string)=>{
    const params = new URLSearchParams(search);
    
    if(text){
      params.set('search',text.toLowerCase());
    }else{
      params.delete('search');
    }
    replace(`${pathName}?${params.toString()}`);
  }

  // const [text, setText] = useState("");
  return (
    <div className="mx-4 rounded-md border border-amber-100 shadow-sm
    focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-500">
      <input
        type="text"
        // value={text}
        placeholder={initialTextSearchBar}
        onChange={(e) => handleSearch(e.target.value)}
        className=" w-full h-full text-black p-2 focus:outline-none bg-white"
        defaultValue={search.get('search')?.toString()}
      />
    </div>
  );
}
