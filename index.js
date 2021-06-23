const game = (() => {
  // iffe initialize the game

  let token = "";

  //cache DOM
  const modal = document.querySelector(".modal-backdrop");
  const form = document.querySelector("#form");
  const restart = document.querySelector(".restart");

  //bindEvents
  form.addEventListener("submit", getPlayers);
  restart.addEventListener("click", restartGame);

  function getPlayers(e) {
    e.preventDefault();

    let player1 = player(document.querySelector("#p1-name").value, "X");
    let player2 = player(document.querySelector("#p2-name").value, "O");

    // console.log(player1);
    // console.log(player2);

    clearForm();
    modal.classList.toggle("hidden");

    player1.displayTurn(player1.name);

    // render(player1, player2);
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

  const gameBoard = (() => {
    // all things that affect the board

    let boardContent = ["", "", "", "", "", "", "", "", ""];
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
        if (token == "") {
          token = "X";
        } else if (token == "X") {
          token = "O";
        } else {
          token = "X";
        }
        boardContent[isAvailable(e)] = token;
        update();
      } else {
        alert("invalid move");
      }
    }

    function alternateMoves(e) {
      if (isAvailable(e)) {
        console.log(player.token);
      }
    }

    function isAvailable(e) {
      // console.log(e.target.classList[1]);
      // console.log(e.target.innerText == "" ? true : false);
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

  const player = (name, token) => {
    // let token = token;

    const displayTurn = (name) => {
      display = document.getElementById("display");

      if (!name) {
        display.innerText = `It's ${token}'s turn`;
      } else {
        display.innerText = `It's ${name}'s turn. Your token is ${token}`;
      }
    };

    return { name, token, displayTurn };
  };

  // const players = (() => {
  //   // should be a factory function so that I can make player and do like mark = new player.... mark.makeMove etc

  //   function render(p1, p2) {
  //     modal.classList.toggle("hidden");
  //     display = document.getElementById("display");

  //     display.innerText = `${p1} vs ${p2}`;
  //   }

  // })();
})();
