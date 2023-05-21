function findSingle() {
    updateSingles();
    if (singleCellStack.length >= 1) {
        const randomElement = Math.floor(Math.random() * singleCellStack.length)
        iNext = singleCellStack[randomElement].i
        jNext = singleCellStack[randomElement].j
        const [value] = Object.entries(singleCellStack[randomElement].possibilities)
        numberNext = value[1]
    } else {
        stage = 'nakedPairs'
        tries++
        throw 'No Next Target Found'
    }
    // for (const col of sodokuBoard) {
    //     for (const cell of col) {
    //         const { determined, i, j, possibilities } = cell;
    //         if (determined) { continue };
    //         if (Object.keys(possibilities).length === 1) {
    //             foundTarget = true;
    //             iNext = i;
    //             jNext = j;
    //             const [value] = Object.entries(possibilities);
    //             numberNext = value[1];
    //         }
    //     }
    // }
    // if (!foundTarget) {
    //     stage = 'nakedPairs'
    //     tries++;
    //     throw 'No Next Target was found'
    // }
}

function solveNakedPairs() {
    var foundTarget = false;
    updatePairs();
    if (pairCellStack.length >= 2 && tries < 2) {
        for (mainCell of pairCellStack) {
            for (innerCell of pairCellStack) {
                if (mainCell === innerCell) { continue }
                if (compareArrays(Object.keys(mainCell.possibilities), Object.keys(innerCell.possibilities))) {
                    mainCell.color = color('yellow')
                    innerCell.color = color('yellow')
                    var arr = [];
                    if (mainCell.box === innerCell.box) {
                        arr = arr.concat(selectBox(mainCell.box))
                    }
                    if (mainCell.i === innerCell.i) {
                        arr = arr.concat(selectCol(mainCell.i))
                    }
                    else if (mainCell.j === innerCell.j) {
                        arr = arr.concat(selectRow(mainCell.j))
                    }
                    for (const cell of arr) {
                        if (cell === mainCell || cell === innerCell) { continue }
                        cell.color = color('red')
                        for (const possibility of Object.keys(cell.possibilities)) {
                            if (Object.keys(mainCell.possibilities).includes(possibility)) {
                                cell.removePossibility(possibility)
                            }
                        }
                    }
                    foundTarget = true;
                    stage = 'singles'
                    break
                }
            }
            if (foundTarget) { break }
        }
        if (!foundTarget) {
            stage = 'triplets'
            throw 'No Naked Pairs Found'
        }
    } else {
        stage = 'triplets'
        throw 'Not enough pairs found'
    }
}

function solveTriplets() {
    var foundTarget = false;
    updateTriplets();
    console.log(tries)
    if (tripletCellStack.length >= 3 && tries < 2) {
        var madeChange = false
        for (mainCell of tripletCellStack) {
            for (middleCell of tripletCellStack) {
                for(innerCell of tripletCellStack){
                    if (mainCell === middleCell || mainCell === innerCell || innerCell === middleCell){continue}
                    var arr = [];
                    const mainP = Object.keys(mainCell.possibilities)
                    const middleP = Object.keys(middleCell.possibilities)
                    const innerP = Object.keys(innerCell.possibilities)
                    var match = false
                    if (mainCell.box===middleCell.box&&mainCell.box===innerCell.box){
                        match = true
                        arr = arr.concat(selectBox(mainCell.box))
                    }
                    if (mainCell.j===middleCell.j&&mainCell.j===innerCell.j){
                        match = true
                        arr = arr.concat(selectRow(mainCell.j))
                    }
                    if (mainCell.i===middleCell.i&&mainCell.i===innerCell.i){
                        match = true
                        arr = arr.concat(selectCol(mainCell.i))
                    }
                    if(!match){continue}
                    if (compareArrays(mainP,innerP)&&compareArrays(innerP,middleP)){
                        arr = arr.filter(e=>e!==mainCell)
                        arr = arr.filter(e=>e!==innerCell)
                        arr = arr.filter(e=>e!==middleCell)
                        for (cell of arr){
                            for (const possibility of Object.keys(mainCell.possibilities)){
                                if(cell.removePossibility(possibility)){
                                    cell.color = color('red')
                                    mainCell.color = color('yellow')
                                    middleCell.color = color('yellow')
                                    innerCell.color = color('yellow')
                                    console.log('Made Change')
                                    madeChange=true
                                    foundTarget=true
                                }
                            }
                        }
                    }
                    if(foundTarget){break}
                }
                if(foundTarget){break}
            }
            if(foundTarget){break}
        }
        if(foundTarget){
            stage = 'singles'
        }
    } else {
        stage = 'lastRemainingCell'
        throw 'Not Enough Triplets'
    }
}

