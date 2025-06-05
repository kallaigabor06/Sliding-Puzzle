export class Number {
    private readonly value: number;
    private readonly numbers: Number[];
    private x: number | undefined;
    private y: number | undefined;
    private readonly size: number;

    constructor(value: number, numbers: Number[], size: number) {
        this.value = value;
        this.numbers = numbers;
        this.x = undefined;
        this.y = undefined;
        this.size = size;
    }

    setPosition(x: number, y: number): void {
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

    private clearPreviousElement(): void {
        if (this.x !== undefined && this.y !== undefined) {
            const index = this.y * this.size + this.x + 1;
            const oldItem = document.querySelector(`div.grid-item:nth-of-type(${index})`);
            if (oldItem) {
                oldItem.innerHTML = '';
            }
        }
    }

    private createElement(): HTMLDivElement {
        const div = document.createElement('div');
        div.className = 'number';
        div.textContent = this.value.toString();
        div.addEventListener('click', () => this.handleClick());
        return div;
    }

    private handleClick(): void {
        const emptyPosition = this.getEmptyPosition();
        if (emptyPosition) {
            this.setPosition(emptyPosition.x, emptyPosition.y);
        }
    }

    private getEmptyPosition(): { x: number; y: number } | null {
        if (this.x === undefined || this.y === undefined) {
            return null;
        }

        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: 1 },   // down
            { dx: 0, dy: -1 }   // up
        ] as const;

        for (const { dx, dy } of directions) {
            const newX = this.x + dx;
            const newY = this.y + dy;

            if (this.isValidPosition(newX, newY) && this.isPositionEmpty(newX, newY)) {
                return { x: newX, y: newY };
            }
        }

        return null;
    }

    private isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    private isPositionEmpty(x: number, y: number): boolean {
        return !this.numbers.some(n => n.x === x && n.y === y);
    }
}