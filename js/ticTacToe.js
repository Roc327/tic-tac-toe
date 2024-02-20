const gameBoard = (function () {
  // code for gameboard factory function
})();

const player = function (name) {
  this.name = name;
  let score = 0;

  const getScore = () => score;
  const givePoint = () => score++;
  const playerName = () => name;

  return { playerName, getScore, givePoint };
};

function addPlayers() {
  // some temp code to test game in console
  const players = [];
  players.push(player(prompt("Enter name for Player 1:")));
  if (prompt("Would you like to enter another player? Type y/n:") == "y") {
    players.push(player(prompt("What is the players name? ")));
  } else {
    players.push(player("CPU"));
  }
  return players;
}

const gameFlow = function () {
  // code for game flow factory function
  const playerList = addPlayers();
  console.log(
    `We have ${playerList[0].playerName()} playing against ${playerList[1].playerName()} in a glorious battle of....`,
  );
  console.log("TIC TAC TOE!!!");
};
