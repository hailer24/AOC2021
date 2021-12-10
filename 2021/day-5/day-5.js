const fs = require("fs");

let input = fs
  .readFileSync("input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((e) => {
    const [from, to] = e.split("->").map((coords) => {
      const [x, y] = coords.split(",").map(Number);
      return { x, y };
    });
    return { from, to };
  });

let part1 = (_input) => {
  var ret = 0;
  const lines = _input.filter((e) => e.from.x == e.to.x || e.from.y == e.to.y);
  //console.log(lines);
  const mem = new Map();
  for (const line of lines) {
    //console.log(line);
    const isHorizontal = line.from.y == line.to.y;
    const isVertical = line.from.x == line.to.x;
    let curr = {
      x: Math.min(line.from.x, line.to.x),
      y: Math.min(line.from.y, line.to.y),
    };
    let fin = {
      x: Math.max(line.from.x, line.to.x),
      y: Math.max(line.from.y, line.to.y),
    };

    while (curr.x != fin.x || curr.y != fin.y) {
      const key = [curr.x, curr.y].join(",");
      let val = mem.get(key);
      if (!val) val = 0;
      if (val == 1) ret++;
      mem.set(key, val + 1);
      curr.x += isHorizontal ? 1 : 0;
      curr.y += isVertical ? 1 : 0;
    }
    const key = [curr.x, curr.y].join(",");
    let val = mem.get(key);
    if (!val) val = 0;
    if (val == 1) ret++;
    mem.set(key, val + 1);
  }
  console.log(ret);
  //console.log(lines.length);
};

part1(input);

let part2 = (_input) => {
  var ret = 0;
  const lines = _input;
  //console.log(lines);
  const mem = new Map();
  for (const line of lines) {
    //console.log(line);
    const isHorizontal = line.from.y == line.to.y;
    const isVertical = line.from.x == line.to.x;
    let curr = line.from;
    let fin = line.to;

    while (curr.x != fin.x || curr.y != fin.y) {
      const key = [curr.x, curr.y].join(",");
      let val = mem.get(key);
      if (!val) val = 0;
      if (val == 1) ret++;
      mem.set(key, val + 1);
      curr.y += isHorizontal ? 0 : fin.y > curr.y ? 1 : -1;
      curr.x += isVertical ? 0 : fin.x > curr.x ? 1 : -1;
      //console.log(curr, fin);
    }
    const key = [curr.x, curr.y].join(",");
    let val = mem.get(key);
    if (!val) val = 0;
    if (val == 1) ret++;
    mem.set(key, val + 1);
  }
  console.log(ret);
  //console.log(lines);
};

part2(input);
