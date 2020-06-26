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
