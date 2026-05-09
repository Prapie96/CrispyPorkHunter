import { IconType } from "react-icons";

interface DetailStoreWithIconProps {
  icon: IconType;
  sizeIcon: number;
  detailStore?: string | null;
}

export default function DetailStoreWithIcon({
  icon,
  sizeIcon,
  detailStore = "ไม่ปรากฎ",
}: DetailStoreWithIconProps) {
  const Icon = icon;
  return (
    <div className="flex gap-4">
      <Icon size={sizeIcon} />
      <p>{detailStore}</p>
    </div>
  );
}
