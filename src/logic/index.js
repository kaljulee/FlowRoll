import moment from 'moment';
import _ from 'lodash';
import { createSegment } from '../models/Segment';
import { PHASE_COLORS, PHASES } from '../models/Gears';
import { createLocation, NOWHERE } from '../models/Location';
import { Gears } from '../models/Gears';
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

const ZERO_PROCESS = (route, id) => {
  return {
    segments: [
      createSegment({ runTime: route.runTime, routeType: route.routeType, id }),
    ],
    nextID: id + 1,
  };
};

export const ZERO_ENGINE = {
  settings: { name: 'ZERO' },
  runEngine: (route, id) => ZERO_PROCESS(route, id),
};

function segmentsFromEngineCycle(engineCycle, id) {
  const { floorStates, work, warmUp, coolDown } = engineCycle;
  const { WARMUP, COOLDOWN, WORK } = PHASES;
  let nextID = id;
  const segments = floorStates.reduce((acc, s) => {
    const phaseColors = PHASE_COLORS();
    if (warmUp > 0) {
      acc.push(
        createSegment({
          label: 'warmup',
          name: 'warmup',
          phase: WARMUP,
          color: phaseColors[WARMUP],
          runTime: warmUp,
          id: nextID,
          floorState: s,
        }),
      );
      nextID += 1;
    }
    acc.push(
      createSegment({
        phase: WORK,
        label: 'round',
        name: 'round',
        runTime: work,
        color: phaseColors[WORK],
        id: nextID,
        floorState: s,
      }),
    );
    nextID += 1;
    if (coolDown > 0) {
      acc.push(
        createSegment({
          phase: COOLDOWN,
          color: phaseColors[COOLDOWN],
          name: 'cool down',
          label: 'cooldown',
          runTime: coolDown,
          id: nextID,
          floorState: s,
        }),
      );
      nextID += 1;
    }
    return acc;
  }, []);
  return { segments, nextID };
}

const _runEngine = (engineCycle, route, id) => {
  switch (route.gear) {
    case Gears.NEUTRAL:
      return ZERO_PROCESS(route, id);
    case Gears.FULL_CYCLE:
      const cycleSegments = segmentsFromEngineCycle(engineCycle, id);
      return cycleSegments;
    case Gears.TRUNCATE:
      //todo logic to fill out segements based on matchups up until time is called
      // todo this is here to prevent crashes, remove later
      return ZERO_PROCESS(route, id);
    case Gears.SHRINK_TO_FIT:
      // todo this is here to prevent crashes, remove later
      return ZERO_PROCESS(route, id);
    default:
      // console.log('no gear detected, going netural');
      return ZERO_PROCESS(route, id);
  }
};

export const createEngine = (settings) => {
  const { floorStates, warmUp, coolDown, work, name } = settings;

  // const { engineCycle } = settings;
  // console.log(engineCycle);
  const engineCycle = createEngineCycle(settings);
  const engine = {
    settings,
    runEngine: (route, id) => {
      const runResult = _runEngine(engineCycle, route, id);
      return runResult;
    },
  };
  return engine;
};

// convert a route into an array of segments
export function extractSegments(engine, route, id) {
  if (engine && engine.runEngine) {
    const segmentData = engine.runEngine(route, id);
    return segmentData;
  }
  // otherwise return empty segment array, original id
  return { segments: [], nextID: id };
}

// takes an array of routes and runTime (defaults to zero)
// provides ids to the segments
export function flattenRoutesIntoSegments(routes, engine = ZERO_ENGINE) {
  const flattened = [];
  let totalRunTime = 0;
  // this is where segmentID gets defined
  let segmentID = 1;
  // for each route, convert to segments and update runTime
  routes.forEach((l) => {
    const segmentData = extractSegments(engine, l, segmentID);
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
    const newLocationData = createLocation(s, totalRunTime);
    locations.push(newLocationData.location);
    totalRunTime = newLocationData.totalRunTime;
  });
  return { totalRunTime, locations };
}

export function createMap(routes, engine) {
  const segmentData = flattenRoutesIntoSegments(routes, engine);
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
      console.warn('error - missing location');
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
    console.warn('no location data, returning NaN');
    return Number.NaN;
  }
  if (elaspedSeconds < locationData.offset) {
    // console.warn('should not have arrived at location, returning NaN');
    return Number.NaN;
  }
  // offset adjusts the elapsedSeconds in this location to start at zero
  return elaspedSeconds - locationData.offset;
}

export function sumRouteRunTimes(routes, engine) {
  return flattenRoutesIntoSegments(routes, engine).totalRunTime;
}

export function createSecondSliderConversion() {
  const secondsByValue = [];
  let remainingPoints = 0;
  let seconds = 0;
  while (remainingPoints < 30) {
    if (remainingPoints > 23) {
      seconds += 240;
    }
    if (remainingPoints > 17) {
      seconds += 120;
    } else if (remainingPoints > 11) {
      seconds += 60;
    } else if (remainingPoints > 5) {
      seconds += 30;
    } else {
      seconds += 10;
    }
    remainingPoints += 1;
    secondsByValue.push(seconds);
  }
  return { secondsByValue };
}

export function createEngineCycle({
  floorStates,
  work,
  warmUp,
  coolDown,
  roundCount,
}) {
  return {
    roundCount,
    floorStates,
    work,
    warmUp: cleanPhaseTime(warmUp),
    coolDown: cleanPhaseTime(coolDown),
  };
}

export function cleanPhaseTime(time) {
  if (isNaN(time)) {
    return 0;
  }
  return parseInt(time);
}

export function cleanWorkValue(v) {
  if (isNaN(v) || v === 0) {
    return 1;
  } else {
    return v;
  }
}
