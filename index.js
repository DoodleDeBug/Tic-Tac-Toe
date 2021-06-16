const gameBoard = (() => {
  let boardContent = ["x", "o", "x", "x", "o", "o", "x", "x", "o"];

  const board = document.querySelector(".board");
  const tile = document.createElement("div");
  tile.classList.add("tile");

  const displayBoard = boardContent.forEach((square) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.innerText = square;
    board.appendChild(tile);
  });

  return { boardContent, displayBoard };
})();

const player = (token) => {
  return { token };
};
