function findSingle() {
    var foundTarget = false;
    for (const col of sodokuBoard) {
        for (const cell of col) {
            const { determined, i, j, possibilities } = cell;
            if (determined) { continue };
            if (Object.keys(possibilities).length === 1) {
                foundTarget = true;
                iNext = i;
                jNext = j;
                const [value] = Object.entries(possibilities);
                numberNext = value[1];
            }
        }
    }
    if (!foundTarget) {
        stage = 'nakedPairs'
        tries++;
        throw 'No Next Target was found'
    }
}

function solveNakedPairs() {
    const stack = {};
    var foundPair = false;
    var stackPoints = [];
    for (const col of sodokuBoard) {
        for (const cell of col) {
            const { possibilities, i, j, box } = cell;
            if (Object.keys(possibilities).length === 2) {
                stack[i.toString() + j] = {
                    possibilities: Object.keys(possibilities),
                    i: i,
                    j: j,
                    box: box
                }
                if (!pairStack.includes(i.toString() + j)) {
                    stackPoints.push(i.toString() + j);
                }
                // console.log(stackPoints)
            }
        }
    }
    if (Object.keys(stack).length) {
        for (const point of stackPoints) {
            if(foundPair){break}
            stackPoints = removeFromArray(stackPoints, point);
            const mainCell = stack[point];
            for (const insidePoint of stackPoints) { 
                if(foundPair){break}
                const insideCell = stack[insidePoint];
                if (insideCell.box == mainCell.box && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
                    foundPair = true;
                    sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
                    sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
                    stackPoints = removeFromArray(stackPoints, insidePoint);
                    for (const number of mainCell.possibilities) {
                        for (const col of sodokuBoard) {
                            for (const cell of col) {
                                if (cell.box == mainCell.box) {
                                    const { i, j } = cell;
                                    if (i == insideCell.i && j == insideCell.j) { continue }
                                    if (i == mainCell.i && j == mainCell.j) { continue }
                                    if (sodokuBoard[i][j].determined) {continue}
                                    sodokuBoard[i][j].color = color('red')
                                    sodokuBoard[i][j].removePossibility(number);
                                    // stopLoop = true
                                } else {
                                    continue
                                }
                            }
                        }
                    }
                }
                if (insideCell.i == mainCell.i && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
                    foundPair = true;
                    sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
                    sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
                    stackPoints = removeFromArray(stackPoints, insidePoint);
                    for (const number of insideCell.possibilities) {
                        for (var j = 0; j < 9; j++) {
                            if (j == insideCell.j || j == mainCell.j) { continue };
                            if (sodokuBoard[insideCell.i][j].determined) {continue};
                            sodokuBoard[insideCell.i][j].color = color('red')
                            sodokuBoard[insideCell.i][j].removePossibility(number);
                        }
                    }
                    pairStack.push(mainCell.i.toString() + mainCell.j)
                    iPair1 = insideCell.i;
                    iPair2 = mainCell.i;
                    jPair1 = insideCell.j;
                    jPair2 = mainCell.j;
                    break
                } else if (insideCell.j == mainCell.j && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
                    foundPair = true;
                    sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
                    sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
                    stackPoints = removeFromArray(stackPoints, insidePoint);
                    for (const number of insideCell.possibilities) {
                        for (var i = 0; i < 9; i++) {
                            if (i == insideCell.i || i == mainCell.i) { continue };
                            if (sodokuBoard[i][insideCell.j].determined) {continue};
                            sodokuBoard[i][insideCell.j].color = color('red')
                            sodokuBoard[i][insideCell.j].removePossibility(number);
                        }
                    }
                    pairStack.push(mainCell.i.toString() + mainCell.j)
                    iPair1 = insideCell.i;
                    iPair2 = mainCell.i;
                    jPair1 = insideCell.j;
                    jPair2 = mainCell.j;
                    break
                }
            }
        }
    }
    if (!foundPair && tries > 1) {
        stage = 'NEXT'
        throw 'No Pairs Found'
    } else if (!foundPair) {
        stage = 'singles'
        throw 'No Unsolved Naked Pairs'
    } else {
        stage = 'singles'
        tries = 0;
    }
}

function removeFromArray(arr, value) {
    return arr.filter(item => item != value)
}
function compareArrays(arr1, arr2) {
    return arr1.length === arr2.length &&
        arr1.every((v, i) => v === arr2[i])
}