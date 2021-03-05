import { types } from '../actions';
import { createLegType } from '../models/Leg';
import { hourMinuteSecond } from '../helpers/time';
import { COLORS } from '../constants/styleValues';
import _ from 'lodash';

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

const updateScheduleWithLegEdits = (updatedLeg, legs, nextLegID) => {
  let newNextLegID = nextLegID;
  const newLegs = legs.map((l) => {
    if (l.legType === updatedLeg.id) {
      const result = createLeg(newNextLegID, updatedLeg);
      newNextLegID = result.newNextLegID;
      return result.newLeg;
    } else {
      return l;
    }
  });
  return {
    newLegs,
    nextLegID: newNextLegID,
  };
};

const getInitialState = () => {
  const defaultLegTypes = [];
  defaultLegTypes.push(
    createLegType({
      name: 'break',
      id: 1,
      runTime: { h: 0, m: 0, s: 3 },
      color: COLORS.RED,
    }),
  );
  defaultLegTypes.push(
    createLegType({
      name: 'round',
      id: 2,
      runTime: { h: 0, m:0 , s: 5 },
      color: COLORS.LIGHTBLUE,
    }),
  );
  const nextLegTypeID = 3;

  return {
    defaultLegTypes,
    nextLegTypeID,
    nextLegID: 1,
    legs: [],
    legTypes: defaultLegTypes,
    trainScheduleTest: true,
  };
};

const trainSchedule = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {    case types.RESET:
    console.log('reseting trainschedule DB');
    return getInitialState();
    case types.LEG_SCHEDULE:
      let newNextLegID = state.nextLegID;
      console.log('in reducer, payload');
      console.log(payload);
      payload.legs.forEach((l) => console.log('leg'));
      const newLegs = payload.legs.map((l) => {

        // console.log('el');
        // console.log(l);
        // state.legTypes.forEach(t => console.log(t.id));

        const selectedLegType = _.find(state.legTypes, function(t) {
           console.log('looking for legtype ' + l.legType);
          return l.legType === t.id;
        });
        // return l;

        const { newLeg } = createLeg(newNextLegID, selectedLegType);
        newNextLegID = newNextLegID + 1;
        return newLeg;
      });
      update = {
        legs: [...state.legs, ...newLegs],
        //   ...state.legs,
        //   ...payload.legs.map((l) => {
        //     console.log('mapping leg');
        //     console.log(l);
        //     const selectedLegType = _.find(state.legTypes, function(t) {
        //       return l.legType === t.id;
        //     });
        //     const { newLeg } = createLeg(newNextLegID, selectedLegType);
        //     newNextLegID = newNextLegID + 1;
        //     return newLeg;
        //   }),
        // ],
      };
      update.nextLegID = newNextLegID;
      return {
        ...state,
        ...update,
      };
    case types.LEG_UNSCHEDULE:
      update = {
        // trainSchedule: {
        legs: state.legs.reduce((acc, l) => {
          if (!_.find(payload.legs, (e) => parseInt(e) === l.id)) {
            acc.push(l);
          }
          return acc;
        }, []),
        // },
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
      update = {
        legs: state.legs.reduce((acc, l) => {
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
        state.legs,
        state.nextLegID,
      );
      update.legs = scheduleUpdateResult.newLegs;
      // update.trainSchedule = scheduleUpdateResult.trainSchedule;
      update.nextLegID = scheduleUpdateResult.nextLegID;
      return {
        ...state,
        ...update,
      };
    default:
      return state;
  }
};

export default trainSchedule;
