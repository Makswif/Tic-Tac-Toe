import { Move_Order } from "../ui/constants";

/**
 * Funkcja określająca, który gracz powinien wykonać następny ruch
 * @param {Object|string} currentMoveOrOptions - Aktualny gracz lub obiekt z parametrami
 * @param {number} [playersCountParam] - Liczba graczy
 * @param {Object} [timersParam] - Obiekt z czasami graczy
 * @returns {string} Symbol gracza, który powinien wykonać następny ruch
 */
export function NextMove(currentMoveOrOptions, playersCountParam, timersParam) {
  // Obsługa dwóch stylów wywołania: obiektowego i z parametrami pozycyjnymi
  let currentMove, playersCount, timers;

  if (
    typeof currentMoveOrOptions === "object" &&
    currentMoveOrOptions !== null
  ) {
    // Styl obiektowy: { currentMove, playersCount, timers }
    ({ currentMove, playersCount, timers } = currentMoveOrOptions);
  } else {
    // Styl pozycyjny: currentMove, playersCount, timers
    currentMove = currentMoveOrOptions;
    playersCount = playersCountParam;
    timers = timersParam;
  }

  // 1. Pobieramy listę wszystkich graczy
  const allPlayers = Move_Order.slice(0, playersCount);

  // 2. Jeśli timers nie jest poprawnym obiektem, po prostu przejdź do następnego gracza w kolejności
  if (
    !timers ||
    typeof timers !== "object" ||
    (Array.isArray(timers) && timers.length === 0)
  ) {
    return getNextPlayerInOrder(currentMove, allPlayers);
  }

  // 3. Sprawdź, czy obecny gracz ma czas
  const currentPlayerHasTime = timers[currentMove] > 0;

  // 4. Znajdź graczy z pozostałym czasem
  const playersWithTime = allPlayers.filter((symbol) => timers[symbol] > 0);

  // 5. Jeśli nie ma graczy z czasem, przejdź do dowolnego innego gracza
  if (playersWithTime.length === 0) {
    return getNextPlayerInOrder(currentMove, allPlayers);
  }

  // 6. Jeśli obecny gracz nie ma czasu, znajdź następnego z czasem
  if (!!currentPlayerHasTime) {
    // Znajdź pierwszego gracza po bieżącym, który ma czas
    const currentIndex = allPlayers.indexOf(currentMove);

    // Sprawdź graczy po kolei, zaczynając od następnego
    for (let i = 1; i <= playersCount; i++) {
      const nextIndex = (currentIndex + i) % playersCount;
      const nextSymbol = allPlayers[nextIndex];

      if (timers[nextSymbol] > 0) {
        return nextSymbol;
      }
    }
    // Zabezpieczenie - nie powinniśmy tutaj trafić, jeśli playersWithTime.length > 0
    return playersWithTime[0];
  }

  // 7. Obecny gracz ma czas, znajdź następnego gracza z czasem
  const nextPlayerIndex = getNextIndexWithCondition(
    currentMove,
    playersWithTime,
    (symbol) => true, // Bierzemy wszystkich graczy z czasem
  );

  return playersWithTime[nextPlayerIndex];
}

/**
 * Znajduje następnego gracza w kolejności
 * @param {string} currentPlayer - Aktualny gracz
 * @param {Array} players - Lista graczy
 * @returns {string} Następny gracz
 */
function getNextPlayerInOrder(currentPlayer, players) {
  const currentIndex = players.indexOf(currentPlayer);
  const nextIndex = (currentIndex + 1) % players.length;
  return players[nextIndex];
}

/**
 * Znajduje indeks następnego gracza spełniającego warunek
 * @param {string} currentPlayer - Aktualny gracz
 * @param {Array} players - Lista graczy
 * @param {Function} condition - Funkcja warunku
 * @returns {number} Indeks następnego gracza
 */
function getNextIndexWithCondition(currentPlayer, players, condition) {
  const currentIndex = players.indexOf(currentPlayer);

  // Jeśli aktualnego gracza nie ma na liście, zwróć pierwszego spełniającego warunek
  if (currentIndex === -1) {
    for (let i = 0; i < players.length; i++) {
      if (condition(players[i])) {
        return i;
      }
    }
    return 0;
  }

  // Szukaj następnego po aktualnym
  const nextIndex = (currentIndex + 1) % players.length;
  return nextIndex;
}
