"use client";
import React, { useState } from "react";
import { initialTextSearchBar } from "../consts/const";

export default function SearchBar() {
  const [text, setText] = useState("");
  return (
    <div className="mx-4 rounded border border-amber-100 shadow-sm
    focus-within:border-amber-700 focus-within:ring-1 focus-within:ring-amber-500">
      <input
        type="text"
        value={text}
        placeholder={initialTextSearchBar}
        onChange={(e) => setText(e.target.value)}
        className=" w-full h-full text-black p-2 focus:outline-none bg-white"
      />
    </div>
  );
}
