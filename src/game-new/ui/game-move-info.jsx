import { GameSymbol } from "./game-symbol";

export function GameFieldMoveAndButtons({ currentCell, nextMove }) {
  return (
    <>
      {/* Текущий ход */}
      <div className="flex items-center gap-1 text-xl leading-[1.2]">
        Ход: <GameSymbol symbol={currentCell} className="w-6 h-6" />
      </div>
      {/* Следующий ход */}
      <div className="flex items-center gap-1 text-xs text-slate-400">
        Следующий ход: <GameSymbol symbol={nextMove} className="w-4 h-4" />
      </div>
    </>
  );
}
