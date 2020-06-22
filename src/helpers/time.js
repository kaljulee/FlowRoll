export function HourMinuteSecond(time) {
  const { h, m, s } = time;
  return `${h}:${m}${s}`;
}
