/////////////////PLAYER //////////////////

const player = (name, token) => {
  const getToken = () => token;
  const getName = () => name;

  return { getName, getToken };
};

const game = (() => {
  //cache DOM
  const modal = document.querySelector(".modal-backdrop");
  const form = document.querySelector("#form");
  const restartBtn = document.querySelector(".restart");
  const display = document.getElementById("display");

  //bindEvents
  form.addEventListener("submit", getPlayers);
  restartBtn.addEventListener("click", restartGame);

  function getPlayers(e) {
    e.preventDefault();

    let players = setPlayers();

    clearForm();
    modal.classList.toggle("hidden");

    // player1.displayTurn(player1.name);

    render(players[0]);
  }

  function setPlayers() {
    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    return [player1, player2];
  }

  function render(player) {
    console.log(player.getName());
    // display.innerText = `${p1.getName()} vs ${p2.getName()}`;
    if (player.getName() == "") {
      display.innerText = `It's ${player.getToken()}'s turn`;
    } else {
      display.innerText = `It's ${player.getName()}'s turn. Your token is ${player.getToken()}`;
    }
  }

  function restartGame() {
    modal.classList.toggle("hidden");
    display.innerText = "";
    gameBoard.restart();
    console.log("restarted game");
  }

  function clearForm() {
    document.querySelector("#p1-name").value = "";
    document.querySelector("#p2-name").value = "";
  }

  return { setPlayers, render };
})();

///////////////// GAMEBOARD //////////////////

const gameBoard = (() => {
  // all things that affect the board

  let boardContent = ["", "", "", "", "", "", "", "", ""];
  let players = game.setPlayers();
  let token = players[0].getToken();
  let tiles;

  // cache DOM
  const board = document.querySelector(".board");

  render();

  function render() {
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add(i);
      tile.innerText = boardContent[i]; // inner text of tile corresponds to boardcontent
      board.appendChild(tile);

      //cache DOM
      tiles = document.querySelectorAll(".tile");

      //bind events
      tiles.forEach((tile) => tile.addEventListener("click", makeMove));
    }
  }

  function makeMove(e) {
    if (isAvailable(e)) {
      if (token == players[0].getToken()) {
        boardContent[isAvailable(e)] = token;
        update();
        token = players[1].getToken();
        game.render(players[1]);
      } else if (token == players[1].getToken()) {
        boardContent[isAvailable(e)] = token;
        update();
        token = players[0].getToken();
        game.render(players[0]);
      }
    } else {
      alert("invalid move");
    }
  }

  function isAvailable(e) {
    if (e.target.innerText == "") {
      return e.target.classList[1];
    } else {
      return false;
    }
  }

  function update() {
    tiles.forEach((tile) => tile.remove());
    render();
  }

  function restart() {
    tiles.forEach((tile) => tile.remove());
    boardContent = ["", "", "", "", "", "", "", "", ""];
    render();
  }

  return {
    boardContent,
    render,
    makeMove,
    restart,
  };
})();
