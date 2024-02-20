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

const gameFlow = function () {
  // code for game flow factory function
};
