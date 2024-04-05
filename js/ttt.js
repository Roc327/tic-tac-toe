function Gameboard() {
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

    if (currentMarker == "") {
      board[row][column].addMark(player);
    } else {
      alert(
        `This spot is taken with an ${board[row][
          column
        ].getValue()} please try again`,
      );
    }
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue()),
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, placeMark, printBoard };
}

function Cell() {
  let value = "";

  const addMark = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMark,
    getValue,
  };
}

function GameController(p1, p2) {
  // Checks if names where entered
  if (p1 === "") {
    p1 = "Player One";
  }
  if (p2 === "") {
    p2 = "Player Two";
  }

  const board = Gameboard();

  const players = [
    {
      name: p1,
      mark: "X",
    },
    {
      name: p2,
      mark: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Placing ${
        getActivePlayer().name
      }'s mark into row ${row} and column ${column}...`,
    );
    board.placeMark(row, column, getActivePlayer().mark);

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
        const lrDiagArr = [
          board.getBoard()[0][0].getValue(),
          board.getBoard()[1][1].getValue(),
          board.getBoard()[2][2].getValue(),
        ];

        // right to left diag array
        const rlDiagArr = [
          board.getBoard()[0][2].getValue(),
          board.getBoard()[1][1].getValue(),
          board.getBoard()[2][0].getValue(),
        ];

        // Check if either wins
        if (
          !!lrDiagArr.reduce(function (a, b) {
            return a === b ? a : NaN;
          })
        ) {
          return lrDiagArr[0] == "X" ? 1 : 2;
        }
        if (
          !!rlDiagArr.reduce(function (a, b) {
            return a === b ? a : NaN;
          })
        ) {
          return rlDiagArr[0] == "X" ? 1 : 2;
        }
      };

      const diagWin = diagCheck(); // check diag first to skip loops if possible
      if (diagWin == 1 || diagWin == 2) {
        return diagWin;
      }

      /**********  Loops to check each row/column  **********/
      for (let i = 0; i < 3; i++) {
        let checkRowArr = rowCheck(i);
        if (
          !!checkRowArr.reduce(function (a, b) {
            return a === b ? a : NaN;
          })
        ) {
          return checkRowArr[0] == "X" ? 1 : 2;
        }
      }
      for (let i = 0; i < 3; i++) {
        let checkColArr = colCheck(i);
        if (
          !!checkColArr.reduce(function (a, b) {
            return a === b ? a : NaN;
          })
        ) {
          return checkColArr[0] == "X" ? 1 : 2;
        }
      }
    };

    let winner = winCheck();

    if (winner === 1) {
      console.log(`${players[0].name} wins!! Play again`);
      return gameWin(players[0].name);
    } else if (winner == 2) {
      console.log(`${players[1].name} wins!! Play again`);
      return gameWin(players[1].name);
    }

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController(p1, p2) {
  const game = GameController(p1, p2);
  const playerTurnDiv = document.querySelector("#playerTurn");
  const boardDiv = document.querySelector("#gameboard");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    // Display player's turn
    playerTurnDiv.innerHTML = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row) => {
      row.forEach((cell, index) => {
        // Make each cell a button
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        cellButton.dataset.column = index;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
        cellButton.dataset.row = row[index][index];
      });
    });
    // Get each <div> and add data attributes for the rows
    const myCell = document.getElementsByClassName("cell");
    for (let i = 0; i < myCell.length; i++) {
      if (i <= 2) {
        myCell[i].dataset.row = 0;
      } else if (i > 2 && i <= 5) {
        myCell[i].dataset.row = 1;
      } else {
        myCell[i].dataset.row = 2;
      }
    }
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a cell and not the gaps in between
    if (!selectedColumn) return;

    const selectedRow = e.target.dataset.row;

    if (!selectedRow) return;

    game.playRound(selectedRow, selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();
}

function gameWin(winner) {
  // update page when win condition met and clears screens
  document.getElementById("gameboard").style.visibility = "hidden";
  document.getElementById("playerTurn").style.visibility = "hidden";
  const addWinner = document.getElementById("content-container");
  console.log(`${winner} is the winner`);
  addWinner.innerHTML = `<h1 id="display-winner">${winner} Wins!</h1><button id="reset-button" onclick="resetGame()">Reset!</button>`;
}

const displayedBoard = document.getElementById("gameboard");
displayedBoard.style.visibility = "hidden";

function startClick() {
  // start ScreenController and update content display
  const p1 = document.getElementById("p1-name").value;
  const p2 = document.getElementById("p2-name").value;

  const contentDisplayed = document.getElementById("content-container");
  contentDisplayed.innerHTML = "";
  contentDisplayed.innerHTML =
    '<div id="player-turn"><h1 id="playerTurn"></h1></div><div id="form-button-div"></div><button id="reset-button" onclick="resetGame()">Reset!</button>';

  displayedBoard.style.visibility = "visible";
  ScreenController(p1, p2);
}

function resetGame() {
  // just refreshes page to restart game
  window.location.reload();
}
