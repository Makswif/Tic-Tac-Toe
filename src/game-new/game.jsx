import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameInfo } from "./ui/game-info";
import { GameTitle } from "./ui/game-title";
import { Players } from "./ui/constants";
import { PlayerInfo } from "./ui/player-info";
import { GameFieldMoveAndButtons } from "./ui/game-move-info";
// import { initGameState } from "./model/use-game-state";
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
      defaultTimer: 6000, // 6 sekund na ruch dla łatwiejszego testowania
      currentMoveStart: Date.now(),
    },
    initGameState,
  );

  useInterval(
    1000,
    !!gameState.currentMoveStart,
    useCallback((now) => {
      dispatch({
        type: Game_State_Action.TICK, // Это правильно для таймера
        now: now,
      });
    }, []),
  );

  const formatTime = (ms) => {
    if (ms <= 0) return "0s";
    return `${Math.floor(ms / 1000)}s ${ms % 1000}ms`;
  };

  const { cells, currentCell, timers } = gameState;

  const winnerSequence = useMemo(
    () => computerWinner(gameState.cells),
    [gameState.cells],
  );
  const nextMove = NextMove({
    currentMove: gameState.currentCell,
    playersCount: Player_Count,
    timers: gameState.timers,
  });

  // ИСПРАВЛЕНО: правильный handleCellClick для клика по ячейке
  const handleCellClick = useCallback((index) => {
    dispatch({
      type: Game_State_Action.CELL_CLICK, // Правильный экшен для клика по ячейке
      index,
      now: Date.now(),
    });
  }, []);

  const winnerSymbol = ComputerWinnerSymbol(gameState, {
    winnerSequence,
    nextMove,
  });

  const winnerPlayer = Players.find((p) => p.symbol === winnerSymbol);

  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        gameInfo={
          <GameInfo isRatingGame playersCount={4} timeMode={"1 мин на ход"} />
        }
        title={<GameTitle />}
        // В компоненте Game, в playerslist map добавьте:
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
            disabled={!!winnerSymbol}
            onClick={handleCellClick}
            index={index}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        winnerName={winnerPlayer?.name}
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
