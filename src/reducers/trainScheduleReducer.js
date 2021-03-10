import { types } from '../actions';
import { createRouteType } from '../models/Route';
import { hourMinuteSecond } from '../helpers/time';
import { COLORS } from '../constants/styleValues';
import _ from 'lodash';
import { getRouteTypeByID } from '../helpers/utils';

// route related
const createRoute = (routeID, routeType, settings) => {
  const newRoute = {
    ...routeType,
    routeType: routeType.id,
    ...settings,
    id: routeID,
  };
  const newNextRouteID = routeID + 1;
  return { newRoute, newNextRouteID };
};

const updateScheduleWithRouteEdits = (updatedRoute, routes, nextRouteID) => {
  let newNextRouteID = nextRouteID;
  const newRoutes = routes.map((l) => {
    if (l.routeType === updatedRoute.id) {
      const result = createRoute(newNextRouteID, updatedRoute);
      newNextRouteID = result.newNextRouteID;
      return result.newRoute;
    } else {
      return l;
    }
  });
  return {
    newRoutes,
    nextRouteID: newNextRouteID,
  };
};

const getInitialState = () => {
  const defaultRouteTypes = [];
  defaultRouteTypes.push(
    createRouteType({
      name: 'roll',
      id: 1,
      runTime: 3,
      color: COLORS.RED,
    }),
  );
  defaultRouteTypes.push(
    createRouteType({
      name: 'warmup',
      id: 2,
      runTime: 5,
      color: COLORS.LIGHTBLUE,
    }),
  );
  const nextRouteTypeID = 3;

  return {
    defaultRouteTypes,
    nextRouteTypeID,
    nextRouteID: 1,
    routes: [],
    routeTypes: defaultRouteTypes,
    trainScheduleTest: true,
  };
};

const trainSchedule = (state = getInitialState(), action) => {
  const { type, payload } = action;
  let update = {};
  switch (type) {
    case types.RESET:
      console.log('reseting trainschedule DB');
      return getInitialState();
    case types.ROUTE_SCHEDULE:
      let newNextRouteID = state.nextRouteID;
      console.log('in reducer, payload');
      console.log(payload);
      payload.routes.forEach((l) => console.log('route'));
      const newRoutes = payload.routes.map((l) => {
        // console.log('el');
        // console.log(l);
        // state.routeTypes.forEach(t => console.log(t.id));

        const selectedRouteType = getRouteTypeByID(state.routeTypes, l.routeType);
        //     _.find(state.routeTypes, function(t) {
        //    console.log('looking for routetype ' + l.routeType);
        //   return l.routeType === t.id;
        // });
        // return l;

        const { newRoute } = createRoute(newNextRouteID, selectedRouteType);
        newNextRouteID = newNextRouteID + 1;
        return newRoute;
      });
      update = {
        routes: [...state.routes, ...newRoutes],
        //   ...state.routes,
        //   ...payload.routes.map((l) => {
        //     console.log('mapping route');
        //     console.log(l);
        //     const selectedRouteType = _.find(state.routeTypes, function(t) {
        //       return l.routeType === t.id;
        //     });
        //     const { newRoute } = createRoute(newNextRouteID, selectedRouteType);
        //     newNextRouteID = newNextRouteID + 1;
        //     return newRoute;
        //   }),
        // ],
      };
      update.nextRouteID = newNextRouteID;
      return {
        ...state,
        ...update,
      };
    case types.ROUTE_UNSCHEDULE:
      update = {
        // trainSchedule: {
        routes: state.routes.reduce((acc, l) => {
          if (!_.find(payload.routes, (e) => parseInt(e) === l.id)) {
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
    case types.ROUTETYPE_ADD:
      update = {};
      if (payload.routeType) {
        let newRouteType = createRouteType({
          ...payload.routeType,
          id: state.nextRouteTypeID,
        });
        update.nextRouteTypeID = state.nextRouteTypeID + 1;
        update.routeTypes = [...state.routeTypes, newRouteType];
      }
      return {
        ...state,
        ...update,
      };
    case types.ROUTETYPE_DELETE:
      update = {};
      update.routeTypes = state.routeTypes.reduce((acc, l) => {
        if (l.id !== payload.id) {
          acc.push(l);
        }
        return acc;
      }, []);
      update = {
        routes: state.routes.reduce((acc, l) => {
          if (l.routeType !== payload.id) {
            acc.push(l);
          }
          return acc;
        }, []),
      };
      return {
        ...state,
        ...update,
      };
    case types.ROUTETYPE_EDIT:
      update = {};
      let editedRoute = _.find(state.routeTypes, (l) => l.id === payload.id);
      if (!editedRoute) {
        return { ...state };
      }
      editedRoute = { ...editedRoute, ...payload.data };
      editedRoute.label = `${editedRoute.name} ${hourMinuteSecond(
        editedRoute.runTime,
      )}`;
      update.routeTypes = state.routeTypes.reduce((acc, t) => {
        if (t.id === editedRoute.id) {
          acc.push(editedRoute);
        } else {
          acc.push(t);
        }
        return acc;
      }, []);
      const scheduleUpdateResult = updateScheduleWithRouteEdits(
        editedRoute,
        state.routes,
        state.nextRouteID,
      );
      update.routes = scheduleUpdateResult.newRoutes;
      // update.trainSchedule = scheduleUpdateResult.trainSchedule;
      update.nextRouteID = scheduleUpdateResult.nextRouteID;
      return {
        ...state,
        ...update,
      };
    default:
      return state;
  }
};

export default trainSchedule;
