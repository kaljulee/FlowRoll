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
import navigation from './navigationReducer';
import trainSchedule from './trainScheduleReducer';

function validateRoundCount(payload) {
  const payloadAsInt = parseInt(payload);
  return payloadAsInt;
}

// common recipes
//timer related

// // const expireTimer = () => ({
// //   startTimeStamp: undefined,
// //   endTimeStamp: undefined,
// //   timerDuration: undefined,
// //   remainingSeconds: 0,
// // });
// //
// // const resetTimer = () => ({
// //   currentRound: 0,
// //   status: STATUS.IDLE,
// //   ...expireTimer(),
// // });
// //
// // const startTimer = (duration) => {
// //   const startTimeStamp = moment();
// //   const endTimeStamp = getEndTime(startTimeStamp, duration);
// //   return {
// //     elapsedSeconds: 0,
// //     remainingSeconds: HMSToSeconds(duration),
// //     startTimeStamp,
// //     endTimeStamp,
// //     timerDuration: duration,
// //   };
// // };
//
// const startTimerRun = (duration) => {
//   return {
//     currentRound: 1,
//     status: STATUS.ROUND,
//     ...startTimer(duration),
//   };
// };
//
// const breakToRound = (duration, oldCurrentRound) => {
//   return {
//     status: STATUS.ROUND,
//     currentRound: oldCurrentRound + 1,
//     ...startTimer(duration),
//   };
// };
//
// const roundToBreak = (duration) => {
//   return {
//     status: STATUS.BREAK,
//     ...startTimer(duration),
//   };
// };

// participant related
const mergeActiveParticipants = (oldParticipants, newParticipants) =>
  _.uniq([...oldParticipants, ...newParticipants]);

const updateParticipantMatchUps = (participants, activeParticipants) => {
  const update = {};
  const sortedParticipants = participantsByActive(
    participants,
    activeParticipants,
  );
  update.matchUps = createMatchUps(sortedParticipants.active);
  update.completeRRCycle = createCompleteRRCycle(
    update.matchUps,
    sortedParticipants.active,
  );
  // schedule defaults to same as rr cycle
  update.schedule = update.completeRRCycle;
  // defaults round count to complete cycle
  update.roundCount = update.completeRRCycle.length;
  return update;
};


//////////////////////////

const createSecondSliderConversion = () => {
  const secondsByValue = [];
  let remainingPoints = 0;
  let seconds = 0;
  while (remainingPoints < 30) {
    if (remainingPoints > 23) {
      seconds += 240;
    }
    if (remainingPoints > 17) {
      seconds += 120;
    } else if (remainingPoints > 11) {
      seconds += 60;
    } else if (remainingPoints > 5) {
      seconds += 30;
    } else {
      seconds += 10;
    }
    remainingPoints += 1;
    secondsByValue.push(seconds);
  }
  return { secondsByValue };
};

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
  const completeRRCycle = createCompleteRRCycle(
    matchUps,
    sortedParticipants.active,
  );



  return {
    participants,
    nextParticipantID: 5,
    activeParticipants,
    roundDuration: { h: 0, m: 0, s: 8 },
    breakDuration: { h: 0, m: 0, s: 5 },
    roundCount: 2,
    currentRound: 0,
    status: STATUS.IDLE,
    schedule: completeRRCycle,
    // matchUps is currently the same as schedule
    matchUps,
    completeRRCycle,
    mute: true,

    secondSliderConverter: createSecondSliderConversion(),
  };
};

const basicReducer = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update;
  switch (action.type) {
    case types.RESET:
      console.log('reseting DB');
      return getInitialState();
    case types.ADD_PARTICIPANTS:
      let update = {};
      let newNextParticipantID = state.nextParticipantID;
      const newParticipants = payload.participants.map((p) => {
        const newP = { ...p, id: newNextParticipantID };
        newNextParticipantID = newNextParticipantID + 1;
        return newP;
      });
      update.participants = [...state.participants, ...newParticipants];
      update.nextParticipantID = newNextParticipantID;
      if (payload.activate) {
        update.activeParticipants = mergeActiveParticipants(
          state.activeParticipants,
          newParticipants.map((p) => p.id),
        );
      }
      return {
        ...state,
        ...update,
      };
    case types.DELETE_PARTICIPANTS:
      update = {};
      update.activeParticipants = _.without(
        state.activeParticipants,
        ...payload,
      );
      update.participants = state.participants.reduce((acc, p) => {
        if (!_.find(payload, (o) => o === p.id)) {
          acc.push(p);
        }
        return acc;
      }, []);
      return {
        ...state,
        ...update,
      };
    case types.ACTIVATE_PARTICIPANTS:
      // merge in new active participants
      update = {
        activeParticipants: mergeActiveParticipants(
          state.activeParticipants,
          payload,
        ),
      };
      // update matchups
      update = {
        ...update,
        ...updateParticipantMatchUps(
          state.participants,
          update.activeParticipants,
        ),
      };
      return {
        ...state,
        ...update,
      };
    case types.DEACTIVATE_PARTICIPANTS:
      // filter out deactivated participants
      update = {
        activeParticipants: _.without(state.activeParticipants, ...payload),
      };
      // update matchups
      update = {
        ...update,
        ...updateParticipantMatchUps(
          state.participants,
          update.activeParticipants,
        ),
      };
      return {
        ...state,
        ...update,
      };
    case types.SET_SCHEDULE:
      return { ...state, schedule: payload };
    case types.SET_BREAK_TIME:
      return { ...state, breakDuration: payload };
    case types.SET_ROUND_TIME:
      return { ...state, roundDuration: payload };
    case types.SET_ROUND_COUNT:
      return { ...state, roundCount: validateRoundCount(payload) };
    case types.MUTE_TOGGLE:
      return {
        ...state,
        mute: !state.mute,
      };

    default:
      return state;
  }
};

const reducers = { basicReducer, navigation, trainSchedule, };

export default combineReducers(reducers);
