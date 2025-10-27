const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const game = require("./game");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// ✅ Serve static files if needed (for client HTML/JS)
app.use(express.static(__dirname + "/public"));

// ✅ Socket.io connection
io.on("connection", (socket) => {
  console.log("🔗 New player connected");

  // Add player
  socket.on("addPlayer", (name) => {
    game.addPlayer(name);
    io.emit("updatePlayers", game.getPlayers());
  });

  // Start game (assign roles)
  socket.on("startGame", () => {
    game.assignRoles();
    io.emit("updatePlayers", game.getPlayers());
    io.emit("currentTurn", game.getCurrentTurn());
  });

  // Player makes a guess
  socket.on("makeGuess", ({ guesserName, targetName }) => {
    const result = game.makeGuess(guesserName, targetName);
    io.emit("gameMessage", result);
    io.emit("updatePlayers", game.getPlayers());
    io.emit("currentTurn", game.getCurrentTurn());
  });

  // Player disconnects
  socket.on("disconnect", () => {
    console.log("❌ Player disconnected");
  });
});

// ✅ Flexible port: use environment variable or fallback to 3000
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
