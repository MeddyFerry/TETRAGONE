/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */
const grid = document.querySelector(".grid");
const squares = Array.from(document.querySelectorAll(".grid div"));
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector(".startBtn");
let timerId;
const width = 10;
let nextRandom = 0;

// The Tetrominoes
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][currentRotation];

/* ICI : rotation des Tétraminos
 * pour chaque tetromino, on a 4 positions possibles
 * => créer une fonction qui va permettre de 'dessiner' mes tetrominos
 * => + créer une variable qui va stocker la position actuelle du tetromino
 * => et enfin ajouter une class à chaque tetromino
 *
 */

function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// assign function to keycodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    // moveDown();
  }
}
document.addEventListener("keyup", control);

// move down va nous permettre de faire descendre nos tetraminos
// => 'undraw' pour enlever les tetraminos de la grille
// puis on va ajouter la largeur de la grille à la position actuelle du tetramino
// move down function

function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// freeze function
function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

/**
 * bouger le tétramino vers un autre carré indexé de notre grille
 * Ex : si je suis a l'index 10, je ne peux pas  aller à gauche
 * => écrire une fonction qui va vérifier si je suis à l'index 10/ 20/ 30/ 40
 * qui correpsondent à la bordure gauche de notre grille
 * la fonction va undraw et draw le tétramino pour le deplacer
 */

function moveLeft() {
  undraw();
  // je définis la bordure gauche de ma grille
  // some() va vérifier si au moins une des valeurs de mon tableau est true
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width === 0
  );
  if (!isAtLeftEdge) currentPosition -= 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition += 1;
  }
  draw();
}
// même logique qu'au dessus
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width - 1
  );
  if (!isAtRightEdge) currentPosition += 1;
  if (
    current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  ) {
    currentPosition -= 1;
  }
  draw();
}

/**
 * rotation function
 * pour faire la rotation, on va utiliser un algo
 * qui va  incrémenter ou désincrémenter la valeur de currentRotation d'un cran
 *
 */

function rotate() {
  undraw();
  currentRotation++;
  // si la valeur de currentRotation est supérieure à 3, on la remet à 0
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominoes[random][currentRotation];
  draw();
}

// affiche moi le prochain tetramino
const displaySquares = document.querySelectorAll(".mini-grid div");
const displayWidth = 4;
const displayIndex = 0;

// les tetramino sans rotation
const upNextTetrominoes = [
  [1, displayWidth + 1, displayWidth * 2 + 1, 2], // lTetromino
  [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetromino
  [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetromino
  [0, 1, displayWidth, displayWidth + 1], // oTetromino
  [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iTetromino
];

// affiche la forme du prochain tetramino
function displayShape() {
  // remove any trace of a tetromino form the entire grid
  displaySquares.forEach((square) => {
    square.classList.remove("tetromino");
    // square.style.backgroundColor = ''
  });
  upNextTetrominoes[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add("tetromino");
    //  displaySquares[displayIndex + index].style.backgroundColor =
    //  colors[nextRandom];
  });
}

// button
startBtn.addEventListener("click", () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  } else {
    draw();
    timerId = setInterval(moveDown, 300);
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    displayShape();
  }
});

// score
