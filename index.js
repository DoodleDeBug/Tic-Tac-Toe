/////////////////PLAYER FACTORY//////////////////
const player = (name, token) => {
  const getToken = () => token;
  const getName = () => name;

  return { getName, getToken };
};

/////////////////GLOBAL CODE//////////////////

const modal = document.querySelector(".modal-backdrop");
const form = document.querySelector("#form");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
const display = document.getElementById("display");

const tiles = document.querySelectorAll(".tile"); ///////////////////////////// gameboard
let boardContent = ["", "", "", "", "", "", "", "", ""]; ///////////////////////////// gameboard
let origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let gameOption;

//bindEvents
form.addEventListener("submit", whichGame);
easy.addEventListener("click", whichGame);
hard.addEventListener("click", whichGame);

///////////////// FUNCTIONS //////////////////

function whichGame(e) {
  ///////////////////////////// global
  if (e.target.innerText == "Hard") {
    gameOption = "hard";
    aiGame.start();
  } else if (e.target.innerText == "Easy") {
    gameOption = "easy";
    aiGame.start();
  } else {
    gameOption = "twoPlayer";
    e.preventDefault();
    game.start();
  }
  //clear form
  document.querySelector("#p1-name").value = "";
  document.querySelector("#p2-name").value = "";

  modal.classList.toggle("hidden");
}

function renderMsg(msg) {
  ///////////////////////////// global
  display.innerText = msg;
}

