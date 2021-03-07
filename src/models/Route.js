
export function createRouteType({ name, id, runTime, color, settings }) {
  if (!name || isNaN(id)) {
    console.log('bad routeType data');
    console.log(name);
    console.log(id);
    console.log('////////');
    return;
  }
  return {
    name,
    id: parseInt(id, 10),
    color,
    runTime,
    segments: [],
    label: `${name} ${runTime}`,
  };
}

// not sure exactly how this is going to work, but some sort of route grouping (or route breaking up) should happen.
// maybe a route can contain other routes?
export function Activity(routes) {
  return { routes };
}
