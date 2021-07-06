/////////////////PLAYER FACTORY//////////////////

const player = (name, token) => {
  const getToken = () => token;
  const getName = () => name;

  return { getName, getToken };
};

///////////////// FUNCTIONS //////////////////

function isEqual(...args) {
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

/////////////////GLOBAL CODE//////////////////

const modal = document.querySelector(".modal-backdrop");
const form = document.querySelector("#form");
const easy = document.getElementById("easy");
const hard = document.getElementById("hard");
const restartBtn = document.querySelector(".restart");
const display = document.getElementById("display");

//bindEvents
restartBtn.addEventListener("click", restartGame);
form.addEventListener("submit", whichGame);
easy.addEventListener("click", whichGame);
hard.addEventListener("click", whichGame);

function restartGame() {
  modal.classList.toggle("hidden");
  display.innerText = "";
  game.clearBoard();
}

function renderMsg(msg) {
  display.innerText = msg;
}

function whichGame(e) {
  console.log("gameoption");
  if (e.target.innerText == "Hard") {
    //hard AI
  } else if (e.target.innerText == "Easy") {
    aiGame.start();
  } else {
    e.preventDefault();
    game.start();
  }
}

///////////////// TWO PLAYER GAME //////////////////

const game = (() => {
  //cache DOM
  let players = [];
  let token;

  function start() {
    players = setPlayers();
    displayTurn(players[0]);
    token = players[0].getToken();
    clearForm();
    modal.classList.toggle("hidden");
    addTileEventListener();
  }

  function setPlayers() {
    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    return [player1, player2];
  }

  function displayTurn(player) {
    if (player.getName() == "") {
      display.innerText = `It's ${player.getToken()}'s turn`;
    } else {
      display.innerText = `It's ${player.getName()}'s turn. Your token is ${player.getToken()}`;
    }
  }

  function clearForm() {
    document.querySelector("#p1-name").value = "";
    document.querySelector("#p2-name").value = "";
  }

  ///////////////// GAMEBOARD //////////////////

  let boardContent = ["", "", "", "", "", "", "", "", ""];

  // cache DOM
  const tiles = document.querySelectorAll(".tile");
  const tilesArray = Array.from(tiles);

  //bind events
  function addTileEventListener() {
    tiles.forEach((tile) => tile.addEventListener("click", isAvailable));
  }

  function render() {
    tiles.forEach(
      (tile) => (tile.innerText = boardContent[tilesArray.indexOf(tile)])
    ); // inner text of tile corresponds to boardcontent
  }

  function isAvailable(e) {
    let position = e.target.classList[1];

    if (e.target.innerText == "") {
      makeMove(position, token);
      switchPlayerToken();
    } else {
      alert("Invalid move! Try again");
    }
  }

  function switchPlayerToken() {
    if (token == players[0].getToken()) {
      // X
      token = players[1].getToken();
    } else if (token == players[1].getToken()) {
      // O
      token = players[0].getToken();
    }
  }

  function makeMove(position, token) {
    if (token == players[0].getToken()) {
      // X
      boardContent[position] = token;
      render();
      displayTurn(players[1]);
    } else if (token == players[1].getToken()) {
      // O
      boardContent[position] = token;
      render();
      displayTurn(players[0]);
    }

    checkWin(boardContent, token);
  }

  function checkWin(bC, token) {
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
      if (token == "X") {
        winner =
          players[0].getName() == ""
            ? players[0].getToken()
            : players[0].getName();
      } else {
        winner =
          players[1].getName() == ""
            ? players[1].getToken()
            : players[1].getName();
      }

      gameOver(winner);
    } else {
      checkTie(bC);
    }
  }

  function checkTie(bC) {
    let validMovesLeft = bC.includes("");

    if (!validMovesLeft) {
      gameOver("tie");
    }
  }

  function gameOver(winner) {
    tiles.forEach((tile) => tile.removeEventListener("click", isAvailable));
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
    boardContent = ["", "", "", "", "", "", "", "", ""];
    render();
    // tiles.forEach((tile) => tile.addEventListener("click", isAvailable));
    // token = players[0].getToken();
  }

  return {
    clearBoard,
    gameOver,
    checkTie,
    checkWin,
    isAvailable,
    makeMove,
    start,
    clearForm,
    addTileEventListener,
  };
})();

///////////////// AI //////////////////

const aiGame = (() => {
  // cache DOM
  let token;

  //bindEvents

  function start() {
    game.clearForm();
    modal.classList.toggle("hidden");
    token = "X";
    renderMsg("Your Turn");
  }

  return {
    start,
  };
})();
