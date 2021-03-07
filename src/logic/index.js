import moment from 'moment';
import { HMSToSeconds } from '../helpers/time';
import _ from 'lodash';
import { NOWHERE } from '../models/Location';

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

// convert a leg into an array of segments
export function extractSegments(leg, id) {
  // assumes the incoming id is valid
  let tempID = id;
  // if the leg has a runtime, treat it as a segment
  if (leg.runTime) {
    return {
      segments: [{ runTime: leg.runTime, legType: leg.legType, id }],
      nextID: id + 1,
    };
  }
  // if a leg has segments, use the array of segments
  if (leg.segments) {
    return leg.segments.map((s) => {
      const newSegment = { ...s, legType: leg.LegType, id: tempID };
      tempID = tempID + 1;
      return newSegment;
    });
  }
  // otherwise return empty segment array, original id
  return { segments: [], nextID: id };
}

// takes an array of legs and runTime (defaults to zero)
// provides ids to the segments
export function flattenLegsIntoSegments(legs, incomingRunTime = 0) {
  const flattened = [];
  let totalRunTime = incomingRunTime;
  // this is where segmentID gets defined
  let segmentID = 1;
  // for each leg, convert to segments and update runTime
  legs.forEach((l) => {
    const segmentData = extractSegments(l, segmentID);
    segmentData.segments.forEach((s) => {
      totalRunTime += s.runTime;
      flattened.push(s);
    });
    segmentID = segmentData.nextID;
  });
  return { segments: flattened, totalRunTime };
}

export function createLocations(segments, offset = 0) {
  let totalRunTime = offset;
  const locations = [];
  segments.forEach((s) => {
    locations.push({
      ...s,
      offset: totalRunTime,
    });
    totalRunTime = totalRunTime + s.runTime;
  });
  return { totalRunTime, locations };
}

export function createMap(routes) {

  const segmentData = flattenLegsIntoSegments(routes);
  const locationData = createLocations(segmentData.segments);
  return locationData;
}

export function getLocation(elapsedSeconds, map) {
  let location = null;
  // NOWHERE location if time is outside of map
  if (elapsedSeconds > map.totalRunTime) {
    return 0;
  }
  for (let i = 0; i < map.locations.length; i += 1) {
    location = map.locations[i];
    // NOWHERE location if location can't be found
    if (!location) {
      console.log('error - missing location');
      return 0;
    }
    // if this is the last location, return it
    if (!map.locations[i + 1]) {
      return location.id;
    }
    // if this location is before the next cutoff, return it
    if (elapsedSeconds - 1 < map.locations[i + 1].offset) {
      return location.id;
    }
  }
}

export function getLocationByID(locations, id) {
  const currentLocation = _.find(locations, function(l) {
    return id === l.id;
  });
  if (!currentLocation) {
    return NOWHERE;
  }
  return currentLocation;
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
