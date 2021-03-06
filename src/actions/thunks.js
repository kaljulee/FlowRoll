import { setStartTime, types } from './index';
import thunk from 'redux-thunk';
import { setLocation } from './index';
import {
  getElapsedSeconds,
  createMap,
  getLocation,
  getTimeInLocation,
} from '../logic';
import moment from 'moment';
import { HMSToSeconds } from '../helpers/time';
import { setScopeID, setEngineID, setMap, setElapsedSeconds } from '../actions';

export function testThunk() {
  return function(dispatch, getState) {
    const theState = getState();
    // console.log('state in thunk');
    // console.log(theState);
  };
}

// this will store interval id in state, call updates to position and current start time

//this is where the train engine is
// train should not get started unless all navigational data is present
// data check can happen here

export function startTrain() {
  return function(dispatch, getState) {
    console.log('in start train thunk');
    // setup thunk environment
    const state = getState();
    const {
      // trainSchedule: { route },
      navigation: { departureTime, route },
    } = state;
    // spoofing runTime for now

    const map = createMap(route);

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
    // setting engine cutoff time, will be calculated from total route
    const buffer = 1;
    const engine = setTimeout(() => {
      console.log('TIMEOUT shutting down nav sensors');
      clearInterval(scope);
      dispatch(resetNavData());
    }, (map.totalRunTime + buffer) * 1000);
    // clear old data
    dispatch(resetNavData());

    dispatch(setMap(map));
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
      navigation: { location, route, map },
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
    const locationData = map.locations[location];
    return getTimeInLocation(elapsedSeconds, locationData);
  };
}
