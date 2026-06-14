"use client";

import { Suspense } from "react";
import HomeContent from "./ui/HomeContent";

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-dvh flex items-center justify-center bg-stone-100 text-amber-800 font-medium">
          กำลังโหลด...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
