const gameBoard = (function () {
  // code for gameboard factory function
})();

const player = function (name) {
  this.name = name;
  let score = 0;

  const getScore = () => score;
  const givePoint = () => score++;

  return { name, score, getScore, givePoint };
};

const gameFlow = function () {
  // code for game flow factory function
};
