export const types = {
  RESET: 'RESET',
  ADD_PARTICIPANTS: 'ADD_PARTICIPANTS',
  ACTIVATE_PARTICIPANTS: 'ACTIVATE_PARTICIPANTS',
  DEACTIVATE_PARTICIPANTS: 'DEACTIVATE_PARTICIPANTS',
  SET_BREAK_TIME: 'SET_BREAK_TIME',
  SET_ROUND_TIME: 'SET_ROUND_TIME',
  SET_ROUND_COUNT: 'SET_ROUND_COUNT',
  SET_EST_TIME: 'SET_EST_TIME',
};

export const resetDB = () => ({ type: types.RESET });

export const addParticipants = (participants) => ({
  type: types.ADD_PARTICIPANTS,
  data: participants,
});

export const activateParticipants = (participants) => ({
  type: types.ACTIVATE_PARTICIPANTS,
  data: participants,
});

export const deactivateParticipants = (participants) => ({
  type: types.DEACTIVATE_PARTICIPANTS,
  data: participants,
});

export const setBreakTime = (time) => ({
  type: types.SET_BREAK_TIME,
  data: time,
});

export const setRoundTime = (time) => ({
  type: types.SET_ROUND_TIME,
  data: time,
});

export const setRoundCount = (count) => ({
  type: types.SET_ROUND_COUNT,
  data: count,
});

export const setEstimatedTime = (time) => ({
  type: types.SET_EST_TIME,
  data: time,
});
