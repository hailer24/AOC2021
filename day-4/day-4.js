const fs = require("fs");
const { runInThisContext } = require("vm");

const input = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .split("\r\n\r\n")
  .map((x) =>
    x
      .replace(/[\n ,]+/g, " ")
      .trim()
      .split(" ")
      .map((y) => parseInt(y))
  );

let [list, ...cards] = input;

class Card {
  constructor(numbers) {
    this.numbers = numbers;
    this.size = 5;
    this.pos = new Map();
    for (let i = 0; i < this.numbers.length; i++) {
      this.pos.set(numbers[i], {
        r: Math.floor(i / this.size),
        c: i % this.size,
      });
    }
    this.rows = Array(this.size).fill(0);
    this.cols = Array(this.size).fill(0);
    this.won = false;
    this.marked = new Set();
  }
  markNumbers(num) {
    const chk = this.pos.get(num);
    if (!chk) return;
    this.marked.add(num);
    //console.log(chk.c);
    this.rows[chk.r]++;
    this.cols[chk.c]++;
    if (this.rows[chk.r] == this.size || this.cols[chk.c] == this.size)
      this.won = true;
  }
  unmarkedNumbers() {
    return this.numbers.filter((e) => !this.marked.has(e));
  }
}

let part1 = (_cards) => {
  cards = cards.map((x) => new Card(x));

  let winner;
  let drawed = [];

  for (const drawn of list) {
    let fin = false;
    drawed.push(drawn);
    for (const card of cards) {
      card.markNumbers(drawn);
      if (card.won == true) {
        fin = true;
        winner = card;
        break;
      }
    }
    if (fin) break;
  }

  const unmarkedNumbers = winner.unmarkedNumbers();

  console.log(unmarkedNumbers.reduce((a, b) => a + b, 0) * drawed.slice(-1));
};

//part1(cards);
let part2 = (_cards) => {
  cards = cards.map((x) => new Card(x));

  let lastWinner;
  let lastDrawn;
  let drawed = [];

  for (const drawn of list) {
    drawed.push(drawn);
    //console.log(drawed);
    let cardsLeft = false;
    for (const card of cards) {
      if (card.won == false) {
        cardsLeft = true;
        card.markNumbers(drawn);

        if (card.won == true) {
          lastWinner = card;
          lastDrawn = drawn;
          break;
        }
      }
    }
    if (cardsLeft == false) break;
  }

  const unmarkedNumbers = lastWinner.unmarkedNumbers();
  console.log(lastWinner);
  console.log(unmarkedNumbers.reduce((a, b) => a + b, 0) * lastDrawn);
};

part2(cards);
