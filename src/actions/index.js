export const types = {
  RESET: 'RESET',
  ADD_PARTICIPANTS: 'ADD_PARTICIPANTS',
  DELETE_PARTICIPANTS: 'DELETE_PARTICIPANTS',
  ACTIVATE_PARTICIPANTS: 'ACTIVATE_PARTICIPANTS',
  DEACTIVATE_PARTICIPANTS: 'DEACTIVATE_PARTICIPANTS',
  SET_BREAK_TIME: 'SET_BREAK_TIME',
  SET_ROUND_TIME: 'SET_ROUND_TIME',
  SET_ROUND_COUNT: 'SET_ROUND_COUNT',
  SET_EST_TIME: 'SET_EST_TIME',
  SET_SCHEDULE: 'SET_SCHEDULE',
  SET_CURRENT_ROUND: 'SET_CURRENT_ROUND',
  SET_START_TIMESTAMP: 'SET_START_TIMESTAMP',
  SET_STATUS: 'SET_STATUS',
  TIMER_ROLLOVER: 'TIMER_ROLLOVER',
  START_TIMER_RUN: 'START_TIMER_RUN',
  TIMER_EXPIRE: 'TIMER_EXPIRE',
  TIMER_RESET: 'TIMER_RESET',
  SET_ELAPSED_SECONDS: 'SET_ELAPSED_SECONDS',
  MUTE_TOGGLE: 'MUTE_TOGGLE',
  // SET_REMAINING_SECONDS: 'SET_REMAINING_SECONDS',

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
  SET_TRAIN_SCHEDULE: 'SET_TRAIN_SCHEDULE',
};

export const resetDB = () => ({ type: types.RESET });

// export const startTimerRun = () => ({ type: types.START_TIMER_RUN });

export const setSchedule = (schedule) => ({
  type: types.SET_SCHEDULE,
  payload: schedule,
});

export const setTrainRoute = (payload) => ({
  type: types.SET_TRAIN_SCHEDULE,
  payload,
});

// export const timerRollover = () => ({ type: types.TIMER_ROLLOVER });
//
// export const resetTimer = () => ({ type: types.TIMER_RESET });

export const setCurrentRound = (round) => ({
  type: types.SET_CURRENT_ROUND,
  payload: round,
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

export const setEstimatedTime = (time) => ({
  type: types.SET_EST_TIME,
  payload: time,
});

// new plan suggests this shouldn't be exposed
export const setStartTime = (stamp) => ({
  type: types.SET_START_TIMESTAMP,
  payload: stamp,
});
//
// export const expireTimer = () => ({ type: types.TIMER_EXPIRE });
//
// export const setElapsedSeconds = (payload) => ({
//   type: types.SET_ELAPSED_SECONDS,
//   payload,
// });

// export const setRemainingSeconds = (payload) => ({ type: types.SET_REMAINING_SECONDS, payload});

export const toggleMute = () => ({ type: types.MUTE_TOGGLE });

export const addLegToSchedule = (payload) => {
  return {
    type: types.LEG_SCHEDULE,
    payload,
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
