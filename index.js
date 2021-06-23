const game = (() => {
  // iffe initialize the game
  let token = "";
  //cache DOM
  restart = document.querySelector(".restart");

  //bindEvents
  restart.addEventListener("click", restartGame);

  function restartGame() {
    player.reset();
    console.log("restarted game");
  }

  const gameBoard = (() => {
    // all things that affect the board
    let boardContent = ["", "", "", "", "", "", "", "", ""];

    const board = document.querySelector(".board");
    let tiles;

    render();

    function render() {
      for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.classList.add(i);
        tile.innerText = boardContent[i];
        board.appendChild(tile);

        //cache DOM
        tiles = document.querySelectorAll(".tile");

        //bind events
        tiles.forEach((tile) => tile.addEventListener("click", makeMove));
      }
    }

    // function bindEvents() {
    //   tiles.forEach((tile) => tile.addEventListener("click", isAvailable));
    // }

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
        refresh();
      } else {
        alert("invalid move");
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
    function refresh() {
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

  const player = (() => {
    // should be a factory function so that I can make player and do like mark = new player.... mark.makeMove etc

    //cache DOM
    const modal = document.querySelector(".modal-backdrop");
    const form = document.querySelector("#form");

    //bind Events
    form.addEventListener("submit", getPlayers);

    function getPlayers(e) {
      e.preventDefault();
      let player1 = document.querySelector("#p1-name").value;
      console.log(player1);
      let player2 = document.querySelector("#p2-name").value;
      console.log(player2);
      clearForm();
      render(player1, player2);
    }

    function render(p1, p2) {
      modal.classList.toggle("hidden");
      display = document.getElementById("display");

      display.innerText = `${p1} vs ${p2}`;
    }

    function clearForm() {
      document.querySelector("#p1-name").value = "";
      document.querySelector("#p2-name").value = "";
    }

    function reset() {
      modal.classList.toggle("hidden");
      display.innerText = "";
      gameBoard.restart();
    }

    return {
      reset,
    };
  })();
})();
