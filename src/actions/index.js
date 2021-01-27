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
  // SET_REMAINING_SECONDS: 'SET_REMAINING_SECONDS',
};

export const resetDB = () => ({ type: types.RESET });

export const startTimerRun = () => ({ type: types.START_TIMER_RUN });

export const setSchedule = (schedule) => ({
  type: types.SET_SCHEDULE,
  payload: schedule,
});

export const timerRollover = () => ({ type: types.TIMER_ROLLOVER });

export const resetTimer = () => ({ type: types.TIMER_RESET});

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
const setStartTimeStamp = (stamp) => ({
  type: types.SET_START_TIMESTAMP,
  payload: stamp,
});

export const expireTimer = () => ({ type: types.TIMER_EXPIRE });

export const setElapsedSeconds = (payload) => ({type: types.SET_ELAPSED_SECONDS, payload});

// export const setRemainingSeconds = (payload) => ({ type: types.SET_REMAINING_SECONDS, payload});
