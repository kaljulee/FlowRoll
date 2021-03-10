import { combineReducers } from 'redux';
import { types } from '../actions';
import navigation from './navigationReducer';
import trainSchedule from './trainScheduleReducer';
import groundRobin from './groundRobinReducer';

const getInitialState = () => {
  return { mute: true };
};

const basicReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update;
  switch (type) {
    case types.RESET:
      console.log('reseting DB');
      return getInitialState();
    case types.MUTE_TOGGLE:
      return {
        ...state,
        mute: !state.mute,
      };

    default:
      return state;
  }
};

const reducers = { basicReducer, navigation, trainSchedule, groundRobin };

export default combineReducers(reducers);
