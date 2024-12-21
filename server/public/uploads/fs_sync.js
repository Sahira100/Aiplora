const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

//*path
const firstPath = path.resolve("content", "first.txt");
const secondPath = path.resolve("content", "second.txt");

//*read files
const first = readFileSync(firstPath, "utf8");
const seconde = readFileSync(secondPath, "utf8");

//*write files
writeFileSync(
  "./content/result-sync.txt",
  `Here is the result : ${first} ${seconde}`
);
