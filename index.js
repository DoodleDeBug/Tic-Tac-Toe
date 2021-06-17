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
      this.body = document.querySelector("body");
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

  // const player = (name, token) => {
  //   return { name, token };
  // };
})();
