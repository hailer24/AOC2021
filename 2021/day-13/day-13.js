let fs = require("fs");

let input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\r\n\r\n")
  .map((e) => e.trim().split("\r\n"));

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

input[0] = input[0].map((e) => e.split(",").map(Number));

input[1] = input[1]
  .map((e) => e.split("="))
  .map((e) => {
    return [e[0].indexOf("x") == 11, parseInt(e[1])];
  });
//console.log(input[1]);

let part1 = ([index, folds]) => {
  for (let i = 0; i < folds.length; i++) {
    let _i = folds[i][0] ? 0 : 1;
    let extra = parseInt(folds[i][1]);
    //console.log(extra);
    index = index.map((e) => {
      let temp = e;
      temp[_i] = temp[_i] > extra ? 2 * extra - temp[_i] : temp[_i];
      return temp;
    });
    if (i === 0) console.log(uniq(index.map((e) => e.join("+"))).length);
  }

  let arr = [];
  for (let i = 0; i < 7; i++) {
    temp = [];
    temp.length = 41;
    temp.fill(".");
    arr.push(temp);
  }
  index = [...new Set(index.map((e) => e.join("+")))];
  console.log(typeof index);

  for (let i = 0; i < 10; i++) {
    let temp = "";
    for (let j = 0; j < 45; j++) {
      if (index.indexOf(`${j}+${i}`) >= 0) temp += "*";
      else temp += " ";
    }
    console.log(i, temp);
  }
};

part1(input);
