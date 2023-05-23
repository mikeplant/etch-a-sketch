
let gridSquare;

function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  for (let i = 0; i < 256; i++) {
    gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridContainer.appendChild(gridSquare);

    gridSquare.addEventListener('mouseover', (e)=> {
      fillColour(e.target);
    });
  }
}

function fillColour(selectedSquare) {
  selectedSquare.classList.add('filled-square');
}

createGrid();

