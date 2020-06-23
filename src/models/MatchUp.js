function toString(p1, p2) {
  return `${p1.name} and ${p2.name}`;
}

export function createMatchUp(p1, p2) {
  return {
    id: createMatchUpID(p1, p2),
    p1,
    p2,
    string: toString(p1, p2),
  };
}

function createMatchUpID(p1, p2) {
  return `${Math.min(p1.id, p2.id)}v${Math.max(p1.id, p2.id)}`;
}
