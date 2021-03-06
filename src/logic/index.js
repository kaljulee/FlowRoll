import moment from 'moment';
import { HMSToSeconds } from '../helpers/time';

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
  return moment(startTime).isAfter(endTime);
}

export function extractSegments(routeSegment) {
  if (routeSegment.runTime) {
    return [{ runTime: routeSegment.runTime }];
  }
  if (routeSegment.segments) {
    return routeSegment.segments;
  }
  return [];
}

export function flattenLegsIntoSegments(legs, incomingRunTime = 0) {
  const flattened = [];
  let totalRunTime = incomingRunTime;
  legs.forEach((l) => {
    const segments = extractSegments(l);
    segments.forEach((s) => {
      totalRunTime += s.runTime;
      flattened.push(l);
    });
  });
  return { segments: flattened, totalRunTime };
}

export function createLocations(segments, offset = 0) {
  let totalRunTime = offset;
  const locations = [];
  segments.forEach((s) => {
    locations.push({ ...s, offset: totalRunTime });
    totalRunTime = totalRunTime + s.runTime;
  });
  return { totalRunTime, locations };
}

export function createMap(route) {
  const locations = [];
  let totalRunTime = 0;
  route.forEach((rSegment) => {
    const extractedSegments = extractSegments(rSegment);
    const locationData = createLocations(extractedSegments, totalRunTime);
    locations.push(...locationData.locations);
    totalRunTime = locationData.totalRunTime;
  });
  return { locations, totalRunTime };
}

export function getLocation(elapsedSeconds, map) {
  let location = null;
  if (elapsedSeconds > map.totalRunTime) {
    return location;
  }
  for (let i = 0; i < map.locations.length; i += 1) {
    location = map.locations[i];

    // if this is the last location, return it
    if (!map.locations[i + 1]) {
      return i;
    }
    // if this location is before the next cutoff, return it
    if (elapsedSeconds - 1 < map.locations[i + 1].offset) {
      return i;
    }
  }
}

export function getTimeInLocation(elaspedSeconds, locationData) {
  if (!locationData) {
    console.log('no location data, returning NaN');
    return Number.NaN;
  }
  if (elaspedSeconds < locationData.offset) {
    console.log('should not have arrived at location, returning NaN');
    return Number.NaN;
  }
  // offset adjusts the elapsedSeconds in this location to start at zero
  return elaspedSeconds - locationData.offset;
}

export function sumLegRunTimes(legs) {
  return flattenLegsIntoSegments(legs).totalRunTime;
}
