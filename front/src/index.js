/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable quotes */
const grid = document.querySelector(".grid");
const squares = Array.from(document.querySelectorAll(".grid div"));
const width = 10;

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
const currentRotation = 0;

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
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
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
