const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMesssage = document.querySelector('[data-winning-message]');
const winningBox = document.querySelector('[data-winning-box]');
const restartButton = document.querySelector('[data-restart]');

let isCircleTurn;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  isCircleTurn = false;
  for (const cell of cellElements) {
    cell.classList.remove('circle');
    cell.classList.remove('x');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  }

  setBoard();
  winningBox.classList.remove('showWinner');
};

const endGame = (isDraw) => {
  if (isDraw) {
    winningMesssage.innerText = 'Empate';
  } else {
    winningMesssage.innerText = isCircleTurn ? 'Circulo Venceu' : 'X Venceu';
  }

  winningBox.classList.add('showWinner');
};
const handleRestart = () => {};

const checkWin = (currentPlayer) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

const checkDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
};

const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

const setBoard = () => {
  board.classList.remove('circle');
  board.classList.remove('x');

  if (isCircleTurn) {
    board.classList.add('circle');
  } else {
    board.classList.add('x');
  }
};

const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoard();
};

const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? 'circle' : 'x';

  placeMark(cell, classToAdd);

  const isWin = checkWin(classToAdd);

  const isDraw = checkDraw();

  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  } else {
    swapTurns();
  }
};

startGame();

restartButton.addEventListener('click', startGame);
