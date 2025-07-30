import { Game_Symbol, Move_Order, Players } from "../ui/constants";
import { useReducer } from "react";
import { computerWinner } from "./computer-winner";
import { NextMove } from "./nextMove";

export const initGameState = ({ playersCount, defaultTimer }) => {
  // Инициализируем таймеры для символов из Move_Order (как в NextMove)
  const timers = Move_Order.reduce((timers, symbol, i) => {
    if (i < playersCount) {
      timers[symbol] = defaultTimer;
    }
    return timers;
  }, {});

  return {
    cells: new Array(19 * 19).fill(null),
    currentCell: Move_Order[0], // Первый символ из Move_Order
    playersCount,
    timers,
    currentMoveStart: Date.now(),
    winnerSymbol: null, // Добавляем поле для отслеживания победителя
  };
};

export const Game_State_Action = {
  CELL_CLICK: "CELL_CLICK",
  TICK: "TIMER_TICK",
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case Game_State_Action.CELL_CLICK: {
      const { index, now } = action;

      // Не позволяем делать ходы если игра закончена
      if (state.winnerSymbol) {
        return state;
      }

      // Prevent moves if the cell is already filled
      if (state.cells[index]) {
        return state;
      }

      // Проверка, есть ли у игрока еще время на выполнение хода
      const diff = now - state.currentMoveStart;
      const currentTimer = state.timers[state.currentCell];
      if (currentTimer - diff <= 0) {
        // Если время закончилось, игнорируем ход и переходим к следующему игроку
        const updatedTimers = {
          ...state.timers,
          [state.currentCell]: 0,
        };

        console.log(
          `Ход игнорирован - время игрока ${state.currentCell} истекло`,
        );

        return {
          ...state,
          timers: updatedTimers,
          currentMoveStart: now,
          currentCell: NextMove({
            currentMove: state.currentCell,
            playersCount: state.playersCount,
            timers: updatedTimers,
          }),
        };
      }

      // Создаем новый массив и размещаем символ в нажатой клетке
      const newCells = [...state.cells];
      newCells[index] = state.currentCell;

      // Обновляем таймеры ПЕРЕД вычислением следующего игрока
      const updatedTimers = updateTimers(state, now);

      // Проверяем победителя после хода
      const winnerSequence = computerWinner(newCells);
      const hasWinner = winnerSequence ? state.currentCell : null;

      console.log(`Ход сделан игроком ${state.currentCell} в ячейку ${index}`);
      if (hasWinner) {
        console.log(`🎉 Игрок ${hasWinner} победил!`);
      }

      return {
        ...state,
        cells: newCells,
        timers: updatedTimers,
        currentMoveStart: now,
        winnerSymbol: hasWinner,
        currentCell: hasWinner
          ? state.currentCell
          : NextMove({
              currentMove: state.currentCell,
              playersCount: state.playersCount,
              timers: updatedTimers,
            }),
      };
    }

    case Game_State_Action.TICK: {
      const { now } = action;

      // Если игра закончена, не обрабатываем таймер
      if (state.winnerSymbol) {
        return state;
      }

      // Проверяем, закончилось ли время у текущего игрока
      if (!isTimerOver(state, now)) {
        return state; // Время не закончилось, ничего не делаем
      }

      console.log(
        `⏰ Время игрока ${state.currentCell} истекло! Переход к следующему игроку.`,
      );

      // 1. Обновляем таймеры - устанавливаем время текущего игрока на 0
      const updatedTimers = {
        ...state.timers,
        [state.currentCell]: 0,
      };

      // 2. Проверяем, есть ли игроки с оставшимся временем
      const allPlayers = Move_Order.slice(0, state.playersCount);
      const playersWithTime = allPlayers.filter(
        (symbol) => updatedTimers[symbol] > 0,
      );

      if (playersWithTime.length === 0) {
        console.log(`⏰ У всех игроков закончилось время! Ничья.`);
        return {
          ...state,
          timers: updatedTimers,
          winnerSymbol: "TIMEOUT", // Специальный символ для ничьи по времени
        };
      }

      if (playersWithTime.length === 1) {
        console.log(
          `🎉 Игрок ${playersWithTime[0]} победил - у остальных закончилось время!`,
        );
        return {
          ...state,
          timers: updatedTimers,
          winnerSymbol: playersWithTime[0], // Единственный оставшийся игрок побеждает
        };
      }

      // 3. Находим следующего игрока, у которого есть время
      const nextPlayer = NextMove({
        currentMove: state.currentCell,
        playersCount: state.playersCount,
        timers: updatedTimers,
      });

      console.log(`➡️ Следующий игрок: ${nextPlayer}`);

      // 4. Обновляем состояние игры
      return {
        ...state,
        timers: updatedTimers, // Обновленные таймеры
        currentMoveStart: now, // Новое время начала хода
        currentCell: nextPlayer, // Новый активный игрок
      };
    }

    default: {
      return state;
    }
  }
};

function updateTimers(gameState, now) {
  const diff = now - gameState.currentMoveStart;
  const timer = gameState.timers[gameState.currentCell];
  const newTime = Math.max(0, timer - diff); // Предотвращаем отрицательные значения

  return {
    ...gameState.timers,
    [gameState.currentCell]: newTime,
  };
}

/**
 * Проверяет, закончилось ли время для текущего игрока
 * @param {Object} gameState - Состояние игры
 * @param {number} now - Текущее время
 * @returns {boolean} Закончилось ли время
 */
function isTimerOver(gameState, now) {
  // Вычисляем, сколько времени прошло с начала хода
  const elapsedTime = now - gameState.currentMoveStart;

  // Получаем оставшееся время для текущего игрока
  const currentTimer = gameState.timers[gameState.currentCell];

  // Вычисляем, сколько времени осталось
  const remainingTime = currentTimer - elapsedTime;

  // Проверяем, закончилось ли время
  const isExpired = remainingTime <= 0;

  return isExpired;
}
