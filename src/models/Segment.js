export function createSegment({
  runTime,
  routeType,
  id,
  cycleMatchUpIDs,
  phase,
}) {
  return {
    runTime,
    routeType,
    id,
    phase,
    cycleMatchUpIDs,
  };
}
