const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const uuid = require("uuid/v4");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server: server });

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

wss.on("connection", ws => {
  ws.on("message", data => {
    console.log("received a message %s", data);
    const json = JSON.parse(data);

    const msgToBroadcast = {
      id: uuid(),
      message: json.msg
    };
    wss.broadcast(JSON.stringify(msgToBroadcast));
  });
});

server.listen(8080, () => {
  console.log("Server is listening on http://localhost:8080/");
});
