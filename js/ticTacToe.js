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

  const placeMark = (row, column, player) => {
    const currentMarker = board[row][column].getValue();

    if (currentMarker == 0) {
      board[row][column].addMark(player);
    } else {
      console.log(
        `This spot is taken with an ${board[row][column]
        .getValue()} please try again`,);
      let newRow = prompt("Enter a row 0-2");
      let newColumn = prompt("Enter a column 0-2");
      placeMark(newRow, newColumn, player);
    }
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

  const playRound = (row, column) => {
    board.placeMark(row, column, getActivePlayer().token);
    
    const winCheck = function () {
      // This function checks all ways for a win.  Rows, columns and diagonals
      
      const rowCheck = function (row) {
        // Creates and returns an array for the given row
        let rowArr = [];
        for (let i = 0; i < 3; i++) {
          rowArr.push(board.getBoard()[row][i].getValue());
        }
        return rowArr;
      };

      const colCheck = function (col) {
        // Creates and returns an array for the given column
        const colArr = [];
        for (let i = 0; i < 3; i++) {
          colArr.push(board.getBoard()[i][col].getValue());
        }
        return colArr;
      };

      const diagCheck = function () {
        // left to right diag array
        const lrDiagArr = [board.getBoard()[0][0].getValue(), board.getBoard()[1][1].getValue(), board.getBoard()[2][2].getValue()];
    
        // right to left diag array
        const rlDiagArr = [board.getBoard()[0][2].getValue(), board.getBoard()[1][1].getValue(), board.getBoard()[2][0].getValue()];
        
        // Check if either wins
        if (!!lrDiagArr.reduce(function(a, b){ return (a === b) ? a : NaN; })) {
          return (lrDiagArr[0] == "X") ? 1 : 2;
        }
        if (!!rlDiagArr.reduce(function(a, b){ return (a === b) ? a : NaN; })) {
          return (rlDiagArr[0] == "X") ? 1 : 2;
        }
      };

      const diagWin = diagCheck();  // check diag first to skip loops if possible
      if (diagWin == 1 || diagWin == 2) {
        return diagWin;
      }

      /**********  Loops to check each row/column  **********/
      for (let i = 0; i < 3; i++) {
        let checkRowArr = rowCheck(i);
        if (!!checkRowArr.reduce(function(a, b){ return (a === b) ? a : NaN; })) {
          return (checkRowArr[0] == "X") ? 1 : 2;
        }
      }
      for (let i = 0; i < 3; i++) {
        let checkColArr = colCheck(i);
        if (!!checkColArr.reduce(function(a, b){ return (a === b) ? a : NaN; })) {
          return (checkColArr[0] == "X") ? 1 : 2;
        }
      }
    };

    let winner = winCheck();

    if (winner === 1) {
      console.log(`${playerList[0].playerName()} wins!! Play again`);
    } else if (winner == 2) {
      console.log(`${playerList[1].playerName()} wins!! Play again`);
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound(); // Initial run

  return { playRound, getActivePlayer };
};

const game = gameFlow();
