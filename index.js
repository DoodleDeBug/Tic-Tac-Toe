/////////////////PLAYER //////////////////

const player = (name, token) => {
  const getToken = () => token;
  const getName = () => name;

  return { getName, getToken };
};

///////////////// GAME //////////////////

const game = (() => {
  //cache DOM
  const modal = document.querySelector(".modal-backdrop");
  const form = document.querySelector("#form");
  const restartBtn = document.querySelector(".restart");
  const display = document.getElementById("display");
  let players = [];
  let token;

  //bindEvents
  form.addEventListener("submit", getPlayers);
  restartBtn.addEventListener("click", restartGame);

  function getPlayers(e) {
    e.preventDefault();

    players = setPlayers();
    renderMsg(players[0]);
    token = players[0].getToken();
    clearForm();
    modal.classList.toggle("hidden");
  }

  function setPlayers() {
    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    return [player1, player2];
  }

  function renderMsg(input) {
    // console.log(input.getName());

    if (input == "Game Over") {
      display.innerText = input;
    } else if (input.getName() == "") {
      display.innerText = `It's ${input.getToken()}'s turn`;
    } else {
      display.innerText = `It's ${input.getName()}'s turn. Your token is ${input.getToken()}`;
    }
  }

  function restartGame() {
    modal.classList.toggle("hidden");
    display.innerText = "";
    clearBoard();
    // console.log("restarted game");
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
  tiles.forEach((tile) => tile.addEventListener("click", makeMove));

  function render() {
    tiles.forEach(
      (tile) => (tile.innerText = boardContent[tilesArray.indexOf(tile)])
    ); // inner text of tile corresponds to boardcontent
  }

  function makeMove(e) {
    if (isAvailable(e)) {
      if (token == players[0].getToken()) {
        boardContent[isAvailable(e)] = token;
        render();
        token = players[1].getToken();

        renderMsg(players[1]);
      } else if (token == players[1].getToken()) {
        boardContent[isAvailable(e)] = token;
        render();
        token = players[0].getToken();

        renderMsg(players[0]);
      }
    } else {
      alert("Invalid move! Try again");
    }

    checkWin(boardContent, token);
  }

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
        winner = players[1].getName();
      } else {
        winner = players[0].getName();
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
    tiles.forEach((tile) => tile.removeEventListener("click", makeMove));
    renderMsg("Game Over");
    if (winner == "tie") {
      alert("It was a tie! Press the restart button to play again");
    } else {
      alert(`Player ${winner} won! Press the restart button to play again`);
    }
  }

  function isAvailable(e) {
    if (e.target.innerText == "") {
      return e.target.classList[1];
    } else {
      return false;
    }
  }

  function clearBoard() {
    boardContent = ["", "", "", "", "", "", "", "", ""];
    render();
    tiles.forEach((tile) => tile.addEventListener("click", makeMove));
    token = players[0].getToken();
  }
})();
