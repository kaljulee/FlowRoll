export function createLocation(segment, offset) {
  const newOffset = offset + segment.runTime;
  return { location: { ...segment, offset }, totalRunTime: newOffset };
}

export const NOWHERE = {
  runTime: 0,
  id: 0,
  offset: 0,
};

export const EMPTY_MAP = {
  locations: [],
  runTime: 0,
};
