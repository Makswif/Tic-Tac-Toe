import { useCallback, useState } from "react";
import { Game_Symbol, Move_Order } from "./constants";
import { computerWinner, NextMove } from "./model";

// Кастомный хук для управления состоянием игры
export function useGameState(playersCount) {
  // currentCell - текущий активный символ (чей сейчас ход)
  const [{ cells, currentCell, PlayerTimeOver }, setGameState] = useState(
    () => ({
      cells: new Array(19 * 19).fill(null), // Создаем пустое поле 19x19, заполненное null
      currentCell: Game_Symbol.O, // Начинаем с символа O
      PlayerTimeOver: [],
    }),
  );

  const winnerSequence = computerWinner(cells);
  // Вычисляем следующий ход на основе текущего символа
  const nextMove = NextMove(currentCell, playersCount, PlayerTimeOver);

  const winnerSymbol =
    nextMove === currentCell ? currentCell : winnerSequence?.[0];

  // Обработчик клика по клетке
  const handleMoveClick = (index) => {
    setGameState((lastGameState) => {
      // Проверяем, свободна ли клетка
      // Если клетка уже занята, возвращаем текущее состояние без изменений
      if (lastGameState.cells[index]) return lastGameState;

      // Если клетка свободна, обновляем состояние
      return {
        ...lastGameState, // Копируем текущее состояние
        currentCell: NextMove(
          lastGameState.currentCell,
          playersCount,
          lastGameState.PlayerTimeOver,
        ), // Переключаем на следующий символ
        cells: lastGameState.cells.map((cell, i) =>
          // Обновляем только клетку с нужным индексом, остальные оставляем как есть
          i === index ? lastGameState.currentCell : cell,
        ),
      };
    });
  };

  const handlePlayerTimeOver = (symbol) => {
    setGameState((lastGameState) => {
      return {
        ...lastGameState,
        PlayerTimeOver: [...lastGameState.PlayerTimeOver, symbol],
        currentCell: NextMove(
          currentCell,
          playersCount,
          lastGameState.PlayerTimeOver,
        ),
      };
    });
  };

  // Возвращаем массив с данными состояния и функцией для обновления
  return [
    cells,
    currentCell,
    nextMove,
    handleMoveClick,
    winnerSequence,
    handlePlayerTimeOver,
    winnerSymbol,
  ];
}
