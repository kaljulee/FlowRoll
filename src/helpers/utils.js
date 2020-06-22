import _ from 'lodash';

export function findMatchUpByID(matchUps, id) {
  return _.find(matchUps, (m) => m.id === id);
}
