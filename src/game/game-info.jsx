import { clsx } from "clsx";
import { Profile } from "../profile";
import { XIcon } from "./Icons/x-icon";
import { OIcon } from "./Icons/o-icon";
import { GameSymbol } from "./game-symbol";
import { Game_Symbol } from "./constants";

import avatarSrc1 from "../Images/avatar_1.svg";
import avatarSrc2 from "../Images/avatar_2.svg";
import avatarSrc3 from "../Images/avatar_3.svg";
import avatarSrc4 from "../Images/avatar_4.svg";
import { useEffect, useState } from "react";

const players = [
  {
    id: 1,
    name: "Alex",
    rating: 1847,
    image: avatarSrc1,
    symbol: Game_Symbol.X,
  },
  {
    id: 2,
    name: "Sofia",
    rating: 1692,
    image: avatarSrc2,
    symbol: Game_Symbol.TRINGLE,
  },
  {
    id: 3,
    name: "Dmitry",
    rating: 2103,
    image: avatarSrc3,
    symbol: Game_Symbol.SQUARE,
  },
  {
    id: 4,
    name: "Elena",
    rating: 1534,
    image: avatarSrc4,
    symbol: Game_Symbol.O,
  },
];

export function GameInfo({
  className,
  playersCount,
  currentCell,
  isWinner,
  onPlayerTimeOver,
}) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 grid grid-cols-2 gap-3  justify-between",
      )}
    >
      {players.slice(0, playersCount).map((player, index) => (
        <Playerinfo
          key={player.id}
          playerInfo={player}
          isRight={index % 2 === 1}
          onTimeOver={() => onPlayerTimeOver(player.symbol)}
          isTimerMove={currentCell === player.symbol && !isWinner}
        />
      ))}
    </div>
  );
}

function Playerinfo({ playerInfo, isRight, isTimerMove, onTimeOver }) {
  const [second, setSeconds] = useState(4);

  const minutesString = String(Math.floor(second / 60)).padStart(2, "0");
  const secondString = String(second % 60).padStart(2, "0");
  const isDangertime = second < 20;

  useEffect(() => {
    if (isTimerMove) {
      const Timer = setInterval(() => {
        setSeconds((s) => Math.max(s - 1, 0));
      }, 1000);
      return () => {
        clearInterval(Timer);
        setSeconds(second);
      };
    }
  }, [isTimerMove]);

  useEffect(() => {
    if (second === 0) {
      onTimeOver();
    }
  }, [second]);

  const TimerColor = () => {
    if (isTimerMove) {
      return isDangertime ? "text-orange-500" : "text-slate-900";
    }
    return "text-slate-300";
  };

  return (
    <div className="flex gap-3 items-center">
      <div
        className={clsx(
          "text-lg font-semibold order-1 w-[60px]",
          isRight && "order-1",
          TimerColor(),
        )}
      >
        {minutesString}:{secondString}
      </div>
      <div className={clsx("relative", isRight && "order-2")}>
        <Profile
          className="w-44"
          name={playerInfo.name}
          rating={playerInfo.rating}
          image={playerInfo.image}
        />
        <div className="bg-white rounded-full w-5 h-5 shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol} />
        </div>
      </div>
      <div
        className={clsx("h-6 w-px bg-slate-200 ml-2 ", isRight && "order-1")}
      />
    </div>
  );
}