// function solveNakedPairs() {
//     const stack = {};
//     var foundPair = false;
//     var stackPoints = [];
//     for (const col of sodokuBoard) {
//         for (const cell of col) {
//             const { possibilities, i, j, box } = cell;
//             if (Object.keys(possibilities).length === 2) {
//                 stack[i.toString() + j] = {
//                     possibilities: Object.keys(possibilities),
//                     i: i,
//                     j: j,
//                     box: box
//                 }
//                 if (!pairStack.includes(i.toString() + j)) {
//                     stackPoints.push(i.toString() + j);
//                 }
//                 // console.log(stackPoints)
//             }
//         }
//     }
//     if (Object.keys(stack).length) {
//         for (const point of stackPoints) {
//             if(foundPair){break}
//             stackPoints = removeFromArray(stackPoints, point);
//             const mainCell = stack[point];
//             for (const insidePoint of stackPoints) { 
//                 if(foundPair){break}
//                 const insideCell = stack[insidePoint];
//                 if (insideCell.box == mainCell.box && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
//                     foundPair = true;
//                     sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
//                     sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
//                     stackPoints = removeFromArray(stackPoints, insidePoint);
//                     for (const number of mainCell.possibilities) {
//                         for (const col of sodokuBoard) {
//                             for (const cell of col) {
//                                 if (cell.box == mainCell.box) {
//                                     const { i, j } = cell;
//                                     if (i == insideCell.i && j == insideCell.j) { continue }
//                                     if (i == mainCell.i && j == mainCell.j) { continue }
//                                     if (sodokuBoard[i][j].determined) {continue}
//                                     sodokuBoard[i][j].color = color('red')
//                                     sodokuBoard[i][j].removePossibility(number);
//                                     // stopLoop = true
//                                 } else {
//                                     continue
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 if (insideCell.i == mainCell.i && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
//                     foundPair = true;
//                     sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
//                     sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
//                     stackPoints = removeFromArray(stackPoints, insidePoint);
//                     for (const number of insideCell.possibilities) {
//                         for (var j = 0; j < 9; j++) {
//                             if (j == insideCell.j || j == mainCell.j) { continue };
//                             if (sodokuBoard[insideCell.i][j].determined) {continue};
//                             sodokuBoard[insideCell.i][j].color = color('red')
//                             sodokuBoard[insideCell.i][j].removePossibility(number);
//                         }
//                     }
//                     pairStack.push(mainCell.i.toString() + mainCell.j)
//                     iPair1 = insideCell.i;
//                     iPair2 = mainCell.i;
//                     jPair1 = insideCell.j;
//                     jPair2 = mainCell.j;
//                     break
//                 } else if (insideCell.j == mainCell.j && compareArrays(insideCell.possibilities, mainCell.possibilities)) {
//                     foundPair = true;
//                     sodokuBoard[mainCell.i][mainCell.j].color = color('yellow');
//                     sodokuBoard[insideCell.i][insideCell.j].color = color('yellow');
//                     stackPoints = removeFromArray(stackPoints, insidePoint);
//                     for (const number of insideCell.possibilities) {
//                         for (var i = 0; i < 9; i++) {
//                             if (i == insideCell.i || i == mainCell.i) { continue };
//                             if (sodokuBoard[i][insideCell.j].determined) {continue};
//                             sodokuBoard[i][insideCell.j].color = color('red')
//                             sodokuBoard[i][insideCell.j].removePossibility(number);
//                         }
//                     }
//                     pairStack.push(mainCell.i.toString() + mainCell.j)
//                     iPair1 = insideCell.i;
//                     iPair2 = mainCell.i;
//                     jPair1 = insideCell.j;
//                     jPair2 = mainCell.j;
//                     break
//                 }
//             }
//         }
//     }
//     if (!foundPair && tries > 1) {
//         stage = 'lastRemainingCell'
//         throw 'No Pairs Found'
//     } else if (!foundPair) {
//         stage = 'singles'
//         throw 'No Unsolved Naked Pairs'
//     } else if(tries>1){
//         stage = 'lastRemainingCell'
//     } else {
//         stage = 'singles'
//     }
// }

function lastRemainingCell() {
    var foundTarget = false;
    for (let i = 0; i < 9; i++) {
        const selectedBox = selectBox(i);
        var numberCount = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        };
        for (const cell of selectedBox) {
            for (const possibility of Object.keys(cell.possibilities)) {
                numberCount[possibility]++
            }
        }
        for (const number of Object.keys(numberCount)) {
            if (numberCount[number] === 1) {
                foundTarget = true;
                for (const cell of selectedBox) {
                    if (Object.keys(cell.possibilities).includes(number)) {
                        cell.color = color('pink')
                        iNext = cell.i
                        jNext = cell.j
                        numberNext = number
                        break
                    }
                }
                break
            }
        }
        if (foundTarget) {
            break
        }

        const selectedRow = selectRow(i);
        numberCount = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        };
        for (const cell of selectedRow) {
            for (const possibility of Object.keys(cell.possibilities)) {
                numberCount[possibility]++
            }
        }
        for (const number of Object.keys(numberCount)) {
            if (numberCount[number] === 1) {
                foundTarget = true;
                for (const cell of selectedRow) {
                    if (Object.keys(cell.possibilities).includes(number)) {
                        cell.color = color('pink')
                        iNext = cell.i
                        jNext = cell.j
                        numberNext = number
                        break
                    }
                }
                break
            }
        }
        if (foundTarget) {
            break
        }

        const selectedCol = selectCol(i);
        numberCount = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        };
        for (const cell of selectedCol) {
            for (const possibility of Object.keys(cell.possibilities)) {
                numberCount[possibility]++
            }
        }
        for (const number of Object.keys(numberCount)) {
            if (numberCount[number] === 1) {
                foundTarget = true;
                for (const cell of selectedCol) {
                    if (Object.keys(cell.possibilities).includes(number)) {
                        cell.color = color('pink')
                        iNext = cell.i
                        jNext = cell.j
                        numberNext = number
                        break
                    }
                }
                break
            }
        }
        if (foundTarget) {
            break
        }
    }
    if (!foundTarget && tries > 1) {
        stage = 'NEXT'
        throw 'No Last Remaining Cells'
    } else if (!foundTarget) {
        stage = 'singles'
        throw 'No Last Remaining Cells Left'
    }
}

function removeFromArray(arr, value) {
    return arr.filter(item => item != value)
}
function compareArrays(arr1, arr2) {
    return arr1.length === arr2.length &&
        arr1.every((v, i) => v === arr2[i])
}