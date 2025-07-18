import { Profile } from "../../profile";

import { clsx } from "clsx";
import Image from "next/image";
import { GameSymbol } from "./game-symbol"; // or your image component

export function PlayerInfo({
  isRight,
  name,
  avatar,
  symbol,
  rating,
  second,
  isTimerRunning,
}) {
  const Timecolor = () => {
    if (isTimerMove) {
      return isDangertime ? "text-orange-500" : "text-slate-900";
    }
    return "text-slate-300";
  };
  const minutesString = String(Math.floor(second / 60)).padStart(2, "0");
  const secondString = String(second % 60).padStart(2, "0");
  const isDangertime = second < 20;

  return (
    <div
      className={clsx("flex gap-3 items-center", isRight && "flex-row-reverse")}
    >
      <div className="relative">
        <div className="flex items-center gap-2 text-start text-teal-600 w-44">
          <Image src={avatar} alt="avatar" width={48} height={48} unoptimized />
          <div className="overflow-hidden">
            <div className="text-lg leading-[1.2] truncate">{name}</div>
            <div className="text-slate-400 text-xs leading-[1.2]">
              Рейтинг: {rating}
            </div>
          </div>
        </div>
        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={symbol} />
        </div>
      </div>
      <div className="h-6 w-px bg-slate-200" />
      <div className={clsx("text-lg font-semibold w-[60px]", Timecolor)}>
        {minutesString}:{secondString}
      </div>
    </div>
  );
}
