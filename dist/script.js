export class Number {
    value;
    numbers;
    x;
    y;
    size;
    constructor(value, numbers, size) {
        this.value = value;
        this.numbers = numbers;
        this.x = undefined;
        this.y = undefined;
        this.size = size;
    }
    setPosition(x, y) {
        this.clearPreviousElement();
        this.x = x;
        this.y = y;
        const div = this.createElement();
        const index = y * this.size + x + 1;
        const gridItem = document.querySelector(`div.grid-item:nth-of-type(${index})`);
        if (gridItem) {
            gridItem.appendChild(div);
        }
    }
    clearPreviousElement() {
        if (this.x !== undefined && this.y !== undefined) {
            const index = this.y * this.size + this.x + 1;
            const oldItem = document.querySelector(`div.grid-item:nth-of-type(${index})`);
            if (oldItem) {
                oldItem.innerHTML = '';
            }
        }
    }
    createElement() {
        const div = document.createElement('div');
        div.className = 'number';
        div.textContent = this.value.toString();
        div.addEventListener('click', () => this.handleClick());
        return div;
    }
    handleClick() {
        const emptyPosition = this.getEmptyPosition();
        if (emptyPosition) {
            this.setPosition(emptyPosition.x, emptyPosition.y);
        }
    }
    getEmptyPosition() {
        if (this.x === undefined || this.y === undefined) {
            return null;
        }
        const directions = [
            { dx: -1, dy: 0 }, // left
            { dx: 1, dy: 0 }, // right
            { dx: 0, dy: 1 }, // down
            { dx: 0, dy: -1 } // up
        ];
        for (const { dx, dy } of directions) {
            const newX = this.x + dx;
            const newY = this.y + dy;
            if (this.isValidPosition(newX, newY) && this.isPositionEmpty(newX, newY)) {
                return { x: newX, y: newY };
            }
        }
        return null;
    }
    isValidPosition(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
    isPositionEmpty(x, y) {
        return !this.numbers.some(n => n.x === x && n.y === y);
    }
}
