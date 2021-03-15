import { cleanPhaseTime } from '../logic';

export const types = {
  RESET: 'RESET',
  ADD_PARTICIPANTS: 'ADD_PARTICIPANTS',
  DELETE_PARTICIPANTS: 'DELETE_PARTICIPANTS',
  ACTIVATE_PARTICIPANTS: 'ACTIVATE_PARTICIPANTS',
  DEACTIVATE_PARTICIPANTS: 'DEACTIVATE_PARTICIPANTS',
  MUTE_TOGGLE: 'MUTE_TOGGLE',

  SET_WORK: 'SET_WORK',
  SET_COOLDOWN: 'SET_COOLDOWN',
  SET_WARMUP: 'SET_WARMUP',
  SET_ROUND_COUNT: 'SET_ROUND_COUNT',
  SET_CHAMBER_COUNT: 'SET_CHAMBER_COUNT',

  // these converted from route to route while commented out
  // ROUTE_TYPE_ADD_SAVED: 'ROUTE_TYPE_ADD_SAVED',
  // ROUTE_TYsPE_DELETE_SAVED: 'ROUTE_TYPE_DELETE_SAVED',
  // ROUTE_TYPE_ADD_TEMP: 'ROUTE_TYPE_ADD_TEMP',
  // ROUTE_TYPE_DELETE_TEMP: 'ROUTE_TYPE_DELETE_TEMP',
  ROUTE_ADD: 'ROUTE_ADD',
  ROUTETYPE_ADD: 'ROUTETYPE_ADD',
  ROUTETYPE_DELETE: 'ROUTETYPE_DELETE',
  ROUTETYPE_EDIT: 'ROUTETYPE_EDIT',
  ROUTE_DELETE: 'ROUTE_DELETE',
  // ROUTE_TYPE_SAVED_EDIT: 'ROUTE_TYPE_EDIT',
  // ROUTE_TYPE_TEMP_EDIT: 'ROUTE_TYPE_TEMP_EDIT',
  ROUTE_EDIT: 'ROUTE_EDIT',
  ROUTE_SCHEDULE: 'ROUTE_SCHEDULE',
  ROUTE_UNSCHEDULE: 'ROUTE_UNSCHEDULE',

  SET_LOCATION: 'SET_LOCATION',
  SET_SCOPE_ID: 'SET_SCOPE_ID',
  SET_SHUTOFF_ID: 'SET_SHUTOFF_ID',
  SET_DEPARTURE_TIME: 'SET_DEPARTURE_TIME',
  SET_MAP: 'SET_MAP',
  SET_ELAPSED_SECONDS: 'SET_ELAPSED_SECONDS',
  SET_ENGINE: 'SET_ENGINE',
  SET_PHASE_TIMES: 'SET_PHASE_TIMES',
  SET_ZERO_ENGINE: 'SET_ZERO_ENGINE',
};

export const resetDB = () => ({ type: types.RESET });

export const setLocation = (payload) => ({
  type: types.SET_LOCATION,
  payload,
});

export const addParticipants = (participants) => ({
  type: types.ADD_PARTICIPANTS,
  payload: participants,
});

export const deleteParticipants = (participants) => ({
  type: types.DELETE_PARTICIPANTS,
  payload: participants,
});

export const activateParticipants = (participants) => ({
  type: types.ACTIVATE_PARTICIPANTS,
  payload: participants,
});

export const deactivateParticipants = (participants) => ({
  type: types.DEACTIVATE_PARTICIPANTS,
  payload: participants,
});

export const setChamberCount = (payload) => {
  return {
    type: types.SET_CHAMBER_COUNT,
    payload,
  };
};
export const setPhaseTimes = ({ warmUp, coolDown, work }) => {
  const payload = {
    warmUp: cleanPhaseTime(warmUp),
    coolDown: cleanPhaseTime(coolDown),
    work: cleanPhaseTime(work),
  };
  return {
    type: types.SET_PHASE_TIMES,
    payload,
  };
};

export const setRoundTime = (time) => ({
  type: types.SET_ROUND_TIME,
  payload: time,
});

export const setRoundCount = (count) => ({
  type: types.SET_ROUND_COUNT,
  payload: count,
});

export const setDepartureTime = (payload) => {
  return {
    type: types.SET_DEPARTURE_TIME,
    payload,
  };
};

export const setZeroEngine = () => {
  return {
    type: types.SET_ZERO_ENGINE,
  }
}

export const setShutOffID = ({ id }) => {
  return {
    type: types.SET_SHUTOFF_ID,
    payload: { id },
  };
};

export const setMap = (payload) => {
  return {
    type: types.SET_MAP,
    payload,
  };
};
//

// export const setRemainingSeconds = (payload) => ({ type: types.SET_REMAINING_SECONDS, payload});

export const toggleMute = () => ({ type: types.MUTE_TOGGLE });

export const addRouteToSchedule = ({ routes }) => {
  return {
    type: types.ROUTE_SCHEDULE,
    payload: { routes },
  };
};

export const unscheduleRoute = (payload) => {
  return {
    type: types.ROUTE_UNSCHEDULE,
    payload,
  };
};

export const addRouteType = ({ routeType }) => {
  return {
    type: types.ROUTETYPE_ADD,
    payload: { routeType },
  };
};

export const deleteRouteType = ({ id }) => {
  return {
    type: types.ROUTETYPE_DELETE,
    payload: { id },
  };
};

export const editRouteType = ({ id, color, runTime, name, gear }) => {
  return {
    type: types.ROUTETYPE_EDIT,
    payload: { id, data: { color, runTime, name, gear } },
  };
};

export const setScopeID = ({ id }) => {
  return {
    type: types.SET_SCOPE_ID,
    payload: { id },
  };
};

export const setElapsedSeconds = (payload) => {
  return {
    type: types.SET_ELAPSED_SECONDS,
    payload,
  };
};

export const setEngine = (payload) => {
  return {
    type: types.SET_ENGINE,
    payload,
  };
};
