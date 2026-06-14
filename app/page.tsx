"use client";
// import styles from "./page.module.css";
import { Suspense} from "react";
import HomeComp from "./ui/HomeComp";

export default function Home() {
  return (
    <Suspense fallback = {null}>
      <HomeComp/>
    </Suspense>
   
  );
}
