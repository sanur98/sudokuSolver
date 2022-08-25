class Cell {
    constructor(x, y, color, i, j, box) {
        this._color = color;
        this._x = x;
        this._y = y;
        this._number = undefined;
        this._possibilities = {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9
        };
        this._determined = false;
        this._i = i;
        this._j = j;
        this._box = box;
    };
    set color(newColor) {
        this._color = newColor;
    };
    set number(newNumber) {
        this._number = newNumber;
    }
    set determined(value) {
        this._determined = value;
    }
    get determined() {
        return this._determined;
    }
    get possibilities() {
        return this._possibilities;
    }
    get color() {
        return this._color;
    }
    get x() {
        return this._x
    }
    get y() {
        return this._y
    }
    get number() {
        return this._number
    }
    get i() {
        return this._i
    }
    get j() {
        return this._j
    }
    get box() {
        return this._box
    }
    removePossibility(number) {
        if (Object.keys(this._possibilities).includes(number)) {
            delete this._possibilities[number];
        }
    }
    setValue(number) {
        if (!number) { return }
        this._possibilities = [];
        this._determined = true;
        this._number = number;
        var arr = [];
        for (const row of sodokuBoard) {
            for (const cell of row) {
                if (cell.i === this.i && cell.j === this.j) { continue }
                if (cell.i === this.i || cell.j === this.j || cell.box == this._box) {
                    delete cell.possibilities[number]
                }
            }
        }
    }
}