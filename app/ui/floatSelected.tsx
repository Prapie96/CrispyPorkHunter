import { StoreData } from "../types/maptypes";
import Image from "next/image";
import { changeGoogleImageUrl } from "../utlis/helper";
import DetailStore from "./detailStore";
interface FloatSelectedProps {
  store: StoreData;
}

export default function FloatSelected({ store }: FloatSelectedProps) {

  return (
    <div className="mx-4 overflow-auto">
      <Image
        src={changeGoogleImageUrl(store.thumbnail)}
        alt={store.name}
        width={400}
        height={400}
        className="object-cover"
        priority
      />
      <div className="mt-4">
      <DetailStore store={store}/>
      </div>
    </div>
  );
}
