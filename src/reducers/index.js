import { combineReducers } from 'redux';
import { types } from '../actions';
import { createParticipant } from '../models/Participant';

const getInitialState = () => {
  const participants = [
    createParticipant('Kalju'),
    createParticipant('Rachael'),
    createParticipant('Scott'),
    createParticipant('Nikos'),
  ];

  return {
    participants,
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
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
