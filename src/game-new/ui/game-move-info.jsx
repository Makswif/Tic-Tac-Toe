import { GameSymbol } from "./game-symbol";

import { UiButton } from "../../uikit/ui-button";

export function GameFieldMoveAndButtons({ currentCell, nextMove }) {
  return (
    <div className="flex justify-center items-center gap-12">
      <UiButton size="md" variant="primary">
        Ничья
      </UiButton>
      {/* Текущий ход */}
      <div>
        <div className="flex items-center gap-1 text-xl leading-[1.2]">
          Ход: <GameSymbol symbol={currentCell} className="w-6 h-6" />
        </div>
        {/* Следующий ход */}
        <div className="flex items-center gap-1 text-xs text-slate-400">
          Следующий ход: <GameSymbol symbol={nextMove} className="w-4 h-4" />
        </div>
      </div>
      <UiButton size="lg" variant="outline">
        Сдаться
      </UiButton>
    </div>
  );
}
