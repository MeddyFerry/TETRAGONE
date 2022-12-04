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

const scoring = document.querySelector("#score");
const StartBtn = document.querySelector(".startBtn");
const Width = 10; // on donne la largeur de la grille
const squares = Array.from(document.querySelectorAll(".grid-item")); // ici, chaque div contenu dans l'array aura son index spécifique => obligatoire pour positioner le tetromino
const container = document.querySelector(".grid");

console.log(squares);

const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const GRID_SIZE = GRID_WIDTH * GRID_HEIGHT;

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
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
  [0, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2, GRID_WIDTH * 2 + 1],
];

const tTetromino = [
  // la forme en T
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2],
  [1, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH * 2 + 1],
  [1, GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1],
];

const oTetromino = [
  // la forme en  carré
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
  [0, 1, GRID_WIDTH, GRID_WIDTH + 1],
];

const iTetromino = [
  // la forme en ligne
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
  [1, GRID_WIDTH + 1, GRID_WIDTH * 2 + 1, GRID_WIDTH * 3 + 1],
  [GRID_WIDTH, GRID_WIDTH + 1, GRID_WIDTH + 2, GRID_WIDTH + 3],
];

// tableau de tableaux qui contient les 5 formes de tetrominos
const theTetrominoes = [
  lTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];
