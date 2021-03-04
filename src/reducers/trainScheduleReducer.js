import { types } from '../actions';
const getInitialState = () => {
  return {
    route: [],
    trainScheduleTest: true,
  };
};

const trainSchedule = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {
    case types.SET_TRAIN_ROUTE:
      // console.log('in train reducer');
      // console.log(payload.route);
      update.route = payload.route;
      return { ...state, ...update };
    default:
      return state;
  }
};

export default trainSchedule;
