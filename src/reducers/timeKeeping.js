
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
