export function createSegment({
  runTime,
  routeType,
  id,
  matchUpIDs,
  phase,
  phaseColor,
}) {
  return {
    runTime,
    routeType,
    id,
    phase,
    matchUpIDs,
    phaseColor,
  };
}
