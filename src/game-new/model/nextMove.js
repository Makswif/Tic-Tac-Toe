import { Move_Order } from "../ui/constants";

export function NextMove(currentCell, playersCount, PlayerTimeOver) {
  const slicedMoveOrder = Move_Order.slice(0, playersCount).filter(
    (symbol) => !PlayerTimeOver.includes(symbol),
  );
  // Находим индекс текущего символа в массиве порядка ходов
  const nextMoveIndex = slicedMoveOrder.indexOf(currentCell) + 1;
  // Возвращаем следующий символ, если он есть, иначе первый символ из массива (циклический переход)
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}
