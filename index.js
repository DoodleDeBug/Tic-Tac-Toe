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
}

function whichGame(e) {
  ///////////////////////////// global
  if (e.target.innerText == "Hard") {
    //hard AI
  } else if (e.target.innerText == "Easy") {
    aiGame.start();
  } else {
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

function isEqual(...args) {
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
    token = players[0].getToken();
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

  function switchPlayerToken() {
    ///////////////////////////// game
    if (token == players[0].getToken()) {
      // X
      token = players[1].getToken();
    } else if (token == players[1].getToken()) {
      // O
      token = players[0].getToken();
    }
  }

  function makeMove(e) {
    ///////////////////////////// game
    let position = e.target.classList[1];

    if (gameBoard(players).isAvailable(e)) {
      gameBoard(players).move(position, token);
      switchPlayerToken();
    } else {
      alert("Invalid move! Try again");
    }
  }

  return {
    start,
    addTileEventListener,
    removeTileEventListener,
    displayTurn,
  };
})();

///////////////// GAMEBOARD //////////////////
const gameBoard = (players) => {
  //variables
  // let boardContent = ["", "", "", "", "", "", "", "", ""]; ///////////////////////////// gameboard

  // cache DOM
  // const tiles = document.querySelectorAll(".tile"); ///////////////////////////// gameboard
  const tilesArray = Array.from(tiles);

  function render() {
    ///////////////////////////// gameboard
    tiles.forEach(
      (tile) => (tile.innerText = boardContent[tilesArray.indexOf(tile)])
    ); // inner text of tile corresponds to boardcontent
  }

  function isAvailable(e) {
    ///////////////////////////// gameboard
    return e.target.innerText == "" ? true : false;
  }

  function move(position, token) {
    ///////////////////////////// gameboard
    if (token == players[0].getToken()) {
      // X
      boardContent[position] = token;
      render();
      game.displayTurn(players[1]);
    } else if (token == players[1].getToken()) {
      // O
      boardContent[position] = token;
      render();
      game.displayTurn(players[0]);
    }

    checkWin(boardContent, token);
  }

  function checkWin(bC, token) {
    ///////////////////////////// gameboard
    let win =
      isEqual(bC[0], bC[1], bC[2]) ||
      isEqual(bC[3], bC[4], bC[5]) ||
      isEqual(bC[6], bC[7], bC[8]) ||
      isEqual(bC[0], bC[3], bC[6]) ||
      isEqual(bC[1], bC[4], bC[7]) ||
      isEqual(bC[2], bC[5], bC[8]) ||
      isEqual(bC[0], bC[4], bC[8]) ||
      isEqual(bC[2], bC[4], bC[6]);

    let winner;

    if (win) {
      if (token == players[0].getToken()) {
        winner = players[0].getName() == "" ? token : players[0].getName();
      } else {
        winner = players[1].getName() == "" ? token : players[1].getName();
      }

      gameOver(winner);
    } else {
      checkTie(bC);
    }
  }

  function checkTie(bC) {
    ///////////////////////////// gameboard
    let validMovesLeft = bC.includes("");

    if (!validMovesLeft) {
      gameOver("tie");
    }
  }

  function gameOver(winner) {
    ///////////////////////////// gameboard
    game.removeTileEventListener();
    renderMsg("Game Over");
    if (winner == "tie") {
      alert("It was a tie! Press the restart button to play again");
      renderMsg("It was a tie!");
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
    move,
  };
};

///////////////// AI //////////////////

const aiGame = (() => {
  // variables
  let token;

  function start() {
    token = "X";
    renderMsg(`Your Turn. Your token is ${token}`);
  }

  return {
    start,
  };
})();
