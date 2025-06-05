export class Number {
    value: number;
    numbers: Number[];
    x: number | undefined;
    y: number | undefined;
    size: number;

    constructor(value: number, numbers: Number[], size: number) {
        this.value = value;
        this.numbers = numbers;
        this.x = undefined;
        this.y = undefined;
        this.size = size;
    }

    setPosition(x: number, y: number): void {
        this.clearPreviousElement();

        const div = this.createElement();
        const n = y * this.size + x + 1;
        const gridItem = document.querySelector(`div.grid-item:nth-of-type(${n})`);
        if (gridItem) {
            gridItem.appendChild(div);
        }

        this.x = x;
        this.y = y;
    }

    private clearPreviousElement(): void {
        if (this.x !== undefined && this.y !== undefined) {
            const nn = this.y * this.size + this.x + 1;
            const oldItem = document.querySelector(`div.grid-item:nth-of-type(${nn})`);
            if (oldItem) {
                oldItem.innerHTML = '';
            }
        }
    }

    private createElement(): HTMLDivElement {
        const div = document.createElement('div');
        div.className = 'number';
        div.textContent = this.value.toString();
        return div;
    }
}