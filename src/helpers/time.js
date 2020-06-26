export function HourMinuteSecond(time) {
  const { h, m, s } = time;
  return `${h}:${m}${s}`;
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
