import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameInfo } from "./ui/game-info";
import { GameTitle } from "./ui/game-title";
import { Players } from "./ui/constants";
import { PlayerInfo } from "./ui/player-info";
import { GameFieldMoveAndButtons } from "./ui/game-move-info";
import { GameCell } from "./ui/game-cells";
import { GameOverModal } from "./ui/game-over-modal";
import { useCallback, useMemo, useReducer } from "react";
import {
  Game_State_Action,
  gameStateReducer,
  initGameState,
} from "./model/game-state-reduce";
import { computerWinner } from "./model/computer-winner";
import { NextMove } from "./model/nextMove";
import { ComputerWinnerSymbol } from "./model/computer-winner-symbol";
import { computePlayerTimer } from "./model/compute-player-timer";
import { useInterval } from "./lib/timers";

const Player_Count = 4;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    {
      playersCount: Player_Count,
      defaultTimer: 6000, // defaultTimer секунд на ход
      currentMoveStart: Date.now(),
    },
    initGameState,
  );

  useInterval(
    100,
    !gameState.winnerSymbol,
    useCallback((now) => {
      dispatch({
        type: Game_State_Action.TICK,
        now: now,
      });
    }, []),
  );

  const { cells, currentCell, timers, winnerSymbol } = gameState;

  const winnerSequence = useMemo(
    () => computerWinner(gameState.cells),
    [gameState.cells],
  );

  // Вычисляем следующего игрока для отображения (только если игра не закончена)
  const nextMove = winnerSymbol
    ? currentCell
    : NextMove({
        currentMove: currentCell,
        playersCount: Player_Count,
        timers: timers,
      });

  // Используем winnerSymbol из состояния или определяем победителя по последовательности
  const finalWinnerSymbol =
    winnerSymbol || (winnerSequence ? currentCell : null);

  const handleCellClick = useCallback(
    (index) => {
      // Не разрешаем ходы если игра закончена
      if (finalWinnerSymbol) return;

      dispatch({
        type: Game_State_Action.CELL_CLICK,
        index,
        now: Date.now(),
      });
    },
    [finalWinnerSymbol],
  );

  const winnerPlayer = Players.find((p) => p.symbol === finalWinnerSymbol);

  // Определяем текст для победителя
  const getWinnerText = () => {
    if (finalWinnerSymbol) {
      return winnerPlayer?.name;
    }
  };

  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        gameInfo={<GameInfo isRatingGame playersCount={4} />}
        title={<GameTitle />}
        playerslist={Players.slice(0, Player_Count).map((player, index) => {
          const { timer, timerStartAt } = computePlayerTimer(
            gameState,
            player.symbol,
          );
          return (
            <PlayerInfo
              avatar={player.image}
              name={player.name}
              rating={player.rating}
              symbol={player.symbol}
              key={player.id}
              timer={timer}
              timerStartAt={timerStartAt}
              isRight={index % 2 === 1}
            />
          );
        })}
        GameMoveInfo={
          <GameFieldMoveAndButtons
            nextMove={nextMove}
            currentCell={currentCell}
          />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            key={index}
            cell={cell}
            isWinner={winnerSequence?.includes(index)}
            disabled={!!finalWinnerSymbol}
            onClick={handleCellClick}
            index={index}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        winnerName={getWinnerText()}
        players={Players.slice(0, Player_Count).map((player, index) => {
          const { timer } = computePlayerTimer(gameState, player.symbol);
          return (
            <PlayerInfo
              avatar={player.image}
              name={player.name}
              rating={player.rating}
              symbol={player.symbol}
              key={player.id}
              timer={timer}
              isTimerRunning={false}
              isRight={index % 2 === 1}
            />
          );
        })}
      />
    </>
  );
}
