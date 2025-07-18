import Link from "next/link";
import { ArrowLeftIcon } from "../game-new/ui/Icons/arrow-left-icon";
import { StarIcon } from "../game-new/ui/Icons/star-icon";
import { UserIcon } from "../game-new/ui/Icons/user-icon";

export default function GameTitle({ playersCount }) {
  return (
    <div className="pl-2">
      <Link
        href="#"
        className="flex items-center gap-2 text-xs text-[hsl(225,100%,80%)] -mb-0.5"
      >
        <ArrowLeftIcon />
        На главную
      </Link>
      <h1 className="text-4xl leading-[1.2]">Крестики нолики</h1>
      <div className="flex items-center gap-3 text-xs text-slate-400 ">
        <StarIcon />
        <div className="flex items-center gap-1">
          <UserIcon /> {playersCount}
        </div>
        <div className="flex items-center gap-1">
          <UserIcon /> 1 мин назад
        </div>
      </div>
    </div>
  );
}
