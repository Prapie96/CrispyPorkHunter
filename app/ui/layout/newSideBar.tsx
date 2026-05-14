import { ReactNode } from "react";
import LogoSection from "../logoSection";

interface NewSideBarProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function NewSideBar({ children, isOpen }: NewSideBarProps) {
  return (
    <aside
      className={`
        ${isOpen ? "w-75 sm:w-96 opacity-100" : "w-0 opacity-0 -translate-x-full"}
        transition-all duration-300 ease-in-out
        bg-yellow-50 h-full overflow-auto flex flex-col border-r border-stone-200
        z-50
      `}
    >
      <div className="min-w-75"> 
        <LogoSection />
        <div className="flex flex-col gap-4 p-4">{children}</div>
      </div>
    </aside>
  );
}