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
    roundTime: { h: 0, m: 6, s: 0 },
    breakTime: { h: 0, m: 0, s: 30 },
    roundCount: 24,
    currentRound: 0,
    schedule,
    // matchUps is currently the same as schedule
    matchUps,
    estimatedTime: undefined,
    startTimeStamp: undefined,
  };
};

const basicReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  console.log('an action was recd ' + type);
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
      return { ...state, startTimeStamp: payload };
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
