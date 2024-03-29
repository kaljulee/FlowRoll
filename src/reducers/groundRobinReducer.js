import _ from 'lodash';
import { createParticipant } from '../models/Participant';
import {
  createCompleteRRCycle,
  createMatchUps,
  participantsByActive,
} from '../helpers/ordering';
import { cleanWorkValue, createSecondSliderConversion, ZERO_ENGINE} from '../logic';
import { types } from '../actions';

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
    cycle: completeRRCycle,
    matchUps,
    completeRRCycle,
    secondSliderConverter: createSecondSliderConversion(),
    engine: ZERO_ENGINE,
    warmUp: 3,
    work: 5,
    coolDown: 2,
    chamberCount: 1,
  };
};

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
  // cycle defaults to same as rr cycle
  update.cycle = update.completeRRCycle;
  // defaults round count to complete cycle
  update.roundCount = update.completeRRCycle.length;
  return update;
};

//////////////////////////

const groundRobin = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {
    case types.RESET:
      console.warn('reseting groundRobin DB');
      return getInitialState();
    case types.ADD_PARTICIPANTS:
      let update = {};
      let newNextParticipantID = state.nextParticipantID;
      const newParticipants = payload.participants.map((p) => {
        const newP = createParticipant(p.name, newNextParticipantID);
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
    case types.SET_ENGINE:
      return { ...state, engine: payload };
    case types.SET_WARMUP:
      update.warmUp = payload;
      return { ...state, ...update };
    case types.SET_COOLDOWN:
      update.coolDown = payload;
      return { ...state, ...update };
    case types.SET_ROUND_COUNT:
      // todo this can be complicated
      return { ...state, ...update };
    case types.SET_WORK:
      update.work = cleanWorkValue(payload);
      return { ...state, ...update };
    case types.SET_CHAMBER_COUNT:
      console.warn(
        'not actually setting chamber count till algorithm imporved',
      );
      return { ...state, chamberCount: 1 };
    case types.SET_PHASE_TIMES:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default groundRobin;
