const http = require("http");
const { createReadStream } = require("fs");

const port = 5000;

const server = http.createServer((req, res) => {
  sendFile(res);
});

const sendFile = (res) => {
  const stream = createReadStream("./content/100kb.txt", "utf8");
  stream.on("open", () => {
    stream.pipe(res);
  });
};

server.listen(port, () => {
  console.log("Server is listening to port :" + port);
});
