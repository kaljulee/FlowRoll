import { useEffect, useState, useCallback } from 'react';
import { getElapsedSeconds } from '../logic';

// start reporting elapsed seconds since start time, on per second
// returns elapsed seconds and a cancel function
// can be provided a number of seconds to self-cancel afterwards
function useElapsedSecondsUpdates(startTime, cancelAfter) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [intervalID, setIntervalID] = useState(undefined);
  // begins interval
  const startUpdates = useCallback(() => {
    setIntervalID(
      setInterval(() => {
        setElapsedSeconds(getElapsedSeconds(startTime));
      }, 1000),
    );
  }, [startTime]);
  // clears interval
  const cancelUpdates = useCallback(
    (id) => {
      clearInterval(id);
      setElapsedSeconds(0);
    },
    [setElapsedSeconds],
  );

  // checks if an interval should be started or canceled
  useEffect(() => {
    if (startTime && !intervalID) {
      startUpdates();
    }
    if (cancelAfter) {
      if (elapsedSeconds > cancelAfter) {
        cancelUpdates(intervalID);
      }
    }
  }, [
    elapsedSeconds,
    cancelAfter,
    cancelUpdates,
    startTime,
    intervalID,
    startUpdates,
  ]);

  return [elapsedSeconds, () => cancelUpdates(intervalID)];
}
