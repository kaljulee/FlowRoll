import moment from 'moment';

export function getElapsedSeconds(startTime) {
  return moment().diff(startTime, 'seconds');
}
