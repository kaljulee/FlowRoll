import { combineReducers } from 'redux';
import { types } from '../actions';
import { createParticipant } from '../models/Participant';

const getInitialState = () => {
  const participants = [
    createParticipant('Kalju', 1),
    createParticipant('Rachael', 2),
    createParticipant('Scott', 3),
    createParticipant('Nikos', 4),
  ];

  return {
    participants,
    activeParticipants: [1, 2],
    roundTime: { h: 0, m: 6, s: 0 },
    breakTime: { h: 0, m: 0, s: 30 },
    roundCount: 24,
    currentRound: 0,
    estimatedTime: undefined,
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
      return state;
    case types.DEACTIVATE_PARTICIPANTS:
      return state;
    case types.SET_BREAK_TIME:
      return state;
    case types.SET_ROUND_TIME:
      return state;
    case types.SET_ROUND_COUNT:
      return state;
    case types.SET_EST_TIME:
      return state;
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
