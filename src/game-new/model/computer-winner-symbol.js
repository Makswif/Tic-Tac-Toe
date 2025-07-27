export function ComputerWinnerSymbol(gameState, { winnerSequence, nextMove }) {
  // Zwróć symbol tylko jeśli istnieje sekwencja wygrywająca
  if (winnerSequence && winnerSequence.length > 0) {
    return gameState.cells[winnerSequence[0]];
  }

  // Sprawdź, czy został tylko jeden gracz z czasem większym od zera
  if (gameState.timers) {
    const playersWithTime = Object.entries(gameState.timers).filter(
      ([symbol, time]) => time > 0,
    );

    // Jeśli został tylko jeden gracz z czasem > 0, uznaj go za zwycięzcę
    if (playersWithTime.length === 1) {
      return playersWithTime[0][0]; // Zwraca symbol gracza, który został
    }
  }

  return null; // Brak zwycięzcy
}
