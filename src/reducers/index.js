import { combineReducers } from 'redux';
import moment from 'moment';
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
    roundTime: moment.duration(6, 'minutes'),
    breakTime: moment.duration(30, 'seconds'),
    roundCount: 24,
    currentRound: 0,
    estimatedTime: undefined,
  };
};


const basicReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  console.log('an action was recd ' + type);
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = { basicReducer };

export default combineReducers(reducers);
