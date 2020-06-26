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
    if (!startTimeStamp) {
        console.log('no start time');
        return 0;
    }
  const elapsedHMS = secondsToHMS(elapsedTime);
  const endTime = moment(startTimeStamp).add(moment.duration(timeDuration));
  if (elapsedTime % 5 === 0) {
    console.group('useCOuntDown');
    console.log('startTime: ' + moment(startTimeStamp).format('hh:mm:ss'));
    console.log('timeDuration');
    console.log(timeDuration);
    console.log('endTime: ' + endTime.format('hh:mm:ss'));
    console.groupEnd();
  }
}
