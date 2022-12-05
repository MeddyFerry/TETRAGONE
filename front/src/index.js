/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */

const b = document.body;

function gridContainer() {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  b.appendChild(grid);
}
gridContainer();

function createGridItem() {
  for (let i = 0; i < 200; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    document.querySelector(".grid").appendChild(gridItem);
  }
}
createGridItem();
// const scoring = document.querySelector("#score");
// const StartBtn = document.querySelector(".startBtn");
// const container = document.querySelector(".grid");

const Width = 10; // on donne la largeur de la grille
const squares = Array.from(document.querySelectorAll(".grid-item")); // ici, chaque div contenu dans l'array aura son index spécifique => obligatoire pour positioner le tetromino

const width = 10;

/* ICI :
 * => array de chacun des mes tetrominos
 * chaque tetromino est un array de 4 index
 * chaque index est un array de 2 index
 * chaque index représente une case de la grille (".grid")
 */
const lTetromino = [
  [1, Width + 1, Width * 2 + 1, 2], // la forme en L
  [Width, Width + 1, Width + 2, Width * 2 + 2],
  [1, Width + 1, Width * 2 + 1, Width * 2],
  [Width, Width * 2, Width * 2 + 1, Width * 2 + 2],
];

const zTetromino = [
  // la forme en Z
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  // la forme en T
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  // la forme en  carré
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  // la forme en 'ligne'
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

// tableau de tableaux qui contient les 5 formes de tetrominos
const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

// position des Tétraminos
let currentPosition = 4;
const currentRotation = 0;

// randomly select a Tetromino and its first rotation
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

// function qui va nous permettre de faire descendre dns nos tetraminos dans une interval definie
const timer = setInterval(moveDown, 300);

// move down va nous permettre de faire descendre nos tetraminos
// => 'undraw' pour enlever les tetraminos de la grille
// puis on va ajouter la largeur de la grille à la position actuelle du tetramino
// move down function
function moveDown() {
  if (
    !current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    undraw();
    currentPosition += width;
    draw();
  } else {
    freeze();
  }
}

// freeze function
function freeze() {
  current.forEach((index) =>
    squares[currentPosition + index].classList.add("taken")
  );
  // start a new tetromino falling
  random = nextRandom;
  nextRandom = Math.floor(Math.random() * theTetrominoes.length);
  current = theTetrominoes[random][currentRotation];
  currentPosition = 4;
  draw();
}
