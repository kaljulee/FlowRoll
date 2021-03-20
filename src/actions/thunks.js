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
  setShutOffID,
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
    const shutOff = setTimeout(() => {
      console.log('TIMEOUT shutting down nav sensors');
      clearInterval(scope);
      dispatch(resetNavData());
    }, (map.totalRunTime + buffer) * 1000);
    // clear old data
    dispatch(resetNavData());
    // record engine and scope id's
    dispatch(setShutOffID({ id: shutOff }));
    dispatch(setScopeID({ id: scope }));
  };
}


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

export function createAndSetEngine() {
  return function(dispatch, getState) {
    const {
      groundRobin: { warmUp, coolDown, completeRRCycle, work },
    } = getState();
    // todo this should use an editable saved engine cycle from GR, not just the completeRRCycle
    const createdEngine = createEngine({
      cycleMatchUpIDs: completeRRCycle,
      warmUp,
      coolDown,
      work,
    });
    dispatch(setEngine(createdEngine));
  };
}
