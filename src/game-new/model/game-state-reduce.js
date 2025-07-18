import { Game_Symbol } from "../ui/constants";
import { useReducer } from "react";
import { computerWinner } from "./computer-winner";
import { NextMove } from "./nextMove";

export const initGameState = ({ playersCount }) => ({
  cells: new Array(19 * 19).fill(null),
  currentCell: Game_Symbol.O,
  playersCount,
  playersTimeOver: [], // Add this line
});

export const Game_State_Action = {
  CELL_CLICK: "CELL_CLICK",
};

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case Game_State_Action.CELL_CLICK: {
      const { index } = action;
      if (state.cells[index]) {
        return state;
      }

      // Создаем новый массив и размещаем символ в нажатой клетке
      const newCells = [...state.cells];
      newCells[index] = state.currentCell;

      return {
        ...state,
        cells: newCells,
        currentCell: NextMove(
          state.currentCell,
          state.playersCount,
          state.playersTimeOver,
        ),
      };
    }
    default: {
      return state;
    }
  }
};
