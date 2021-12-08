const fs = require("fs");

const main = async () => {
  const inputFile = fs.readFileSync("./input.txt");
  const initialState = inputFile.toString().split(",").map(Number);
  let newGenerationCount = 0;
  let population = 0;
  let fishCountByTimerTick = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  initialState.forEach((tick) => fishCountByTimerTick[tick]++);
  for (let i = 0; i < 256; i++) {
    fishCountByTimerTick[7] += fishCountByTimerTick[0];
    newGenerationCount = fishCountByTimerTick.shift();
    fishCountByTimerTick.push(newGenerationCount);
  }

  population = fishCountByTimerTick.reduce(
    (countAcc, currCount) => countAcc + currCount
  );
  console.log(population);
};

main();
