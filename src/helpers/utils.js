import _ from 'lodash';

export const STATUS = {
  IDLE: 'IDLE',
  ROUND: 'ROUND',
  BREAK: 'BREAK',
};

export function findMatchUpByID(matchUps, id) {
  return _.find(matchUps, (m) => m.id === id);
}

export function findParticipantByID(participants, id) {
  return _.find(participants, (p) => p.id === id);
}

export function printSchedule(schedule, matchUps) {
  const named = schedule.map((s) => {
    const m = findMatchUpByID(matchUps, s);
    return `${m.p1.name} & ${m.p2.name}`;
  });
  console.log(schedule);
  console.log(matchUps);
  console.log(JSON.stringify(named, null, 4));
}

export function getRouteTypeByID(routeTypes, id) {
  return _.find(routeTypes, function(t) {
    return id === t.id;
  });
}
