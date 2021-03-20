import _ from 'lodash';

// export const STATUS = {
//   IDLE: 'IDLE',
//   ROUND: 'ROUND',
//   BREAK: 'BREAK',
// };

export function findMatchUpByID(matchUps, id) {
  return _.find(matchUps, (m) => m.id === id);
}

export function findParticipantByID(participants, id) {
  return _.find(participants, (p) => p.id === id);
}

export function getRouteTypeByID(routeTypes, id) {
  return _.find(routeTypes, function(t) {
    return id === t.id;
  });
}

export function getRouteByID(routes, id) {
  return _.find(routes, (e) => parseInt(e) === id);
}
