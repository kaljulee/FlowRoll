import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { secondsToHMS } from './time';

export function useElapsedTime(startTimeStamp) {
  const initialDisplayValue = startTimeStamp
    ? moment().diff(startTimeStamp, 'seconds')
    : 0;
  const [elapsedTime, setElapsedTime] = useState(initialDisplayValue);
  const [activeTimer, setActiveTimer] = useState(null);

  const clearTimer = useCallback(() => {
    clearInterval(activeTimer);
    setActiveTimer(null);
    setElapsedTime(0);
  }, [activeTimer]);

  useEffect(() => {
    let intervalID;
    if (startTimeStamp) {
      intervalID = setInterval(() => {
        const timeDiff = moment().diff(startTimeStamp, 'seconds');
        setElapsedTime(timeDiff);
      }, 1000);
      setActiveTimer(intervalID);
    }
    return () => {
      setActiveTimer(null);
      clearInterval(intervalID);
    };
  }, [startTimeStamp]);

  return { elapsedTime, clearTimer, activeTimer };
}

export function useCountDown(elapsedTime, startTimeStamp, timeDuration) {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  if (!startTimeStamp) {
    console.log('no start time');
    if (remainingSeconds !== 0) {
      setRemainingSeconds(0);
    }
  }
  // const elapsedHMS = secondsToHMS(elapsedTime);
  const endTime = moment(startTimeStamp).add(moment.duration(timeDuration));

  if (moment().isAfter(endTime)) {
    console.log('moment has passed');
    if (remainingSeconds !== 0) {
      setRemainingSeconds(0);
    }
  }

  useEffect(() => {
    const timeDiff =
      moment(endTime).diff(startTimeStamp, 'seconds') - elapsedTime;
    if (timeDiff >= 0) {
      setRemainingSeconds(timeDiff);
    }
  }, [elapsedTime, endTime, startTimeStamp]);

  return remainingSeconds;
}
