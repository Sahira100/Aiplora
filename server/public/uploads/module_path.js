const path = require("path");

console.log(path.sep);

const filePath = path.join(__dirname, "content", "text.txt");
console.log(filePath);

const base = path.basename(filePath);
console.log(base);

const absolute = path.resolve("content", "text.txt");
console.log(absolute);
