import { ReactNode } from "react";
import LogoSection from "../logoSection";

interface NewSideBarProps {
  children: ReactNode;
}

export default function NewSideBar({children}:NewSideBarProps) {
  return (
    <aside className="block w-1/2 md:w-1/4 text-white overflow-auto bg-yellow-50 h-full">
      <LogoSection />
      {/* ตรงนี้คือจุดที่ Component ลูกๆ จาก Home จะมาแสดงผล */}
      <div className="flex flex-col gap-4">{children}</div>
    </aside>
  );
}
