let fs = require("fs");

let input = fs.readFileSync("temp.txt", "utf-8");

input = input
  .trim()
  .split("\r\n")
  .map((e) => e.split(" | ").map((x) => x.split(" ")));
//console.log(input);

let subseq = (str1, str2) => {
  let i = 0;
  let j = 0;
  while (i < str1.length) {
    if (j === str2.length) {
      return false;
    }
    if (str1[i] === str2[j]) {
      i++;
    }
    j++;
  }
  return true;
};

let part1 = (input) => {
  let ret = 0;
  input.forEach((e) => {
    //console.log(e[1]);
    e[1].forEach((x) => {
      if (x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7)
        ret++;
    });
  });
  console.log(ret);
};

let part2 = (input) => {
  let ret = 0;
  input.forEach((e) => {
    let mp = Array(10).fill("");
    let fr,
      one,
      fro = "";
    //console.log(e[0].length);
    e[0] = e[0].map((x) => {
      if (x.length == 2) mp[1] = x.split("").sort().join("");
      else if (x.length == 4) mp[4] = x.split("").sort().join("");
      else if (x.length == 7) mp[8] = x.split("").sort().join("");
      else if (x.length == 3) mp[7] = x.split("").sort().join("");
      return x.split("").sort().join("");
    });
    //console.log(e[0]);
    (fr = mp[4]), (one = mp[1]);
    for (let i = 0; i < fr.length; i++) {
      if (one.includes(fr[i]));
      else fro += fr[i];
    }

    e[0].forEach((x) => {
      y = x.split("").sort().join("");
      if (y.length == 6) {
        //console.log(y);
        if (subseq(mp[4], y)) mp[9] = y;
        else if (subseq(fro, y)) mp[6] = y;
        else mp[0] = y;
      }
      if (y.length == 5) {
        //console.log(y);
        if (subseq(mp[1], y)) mp[3] = y;
        else if (subseq(fro, y)) mp[5] = y;
        else mp[2] = y;
      }
    });
    let num = 0;
    e[1].map((x) => {
      x = x.split("").sort().join("");
      mp.map((y, idx) => {
        if (x == y) {
          num = num * 10 + idx;
        }
      });
    });
    ret += num;
  });
  console.log(ret);
};

part1(input);
part2(input);
