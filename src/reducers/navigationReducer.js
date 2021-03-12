import { combineReducers } from 'redux';
import { types } from '../actions';
import { createParticipant } from '../models/Participant';
import _ from 'lodash';
import {
  createCompleteRRCycle,
  createMatchUps,
  participantsByActive,
} from '../helpers/ordering';
import moment from 'moment';
import { getEndTime, HMSToSeconds, hourMinuteSecond } from '../helpers/time';
import { createRouteType } from '../models/Route';
import { COLORS } from '../constants/styleValues';

const getInitialState = () => {
  return {
    departureTime: undefined,
    totalStartTime: undefined,
    timeKeepingTest: true,
    location: undefined,
    scopeID: undefined,
    elapsedSeconds: 0,
    map: { locations: [], totalRunTime: 0 },
  };
};

const navigation = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {
    case types.RESET:
      console.warn('reseting navigation DB');
      return getInitialState();
    case types.SET_DEPARTURE_TIME:
      update.departureTime = payload;
      return { ...state, ...update };
    case types.SET_LOCATION:
      update.location = payload;
      return { ...state, ...update };
    case types.SET_SCOPE_ID:
      update.scopeID = payload.id;
      return { ...state, ...update };
    case types.SET_MAP:
      update.map = payload;
      return { ...state, ...update };
    case types.SET_ELAPSED_SECONDS:
      update.elapsedSeconds = payload;
      return { ...state, ...update };
    default:
      return state;
  }
};

export default navigation;
