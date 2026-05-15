import { VariantType, SizeButton, StatusButtonTypes, ModeSideBar } from "../types/uitypes";

export const buttonVariantMapStyles: Record<VariantType, string> = {
  primary: "bg-amber-600 text-white hover:bg-amber-800 ",
  secondary: "bg-blue-200 text-blue-800 hover:bg-gray-300 ",
  ghost: `bg-transparent text-black`,
};

export const buttonSizeMapStyles: Record<SizeButton, string> = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const statusButtonMapStyles : Record<StatusButtonTypes,string>={
    disabled: `bg-grey-400 cursor-default`,
    enabled: `cursor-pointer active:scale-95`
}


 export const displayTextMode: Record<ModeSideBar, string> = {
    default: "ร้านหมูกรอบแนะนำ",
    saved: "ร้านที่บันทึก",
    hunt: "ร้านที่ล่าไปแล้ว",
    statistic: "สถิติ",
  };