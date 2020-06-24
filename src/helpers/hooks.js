import { useEffect, useState } from 'react';
import moment from 'moment';

export function useTimerDisplay(startTimeStamp) {
  const initialDisplayValue = startTimeStamp
    ? moment().diff(startTimeStamp, 'seconds')
    : 0;
  const [displayTime, setDisplayTime] = useState(initialDisplayValue);
  const [activeTimer, setActiveTimer] = useState(null);

  function clearTimer() {
    clearInterval(activeTimer);
    setActiveTimer(null);
    setDisplayTime(0);
  }

  useEffect(() => {
    let intervalID;

    if (startTimeStamp) {
      clearTimer(activeTimer);
      intervalID = setInterval(() => {
        const timeDiff = moment().diff(startTimeStamp, 'seconds');
        setDisplayTime(timeDiff);
      }, 1000);
      setActiveTimer(intervalID);
    }
    return () => {
      setActiveTimer(null);
      clearInterval(intervalID);
    };
  }, [startTimeStamp]);

  return { displayTime, clearTimer, activeTimer };
}
