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
import timeKeeping from './timeKeepingReducer';

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

// leg related
const createLeg = (legID, legType, settings) => {
  const newLeg = {
    ...legType,
    legType: legType.id,
    ...settings,
    id: legID,
  };
  const newNextLegID = legID + 1;
  return { newLeg, newNextLegID };
};

const updateScheduleWithLegEdits = (
  updatedLeg,
  oldTrainSchedule,
  nextLegID,
) => {
  let newNextLegID = nextLegID;
  const newLegs = oldTrainSchedule.legs.map((l) => {
    if (l.legType === updatedLeg.id) {
      const result = createLeg(newNextLegID, updatedLeg);
      newNextLegID = result.newNextLegID;
      return result.newLeg;
    } else {
      return l;
    }
  });
  return {
    trainSchedule: { ...oldTrainSchedule, legs: newLegs },
    nextLegID: newNextLegID,
  };
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

  const defaultLegTypes = [];
  defaultLegTypes.push(
    createLegType({
      name: 'break',
      id: 1,
      runTime: { h: 0, m: 0, s: 30 },
      color: COLORS.RED,
    }),
  );
  defaultLegTypes.push(
    createLegType({
      name: 'round',
      id: 2,
      runTime: { h: 0, m: 6, s: 0 },
      color: COLORS.LIGHTBLUE,
    }),
  );
  const nextLegTypeID = 3;

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
    nextLegTypeID,
    legTypes: defaultLegTypes,
    trainSchedule: { legs: [] },
    nextLegID: 1,
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
    case types.SET_CURRENT_ROUND:
      return { ...state, currentRound: payload };
    case types.SET_SCHEDULE:
      return { ...state, schedule: payload };
    case types.SET_BREAK_TIME:
      return { ...state, breakDuration: payload };
    case types.SET_ROUND_TIME:
      return { ...state, roundDuration: payload };
    case types.SET_ROUND_COUNT:
      return { ...state, roundCount: validateRoundCount(payload) };
    case types.SET_EST_TIME:
      return state;
    case types.SET_START_TIMESTAMP:
      return { ...state, startTimeStamp: payload || moment() };
    case types.SET_ELAPSED_SECONDS:
      let newRemaining = HMSToSeconds(state.timerDuration) - payload;
      return {
        ...state,
        elapsedSeconds: payload,
        remainingSeconds: isNaN(newRemaining) ? 0 : newRemaining,
      };
    case types.MUTE_TOGGLE:
      return {
        ...state,
        mute: !state.mute,
      };
    case types.LEG_SCHEDULE:
      let newNextLegID = state.nextLegID;
      update = {
        trainSchedule: {
          ...state.trainSchedule,
          legs: [
            ...state.trainSchedule.legs,
            ...payload.legs.map((l) => {
              const selectedLegType = _.find(state.legTypes, function(t) {
                return l.legType === t.id;
              });
              const { newLeg } = createLeg(newNextLegID, selectedLegType);
              newNextLegID = newNextLegID + 1;
              return newLeg;
            }),
          ],
        },
      };
      update.nextLegID = newNextLegID;
      return {
        ...state,
        ...update,
      };
    case types.LEG_UNSCHEDULE:
      update = {
        trainSchedule: {
          ...state.trainSchedule,
          legs: state.trainSchedule.legs.reduce((acc, l) => {
            if (!_.find(payload.legs, (e) => parseInt(e) === l.id)) {
              acc.push(l);
            }
            return acc;
          }, []),
        },
      };
      return {
        ...state,
        ...update,
      };
    case types.LEGTYPE_ADD:
      update = {};
      if (payload.legType) {
        let newLegType = createLegType({
          ...payload.legType,
          id: state.nextLegTypeID,
        });
        update.nextLegTypeID = state.nextLegTypeID + 1;
        update.legTypes = [...state.legTypes, newLegType];
      }
      return {
        ...state,
        ...update,
      };
    case types.LEGTYPE_DELETE:
      update = {};
      update.legTypes = state.legTypes.reduce((acc, l) => {
        if (l.id !== payload.id) {
          acc.push(l);
        }
        return acc;
      }, []);
      update.trainSchedule = {
        ...state.trainSchedule,
        legs: state.trainSchedule.legs.reduce((acc, l) => {
          if (l.legType !== payload.id) {
            acc.push(l);
          }
          return acc;
        }, []),
      };
      return {
        ...state,
        ...update,
      };
    case types.LEGTYPE_EDIT:
      update = {};
      let editedLeg = _.find(state.legTypes, (l) => l.id === payload.id);
      if (!editedLeg) {
        return { ...state };
      }
      editedLeg = { ...editedLeg, ...payload.data };
      editedLeg.label = `${editedLeg.name} ${hourMinuteSecond(
        editedLeg.runTime,
      )}`;
      update.legTypes = state.legTypes.reduce((acc, t) => {
        if (t.id === editedLeg.id) {
          acc.push(editedLeg);
        } else {
          acc.push(t);
        }
        return acc;
      }, []);
      const scheduleUpdateResult = updateScheduleWithLegEdits(
        editedLeg,
        state.trainSchedule,
        state.nextLegID,
      );
      update.trainSchedule = scheduleUpdateResult.trainSchedule;
      update.nextLegID = scheduleUpdateResult.nextLegID;
      return {
        ...state,
        ...update,
      };
    default:
      return state;
  }
};

const reducers = { basicReducer, timeKeeping };

export default combineReducers(reducers);
