// game.js

// Game state
let players = [];
let currentRoleTurn = "Raja"; // first turn starts with Raja

// Role points
const rolePoints = {
  Raja: 100,
  Rani: 80,
  Minister: 60,
  Police: 40,
  Thief: 0,
};

// Role sequence (who guesses whom)
const roleSequence = {
  Raja: "Rani",
  Rani: "Minister",
  Minister: "Police",
  Police: "Thief",
  Thief: null, // Thief has no turn
};

// Add a player
function addPlayer(name) {
  players.push({ name, role: null, score: 0 });
}

// Assign roles randomly
function assignRoles() {
  const roles = ["Raja", "Rani", "Minister", "Police", "Thief"];
  const shuffled = [...roles].sort(() => Math.random() - 0.5);
  players.forEach((p, i) => (p.role = shuffled[i]));
  return players;
}

// Get all players
function getPlayers() {
  return players;
}

// Get current turn
function getCurrentTurn() {
  return `🎯 It's ${currentRoleTurn}'s turn`;
}

// Make a guess
function makeGuess(guesserName, targetName) {
  const guesser = players.find((p) => p.name === guesserName);
  const target = players.find((p) => p.name === targetName);

  if (!guesser || !target) return "⚠️ Player not found!";
  if (guesser.role !== currentRoleTurn) {
    return `⛔ It's not ${guesserName}'s turn!`;
  }

  const correctRole = roleSequence[guesser.role];
  if (!correctRole) {
    return `🏁 ${guesser.role} has no turn.`;
  }

  if (target.role === correctRole) {
    guesser.score += rolePoints[guesser.role];
    currentRoleTurn = correctRole;
    return `✅ Correct! ${guesserName} guessed ${targetName} (${target.role})`;
  } else {
    return `❌ Wrong guess! ${guesserName} guessed ${targetName} (${target.role})`;
  }
}

// Export functions
module.exports = {
  addPlayer,
  assignRoles,
  getPlayers,
  getCurrentTurn,
  makeGuess,
};
