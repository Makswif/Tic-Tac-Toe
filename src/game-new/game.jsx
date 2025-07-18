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
import { useReducer } from "react";
import {Game_State_Action, gameStateReducer, initGameState} from "./model/game-state-reduce";
import { computerWinner } from "./model/computer-winner";
import { NextMove } from "./model/nextMove";
import { ComputerWinnerSymbol } from "./model/computer-winner-symbol";

const Player_Count = 2;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    { playersCount: Player_Count },
    initGameState,
  );
  const { cells, currentCell } = gameState;

  const winnerSequence = computerWinner(gameState.cells);
  const nextMove = NextMove(gameState.currentCell, Player_Count, []);
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
        playerslist={Players.slice(0, Player_Count).map((player, index) => (
          <PlayerInfo
            avatar={player.image}
            name={player.name}
            rating={player.rating}
            symbol={player.symbol}
            key={player.id}
            second={60}
            isRight={index % 2 === 1}
          />
        ))}
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
            onClick={() => {
              dispatch({
                type: Game_State_Action.CELL_CLICK,
                index,
              });
            }}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        winnerName={winnerPlayer?.name}
        players={Players.slice(0, Player_Count).map((player, index) => (
          <PlayerInfo
            avatar={player.image}
            name={player.name}
            rating={player.rating}
            symbol={player.symbol}
            key={player.id}
            second={60}
            isRight={index % 2 === 1}
          />
        ))}
      />
    </>
  );
}
