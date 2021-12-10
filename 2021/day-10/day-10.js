let fs = require("fs");

let sample = fs.readFileSync("sample.txt", "utf-8");

let input = fs.readFileSync("input.txt", "utf-8");

let lines = input;

lines = lines.split("\r\n");

//console.log(lines);

class Stack {
  constructor() {
    this.items = [];
  }

  push(e) {
    this.items.push(e);
  }

  pop() {
    if (this.items.length) return this.items.pop();
    return "-1";
  }
  top() {
    return this.items[this.items.length - 1];
  }
  peek() {
    console.log(this.items);
  }
}

let part1 = (lines) => {
  let ret = 0,
    prev = 0;
  let stacks = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let st = new Stack();
    for (let j = 0; j < line.length; j++) {
      if (
        line[j] == "(" ||
        line[j] == "{" ||
        line[j] == "[" ||
        line[j] == "<"
      ) {
        st.push(line[j]);
      } else if (line[j] == ")") {
        if (st.top() == "(") st.pop();
        else {
          ret += 3;
          break;
        }
      } else if (line[j] == "]") {
        if (st.top() == "[") st.pop();
        else {
          ret += 57;
          break;
        }
      } else if (line[j] == "}") {
        if (st.top() == "{") st.pop();
        else {
          ret += 1197;
          break;
        }
      } else if (line[j] == ">") {
        if (st.top() == "<") st.pop();
        else {
          ret += 25137;
          break;
        }
      }
    }
    if (ret == prev) stacks.push(st.items);
    prev = ret;
  }
  console.log(ret);
  part2(stacks);
};

let part2 = (stacks) => {
  //console.log(stacks);
  let ret = [];
  for (let i = 0; i < stacks.length; i++) {
    let stack = stacks[i];
    let temp = 0;
    for (let j = stack.length - 1; j > -1; j--) {
      if (stack[j] == "(") temp = temp * 5 + 1;
      if (stack[j] == "[") temp = temp * 5 + 2;
      if (stack[j] == "{") temp = temp * 5 + 3;
      if (stack[j] == "<") temp = temp * 5 + 4;
    }
    ret.push(temp);
  }
  ret.sort((a, b) => a - b);
  console.log(ret[Math.floor(ret.length / 2)]);
};
part1(lines);
