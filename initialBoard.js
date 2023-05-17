function setBoardValues(inputArray) {
  // Check if the input array is of the correct length
  if (inputArray.length !== 81) {
    console.error('Invalid input array length. Expected 81, got ' + inputArray.length);
    return;
  }

  // Iterate over the cells in sudokuBoard
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      // Get the corresponding value from the input array
      let value = inputArray[j * 9 + i];

      // Set the cell value
      sodokuBoard[i][j].setValue(value);
    }
  }
}
function initialBoard(){
  setBoardValues([
    0,1,7,  0,5,0,  9,0,0,
    0,0,0,  0,0,0,  0,0,1,
    2,0,0,  0,0,0,  4,0,0,
    4,0,0,  0,3,1,  5,6,0,
    9,0,0,  6,0,0,  0,4,0,
    0,0,8,  0,0,0,  0,9,0,
    0,4,6,  0,8,0,  0,0,0,
    0,0,3,  4,0,0,  0,0,0,
    0,8,0,  0,0,6,  0,0,0
  ])
}