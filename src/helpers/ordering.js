import { createMatchUp } from '../models/MatchUp';
import { findMatchUpByID } from './utils';
import _ from 'lodash';

export function createMatchUps(participants) {
  return participants.reduce(
    (acc, p) => {
      const pMatchups = [];
      const remainingParticipants = _.slice(acc.remaining, 1);
      remainingParticipants.forEach((uke) =>
        pMatchups.push(createMatchUp(p, uke)),
      );
      return {
        matchUps: [...acc.matchUps, ...pMatchups],
        remaining: remainingParticipants,
      };
    },
    { matchUps: [], remaining: participants },
  ).matchUps;
}

function somethingSkipped(frequency) {
  return _.includes(frequency, 0);
}

function createFrequencyMap(array) {
  return array.reduce((acc, p) => {
    const newAcc = { ...acc };
    newAcc[p.id] = 0;
    return newAcc;
  }, {});
}

function leastFrequentMatchUpID(matchUps, matchUpFrequency) {
  return matchUps.reduce((acc, m) => {
    if (acc === -1) {
      return m.id;
    }
    if (matchUpFrequency[m.id] < matchUpFrequency[acc]) {
      return m.id;
    }
    return acc;
  }, -1);
}

function filterOnRecentParticipants(
  matchUps,
  lastMatchUp,
  participantFrequency,
) {
  if (!lastMatchUp) {
    return matchUps;
  }
  // try avoiding a participant going twice in a row
  let filteredResults = _.filter(
    matchUps,
    (m) =>
      m.p1.id !== lastMatchUp.p1.id &&
      m.p1.id !== lastMatchUp.p2.id &&
      m.p2.id !== lastMatchUp.p1.id &&
      m.p2.id !== lastMatchUp.p2.id,
  );
  if (filteredResults.length !== 0) {
    return filteredResults;
  }
  // if one must be repeated, try to use less frequent participant
  const moreFrequentParticipant =
    participantFrequency[lastMatchUp.p1.id] <
    participantFrequency[lastMatchUp.p2.id]
      ? lastMatchUp.p2.id
      : lastMatchUp.p1.id;

  filteredResults = _.filter(
    matchUps,
    (m) =>
      m.p1.id !== moreFrequentParticipant.id &&
      m.p2.id !== moreFrequentParticipant.id,
  );
  if (filteredResults.length !== 0) {
    return filteredResults;
  }
  // if this still filters out all matchups, return all
  return matchUps;
}

export function createCompleteCycle(matchUps, participants) {
  // return value
  const schedule = [];

  // track what matchups have not been included
  let remainingMatchUps = [...matchUps];

  // create frquency maps
  const participantFrequency = createFrequencyMap(participants);
  const matchUpFrequency = createFrequencyMap(matchUps);

  // track last matchup included
  let lastMatchUp;

  // while there are still unused matchups, continue to iterate
  while (Object.values(remainingMatchUps).length > 0) {
    // find valid next-matchups
    let availableMatchUps = filterOnRecentParticipants(
      remainingMatchUps,
      lastMatchUp,
      participantFrequency,
    );
    const nextMatchUpID = leastFrequentMatchUpID(
      availableMatchUps,
      matchUpFrequency,
    );

    //////////////////////////////
    // update data trackers
    schedule.push(nextMatchUpID);
    lastMatchUp = { ...findMatchUpByID(matchUps, nextMatchUpID) };
    // update frequency maps
    matchUpFrequency[nextMatchUpID] += 1;
    const { p1, p2 } = lastMatchUp;
    participantFrequency[p1.id] += 1;
    participantFrequency[p2.id] += 1;
    // remove included matchup from remaining
    remainingMatchUps = _.filter(
      remainingMatchUps,
      (m) => m.id !== nextMatchUpID,
    );
  }
  return schedule;
}

export function createDefaultOrdering(participants) {
  const matchUps = createMatchUps(participants);
  const completeCycle = createCompleteCycle(matchUps, participants);
  // console.group('complete cycle');
  // completeCycle.forEach((c) => {
  //   const match = findMatchUpByID(matchUps, c);
  //   console.log(match.toString());
  // });
  // console.groupEnd();
  return completeCycle;
}

export function participantsByActive(participants, activeParticipants) {
  return participants.reduce(
    (acc, p) => {
      if (_.includes(activeParticipants, p.id)) {
        acc.active.push(p);
      } else {
        acc.available.push(p);
      }
      return acc;
    },
    { available: [], active: [] },
  );
}
