import Image from "next/image";
import AvatarSrc from "../Images/Avatar_1.svg";
import { clsx } from "clsx";

export function Profile({ className, name, rating, image = AvatarSrc }) {
  return (
    <div className={clsx("flex items-center gap-2 text-start", className)}>
      <Image width={48} height={48} src={image} alt="Logo" />
      <div className="overflow-hidden w-30 flex-1">
        <div className="text-lg leading-[1.2] truncate">{name}</div>
        <div className="text-slate-400 text-xs leading-[1.2]">
          Рейтинг: {rating}
        </div>
      </div>
    </div>
  );
}
