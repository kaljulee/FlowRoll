import { types } from '../actions';
import { createRouteLabel, createRouteType, spoutRoute } from '../models/Route';
import { hourMinuteSecond } from '../helpers/time';
import { COLORS } from '../constants/styleValues';
import _ from 'lodash';
import { getRouteByID, getRouteTypeByID } from '../helpers/utils';
import { Gears } from '../models/Gears';

const updateScheduleWithRouteEdits = (updatedRoute, routes, nextRouteID) => {
  let newNextRouteID = nextRouteID;
  const newRoutes = routes.map((l) => {
    if (l.routeType === updatedRoute.id) {
      const result = spoutRoute({
        id: newNextRouteID,
        routeType: updatedRoute,
      });
      newNextRouteID = newNextRouteID + 1;
      return result;
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
      gear: Gears.FULL_CYCLE,
    }),
  );
  defaultRouteTypes.push(
    createRouteType({
      name: 'warmup',
      id: 2,
      runTime: 5,
      color: COLORS.LIGHTBLUE,
      gear: Gears.NEUTRAL,
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
      console.warn('reseting trainschedule DB');
      return getInitialState();
    case types.ROUTE_SCHEDULE:
      let newNextRouteID = state.nextRouteID;
      const newRoutes = payload.routes.map((l) => {
        const selectedRouteType = getRouteTypeByID(
          state.routeTypes,
          l.routeType,
        );

        const newRoute = spoutRoute({
          routeType: selectedRouteType,
          id: newNextRouteID,
        });
        newNextRouteID = newNextRouteID + 1;
        return newRoute;
      });
      update = {
        routes: [...state.routes, ...newRoutes],
      };
      update.nextRouteID = newNextRouteID;
      return {
        ...state,
        ...update,
      };
    case types.ROUTE_UNSCHEDULE:
      update = {
        routes: state.routes.reduce((acc, l) => {
          if (!getRouteByID(payload.routes, l.id)) {
            acc.push(l);
          }
          return acc;
        }, []),
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

      update.routes = state.routes.reduce((acc, l) => {
        if (l.routeType !== payload.id) {
          acc.push(l);
        }
        return acc;
      }, []);
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
      editedRoute.label = createRouteLabel({
        name: editedRoute.name,
        runTime: editedRoute.runTime,
        editedRoute: editedRoute.gear,
      });
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
