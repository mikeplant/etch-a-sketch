const sizeSlider = document.querySelector('#board-size');
const colorPicker = document.querySelector('#color-picker');
const canvasColorPicker = document.querySelector('#canvas-color-picker');
const randomBtn = document.querySelector('#random-btn');
const rainbowBtn = document.querySelector('#rainbow-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const resetBtn = document.querySelector('#reset-btn');
const gridlinesBtn = document.querySelector('#gridlines-btn');
let colorChoiceHex = '#000000';
let canvasColor = '#ffffff';
let gridSize = 12;
let eraserActive = false;
let rainbowActive = false;
let gridLinesActive = true;

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
    if(rainbowActive) {
      selectedSquare.style.backgroundColor = randomHexColor(); 
    } else {
      selectedSquare.style.backgroundColor = colorChoiceHex;
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

function randomHexColor() {
  return '#' + (Math.random().toString(16) + "000000").slice(2, 8);
}

function deactivateEraser() {
  if (eraserActive) eraserBtn.classList.toggle('btn-active');
  eraserActive = false;
}

function deactivateRainbow() {
  if (rainbowActive) rainbowBtn.classList.toggle('rainbow-btn-active');
  rainbowActive = false;
}

function deactivateModes() {
  deactivateEraser();
  deactivateRainbow();
}

// Random Colour choice
randomBtn.addEventListener('click', () => {
  deactivateModes();
  colorChoiceHex = randomHexColor();
  colorPicker.value = colorChoiceHex;
});


// Activate rainbow mode
rainbowBtn.addEventListener('click', e => {
  deactivateEraser();
  if (rainbowActive) {
    deactivateRainbow();
  } else {
    rainbowActive = true;
    rainbowBtn.classList.toggle('rainbow-btn-active');
  }
});

// Toggle eraser
eraserBtn.addEventListener('click', () => {
  deactivateRainbow();
  if (eraserActive) {
    deactivateEraser();
  } else {
    eraserActive = true;
    eraserBtn.classList.toggle('btn-active');
  }
});

// Toggle gridlines
gridlinesBtn.addEventListener('click', () => {
  let gridSquares = document.querySelectorAll('.grid-square');

  if(gridLinesActive) {
    gridSquares.forEach(square => {
      square.style.border = 'none';
      gridLinesActive = false;
    });
  } else {
    gridSquares.forEach(square => {
      square.style.border = '1px solid rgb(83, 83, 83)';
      gridLinesActive = true;
    });
  }
});

// Change brush colour 
colorPicker.addEventListener('input', e => {
  deactivateModes();
  colorChoiceHex = e.target.value;
});


// Change background colour
canvasColorPicker.addEventListener('input', e => {
  deactivateModes();
  let newColor = e.target.value;
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => {
    square.style.backgroundColor = newColor;
    canvasColor = newColor;
  });
});

// Change grid size
sizeSlider.addEventListener('input', e => {
  deactivateEraser();
  const sizeDisplay = document.querySelector('#size-display');
  const value = e.target.value;
  sizeDisplay.textContent = `${value} x ${value}`;
  gridSize = value;
  resizeGrid();
});


// Reset all settings
resetBtn.addEventListener('click', () => {
  deactivateModes();
  colorPicker.value = '#000000';
  colorChoiceHex = '#000000';
  canvasColorPicker.value = '#ffffff';
  canvasColor = '#ffffff';
  gridLinesActive = true;
  resizeGrid();
})

createGrid();

// gradient