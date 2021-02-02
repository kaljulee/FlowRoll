export function createLegType(name, id, defaultLength, defaultColor, settings) {
  if (!name || !id) {
    console.log('bad legType data');
    return;
  }
  return {
    name,
    id: parseInt(id, 10),
  };
}

export function createLeg(legType, customizations) {
  return {
    ...legType,
    ...customizations,
  };
}
// not sure exactly how this is going to work, but some sort of leg grouping (or leg breaking up) should happen.
// maybe a leg can contain other legs?
export function Activity(legs) {
  return { legs };
}
