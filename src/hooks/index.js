import { useEffect, useState, useCallback } from 'react';
import {
  getElapsedSeconds,
  freshStartTime,
} from '../logic';
import moment from 'moment';

// start reporting elapsed seconds since start time, on per second
// returns elapsed seconds and a cancel function
// can be provided a number of seconds to self-cancel afterwards
export function useElapsedSecondsUpdates(startTime) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [intervalID, setIntervalID] = useState(undefined);
  const [endTime, setEndTime] = useState(undefined);

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
      // stop interval
      clearInterval(id);
      // clear interval id state
      setIntervalID(undefined);
      // record end time to detect new start times
      setEndTime(moment());
      // setRecordedStartTime(undefined);
      setElapsedSeconds(0);
    },
    [setElapsedSeconds],
  );

  // checks if an interval should be started or canceled
  useEffect(() => {
    // start new interval if there is a new starttime and no active interval
    if (freshStartTime(startTime, endTime) && !intervalID) {
      startUpdates();
    }
  }, [
    elapsedSeconds,
    cancelUpdates,
    startTime,
    intervalID,
    startUpdates,
    endTime,
  ]);

  return { elapsedSeconds, cancel: () => cancelUpdates(intervalID) };
}
