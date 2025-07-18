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

    const non = index % filedSize;
    if (non < gap || non >= filedSize - gap) {
      res.shift();
      res.shift();
      res.shift();
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
