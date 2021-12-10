const fs = require("fs");

let input = fs
  .readFileSync("input1.txt", "utf-8")
  .split("\r\n")
  .map((e) => e.trim().split("").map(Number));
//console.log(input);

let basins = [];

let part1 = (input) => {
  let ret = 0;
  let m = input.length,
    n = input[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const pt = input[i][j];
      const l = i > 0 ? input[i - 1][j] : 10;
      const r = i < m - 1 ? input[i + 1][j] : 10;
      const u = j > 0 ? input[i][j - 1] : 10;
      const d = j < n - 1 ? input[i][j + 1] : 10;
      if (pt < l && pt < r && pt < u && pt < d) {
        ret += pt + 1;
        basins.push({ i, j });
      }
    }
  }
  console.log(ret);
};

part1(input);

let part2 = (input) => {
  let mp = new Map();
  let lines = input;
  let m = lines.length;
  let n = lines[0].length;
  let basinSize = [];
  let fillBasin = (set, i, j) => {
    if (set.has(`${i}+${j}`) || input[i][j] == 9) return;
    set.add(`${i}+${j}`);
    if (i > 0) fillBasin(set, i - 1, j);
    if (j > 0) fillBasin(set, i, j - 1);
    if (i < m - 1) fillBasin(set, i + 1, j);
    if (j < n - 1) fillBasin(set, i, j + 1);
    return set;
  };

  basins.map(({ i, j }) => basinSize.push(fillBasin(new Set(), i, j).size));
  basinSize.sort((a, b) => b - a);

  console.log(basinSize[0] * basinSize[1] * basinSize[2]);
};

part2(input);
