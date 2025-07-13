import Header from "../src/header/Header";
import GameTitle from "../src/game/game-title";
import { GameField, GameInfo, useGameState } from "../src/game";
import { useState } from "react";

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
  const [cells, currentCell, nextMove, handleMoveClick, winner] =
    useGameState(playersCount);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="pt-6 mx-auto w-max">
        <GameTitle playersCount={playersCount} />
        <GameInfo
          playersCount={playersCount}
          currentCell={currentCell}
          className="mt-4"
        />
        <GameField
          cells={cells}
          currentCell={currentCell}
          nextMove={nextMove}
          handleMoveClick={handleMoveClick}
          playersCount={playersCount}
          className="mt-6"
          winnerSequence={winner}
        />
      </main>
    </div>
  );
}
