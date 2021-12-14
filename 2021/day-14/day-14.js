let fs = require("fs");

let input = fs.readFileSync("input.txt", "utf-8").trim().split("\r\n\r\n");

let [str, map] = input;

map = map.split("\r\n").map((e) => e.split(" -> "));

//console.log(map);

let suplex = new Map();

let chars = new Map();

let getDuplex = (e) => {
  if (suplex.has(e[0]) === false) {
    let duplex = {
      val: e[0],
      next: e[1],
      cnt: Array(41).fill(0),
    };
    suplex.set(e[0], duplex);
  }
  return e;
};

map.map((e) => getDuplex(e));

let part1 = () => {
  for (let i = 0; i < str.length - 1; i++) {
    suplex.get(str[i] + str[i + 1]).cnt[0]++;
  }

  for (let i = 0; i < 10; i++) {
    suplex.forEach((e) => {
      let temp = e.cnt[i];
      suplex.get(e.val[0] + e.next).cnt[i + 1] += temp;
      suplex.get(e.next + e.val[1]).cnt[i + 1] += temp;
    });
  }

  suplex.forEach((e) => {
    let add = e.cnt[10];
    if (!chars.has(e.val[0])) {
      chars.set(e.val[0], 0);
    }
    if (!chars.has(e.val[1])) {
      chars.set(e.val[1], 0);
    }

    chars.set(e.val[0], add + chars.get(e.val[0]));
    chars.set(e.val[1], add + chars.get(e.val[1]));
  });

  let arr = [];

  chars.forEach((e) => arr.push(Math.ceil(e / 2)));
  arr = arr.sort((a, b) => a - b);
  console.log(arr[arr.length - 1] - arr[0]);
};

//part1();

let part2 = () => {
  for (let i = 0; i < str.length - 1; i++) {
    suplex.get(str[i] + str[i + 1]).cnt[0]++;
  }

  for (let i = 0; i < 40; i++) {
    suplex.forEach((e) => {
      let temp = e.cnt[i];
      suplex.get(e.val[0] + e.next).cnt[i + 1] += temp;
      suplex.get(e.next + e.val[1]).cnt[i + 1] += temp;
    });
  }

  suplex.forEach((e) => {
    let add = e.cnt[e.cnt.length - 1];
    if (!chars.has(e.val[0])) {
      chars.set(e.val[0], 0);
    }
    if (!chars.has(e.val[1])) {
      chars.set(e.val[1], 0);
    }

    chars.set(e.val[0], add + chars.get(e.val[0]));
    chars.set(e.val[1], add + chars.get(e.val[1]));
  });

  let arr = [];

  chars.forEach((e) => arr.push(Math.ceil(e / 2)));
  arr = arr.sort((a, b) => a - b);
  console.log(arr[arr.length - 1] - arr[0]);
};

part2();
