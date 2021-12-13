let fs = require("fs");

let input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\r\n")
  .map((e) => e.split("-"));

let paths = (from, vis) => {
  if (from === end) return [end.name];

  vis.add(from);

  const path = from.connections
    .filter((e) => e.Big || !vis.has(e))
    .flatMap((e) => paths(e, vis))
    .map((p) => from.name + "," + p);
  vis.delete(from);
  return path;
};
function Paths2(from, visited, visitedSmallTwice) {
  // Check if we've reached the end
  if (from === end) {
    return [end.name];
  }

  // Prevent double-counting caves
  const visitCount = (visited.get(from) || 0) + 1;
  visited.set(from, visitCount);

  // Check if we've visited a small cave twice
  if (!from.Big && visitCount > 1) {
    visitedSmallTwice = true;
  }

  const paths = from.connections
    .filter((next) => next !== start)
    .filter(
      (cave) =>
        cave.Big ||
        !visited.has(cave) ||
        visited.get(cave) < 1 ||
        !visitedSmallTwice
    )
    .flatMap((next) => Paths2(next, visited, visitedSmallTwice))
    .map((path) => from.name + "," + path);
  visited.set(from, visitCount - 1);

  return paths;
}

let part1 = () => {
  return paths(start, new Set());
};

const caves = new Map();

let part2 = () => {
  return Paths2(start, new Map(), false);
};

let getCave = (e) => {
  let cave = caves.get(e);
  if (cave == undefined) {
    cave = {
      name: e,
      Big: /^[A-Z]\w*$/.test(e),
      connections: [],
    };
    caves.set(e, cave);
  }
  return cave;
};

let cleanInput = (e) => {
  let len = e.length;

  for (let i = 0; i < len; i++) {
    let cave1 = getCave(e[i][0]);
    let cave2 = getCave(e[i][1]);
    cave1.connections.push(cave2);
    cave2.connections.push(cave1);
  }
};

input = cleanInput(input);
var start = caves.get("start");
var end = caves.get("end");
console.log(part1(caves).length, part2(caves).length);
