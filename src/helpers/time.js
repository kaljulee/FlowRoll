export function HourMinuteSecond(time) {
  const { h, m, s } = time;
  return `${h}:${m}${s}`;
}

export const ZERO_TIME = { h: 0, m: 0, s: 0 };
