const sizeSlider = document.querySelector('#board-size');
const colorPicker = document.querySelector('#color-picker');
const canvasColorPicker = document.querySelector('#canvas-color-picker');
const rainbowBtn = document.querySelector('#rainbow-btn');
let colorChoiceHex = '#000000';
let canvasColor = '#ffffff';
let gridSize = 12;

function createGrid() {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  for (let i = 0; i < (gridSize * gridSize); i++) {
    let gridSquare = document.createElement('div');
    gridSquare.classList.add('grid-square');
    gridSquare.style.backgroundColor = canvasColor;
    gridContainer.appendChild(gridSquare);
    gridSquare.addEventListener('mouseover', e => {
      fillColour(e.target);
    });
  }
}

function fillColour(selectedSquare) {
  if (typeof colorChoiceHex === 'string') {
    selectedSquare.style.backgroundColor = colorChoiceHex;
  } else {
    selectedSquare.style.backgroundColor = colorChoiceHex();
  }
}

function resizeGrid() {
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.remove();
  });
  createGrid();
}

// Activate rainbow mode
rainbowBtn.addEventListener('click', e => {
  colorChoiceHex = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };
});

// Change brush colour 
colorPicker.addEventListener('input', e => {
  colorChoiceHex = e.target.value;
});


// Change background colour
canvasColorPicker.addEventListener('input', e => {
  let newColor = e.target.value;
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.style.backgroundColor = newColor;
    canvasColor = newColor;
  });
});

// Change grid size
sizeSlider.addEventListener('input', e => {
  const sizeDisplay = document.querySelector('#size-display');
  const value = e.target.value;
  sizeDisplay.textContent = `${value} x ${value}`;
  gridSize = value;
  resizeGrid();
});

createGrid();

// random button
// gradient
// Eraser toggle
// Reset