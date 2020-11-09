import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { hourMinuteSecond, secondsToHMS, checkTimerExpiry } from './time';

export function useElapsedTime(startTimeStamp, endTimeStamp) {
  const initialDisplayValue = startTimeStamp
    ? moment().diff(startTimeStamp, 'seconds')
    : 0;
  const [elapsedTime, setElapsedTime] = useState(initialDisplayValue);
  const [activeTimer, setActiveTimer] = useState(null);

  // cancel interval and reset elapsedTime
  const resetTimer = useCallback((intervalID) => {
    clearInterval(intervalID);
    setElapsedTime(0);
    setActiveTimer(null);
  }, []);

  // start a timer
  useEffect(() => {
    let intervalID;
    if (startTimeStamp && moment().isBefore(endTimeStamp) && !activeTimer) {
      intervalID = setInterval(() => {
        const timeDiff = moment().diff(startTimeStamp, 'seconds');
        setElapsedTime(timeDiff);
      }, 1000);
      setActiveTimer(intervalID);
    }
  }, [activeTimer, resetTimer, startTimeStamp, endTimeStamp]);

  // remove expired timer.  resetTimer logic maybe could be moved into here?
  useEffect(() => {
    if (activeTimer && moment().isAfter(endTimeStamp)) {
      resetTimer(activeTimer);
    }
  }, [activeTimer, elapsedTime, endTimeStamp, resetTimer]);

  return { elapsedTime, resetTimer };
}

export function useCountDown(elapsedTime, startTimeStamp, endTime) {
  const [remainingSeconds, setRemainingSeconds] = useState(
    moment(endTime).diff(startTimeStamp, 'seconds'),
  );

  useEffect(() => {
    if (!startTimeStamp) {
      console.log('no start time');
      if (remainingSeconds !== 0) {
        setRemainingSeconds(0);
      }
    } else if (moment().isAfter(endTime)) {
      if (remainingSeconds !== 0) {
        setRemainingSeconds(0);
      }
    } else {
      const timeDiff =
        moment(endTime).diff(startTimeStamp, 'seconds') - elapsedTime;
      if (timeDiff >= 0) {
        setRemainingSeconds(timeDiff);
      }
    }
  }, [elapsedTime, remainingSeconds, startTimeStamp, endTime]);
  return hourMinuteSecond(secondsToHMS(remainingSeconds));
}

// export function useEndTime(startTimeStamp, roundDuration) {
//   const [endTime, setEndTime] = useState(
//     getEndTime(startTimeStamp, roundDuration),
//   );
//   useEffect(() => {
//     setEndTime(getEndTime(startTimeStamp, roundDuration));
//   }, [startTimeStamp, roundDuration]);
//
//   return endTime;
// }

export function useTimerExpired(endTime, elapsedTime) {
  const [expired, setExpired] = useState(checkTimerExpiry(endTime));
  useEffect(() => {
    setExpired(checkTimerExpiry(endTime));
  }, [endTime, elapsedTime]);
  return expired;
}
