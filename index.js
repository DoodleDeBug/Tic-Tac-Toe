(() => {
  // iffe initialize the game

  const gameBoard = (() => {
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

  const player = {
    init: () => {
      player.cacheDom();
      player.bindEvents();
    },
    cacheDom: () => {
      this.body = document.querySelector("body");
      this.modal = document.querySelector(".modal-backdrop");
      this.form = document.querySelector("#form");
      this.start = document.querySelector("#start");
    },
    bindEvents: () => {
      this.form.addEventListener("submit", player.getPlayers);
    },
    reset: () => {
      this.modal.classList.toggle("hidden");
      display.remove();
      gameBoard.clear();
    },
    getPlayers: (e) => {
      e.preventDefault();
      let player1 = document.querySelector("#p1-name").value;
      console.log(player1);
      let player2 = document.querySelector("#p2-name").value;
      console.log(player2);
      player.clearForm();
      player.render(player1, player2);
      player.player1Turn(player1, player2);
    },
    clearForm: () => {
      document.querySelector("#p1-name").value = "";
      document.querySelector("#p2-name").value = "";
    },
    player1Turn: (p1, p2) => {
      console.log(p1);
      /////////// //insert player move function here/////////////////
      // player.player2Turn(p1, p2);
    },
    player2Turn: (p1, p2) => {
      console.log(p2);
      /////////// //insert player move function here/////////////////
      player.player1Turn(p1, p2);
    },
    render: (p1, p2) => {
      this.modal.classList.toggle("hidden");
      this.display = document.createElement("div");
      display.classList.add("display-box");
      display.innerText = `${p1} vs ${p2}`;
      this.body.insertBefore(display, this.body.childNodes[5]);
    },
  };

  const game = {
    init: () => {
      game.cacheDom();
      game.bindEvents();
      game.render();
    },
    cacheDom: () => {
      this.restart = document.querySelector(".restart");
    },
    bindEvents: () => {
      this.restart.addEventListener("click", game.restartGame);
    },
    restartGame: () => {
      player.reset();
      console.log("restarted game");
    },
    render: () => {
      // gameBoard.init;
      player.init;
    },
  };

  player.init(); //get player names
  game.init();
})();
