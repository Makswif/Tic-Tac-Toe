import { useState } from "react";
import { Game_Symbol, Move_Order } from "./constants";

// Принимает текущий символ и возвращает следующий символ согласно порядку ходов
function NextMove(currentCell, playersCount) {
  const slicedMoveOrder = Move_Order.slice(0, playersCount);
  // Находим индекс текущего символа в массиве порядка ходов
  const nextMoveIndex = slicedMoveOrder.indexOf(currentCell) + 1;
  // Возвращаем следующий символ, если он есть, иначе первый символ из массива (циклический переход)
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}

// Кастомный хук для управления состоянием игры
export function useGameState(playersCount) {
  // currentCell - текущий активный символ (чей сейчас ход)
  const [{ cells, currentCell }, setGameState] = useState(() => ({
    cells: new Array(19 * 19).fill(null), // Создаем пустое поле 19x19, заполненное null
    currentCell: Game_Symbol.O, // Начинаем с символа O
  }));

  // Вычисляем следующий ход на основе текущего символа
  const nextMove = NextMove(currentCell, playersCount);

  // Обработчик клика по клетке
  const handleMoveClick = (index) => {
    setGameState((lastGameState) => {
      // Проверяем, свободна ли клетка
      // Если клетка уже занята, возвращаем текущее состояние без изменений
      if (lastGameState.cells[index]) return lastGameState;

      // Если клетка свободна, обновляем состояние
      return {
        ...lastGameState, // Копируем текущее состояние
        currentCell: NextMove(lastGameState.currentCell, playersCount), // Переключаем на следующий символ
        cells: lastGameState.cells.map((cell, i) =>
          // Обновляем только клетку с нужным индексом, остальные оставляем как есть
          i === index ? lastGameState.currentCell : cell,
        ),
      };
    });
  };

  // Возвращаем массив с данными состояния и функцией для обновления
  return [cells, currentCell, nextMove, handleMoveClick];
}