function isEqual(args) {
  ///////////////////////////// board related
  let obj = args[0];

  for (let i = 1; i < args.length; i++) {
    if (args[i] == "") {
      return false; // dont declare win for empty board/ multiple "" in a row
    }
    if (obj == args[i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}

///////////////// TWO PLAYER GAME //////////////////

const game = (() => {
  //cache DOM
  let players = [];
  let token;

  function start() {
    players = setPlayers();
    token = players[1].getToken();
    displayTurn(players[0]);
    addTileEventListener();
  }

  //bind events
  function addTileEventListener() {
    tiles.forEach((tile) => tile.addEventListener("click", makeMove)); ///////////////////////////// game
  }

  //remove tile click event listener
  function removeTileEventListener() {
    tiles.forEach((tile) => tile.removeEventListener("click", makeMove)); ///////////////////////////// game
  }

  function setPlayers() {
    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    return [player1, player2];
  }

  function displayTurn(player) {
    ///////////////////////////// game
    if (player.getName() == "") {
      renderMsg(`It's ${player.getToken()}'s turn`);
    } else {
      renderMsg(
        `It's ${player.getName()}'s turn. Your token is ${player.getToken()}`
      );
    }
  }

  function switchPlayer() {
    ///////////////////////////// game
    if (token == players[0].getToken()) {
      // X
      token = players[1].getToken();
      displayTurn(players[0]);
    } else if (token == players[1].getToken()) {
      // O
      token = players[0].getToken();
      displayTurn(players[1]);
    }
  }

  function makeMove(e) {
    ///////////////////////////// game
    let position = e.target.id;

    if (gameBoard.isAvailable(e)) {
      switchPlayer();
      gameBoard.move(position, token);
      gameBoard.checkWin(boardContent, token);
      if (gameBoard.checkWin(boardContent, token) != true) {
        if (gameBoard.checkTie(boardContent) == true) {
          gameBoard.gameOver("tie");
        }
      }
    } else {
      alert("Invalid move! Try again");
    }
  }

  function assessWinner() {
    // returns winners token or name
    return token == players[0].getToken()
      ? players[0].getName() == ""
        ? token
        : players[0].getName()
      : players[1].getName() == ""
      ? token
      : players[1].getName();
  }

  return {
    start,
    removeTileEventListener,
    assessWinner,
  };
})();

///////////////// GAMEBOARD //////////////////
const gameBoard = (() => {
  //cache DOM
  const restartBtn = document.querySelector(".restart");

  //add event listener
  restartBtn.addEventListener("click", restartGame);

  //variables
  const tilesArray = Array.from(tiles);

  function render() {
    tiles.forEach(
      (tile) => (tile.innerText = boardContent[tilesArray.indexOf(tile)])
    );
  }

  function isAvailable(e) {
    return e.target.innerText == "" ? true : false;
  }

  // returns list of the indexes of empty spots on the board
  function emptyIndexies(bc) {
    return bc.filter((space) => space == "");
  }

  function isAvailableComputer(position) {
    return tilesArray[position].innerText == "" ? true : false;
  }

  function move(position, token) {
    boardContent[position] = token;
    render();
  }

  function checkWin(bC, token) {
    let winOptions = [
      [bC[0], bC[1], bC[2]],
      [bC[3], bC[4], bC[5]],
      [bC[6], bC[7], bC[8]],
      [bC[0], bC[3], bC[6]],
      [bC[1], bC[4], bC[7]],
      [bC[2], bC[5], bC[8]],
      [bC[0], bC[4], bC[8]],
      [bC[2], bC[4], bC[6]],
    ];

    let winCodes = ["012", 345, 678, "036", 147, 258, "048", 246];
    let winner;

    winOptions.forEach((option) => {
      if (isEqual(option) == true) {
        let winningCombo = winCodes[winOptions.indexOf(option)];
        highlightWin(winningCombo);

        if (gameOption == "twoPlayer") {
          winner = game.assessWinner();
          gameOver(winner);
        } else if (gameOption == "easy" || gameOption == "hard") {
          token == "X" ? (winner = "player") : (winner = "computer");
          gameOver(winner);
        }
      }
    });

    if (winner != undefined) {
      return true;
    }
  }

  // winning combinations using the board indexies
  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }

  function highlightWin(code) {
    let codeArray = code.toString().split("");

    let combo = [
      tilesArray[codeArray[0]],
      tilesArray[codeArray[1]],
      tilesArray[codeArray[2]],
    ];

    combo.forEach((tile) => {
      addHighlight(tile);
    });
  }

  function addHighlight(tile) {
    tile.classList.add("bg-danger");
  }

  function removeHighlight(tile) {
    tile.classList.remove("bg-danger");
  }

  function checkTie(bC) {
    let validMovesLeft = bC.includes("");
    return validMovesLeft ? false : true;
  }

  function gameOver(winner) {
    game.removeTileEventListener();
    aiGame.removeTileEventListener();
    renderMsg("Game Over");

    switch (winner) {
      case "tie":
        renderMsg("It was a tie!");
        break;
      case "player":
        renderMsg("You beat the Computer!");
        break;
      case "computer":
        renderMsg("You were beaten by the Computer");
        break;
      default:
        renderMsg(`Player ${winner} won!`);
    }
  }

  function clearBoard() {
    boardContent = ["", "", "", "", "", "", "", "", ""];
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    render();
  }

  function restartGame() {
    //////////////////////////// global
    modal.classList.toggle("hidden");
    renderMsg("");
    clearBoard();
    game.removeTileEventListener();
    aiGame.removeTileEventListener();
    tiles.forEach((tile) => {
      if (Array.from(tile.classList).includes("bg-danger")) {
        removeHighlight(tile);
      }
    });
  }

  return {
    isAvailable,
    isAvailableComputer,
    emptyIndexies,
    move,
    checkWin,
    winning,
    checkTie,
    gameOver,
  };
})();

///////////////// AI //////////////////

const aiGame = (() => {
  // variables
  let token;
  let aiMove;

  function start() {
    token = "X";
    display.innerText = "Your Turn";
    addTileEventListener();

    if (gameOption == "hard") {
      aiMove = computerMoveHard;
    } else {
      aiMove = computerMoveEasy;
    }
  }

  //bind events
  function addTileEventListener() {
    tiles.forEach((tile) => tile.addEventListener("click", playerMove)); ///////////////////////////// game
  }

  //remove tile click event listener
  function removeTileEventListener() {
    tiles.forEach((tile) => tile.removeEventListener("click", playerMove)); ///////////////////////////// game
  }

  function playerMove(e) {
    ///////////////////////////// game
    let position = e.target.id;

    if (gameBoard.isAvailable(e)) {
      gameBoard.move(position, token);
      origBoard[position] = token;

      if (gameBoard.checkWin(boardContent, token) == true) {
        gameBoard.checkWin(boardContent, token);
      } else {
        if (gameBoard.checkTie(boardContent) == true) {
          gameBoard.gameOver("tie");
        } else {
          switchToken();
          switchDisplayMsg();
          setTimeout(aiMove, 500);
        }
      }
    } else {
      alert("Invalid move! Try again");
    }
  }

  function computerMoveEasy() {
    let position = Math.floor(Math.random() * 9);

    if (gameBoard.isAvailableComputer(position)) {
      gameBoard.move(position, token);

      if (gameBoard.checkWin(boardContent, token) == true) {
        gameBoard.checkWin(boardContent, token);
      } else {
        if (gameBoard.checkTie(boardContent) == true) {
          gameBoard.gameOver("tie");
        } else {
          switchToken();
          switchDisplayMsg();
        }
      }
    } else {
      if (gameBoard.checkTie(boardContent) == false) {
        computerMoveEasy();
      }
    }
  }

  function computerMoveHard() {
    let bestSpot = minimax(origBoard, token);
    gameBoard.move(bestSpot.index, token);
    origBoard[bestSpot.index] = token;
    if (gameBoard.checkWin(boardContent, token) == true) {
      gameBoard.checkWin(boardContent, token);
    } else {
      switchToken();
    }
  }

  function minimax(newBoard, token) {
    //available spots
    let availSpots = newBoard.filter((s) => s != "O" && s != "X");

    // checks for the terminal states such as win, lose, and tie
    //and returning a value accordingly

    if (gameBoard.winning(newBoard, "X")) {
      return { score: -10 };
    } else if (gameBoard.winning(newBoard, "O")) {
      return { score: 10 };
    } else if (availSpots.length === 0) {
      return { score: 0 };
    }

    // an array to collect all the objects
    let moves = [];

    // loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
      //create an object for each and store the index of that spot
      let move = {};
      move.index = newBoard[availSpots[i]];

      // set the empty spot to the current player
      newBoard[availSpots[i]] = token;

      /*collect the score resulted from calling minimax 
      on the opponent of the current player*/

      if (token == "O") {
        var result = minimax(newBoard, "X");
        move.score = result.score;
      } else {
        var result = minimax(newBoard, "O");
        move.score = result.score;
      }

      //reset the spot to empty
      newBoard[availSpots[i]] = move.index;

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if (token === "O") {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // else loop over the moves and choose the move with the lowest score
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the moves array
    return moves[bestMove];
  }

  function switchToken() {
    token == "X" ? (token = "O") : (token = "X");
  }

  function switchDisplayMsg() {
    display.innerText == "Your Turn"
      ? renderMsg("Computers Turn")
      : renderMsg("Your Turn");
  }

  return {
    start,
    removeTileEventListener,
  };
})();
