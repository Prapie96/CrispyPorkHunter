import { IconType } from "react-icons";

export interface DetailsbasicProps {
  icon: IconType;
  sizeIcon?: number;
  detailStore?: string | null;
  color?:string;
}

export default function Detailsbasic({
  icon,
  sizeIcon = 20,
  detailStore,
  color = "black"
}: DetailsbasicProps) {
  const Icon = icon;
  return (
    <div className="flex gap-4">
      <Icon size={sizeIcon} color={color}/>
      <p>{detailStore ? detailStore : "ไม่ปรากฎข้อมูล"}</p>
    </div>
  );
}
