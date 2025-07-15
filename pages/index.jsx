import Header from "../src/header/Header";
import GameTitle from "../src/game/game-title";
import { GameField, GameInfo, useGameState } from "../src/game";
import { useState } from "react";
import { GameSymbol } from "../src/game/game-symbol";
import { UiModal } from "../src/uikit/ui-modal";
import { UiButton } from "../src/uikit/ui-button";
import {log} from "next/dist/server/typescript/utils";

/*

(x + y * 19)

*/

export default function HomePage() {
  const [playersCount] = useState(4);

  // Получаем состояние игры из кастомного хука
  // cells - массив символов на поле
  // currentCell - текущий активный символ
  // nextMove - следующий ход
  // handleMoveClick - обработчик клика по клетке
  const [
    cells,
    currentCell,
    nextMove,
    handleMoveClick,
    winner,
    handlePlayerTimeOver,
    winnerSymbol,
  ] = useGameState(playersCount);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="pt-6 mx-auto w-max">
        <GameTitle playersCount={playersCount} />
        <GameInfo
          playersCount={playersCount}
          currentCell={currentCell}
          isWinner={!!winnerSymbol}
          onPlayerTimeOver={handlePlayerTimeOver}
          className="mt-4"
        />
        {winnerSymbol && (
          <div className="my-4">
            <GameSymbol symbol={winnerSymbol} />
          </div>
        )}
        <GameField
          cells={cells}
          currentCell={currentCell}
          nextMove={nextMove}
          handleMoveClick={handleMoveClick}
          playersCount={playersCount}
          className="mt-6"
          winnerSequence={winner}
          winnerSymbol={winnerSymbol}
        />
        <UiModal isOpen={winnerSymbol} onClose={() => console.log("close")}>
          <UiModal.Header>Конец игры</UiModal.Header>
          <UiModal.Body>
            <div className="text-sm">
              <p>
                Победитель: <span className="text-[#b3c6ff]">Parom</span>
              </p>
            </div>
          </UiModal.Body>
          <UiModal.Footer>
            <UiButton size="md" variant="outline">
              Вернуться
            </UiButton>
            <UiButton size="md" variant="primary">
              Играть снова
            </UiButton>
          </UiModal.Footer>
        </UiModal>
      </main>
    </div>
  );
}
