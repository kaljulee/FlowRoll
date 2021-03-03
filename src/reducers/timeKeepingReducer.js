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
    timeKeepingTest: true,
  };
};

const timeKeeping = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  // console.log('in timekeeping reducer');
  // console.log(payload);
  switch (type) {
    case types.SET_START_TIMESTAMP:
      update.startTime = payload.startTime;
      return { ...state, ...update };
    default:
      return state;
  }
};

export default timeKeeping;
