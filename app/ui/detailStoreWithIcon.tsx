import { IconType } from "react-icons";

interface DetailStoreWithIconProps {
  icon: IconType;
  sizeIcon: number;
  detailStore?: string | null;
}

export default function DetailStoreWithIcon({
  icon,
  sizeIcon,
  detailStore,
}: DetailStoreWithIconProps) {
  const Icon = icon;
  return (
    <div className="flex gap-4">
      <Icon size={sizeIcon} />
      <p>{detailStore ? detailStore : "ไม่ปรากฎข้อมูล"}</p>
    </div>
  );
}
