export class Number {
    value;
    numbers;
    x;
    y;
    size;
    constructor(value, numbers, size) {
        this.value = value; //létrejön egy osztályszintű "value" változó
        this.numbers = numbers;
        this.x = undefined;
        this.y = undefined;
        this.size = size;
    }
    setPosition(x, y) {
        if (this.x !== undefined && this.y !== undefined) {
            const nn = this.y * this.size + this.x + 1;
            const oldItem = document.querySelector(`div.grid-item:nth-of-type(${nn})`);
            if (oldItem) {
                oldItem.innerHTML = '';
            }
        }
        const div = this.createElement();
        const n = y * this.size + x + 1;
        const gridItem = document.querySelector(`div.grid-item:nth-of-type(${n})`);
        if (gridItem) {
            gridItem.appendChild(div);
        }
        this.x = x;
        this.y = y;
    }
    createElement() {
        const div = document.createElement('div');
        div.className = 'number';
        div.number = this.value;
        div.innerText = this.value.toString();
        div.addEventListener('click', () => {
            const emptyPosition = this.emptyPosition;
            if (emptyPosition !== null) {
                this.setPosition(emptyPosition.x, emptyPosition.y);
            }
        });
        return div;
    }
    get emptyPosition() {
        if (this.x !== undefined && this.y !== undefined) {
            if (this.x > 0) {
                const checkX = this.x - 1;
                const checkY = this.y;
                if (this.checkIsEmpty(checkX, checkY)) {
                    return {
                        x: checkX,
                        y: checkY
                    };
                }
            }
            if (this.x < this.size - 1) {
                if (this.checkIsEmpty(this.x + 1, this.y)) {
                    return {
                        x: this.x + 1,
                        y: this.y
                    };
                }
            }
            if (this.y < this.size - 1) {
                if (this.checkIsEmpty(this.x, this.y + 1)) {
                    return {
                        x: this.x,
                        y: this.y + 1
                    };
                }
            }
            if (this.y > 0) {
                if (this.checkIsEmpty(this.x, this.y - 1)) {
                    return {
                        x: this.x,
                        y: this.y - 1
                    };
                }
            }
        }
        return null;
    }
    checkIsEmpty(checkX, checkY) {
        let isEmpty = true;
        for (let n of this.numbers) {
            if (n.x === checkX && n.y === checkY) {
                isEmpty = false;
                break;
            }
        }
        return isEmpty;
    }
}
