import { clsx } from "clsx";
import { Game_Symbol } from "./constants";
import { OIcon } from "./Icons/o-icon";
import { XIcon } from "./Icons/x-icon";
import { TriangleIcon } from "./Icons/triangle-icon";
import { SquareIcon } from "./Icons/square-icon";

export function GameSymbol({ symbol, className }) {
  const Icon =
    {
      [Game_Symbol.O]: OIcon,
      [Game_Symbol.X]: XIcon,
      [Game_Symbol.TRINGLE]: TriangleIcon,
      [Game_Symbol.SQUARE]: SquareIcon,
    }[symbol] ?? OIcon;
  return <Icon className={className} />;
}
