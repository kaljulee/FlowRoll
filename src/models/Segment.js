export function createSegment({ runTime, routeType, id, matchUpIDs, phase }) {
  return {
    runTime,
    routeType,
    id,
    phase,
    matchUpIDs,
  };
}
