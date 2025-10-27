const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const game = require("./game");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve static files
app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  console.log("🔗 New player connected");

  socket.on("addPlayer", (name) => {
    game.addPlayer(name);
    io.emit("updatePlayers", game.getPlayers());
  });

  socket.on("startGame", () => {
    game.assignRoles();
    io.emit("updatePlayers", game.getPlayers());
    io.emit("currentTurn", game.getCurrentTurn());
  });

  socket.on("makeGuess", ({ guesserName, targetName }) => {
    const result = game.makeGuess(guesserName, targetName);
    io.emit("gameMessage", result);
    io.emit("updatePlayers", game.getPlayers());
    io.emit("currentTurn", game.getCurrentTurn());
  });

  socket.on("disconnect", () => {
    console.log("❌ Player disconnected");
  });
});

// Render requires PORT from env
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
