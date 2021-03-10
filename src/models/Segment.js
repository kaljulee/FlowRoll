export function createSegment({ runTime, routeType, id, floorState, phase }) {
  return {
    runTime,
    routeType,
    id,
    phase,
    floorState,
  };
}
