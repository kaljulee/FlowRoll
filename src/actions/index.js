export const types = {
  RESET: 'RESET',
  ADD_PARTICIPANTS: 'ADD_PARTICIPANTS',
  DELETE_PARTICIPANTS: 'DELETE_PARTICIPANTS',
  ACTIVATE_PARTICIPANTS: 'ACTIVATE_PARTICIPANTS',
  DEACTIVATE_PARTICIPANTS: 'DEACTIVATE_PARTICIPANTS',
  MUTE_TOGGLE: 'MUTE_TOGGLE',

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
  SET_ENGINE_ID: 'SET_ENGINE_ID',
  SET_DEPARTURE_TIME: 'SET_DEPARTURE_TIME',
  SET_MAP: 'SET_MAP',
  SET_ELAPSED_SECONDS: 'SET_ELAPSED_SECONDS',
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

export const setBreakTime = (time) => ({
  type: types.SET_BREAK_TIME,
  payload: time,
});

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

export const setEngineID = ({ id }) => {
  return {
    type: types.SET_ENGINE_ID,
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

export const editRouteType = ({ id, color, runTime, name }) => {
  return {
    type: types.ROUTETYPE_EDIT,
    payload: { id, data: { color, runTime, name } },
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
