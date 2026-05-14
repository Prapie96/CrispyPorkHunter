import { IconType } from "react-icons";

export interface DetailStoreWithIconProps {
  icon: IconType;
  sizeIcon?: number;
  detailStore?: string | null;
  color?:string;
}

export default function DetailStoreWithIcon({
  icon,
  sizeIcon,
  detailStore,
  color
}: DetailStoreWithIconProps) {
  const Icon = icon;
  return (
    <div className="flex gap-4 ">
      <Icon size={sizeIcon ?? 20} color={color ?? "black"}/>
      <p>{detailStore ? detailStore : "ไม่ปรากฎข้อมูล"}</p>
    </div>
  );
}
