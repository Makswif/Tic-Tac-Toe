import { Move_Order } from "./constants";

export function NextMove(currentCell, playersCount) {
  const slicedMoveOrder = Move_Order.slice(0, playersCount);
  // Находим индекс текущего символа в массиве порядка ходов
  const nextMoveIndex = slicedMoveOrder.indexOf(currentCell) + 1;
  // Возвращаем следующий символ, если он есть, иначе первый символ из массива (циклический переход)
  return slicedMoveOrder[nextMoveIndex] ?? slicedMoveOrder[0];
}

export function computerWinner(cells, sequenceSize = 5, filedSize = 19) {
  const gap = Math.floor(sequenceSize / 2);

  function SequenceIndexes(index) {
    const res = [
      [], // |
      [], // /
      [], // -
      [], // \
    ];
    for (let j = 0; j < sequenceSize; j++) {
      res[0].push(filedSize * (j - gap) + index);
      res[1].push(-filedSize * (j - gap) + (j - gap) + index);
      res[2].push(j - gap + index);
      res[3].push(filedSize * (j - gap) + (j - gap) + index);
    }
    return res;
  }

  function compareCells(indexes) {
    // Проверяем границы обычным циклом
    for (let i = 0; i < indexes.length; i++) {
      if (indexes[i] < 0 || indexes[i] >= cells.length) {
        return false;
      }
    }

    const firstCell = cells[indexes[0]];
    if (!firstCell) return false;

    // Проверяем, что все клетки одинаковые
    return indexes.every((idx) => cells[idx] === firstCell);
  }

  for (let i = 0; i < cells.length; i++) {
    if (cells[i]) {
      const indexRows = SequenceIndexes(i);
      const winnerIndex = indexRows.find((row) => compareCells(row));

      if (winnerIndex) {
        return winnerIndex;
      }
    }
  }

  return undefined;
}
