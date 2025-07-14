import { clsx } from "clsx";
import { OIcon } from "./Icons/o-icon";
import { XIcon } from "./Icons/x-icon";
import { UiButton } from "../uikit/ui-button";
import { useState } from "react";
import { Game_Symbol, Move_Order } from "./constants";
import { GameSymbol } from "./game-symbol";
import { useGameState } from "./use-game-state";

// Основной компонент игрового поля
export function GameField({
  className,
  playersCount,
  cells,
  currentCell,
  nextMove,
  handleMoveClick,
  winnerSequence,
  winnerSymbol,
}) {
  // Кнопка для предложения ничьей
  const action1 = (
    <>
      <UiButton size="md" variant="primary">
        Ничья
      </UiButton>
    </>
  );

  // Кнопка для сдачи
  const action2 = (
    <>
      <UiButton size="lg" variant="outline">
        Сдаться
      </UiButton>
    </>
  );

  return (
    <GameFiledLayout className={className}>
      {/* Панель с информацией о ходе и кнопками действий */}
      <GameFieldMoveAndButtons
        action1={action1}
        action2={action2}
        currentCell={currentCell}
        nextMove={nextMove}
      ></GameFieldMoveAndButtons>

      {/* Сетка игрового поля */}
      <GameFieldGrid>
        {/* Отображаем каждую клетку поля */}
        {cells.map((symbol, i) => (
          <GameCell
            key={i}
            disebled={!!winnerSymbol}
            isWinner={winnerSequence?.includes(i)}
            onClick={() => {
              handleMoveClick(i); // Обработка клика по клетке с индексом i
            }}
          >
            {/* Если в клетке есть символ, отображаем его */}
            {symbol && <GameSymbol symbol={symbol} className="w-4 h-4" />}
          </GameCell>
        ))}
      </GameFieldGrid>
    </GameFiledLayout>
  );
}

// Компонент отдельной клетки игрового поля
function GameCell({ children, onClick, isWinner, disebled }) {
  return (
    <button
      disabled={disebled}
      onClick={onClick}
      className={clsx(
        "border border-slate-200 flex items-center justify-center",
        isWinner && "bg-green-400",
      )}
    >
      {children}
    </button>
  );
}

// Компонент-обертка для всего игрового поля с общими стилями
function GameFiledLayout({ children, className }) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 pt-5 pb-7", // Белый фон, скругленные углы, тень, отступы
      )}
    >
      {children}
    </div>
  );
}

// Компонент панели с информацией о текущем ходе и кнопками действий
function GameFieldMoveAndButtons({ action1, action2, currentCell, nextMove }) {
  return (
    <div className="flex justify-center items-center gap-12">
      {action1} {/* Кнопка ничьей */}
      {/* Информация о текущем и следующем ходе */}
      <div>
        {/* Текущий ход */}
        <div className="flex items-center gap-1 text-xl leading-[1.2]">
          Ход: <GameSymbol symbol={currentCell} className="w-6 h-6" />
        </div>
        {/* Следующий ход */}
        <div className="flex items-center gap-1 text-xs text-slate-400">
          Следующий ход: <GameSymbol symbol={nextMove} className="w-4 h-4" />
        </div>
      </div>
      {action2} {/* Кнопка сдачи */}
    </div>
  );
}

// Компонент сетки игрового поля
function GameFieldGrid({ children }) {
  return (
    // Создаем сетку 19x19 клеток размером 30px каждая
    <div className="grid grid-cols-[repeat(19,_30px)] grid-rows-[repeat(19,_30px)] mt-4">
      {children}
    </div>
  );
}
