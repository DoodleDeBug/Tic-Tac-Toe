// (() => {
//   // iffe initialize the game
//   const body = document.querySelector("body");

//   const gameBoard = (() => {
//     let boardContent = ["x", "o", "x", "x", "o", "o", "x", "x", "o"];

//     const board = document.querySelector(".board");

//     const displayBoard = boardContent.forEach((square) => {
//       const tile = document.createElement("div");
//       tile.classList.add("tile");
//       tile.innerText = square;
//       board.appendChild(tile);
//     });

//     return { boardContent, displayBoard };
//   })();

//   const player = (name, token) => {
//     return { name, token };
//   };
// })();

(() => {
  // iffe initialize the game

  const gameBoard = {
    boardContent: ["x", "o", "x", "x", "o", "o", "x", "x", "o"],
    init: () => {
      gameBoard.cacheDom();
      gameBoard.render();
    },
    cacheDom: () => {
      this.board = document.querySelector(".board");
      this.tiles = document.querySelectorAll(".tile");
    },
    bindEvents: () => {
      //add events
    },
    clear: () => {
      gameBoard.cacheDom();
      this.tiles.forEach((tile) => tile.remove());
      gameBoard.boardContent = ["", "", "", "", "", "", "", "", ""];
      gameBoard.render();
    },
    render: () => {
      // gameBoard.boardContent.forEach((square) => {
      //   const tile = document.createElement("div");
      //   tile.classList.add("tile");
      //   tile.classList.add(gameBoard.boardContent.indexOf(square));
      //   tile.innerText = square;
      //   this.board.appendChild(tile);
      // });

      for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.classList.add(i);
        tile.innerText = gameBoard.boardContent[i];
        this.board.appendChild(tile);
      }
    },
  };

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
    },
    clearForm: () => {
      document.querySelector("#p1-name").value = "";
      document.querySelector("#p2-name").value = "";
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
      gameBoard.init;
      player.init;
    },
  };

  gameBoard.init(); // make board w/ tiles
  player.init(); //get player names
  game.init();
})();
