import Link from "next/link";
import { ArrowLeftIcon } from "./Icons/arrow-left-icon";
import { StarIcon } from "./Icons/star-icon";
import { UserIcon } from "./Icons/user-icon";
import { BackLink } from "./back-link";
import { clsx } from "clsx";
import { GameSymbol } from "./game-symbol";

export function GameLayout({
  backLink,
  title,
  gameInfo,
  playerslist,
  actions,
  GameMoveInfo,
  gameCells,
}) {
  return (
    <div className="pb-10">
      <div className="pl-2">
        {backLink}
        {title}
        {gameInfo}
      </div>
      <div
        className={
          "mt-4 bg-white rounded-2xl shadow-md px-8 py-4 grid grid-cols-2 gap-3  justify-between"
        }
      >
        {playerslist}
      </div>
      <div className={"mt-6 bg-white rounded-2xl shadow-md px-8 pt-5 pb-7"}>
        <div className="flex justify-center items-center gap-12">
          {actions} {/* Кнопка ничьей */}
          <div>{GameMoveInfo}</div>
          {actions} {/* Кнопка сдачи */}
        </div>
        <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] mt-4">
          {gameCells}
        </div>
      </div>
    </div>
  );
}
