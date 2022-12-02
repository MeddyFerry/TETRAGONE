/* eslint-disable no-plusplus */
/* eslint-disable quotes */
// créer une div 'square' qui contiendra nos 'grid'
const square = document.createElement("div");

function createGrid() {
  for (let i = 0; i < 256; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    square.appendChild(grid);
  }
}

createGrid();
