import {combineReducers} from 'redux';

const getInitialState = () => {
  return {
    players: [],
    roundTime: 'no round time',
    breakTime: 'no breakTime',
    roundCount: 0,
    currentRound: 'no current round',
    estimatedTime: 'no est time',
  };
};

// const resetState = () => {
// }

const basicReducer = (state = getInitialState(), action) => {
  const {type, payload} = action;
  console.log('an action was recd ' + type);
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = {basicReducer};

export default combineReducers(reducers);
