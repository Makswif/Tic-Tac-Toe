export function ComputerWinnerSymbol(gameState, { winnerSequence, nextMove }) {
  return nextMove === gameState.currentCell
    ? gameState.currentCell
    : gameState.cells[winnerSequence?.[0]];
}
