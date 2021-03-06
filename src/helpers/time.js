import moment from 'moment';

export function hourMinuteSecond(time) {
  const { h, m, s } = time;
  const hString = !h ? '' : `${h}:`;
  const mString = `${m < 10 ? '0' : ''}${m}:`;
  const sString = `${s < 10 ? '0' : ''}${s}`;
  return `${hString}${mString}${sString}`;
}

export const ZERO_TIME = { h: 0, m: 0, s: 0 };

function pullTime(total, unit) {
  if (total > unit - 1) {
    const overflow = total % unit;
    const trackedTime = total - overflow;
    return { tracked: trackedTime / unit, untracked: overflow };
  }
  return { tracked: 0, untracked: total };
}

export function HMSToSeconds(hms) {
  if (!hms || isNaN(hms.h) || isNaN(hms.m) || isNaN(hms.s)) {
    return;
  }
  return hms.h * 3600 + hms.m * 60 + hms.s;
}

export function secondsToHMS(time) {
  let untrackedTime = time;

  const pulledHours = pullTime(untrackedTime, 3600);
  const h = pulledHours.tracked;
  untrackedTime = pulledHours.untracked;

  const pulledMinutes = pullTime(untrackedTime, 60);
  const m = pulledMinutes.tracked;
  const s = pulledMinutes.untracked;
  return { h, m, s };
}

export function getEndTime(startTimeStamp, timeDuration) {
  return moment(startTimeStamp).add(moment.duration(timeDuration));
}

export function checkTimerExpiry(endTime) {
  const now = moment();
  return now.isAfter(moment(endTime));
}

// should no longer be necessary to sum HMSs, will be done as ints
// export function sumHMS(times) {
//   return times.reduce((acc, t) => {
//     let newSeconds = acc.s + t.s;
//     let newMinutes = Math.floor(newSeconds / 60);
//     newSeconds = newSeconds % 60;
//     newMinutes = newMinutes + acc.m + t.m;
//     let newHours = Math.floor(newMinutes / 60);
//     newMinutes = newMinutes % 60;
//     newHours = newHours + acc.h + t.h;
//     let newTime = { h: newHours, m: newMinutes, s: newSeconds };
//     return newTime;
//   }, ZERO_TIME);
// }
