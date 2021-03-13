import thunk from 'redux-thunk';
import { setLocation } from './index';
import {
  getElapsedSeconds,
  createMap,
  getLocation,
  getTimeInLocation,
  getLocationByID,
  createEngine,
  createEngineCycle,
} from '../logic';
import moment from 'moment';
import {
  setScopeID,
  setEngineID,
  setMap,
  setElapsedSeconds,
  setEngine,
} from '../actions';
import { getRouteTypeByID } from '../helpers/utils';
import { getPhaseColor, PHASES } from '../models/Gears';

// this will store interval id in state, call updates to position and current start time

//this is where the train engine is
// train should not get started unless all navigational data is present
// data check can happen here

export function startTrain() {
  return function(dispatch, getState) {
    // setup thunk environment
    const state = getState();
    const {
      navigation: { departureTime, map },
    } = state;

    ///////////////////////////////////////////////////
    // begin making checks every second for position
    const scope = setInterval(() => {
      // check location;
      const elapsedSeconds = getElapsedSeconds(departureTime);
      dispatch(updatePosition(elapsedSeconds));
      dispatch(setElapsedSeconds(elapsedSeconds));
    }, 1000);
    //
    //////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    // setting engine cutoff time, will be calculated from map total run time
    const buffer = 1;
    const engine = setTimeout(() => {
      console.log('TIMEOUT shutting down nav sensors');
      clearInterval(scope);
      dispatch(resetNavData());
    }, (map.totalRunTime + buffer) * 1000);
    // clear old data
    dispatch(resetNavData());
    // record engine and scope id's
    dispatch(setEngineID({ id: engine }));
    dispatch(setScopeID({ id: scope }));
  };
}
// todo hasn't been tested
// export function stopTrain() {
//   return function(dispatch, getState) {
//     const {
//       navigation: { scopeID, engineID },
//     } = getState();
//     clearInterval(scopeID);
//     clearTimeout(engineID);
//     console.log('thunk clearning id and dispatching to store ' + scopeID);
//     dispatch(setScopeID(undefined));
//   };
// }

function updatePosition(elapsedSeconds) {
  return function(dispatch, getState) {
    const {
      navigation: { location, map },
    } = getState();
    if (!map || !map.locations) {
      console.log('missing map or map data');
      return;
    }
    const newLocation = getLocation(elapsedSeconds, map);
    if (newLocation !== location) {
      dispatch(setLocation(newLocation));
    }
  };
}

export function resetNavData() {
  return function(dispatch, getState) {
    dispatch(setElapsedSeconds(0));
    dispatch(setLocation(0));
  };
}

export function timeInLocation() {
  return function(dispatch, getState) {
    const {
      navigation: { elapsedSeconds, map, location },
    } = getState();
    const locationData = getLocationByID(map.locations, location);
    return getTimeInLocation(elapsedSeconds, locationData);
  };
}

export function createAndSetMap() {
  return function(dispatch, getState) {
    const {
      trainSchedule: { routes },
      groundRobin: { engine },
    } = getState();
    const theEngine = engine;
    dispatch(setMap(createMap(routes, theEngine)));
  };
}

export function createAnnotatedMap() {
  return function(dispatch, getState) {
    const {
      trainSchedule: { routeTypes },
      navigation: { map },
    } = getState();
    return {
      ...map,
      locations: map.locations.map((m) => {
        const locationData = { ...getRouteTypeByID(routeTypes, m.routeType) };
        const phase = {
          color: getPhaseColor(m.phase),
          name: PHASES[m.phase],
          label: PHASES[m.phase],
        };
        if (!locationData.color && phase.color) {
          locationData.color = phase.color;
        }
        // todo only doing name right now, not label.  need to revisit this
        if (!locationData.name) {
          locationData.name = phase.name;
        }
        const { color, name, label } = locationData;
        return {
          ...m,
          color,
          name,
          label,
        };
      }),
    };
  };
}

// todo seems like a duplicate
// function generateEngineCycle() {
//   return function(dispatch, getState) {
//     console.log('in generateEngineCycle');
//     // console.log(getState().groundRobin);
//     console.log('groundrobin from store looking for crrc');
//     console.log(getState().groundRobin);
//     console.log('lllll');
//     return getState().groundRobin.completeRRCycle;
//   };
// }

export function createAndSetEngine() {
  return function(dispatch, getState) {
    const {
      groundRobin: { warmUp, coolDown, completeRRCycle, workTime },
    } = getState();
    const createdEngine = createEngine({
      engineCycle: createEngineCycle({
        floorStates: completeRRCycle,
        warmUp,
        coolDown,
        workTime,
      }),
    });
    dispatch(setEngine(createdEngine));
  };
}
