import { StarIcon } from "./Icons/star-icon";
import { UserIcon } from "./Icons/user-icon";

export function GameInfo({ playersCount, isRatingGame, timeMode }) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-400 ">
      {isRatingGame && <StarIcon />}
      <div className="flex items-center gap-1">
        <UserIcon /> {playersCount}
      </div>
      <div className="flex items-center gap-1">
        <UserIcon /> {timeMode}
      </div>
    </div>
  );
}
