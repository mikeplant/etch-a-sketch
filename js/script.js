const sizeSlider = document.querySelector('#board-size');
const colorPicker = document.querySelector('#color-picker');
const canvasColorPicker = document.querySelector('#canvas-color-picker');
const randomBtn = document.querySelector('#random-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraserBtn = document.querySelector('#eraser-btn');
let colorChoiceHex = '#000000';
let canvasColor = '#ffffff';
let gridSize = 12;
let eraserActive = false;

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
  if (eraserActive) {
    selectedSquare.style.backgroundColor = canvasColor;
  } else {
    if (typeof colorChoiceHex === 'string') {
      selectedSquare.style.backgroundColor = colorChoiceHex;
    } else {
      selectedSquare.style.backgroundColor = colorChoiceHex();
    }
  }
}

function resizeGrid() {
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.remove();
  });
  createGrid();
}

function randomColor() {
  return Math.floor(Math.random()*16777215).toString(16);
}

// Random Colour choice
randomBtn.addEventListener('click', () => {
  eraserActive = false;
  colorChoiceHex = '#' + randomColor();
});


// Activate rainbow mode
rainbowBtn.addEventListener('click', e => {
  eraserActive = false;
  colorChoiceHex = () => {
    return '#' + randomColor();
  };
});

// Activate eraser
eraserBtn.addEventListener('click', () => {
  if (eraserActive) {
    eraserActive = false;
  } else {
    eraserActive = true;
  }
})

// Change brush colour 
colorPicker.addEventListener('input', e => {
  eraserActive = false;
  colorChoiceHex = e.target.value;
});


// Change background colour
canvasColorPicker.addEventListener('input', e => {
  eraserActive = false;
  let newColor = e.target.value;
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.style.backgroundColor = newColor;
    canvasColor = newColor;
  });
});

// Change grid size
sizeSlider.addEventListener('input', e => {
  eraserActive = false;
  const sizeDisplay = document.querySelector('#size-display');
  const value = e.target.value;
  sizeDisplay.textContent = `${value} x ${value}`;
  gridSize = value;
  resizeGrid();
});

createGrid();

// gradient
// Reset