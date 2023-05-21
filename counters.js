function selectBox(sBox){
    let cells = [];
    for (let i = 0; i < sodokuBoard.length; i++) {
        for (let j = 0; j < sodokuBoard[i].length; j++) {
            if (sodokuBoard[i][j].box === sBox) {
                cells.push(sodokuBoard[i][j]);
            }
        }
    }
    return cells
}

function selectRow(sRow){
    let cells = [];
    for (let i = 0; i < sodokuBoard.length; i++) {
        for (let j = 0; j < sodokuBoard[i].length; j++) {
            if (sodokuBoard[i][j].j === sRow) {
                cells.push(sodokuBoard[i][j]);
            }
        }
    }
    return cells
}

function selectCol(sCol){
    let cells = [];
    for (let i = 0; i < sodokuBoard.length; i++) {
        for (let j = 0; j < sodokuBoard[i].length; j++) {
            if (sodokuBoard[i][j].i === sCol) {
                cells.push(sodokuBoard[i][j]);
            }
        }
    }
    return cells
}

function updateUndetermined() {
    for (const cell of undeterminedCellStack){
        if (cell.determined){
            removeFromArray(undeterminedCellStack,cell)
        }
    }
    for (const col of sodokuBoard){
        for (const cell of col){
            if(cell.determined){continue}
            else if(undeterminedCellStack.includes(cell)){continue}
            undeterminedCellStack.push(cell)
        }
    }
}

function updateSingles() {
    updateUndetermined();
    singleCellStack = [];
    for (const cell of undeterminedCellStack){
        if(cell.countPossibilities() == 1 && !singleCellStack.includes(cell)){
            singleCellStack.push(cell)
        } else {continue}
    }
}

function updatePairs(){
    updateUndetermined();
    pairCellStack = []
    for (const cell of undeterminedCellStack){
        if(cell.countPossibilities() == 2 && !pairCellStack.includes(cell)){
            pairCellStack.push(cell)
        } else {continue}
    }
}

function updateTriplets(){
    updateUndetermined();
    tripletCellStack = []
    for (const cell of undeterminedCellStack){
        if(cell.countPossibilities() == 3 && !tripletCellStack.includes(cell)){
            tripletCellStack.push(cell)
        } else {continue}
    }
}