
function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  console.log(gridContainer)
  for (let i = 0; i < 256; i++) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.classList.add(`grid-ref-${i+1}`);
    gridContainer.appendChild(gridSquare);
  }
}

createGrid();
