let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8");
//let sample = fs.readFileSync("sample.txt", "utf-8");

let parse = (input) => {
  let data = input
    .trim()
    .split("\r\n")
    .map((e) => e.trim().split("").map(Number));

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      data[i][j] = {
        val: data[i][j],
        flash: false,
        neighbors: [],
      };
    }
  }

  const ret = [];

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      for (let _i = -1; _i <= 1; _i++) {
        for (let _j = -1; _j <= 1; _j++) {
          if ((data[i + _i] || [])[j + _j] != undefined)
            data[i][j].neighbors.push(data[i + _i][j + _j]);
        }
      }
      ret.push(data[i][j]);
    }
  }
  return ret;
};

input = parse(input);
//console.log(input);

let part1_2 = (input) => {
  let ret = 0,
    i = 0;
  for (i = 0; ; i++) {
    let _t = step(input);
    //console.log(_t);
    if (i < 100) ret += _t;
    if (_t == 100) break;
  }
  i++;
  return { part1: ret, part2: i };
};

let step = (input) => {
  input.forEach((e) => e.val++);
  do {
    input
      .filter((e) => e.val > 9 && !e.flash)
      .forEach((e) => {
        e.flash = true;
        e.neighbors.forEach((x) => x.val++);
      });
  } while (input.filter((e) => e.val > 9 && !e.flash).length > 0);

  input
    .filter((e) => e.flash)
    .forEach((e) => {
      e.val = 0;
      e.flash = false;
    });

  return input.filter((e) => e.val == 0).length;
};

console.log(part1_2(input));
