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
const restartBtn = document.querySelector(".restart");
const display = document.getElementById("display");

const tiles = document.querySelectorAll(".tile"); ///////////////////////////// gameboard
let boardContent = ["", "", "", "", "", "", "", "", ""]; ///////////////////////////// gameboard

let gameOption;

//bindEvents
restartBtn.addEventListener("click", restartGame);
form.addEventListener("submit", whichGame);
easy.addEventListener("click", whichGame);
hard.addEventListener("click", whichGame);

///////////////// FUNCTIONS //////////////////

function restartGame() {
  //////////////////////////// global
  modal.classList.toggle("hidden");
  display.innerText = "";
  gameBoard().clearBoard();
  game.removeTileEventListener();
  aiGame.removeTileEventListener();
  tiles.forEach((tile) => {
    if (Array.from(tile.classList).includes("bg-danger")) {
      gameBoard().removeHighlight(tile);
    }
  });

  gameOption = "";
}

function whichGame(e) {
  ///////////////////////////// global
  if (e.target.innerText == "Hard") {
    gameOption = "hard";
    //hard AI
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
    ///////////////////////////// game
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
    ///////////////////////////// game
    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    return [player1, player2];
  }

  function displayTurn(player) {
    ///////////////////////////// game
    if (player.getName() == "") {
      display.innerText = `It's ${player.getToken()}'s turn`;
    } else {
      display.innerText = `It's ${player.getName()}'s turn. Your token is ${player.getToken()}`;
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
    let position = e.target.classList[1];

    if (gameBoard(players).isAvailable(e)) {
      switchPlayer();
      gameBoard(players).move(position, token);
      gameBoard(players).checkWin(boardContent, token);
    } else {
      alert("Invalid move! Try again");
    }
  }

  function assessWinner() {
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
const gameBoard = (players) => {
  //variables
  // let boardContent = ["", "", "", "", "", "", "", "", ""]; ///////////////////////////// gameboard
  const tilesArray = Array.from(tiles);

  // cache DOM
  // const tiles = document.querySelectorAll(".tile"); ///////////////////////////// gameboard

  function render() {
    ///////////////////////////// gameboard
    tiles.forEach(
      (tile) => (tile.innerText = boardContent[tilesArray.indexOf(tile)])
    );
  }

  function isAvailable(e) {
    ///////////////////////////// gameboard
    return e.target.innerText == "" ? true : false;
  }

  function isAvailableComputer(position) {
    ///////////////////////////// gameboard
    return tilesArray[position].innerText == "" ? true : false;
  }

  function move(position, token) {
    ///////////////////////////// gameboard

    boardContent[position] = token;
    render();
    // checkWin(boardContent, token);
  }

  function checkWin(bC, token) {
    ///////////////////////////// gameboard

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
        if (gameOption == "twoPlayer") {
          winner = game.assessWinner();
          console.log(winner);
        } else if (gameOption == "easy") {
          token == "X" ? (winner = "player") : (winner = "computer");
          console.log("AI game");
        } else if (gameOption == "hard") {
          // some code
        }

        let winningCombo = winCodes[winOptions.indexOf(option)];

        gameOver(winner);
        highlightWin(winningCombo);
      }
    });

    if (!winner) {
      checkTie(bC);
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
    ///////////////////////////// gameboard
    let validMovesLeft = bC.includes("");

    if (!validMovesLeft) {
      gameOver("tie");
      return;
    }
  }

  function gameOver(winner) {
    ///////////////////////////// gameboard
    game.removeTileEventListener();
    aiGame.removeTileEventListener();
    renderMsg("Game Over");
    if (winner == "tie") {
      alert("It was a tie! Press the restart button to play again");
      renderMsg("It was a tie!");
    } else if (winner == "player") {
      alert("You Won! Press the restart button to play again");
      renderMsg("You beat the Computer!");
    } else if (winner == "computer") {
      alert("The Computer won! Press the restart button to play again");
      renderMsg("You were beaten by the Computer");
    } else {
      alert(`Player ${winner} won! Press the restart button to play again`);
      renderMsg(`Player ${winner} won!`);
    }
  }

  function clearBoard() {
    ///////////////////////////// gameboard
    boardContent = ["", "", "", "", "", "", "", "", ""];
    render();
  }

  return {
    clearBoard,
    isAvailable,
    isAvailableComputer,
    move,
    removeHighlight,
    checkWin,
  };
};

///////////////// AI //////////////////

const aiGame = (() => {
  // variables
  let token;

  function start() {
    token = "X";
    displayTurn();
    addTileEventListener();
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
    let position = e.target.classList[1];

    if (gameBoard().isAvailable(e)) {
      gameBoard().move(position, token);
      switchToken();
      displayTurn();
      computerMove();
    } else {
      alert("Invalid move! Try again");
    }
  }

  function computerMove() {
    let position = Math.floor(Math.random() * 9);

    if (gameBoard().isAvailableComputer(position)) {
      gameBoard().move(position, token);
      switchToken();
      displayTurn();
      gameBoard().checkWin(boardContent, token);
    } else {
      position = Math.floor(Math.random() * 9);

      if (gameBoard().isAvailableComputer(position)) {
        gameBoard().move(position, token);
        switchToken();
        displayTurn();
        gameBoard().checkWin(boardContent, token);
      }
    }
  }

  function switchToken() {
    token == "X" ? (token = "O") : (token = "X");
  }

  function displayTurn() {
    token == "X"
      ? renderMsg(`It's your turn. Your token is ${token}`)
      : renderMsg(`It's the Computers turn.`);
  }

  return {
    start,
    removeTileEventListener,
  };
})();
