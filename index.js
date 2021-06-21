const game = (() => {
  // iffe initialize the game

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
    let boardContent = ["x", "o", "x", "x", "o", "o", "x", "x", "o"];

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
        tiles.forEach((tile) => tile.addEventListener("click", isAvailable));
      }
    }

    // function bindEvents() {
    //   tiles.forEach((tile) => tile.addEventListener("click", isAvailable));
    // }

    function isAvailable(e) {
      console.log(e.target.classList[1]);
      // console.log(e.target.innerText == "" ? true : false);
      e.target.innerText == "" ? true : false;
    }
    function clear() {
      tiles.forEach((tile) => tile.remove());
      boardContent = ["", "", "", "", "", "", "", "", ""];
      render();
    }

    return {
      boardContent,
      render,
      isAvailable,
      clear,
    };
  })();

  const player = (() => {
    // should be a factory function so that I can make player and do like mark = new player.... mark.makeMove etc
    //cache DOM
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal-backdrop");
    const form = document.querySelector("#form");
    const start = document.querySelector("#start");

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
      player1Turn(player1, player2);
    }

    function render(p1, p2) {
      modal.classList.toggle("hidden");
      display = document.createElement("div");
      display.classList.add("display-box");
      display.innerText = `${p1} vs ${p2}`;
      body.insertBefore(display, body.childNodes[5]);
    }

    function clearForm() {
      document.querySelector("#p1-name").value = "";
      document.querySelector("#p2-name").value = "";
    }

    function player1Turn(p1, p2) {
      console.log(p1);
      /////////// //insert player move function here/////////////////
      // player.player2Turn(p1, p2);
    }
    function player2Turn(p1, p2) {
      console.log(p2);
      /////////// //insert player move function here/////////////////
      player.player1Turn(p1, p2);
    }

    function reset() {
      modal.classList.toggle("hidden");
      display.remove();
      gameBoard.clear();
    }

    return {
      player1Turn,
      player2Turn,
      reset,
    };
  })();
})();
