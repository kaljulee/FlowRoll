import { combineReducers } from 'redux';
import { types } from '../actions';
import { createParticipant } from '../models/Participant';
import _ from 'lodash';
import {
  createCompleteCycle,
  createMatchUps,
  participantsByActive,
} from '../helpers/ordering';
import moment from 'moment';
import { STATUS } from '../helpers/utils';
import { getEndTime, HMSToSeconds } from '../helpers/time';

const expireTimer = () => ({
  startTimeStamp: undefined,
  endTimeStamp: undefined,
  timerDuration: undefined,
});

const resetTimer = () => ({
  currentRound: 0,
  status: STATUS.IDLE,
  ...expireTimer(),
});

const startTimer = (duration) => {
  const startTimeStamp = moment();
  const endTimeStamp = getEndTime(startTimeStamp, duration);
  return {
    elapsedSeconds: 0,
    remainingSeconds: HMSToSeconds(duration),
    startTimeStamp,
    endTimeStamp,
    timerDuration: duration,
  };
};

const startTimerRun = (duration) => {
  return {
    currentRound: 1,
    status: STATUS.ROUND,
    ...startTimer(duration),
  };
};

const breakToRound = (duration, oldCurrentRound) => {
  return {
    status: STATUS.ROUND,
    currentRound: oldCurrentRound + 1,
    ...startTimer(duration),
  };
};

const roundToBreak = (duration) => {
  return {
    status: STATUS.BREAK,
    ...startTimer(duration),
  };
};

const getInitialState = () => {
  const participants = [
    createParticipant('Kalju', 1),
    createParticipant('Rachael', 2),
    createParticipant('Scott', 3),
    createParticipant('Nikos', 4),
  ];

  const activeParticipants = [1, 2];
  const sortedParticipants = participantsByActive(
    participants,
    activeParticipants,
  );
  const matchUps = createMatchUps(sortedParticipants.active);
  const schedule = createCompleteCycle(matchUps, sortedParticipants.active);
  return {
    participants,
    activeParticipants,
    roundDuration: { h: 0, m: 0, s: 8 },
    breakDuration: { h: 0, m: 0, s: 5 },
    roundCount: 2,
    currentRound: 0,
    status: STATUS.IDLE,
    schedule,
    // matchUps is currently the same as schedule
    matchUps,
    estimatedTime: undefined,
    startTimeStamp: undefined,
    endTimeStamp: undefined,
    timerDuration: undefined,
  };
};

const basicReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update;
  switch (action.type) {
    case types.RESET:
      console.log('reseting DB');
      return getInitialState();
    case types.ADD_PARTICIPANTS:
      return state;
    case types.ACTIVATE_PARTICIPANTS:
      return {
        ...state,
        activeParticipants: _.uniq([...state.activeParticipants, ...payload]),
      };
    case types.DEACTIVATE_PARTICIPANTS:
      return {
        ...state,
        activeParticipants: _.without(state.activeParticipants, ...payload),
      };
    case types.SET_CURRENT_ROUND:
      return { ...state, currentRound: payload };
    case types.SET_SCHEDULE:
      return { ...state, schedule: payload };
    case types.SET_BREAK_TIME:
      return state;
    case types.SET_ROUND_TIME:
      return state;
    case types.SET_ROUND_COUNT:
      return state;
    case types.SET_EST_TIME:
      return state;
    case types.SET_START_TIMESTAMP:
      return { ...state, startTimeStamp: payload || moment() };
    case types.TIMER_ROLLOVER:
      // actions broken down by status type
      switch (state.status) {
        case STATUS.IDLE:
          update = startTimerRun(state.roundDuration);
          break;
        case STATUS.BREAK:
          update = breakToRound(state.roundDuration, state.currentRound);
          break;
        case STATUS.ROUND:
          // last round has different behavior
          if (state.roundCount === state.currentRound) {
            update = resetTimer();
          } else {
            update = roundToBreak(state.breakDuration);
          }
          break;
        default:
          break;
      }
      return {
        ...state,
        ...update,
      };
    case types.TIMER_EXPIRE:
      update = expireTimer();
      return {
        ...state,
        ...update,
      };
    case types.START_TIMER_RUN:
      update = startTimerRun(state.roundDuration);
      return {
        ...state,
        ...update,
      };
    case types.SET_ELAPSED_SECONDS:
      return {
        ...state,
        elapsedSeconds: payload,
        remainingSeconds: HMSToSeconds(state.timerDuration) - payload,
      };
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
