import { setStartTime, types } from './index';
import thunk from 'redux-thunk';
import { setLocation } from './index';
import { getElapsedSeconds } from '../logic';
import moment from 'moment';
import { HMSToSeconds } from '../helpers/time';
import { setScopeID, setEngineID } from '../actions';

export function testThunk() {
  return function(dispatch, getState) {
    const theState = getState();
    console.log('state in thunk');
    console.log(theState);
  };
}

// this will store interval id in state, call updates to position and current start time

//this is where the train engine is
// train should not get started unless all navigational data is present
// data check can happen here

//starting and stopping the train should not be inherently destructive to data
// the position relative to the overall picture may be required
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
    // also totalTime
    // kind of dangerous because runtime is seconds, totalTime is ms
    console.log('route');
    console.log(route);
    // todo runtime needs to become in seconds
    route.forEach((l) => {
      console.log(l.label);
    });
    // todo route needs to be converted to periods

    const totalRunTime = true
      ? 5
      : route.reduce((acc, p) => {
          return acc + HMSToSeconds(p.runTime);
        }, 0);

    // const periods = legs.reduce((acc, l) => {
    //   return [...acc, ...l.periodTable];
    // }, []);
    // console.log('periods');
    // console.log(periods);
    // const runTime = 4;
    // const totalTime = 5000;
    // console.log('rrr route rrr');
    // console.log(route);
    // if (!startTime) {
    //   console.log('no start time, no start');
    //   return;
    // }

    ///////////////////////////////////////////////////
    // begin making checks every second for position
    const scope = setInterval(() => {
      // check location;
      const elapsedSeconds = getElapsedSeconds(departureTime);
      dispatch(updatePosition(elapsedSeconds));
    }, 1000);
    //
    //////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
    // setting engine cutoff time, will be calculated from total route
    const engine = setTimeout(() => {
      console.log('TIMEOUT shutting down nav sensors');
      clearInterval(scope);
    }, totalRunTime * 1000);
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
      navigation: { location, route, itinerary },
    } = getState();
    console.log('in updatePOsition');
    console.log('this is the end of the data chain // // // //')
    console.log(elapsedSeconds);
    console.log(route);
    console.log(itinerary);
    console.log('////');

    // todo logic is required here to deal with position changes.
    //  todo should position be by mapping out entire route, or counting off periods?
    // todo map out route, then sample time to determine correct store update
    // todo store update will be the location, which determines the period.
    // todo periods have startSecond
    // todo periods require an ordering, because they're startSeconds are dependent on each other
    // if (elapsedSeconds > HMSToSeconds(route.RunTime)) {
    //   dispatch(setLocation(location + 1));
    // }
  };
}
