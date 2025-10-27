// test.js
const game = require("./game.js");

// Add players
game.addPlayer("Alice");
game.addPlayer("Bob");
game.addPlayer("Charlie");
game.addPlayer("David");
game.addPlayer("Eve");

// Assign roles
console.log("\n🎭 Assigned Roles:");
console.table(game.assignRoles());

console.log("\n--- Game Play ---");

// Play automatically until Thief turn ends
while (true) {
  const turnRole = game
    .getPlayers()
    .find(
      (p) =>
        p.role ===
        game.getCurrentTurn().replace("🎯 It's ", "").replace("'s turn", "")
    );
  if (!turnRole) break;

  const correctRole = {
    Raja: "Rani",
    Rani: "Minister",
    Minister: "Police",
    Police: "Thief",
  }[turnRole.role];

  if (!correctRole) {
    console.log("\n🏁 Game Over! Thief has no turn.");
    break;
  }

  const target = game.getPlayers().find((p) => p.role === correctRole);
  console.log(game.makeGuess(turnRole.name, target.name));
}

console.log("\n📊 Final Scores:");
console.table(game.getPlayers());
