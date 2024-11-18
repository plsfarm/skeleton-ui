import { tokens } from "./Tokens";
const AddressZero = "0x0000000000000000000000000000000000000000";
const maxHops = 4;
export const findRoutes = (start, finish) => {
  const graph = getGraph();
  const queue = [[start]];
  let routes = [];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current.length > maxHops) continue;
    if (current.at(-1) === finish) {
      routes.push(current);
    } else {
      const neighbors = graph.get(current.at(-1));
      for (let neighbor of neighbors) {
        if (!current.includes(neighbor)) {
          queue.push([...current, neighbor]);
        }
      }
    }
  }
  return routes;
};

const getGraph = () => {
  const allTokenAddresses = Object.values(tokens)
    .filter((token) => token.address !== AddressZero && token.swap)
    .map((token) => token.address);
  let graph = new Map();
  for (let i = 0; i < allTokenAddresses.length; i++) {
    const token = allTokenAddresses[i];
    graph.set(token, []);
    graph.get(token).push(...allTokenAddresses.filter((t) => t !== token));
  }
  return graph;
};
