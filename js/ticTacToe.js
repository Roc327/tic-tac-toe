const gameBoard = function () {
  // code for gameboard factory function'
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placeMark = (column, row, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    /* 
      * The following code needs to be updated, this was from a connect four game so mark drops to lowest row *
    
    if (!availableCells.length) return;

    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addMark(player);
    */
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMark, printBoard };
};

function Cell() {
  let value = 0;

  const addMark = (player) => {
    value = player;
  };
  const getValue = () => value;

  return { addMark, getValue };
}

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

  const board = gameBoard();

  playerList[0].token = "X";
  playerList[1].token = "O";

  let activePlayer = playerList[0];

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === playerList[0] ? playerList[1] : playerList[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().playerName()}'s turn.`);
  };

  const playRound = (column, row) => {
    board.placeMark(column, row, getActivePlayer().token);

    // Code to check for winner

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound(); // Initial run

  return { playRound, getActivePlayer };
};

const game = gameFlow();
