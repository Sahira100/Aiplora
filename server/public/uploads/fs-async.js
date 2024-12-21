const { readFile, writeFile } = require("fs");
const path = require("path");

//*path
const firstPath = path.resolve("content", "first.txt");
const secondPath = path.resolve("content", "second.txt");

readFile(firstPath, "utf8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    //console.log(result);
  }
});
