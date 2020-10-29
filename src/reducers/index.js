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
import { getEndTime } from '../helpers/time';

const clearTimer = () => ({
  currentRound: 0,
  startTimeStamp: undefined,
  endTimeStamp: undefined,
  timerDuration: undefined,
  status: STATUS.IDLE,
});

const startTimer = (duration) => {
  const startTimeStamp = moment();
  const endTimeStamp = getEndTime(startTimeStamp, duration);
  return {
    currentRound: 1,
    startTimeStamp,
    status: STATUS.ROUND,
    endTimeStamp,
    timerDuration: duration,
  };
};

const breakToRound = (duration, oldCurrentRound) => {
  const startTimeStamp = moment();
  const endTimeStamp = getEndTime(startTimeStamp, duration);

  return {
    status: STATUS.ROUND,
    startTimeStamp,
    endTimeStamp,
    currentRound: oldCurrentRound + 1,
  };
};

const roundToBreak = (duration) => {
  const startTimeStamp = moment();
  const endTimeStamp = getEndTime(startTimeStamp, duration);
  return {
    status: STATUS.BREAK,
    endTimeStamp,
    startTimeStamp,
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
    roundDuration: { h: 0, m: 0, s: 10 },
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
  console.log('an action was recd ' + type);
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
          update = startTimer(state.roundDuration);
          break;
        case STATUS.BREAK:
          update = breakToRound(state.roundDuration, state.currentRound);
          break;
        case STATUS.ROUND:
          // last round has different behavior
          if (state.roundCount === state.currentRound) {
            update = clearTimer();
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
    case types.START_TIMER_RUN:
      update = startTimer(state.roundDuration);
      return {
        ...state,
        ...update,
      };
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
