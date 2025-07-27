import { useEffect, useState } from "react";

export function useNow(interval, enabled) {
  const [now, setNow] = useState();
  useEffect(() => {
    if (!enabled) {
      setNow(undefined);
      return;
    }
    const inter = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(inter);
    };
  }, [interval, enabled]);
  return now;
}

export function useInterval(interval, enabled, cb) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Natychmiastowe wywołanie callbacka aby sprawdzić stan timera
    cb(Date.now());

    // Sprawdzaj timer co 100ms dla lepszej responsywności
    // ale aktualizuj UI zgodnie z zadanym interwałem
    const checkInterval = Math.min(interval, 100); // Sprawdzaj co 100ms lub rzadziej, jeśli interval jest mniejszy
    const inter = setInterval(() => {
      cb(Date.now());
    }, checkInterval);

    return () => {
      clearInterval(inter);
    };
  }, [interval, enabled, cb]);
}
