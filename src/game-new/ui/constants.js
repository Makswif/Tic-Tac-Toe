import avatarSrc1 from "../../Images/avatar_1.svg";
import avatarSrc2 from "../../Images/avatar_2.svg";
import avatarSrc3 from "../../Images/avatar_3.svg";
import avatarSrc4 from "../../Images/avatar_4.svg";

export const Game_Symbol = {
  O: "zero",
  X: "cross",
  TRINGLE: "tringle",
  SQUARE: "square",
};

export const Move_Order = [
  Game_Symbol.O,
  Game_Symbol.X,
  Game_Symbol.TRINGLE,
  Game_Symbol.SQUARE,
];

export const Players = [
  {
    id: 1,
    name: "Alex",
    rating: 1847,
    image: avatarSrc1,
    symbol: Game_Symbol.X,
  },
  {
    id: 2,
    name: "Sofia",
    rating: 1692,
    image: avatarSrc2,
    symbol: Game_Symbol.TRINGLE,
  },
  {
    id: 3,
    name: "Dmitry",
    rating: 2103,
    image: avatarSrc3,
    symbol: Game_Symbol.SQUARE,
  },
  {
    id: 4,
    name: "Elena",
    rating: 1534,
    image: avatarSrc4,
    symbol: Game_Symbol.O,
  },
];
