export const types = {
  RESET: 'RESET',
  ADD_PARTICIPANTS: 'ADD_PARTICIPANTS',
  DELETE_PARTICIPANTS: 'DELETE_PARTICIPANTS',
  ACTIVATE_PARTICIPANTS: 'ACTIVATE_PARTICIPANTS',
  DEACTIVATE_PARTICIPANTS: 'DEACTIVATE_PARTICIPANTS',
  MUTE_TOGGLE: 'MUTE_TOGGLE',

  // LEG_TYPE_ADD_SAVED: 'LEG_TYPE_ADD_SAVED',
  // LEG_TYPE_DELETE_SAVED: 'LEG_TYPE_DELETE_SAVED',
  // LEG_TYPE_ADD_TEMP: 'LEG_TYPE_ADD_TEMP',
  // LEG_TYPE_DELETE_TEMP: 'LEG_TYPE_DELETE_TEMP',
  LEG_ADD: 'LEG_ADD',
  LEGTYPE_ADD: 'LEGTYPE_ADD',
  LEGTYPE_DELETE: 'LEGTYPE_DELETE',
  LEGTYPE_EDIT: 'LEGTYPE_EDIT',
  LEG_DELETE: 'LEG_DELETE',
  // LEG_TYPE_SAVED_EDIT: 'LEG_TYPE_EDIT',
  // LEG_TYPE_TEMP_EDIT: 'LEG_TYPE_TEMP_EDIT',
  LEG_EDIT: 'LEG_EDIT',
  LEG_SCHEDULE: 'LEG_SCHEDULE',
  LEG_UNSCHEDULE: 'LEG_UNSCHEDULE',

  SET_TRAIN_ROUTE: 'SET_TRAIN_ROUTE',
  SET_LOCATION: 'SET_LOCATION',
  SET_NAVIGATION_ID: 'SET_NAVIGATION_ID',
  SET_ENGINE_ID: 'SET_ENGINE_ID',
  SET_DEPARTURE_TIME: 'SET_DEPARTURE_TIME',
};

export const resetDB = () => ({ type: types.RESET });

// export const setSchedule = (schedule) => ({
//   type: types.SET_SCHEDULE,
//   payload: schedule,
// });

export const setTrainRoute = (payload) => ({
  type: types.SET_TRAIN_ROUTE,
  payload,
});

export const setLocation = (payload) => ({
  type: types.SET_LOCATION,
  payload,
});

// export const timerRollover = () => ({ type: types.TIMER_ROLLOVER });
//
// export const resetTimer = () => ({ type: types.TIMER_RESET });

// export const setCurrentRound = (round) => ({
//   type: types.SET_CURRENT_ROUND,
//   payload: round,
// });

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
//

// export const setRemainingSeconds = (payload) => ({ type: types.SET_REMAINING_SECONDS, payload});

export const toggleMute = () => ({ type: types.MUTE_TOGGLE });

export const addLegToSchedule = ({ legs }) => {
  return {
    type: types.LEG_SCHEDULE,
    payload: { legs },
  };
};

export const unscheduleLeg = (payload) => {
  return {
    type: types.LEG_UNSCHEDULE,
    payload,
  };
};

export const addLegType = ({ legType }) => {
  return {
    type: types.LEGTYPE_ADD,
    payload: { legType },
  };
};

export const deleteLegType = ({ id }) => {
  return {
    type: types.LEGTYPE_DELETE,
    payload: { id },
  };
};

export const editLegType = ({ id, color, runTime, name }) => {
  return {
    type: types.LEGTYPE_EDIT,
    payload: { id, data: { color, runTime, name } },
  };
};

export const setNavigationID = ({ id }) => {
  return {
    type: types.SET_NAVIGATION_ID,
    payload: { id },
  };
};
