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
    },
    bindEvents: () => {
      //add events
    },
    render: () => {
      gameBoard.boardContent.forEach((square) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerText = square;
        this.board.appendChild(tile);
      });
    },
  };

  gameBoard.init();

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
      this.body.appendChild(display);
    },
  };

  player.init();
})();
