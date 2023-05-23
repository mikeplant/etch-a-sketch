

const sizeSlider = document.querySelector('#board-size');
let gridSize = 12;

function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < (gridSize * gridSize); i++) {
    let gridSquare = document.createElement('div');
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

function resizeGrid() {
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.remove();
  });
  createGrid();
}

sizeSlider.addEventListener('input', (e) => {
  const sizeDisplay = document.querySelector('#size-display');
  const value = e.target.value;
  sizeDisplay.textContent = `${value} x ${value}`;
  gridSize = value;
  resizeGrid();
});

createGrid();

