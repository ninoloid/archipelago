const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3001 });

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

console.log("WebSocket server running on ws://localhost:3001");
