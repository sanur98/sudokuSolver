class SudokuBoard {
    constructor(cellSize) {
        this._cellSize = cellSize
        this._cells = [];
    }
    get cellSize() {
        return this._cellSize
    }
    get cells() {
        return this._cells
    }
    addCell(newCell) {
        this._cells.push(newCell);
    }
}