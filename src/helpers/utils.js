import _ from 'lodash';

export const STATUS = {
  IDLE: 'IDLE',
  ROUND: 'ROUND',
  BREAK: 'BREAK',
}

export function findMatchUpByID(matchUps, id) {
  return _.find(matchUps, (m) => m.id === id);
}
