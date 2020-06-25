import { useEffect, useState } from 'react';
import moment from 'moment';

export function useElapsedTime(startTimeStamp) {
  const initialDisplayValue = startTimeStamp
    ? moment().diff(startTimeStamp, 'seconds')
    : 0;
  const [elapsedTime, setElapsedTime] = useState(initialDisplayValue);
  const [activeTimer, setActiveTimer] = useState(null);

  function clearTimer() {
    clearInterval(activeTimer);
    setActiveTimer(null);
    setElapsedTime(0);
  }

  useEffect(() => {
    let intervalID;

    if (startTimeStamp) {
      clearTimer(activeTimer);
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

// export function useRoundCountdown(startTimeStamp, roundTime) {
//   const { elapsedTime, clearTimer, activeTimer } = useTimerCount(
//       startTimeStamp,
//   );
//   const [remainingTime, setRemainingTime] = useState(elapsedTime);
//   useEffect(() => {
//     let remainder = elapsedTime;
//     let h,
//         m,
//         s = 0;
//     if (remainder > 3599) {
//       const overflow = remainder % 3600;
//       h = (remainder - overflow) / 3600;
//       remainder = overflow;
//     }
//     if (remainder > 60) {
//       const overflow = remainder % 60;
//       m = (remainder - overflow) / 60;
//       remainder = overflow;
//     }
//     s = remainder;
//     setRemainingTime({ h, m, s });
//   }, [elapsedTime, roundTime]);
//   return { elapsedTime, clearTimer, activeTimer, remainingTime };
// }
