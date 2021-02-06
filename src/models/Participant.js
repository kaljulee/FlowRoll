export function createParticipant(name, id) {
  return { name, id: parseInt(id, 10), label: name };
}
