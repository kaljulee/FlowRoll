import { Gears } from './Gears';

export function isEditableRouteType(id) {
  return id !== 1 && id !== 2;
}

// export function editableRouteTypes(routeTypes) {
//   return true;
//
//
// the reason for making this has gone away, but might be useful later

// return routeTypes.reduce((acc, r) => {
//   console.log('checking if route is editable ' + r.id);
//   if (isEditableRouteType(r.id)) {
//     console.log('yes, editable');
//     acc.push(r);
//   } else {
//     console.log('no not editagle ' + r.id);
//   }
//
//   return acc;
// }, []);
// }

export function spoutRoute({ routeType = {}, id, custom = {} }) {
  const routeTypeID = routeType ? routeType.id : undefined;
  const routeData = { ...routeType, routeType: routeTypeID, ...custom, id };
  routeData.label = createRouteLabel(routeData);
  return routeData;
}

export function createRouteLabel(route) {
  return `${route.name}`;
}

export function createRouteType({
  name,
  id,
  runTime,
  color,
  gear = Gears.NEUTRAL,
}) {
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
    label: createRouteLabel({ name, runTime }),
    gear,
  };
}

// not sure exactly how this is going to work, but some sort of route grouping (or route breaking up) should happen.
// maybe a route can contain other routes?
export function Activity(routes) {
  return { routes };
}
