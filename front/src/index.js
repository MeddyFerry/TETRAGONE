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
