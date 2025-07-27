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
  };
};

export const Game_State_Action = {
  CELL_CLICK: "CELL_CLICK",
  TICK: "TIMER_TICK",
  // TIMER_TICK: undefined
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case Game_State_Action.CELL_CLICK: {
      const { index, now } = action;
      // Prevent moves if the cell is already filled
      if (state.cells[index]) {
        return state;
      }

      // Sprawdzenie, czy gracz ma jeszcze czas na wykonanie ruchu
      const diff = now - state.currentMoveStart;
      const currentTimer = state.timers[state.currentCell];
      if (currentTimer - diff <= 0) {
        // Jeśli czas się skończył, ignorujemy ruch i po prostu aktualizujemy stan
        return {
          ...state,
          timers: updateTimers(state, now),
          currentMoveStart: now,
          currentCell: NextMove({
            currentMove: state.currentCell,
            playersCount: state.playersCount,
            timers: updateTimers(state, now),
          }),
        };
      }

      // Создаем новый массив и размещаем символ в нажатой клетке
      const newCells = [...state.cells];
      newCells[index] = state.currentCell;

      return {
        ...state,
        cells: newCells,
        timers: updateTimers(state, now),
        currentMoveStart: now,
        currentCell: updateCell(state, index),
      };
    }

    // case Game_State_Action.TIMER_TICK: {
    //   const { symbol, timeLeft } = action;
    //   return {
    //     ...state,
    //     timers: {
    //       ...state.timers,
    //       [symbol]: Math.max(0, timeLeft - 1000), // Уменьшаем на 1 секунду
    //     },
    //   };
    // }
    case Game_State_Action.TIMER_TICK: {
      const { now } = action;

      // Sprawdź, czy czas obecnego gracza się skończył
      if (!isTimerOver(state, now)) {
        return state; // Czas się nie skończył, nic nie robimy
      }

      // 1. Zaktualizuj timery - ustaw czas obecnego gracza na 0
      const updatedTimers = {
        ...state.timers,
        [state.currentCell]: 0,
      };

      // 2. Znajdź następnego gracza, który ma jeszcze czas
      const nextPlayer = NextMove({
        currentMove: state.currentCell,
        playersCount: state.playersCount,
        timers: updatedTimers,
      });

      // 3. Zaktualizuj stan gry
      return {
        ...state,
        timers: updatedTimers, // Zaktualizowane timery
        currentMoveStart: now, // Nowy czas rozpoczęcia ruchu
        currentCell: nextPlayer, // Nowy aktywny gracz
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
  return {
    ...gameState.timers,
    [gameState.currentCell]: timer - diff,
  };
}

function updateCell(gameState, index) {
  return NextMove({
    currentMove: gameState.currentCell,
    playersCount: gameState.playersCount,
    timers: gameState.timers,
  });
}

/**
 * Sprawdza, czy czas dla bieżącego gracza się skończył
 * @param {Object} gameState - Stan gry
 * @param {number} now - Aktualny czas
 * @returns {boolean} Czy czas się skończył
 */
function isTimerOver(gameState, now) {
  // Oblicz, ile czasu upłynęło od rozpoczęcia ruchu
  const elapsedTime = now - gameState.currentMoveStart;

  // Pobierz pozostały czas dla bieżącego gracza
  const currentTimer = gameState.timers[gameState.currentCell];

  // Oblicz, ile czasu pozostało
  const remainingTime = currentTimer - elapsedTime;

  // Sprawdź, czy czas się skończył
  const isExpired = remainingTime <= 0;

  // Loguj tylko jeśli czas się skończył
  if (isExpired) {
    console.log(`Timer dla gracza ${gameState.currentCell} wygasł!`);
    console.log(
      `Początkowy czas: ${currentTimer}ms, upłynęło: ${elapsedTime}ms, pozostało: ${remainingTime}ms`,
    );
  }

  return isExpired;
}
