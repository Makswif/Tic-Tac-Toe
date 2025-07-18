import { clsx } from "clsx";
import { GameSymbol } from "./game-symbol";

export function GameCell({ onClick, isWinner, disabled, symbol, children }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "border border-slate-200 flex items-center justify-center",
        isWinner && "bg-green-400",
      )}
    >
      {symbol && <GameSymbol symbol={symbol} className="w-4 h-4" />}
      {children}
    </button>
  );
}
