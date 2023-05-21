var testCell, cellWidth, cellHeight, sodokuBoard, singleCellStack, undeterminedCellStack, pairCellStack, tripletCellStack;
var iNext, jNext, numberNext, iPrev, jPrev;
var stage = 'singles';
var iPair1, iPair2, jPair1, jPair2, pairStack;
var tries = 0;
var stopLoop = false;
var fR = 5;
sodokuBoard = [];
pairStack = [];
undeterminedCellStack = [];
singleCellStack = [];
pairCellStack = [];
tripletCellStack = [];

function setup() {
  width = 500;
  createCanvas(width, width);
  cellWidth = width / 9;
  for (let i = 0; i < 9; i++) {
    sodokuBoard[i] = [];
    for (let j = 0; j < 9; j++) {
      //const c = color(random(255), random(255), random(255));
      const c = 255;
      const block = determineBlock(i, j);
      sodokuBoard[i][j] = new Cell(i * cellWidth, j * cellWidth, c, i, j, block);
    }
  };
  initialBoard();
  console.log(selectCol(0));
}
function draw() {
  // noLoop();
  background(255);
  var determinedCount = 0;
  for (const col of sodokuBoard) {
    for (const cell of col) {
      const { number, x, y, determined, color, i, j } = cell;
      sodokuBoard[i][j].color = 255;
      fill(color)
      strokeWeight(1)
      square(x, y, cellWidth)
      if (determined) {
        determinedCount++;
        textSize(cellWidth);
        textAlign(CENTER)
        fill(0)
        text(number, x + cellWidth / 2, y + cellWidth / 1.2)
      } else {
        buildPossibilities(cell)
      }
    }
  };
  for (var i = 0; i < 10; i++) {
    switch (i % 3) {
      case 0:
        strokeWeight(4);
        break
      default:
        strokeWeight(1);
    }
    line(0, cellWidth * i, width, cellWidth * i)
    line(cellWidth * i, 0, cellWidth * i, width)
  }
  if (iNext != undefined) {
    tries = 0;
    sodokuBoard[iNext][jNext].setValue(numberNext);
    sodokuBoard[iNext][jNext].color = color('green');
  }
  if (determinedCount > 80) {
    noLoop()
  }
  if (stopLoop) {
    noLoop()
  }
  console.log(stage)
  switch (stage) {
    case 'singles':
      try {
        findSingle();
        sodokuBoard[iNext][jNext].color = color('cyan');
      } catch (e) {
        iNext = undefined;
        console.error(e);
        // noLoop()
      }
      break
    case 'nakedPairs':
      try {
        solveNakedPairs();
      } catch (e) {
        console.error(e)
        //noLoop();
      }
      // noLoop()
      break
    case 'lastRemainingCell':
      try {
        lastRemainingCell();
      } catch (e) {
        console.error(e)
      }
      // noLoop();
      break
    case 'triplets':
      try {
        solveTriplets()
      } catch (e) {
        console.error(e)
      }
      break
    case 'NEXT':
      console.log('Cannot Solve it yet')
      noLoop();
  }
  // console.log(pairStack)
  frameRate(fR)
}
function buildPossibilities(cell) {
  const { possibilities, x, y } = cell;
  const w = cellWidth / 3;
  textSize(w);
  textAlign(CENTER);
  fill(0);


  for (const [key, value] of Object.entries(possibilities)) {
    textSize(w * 0.8);
    textAlign(CENTER);
    fill(0);
    switch (value) {
      case 1:
        text(value, x + w / 2, y + w / 1.2)
        break
      case 2:
        text(value, x + w / 2 + w, y + w / 1.2)
        break
      case 3:
        text(value, x + w / 2 + w * 2, y + w / 1.2)
        break
      case 4:
        text(value, x + w / 2, y + w / 1.2 + w)
        break
      case 5:
        text(value, x + w / 2 + w, y + w / 1.2 + w)
        break
      case 6:
        text(value, x + w / 2 + w * 2, y + w / 1.2 + w)
        break
      case 7:
        text(value, x + w / 2, y + w / 1.2 + w * 2)
        break
      case 8:
        text(value, x + w / 2 + w, y + w / 1.2 + w * 2)
        break
      case 9:
        text(value, x + w / 2 + w * 2, y + w / 1.2 + w * 2)
        break
    }
  }

  // textSize(w);
  // textAlign(CENTER)
  // fill('green')
  // text(number, x + w / 2, y + w / 1.2)

}



function determineBlock(i, j) {
  if (i < 3) {
    if (j < 3) { return 0 }
    else if (j < 6) { return 1 }
    else { return 2 }
  } else if (i < 6) {
    if (j < 3) { return 3 }
    else if (j < 6) { return 4 }
    else { return 5 }
  } else {
    if (j < 3) { return 6 }
    else if (j < 6) { return 7 }
    else { return 8 }
  }
}