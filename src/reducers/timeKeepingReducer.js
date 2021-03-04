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
import { STATUS } from '../helpers/utils';
import { getEndTime, HMSToSeconds, hourMinuteSecond } from '../helpers/time';
import { createLegType } from '../models/Leg';
import { COLORS } from '../constants/styleValues';

const getInitialState = () => {
  return {
    startTime: undefined,
    totalStartTime: undefined,
    timeKeepingTest: true,
    location: undefined,
    route: [],
  };
};

const timeKeeping = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {
    case types.SET_TRAIN_ROUTE:
      // console.log('in train reducer');
      // console.log(payload.route);
      update.route = payload.route;
      return { ...state, ...update };
    case types.SET_START_TIMESTAMP:
      update.startTime = payload.startTime;
      return { ...state, ...update };
    case types.SET_LOCATION:
      update.location = payload.location;
      return { ...state, ...update };
    case types.SET_NAVIGATION_ID:
      update.navigationID = payload.id;
      return { ...state, ...update };
    default:
      return state;
  }
};

export default timeKeeping;
