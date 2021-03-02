import moment from 'moment';

export function getElapsedSeconds(startTime) {
  return moment().diff(startTime, 'seconds');
}

// check if startTime is new by comparing it to the endTime of the last interval
export function freshStartTime(startTime, endTime) {
  // no startTime is considered stale - might need to revisit this
  // this must be checked before allowing no-endTime to default to fresh start
  if (!startTime) {
    return false;
  }
  // if no endTime is provided, startTime is considered new
  if (!endTime) {
    return true;
  }
  return startTime.isAfter(endTime);
}
