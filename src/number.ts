export class Number {
    value: number;
    numbers: Number[];
    x: number | undefined;
    y: number| undefined;
    size: number;

    constructor(value: number, numbers: Number[], size: number) {
        this.value = value;         
        this.numbers = numbers;
        this.x = undefined;
        this.y = undefined;
        this.size = size;
    }
    setPosition(x: number, y: number): void {
    if (this.x !== undefined && this.y !== undefined) {
        const oldIndex = this.y * this.size + this.x + 1;
        const oldItem = document.querySelector(`div.grid-item:nth-of-type(${oldIndex})`);
        oldItem?.replaceChildren();  // Tisztább, gyorsabb módja az innerHTML = ''-nek
    }

    const div = this.createElement();
    const newIndex = y * this.size + x + 1;
    const gridItem = document.querySelector(`div.grid-item:nth-of-type(${newIndex})`);
    gridItem?.appendChild(div);

    this.x = x;
    this.y = y;
}

createElement(): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'number';
    (div as any).number = this.value;
    div.innerText = this.value.toString();

    div.addEventListener('click', () => {
        const emptyPosition = this.emptyPosition;
        if (emptyPosition !== null) {
            this.setPosition(emptyPosition.x, emptyPosition.y);
        }
    });

    return div;
}

get emptyPosition(): { x: number, y: number } | null {
    if (this.x === undefined || this.y === undefined) return null;

    const directions = [
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 },  // right
        { dx: 0, dy: 1 },  // down
        { dx: 0, dy: -1 }  // up
    ];

    for (const { dx, dy } of directions) {
        const checkX = this.x + dx;
        const checkY = this.y + dy;

        if (
            checkX >= 0 && checkX < this.size &&
            checkY >= 0 && checkY < this.size &&
            this.checkIsEmpty(checkX, checkY)
        ) {
            return { x: checkX, y: checkY };
        }
    }

    return null;
}

checkIsEmpty(checkX: number, checkY: number): boolean {
    return !this.numbers.some(n => n.x === checkX && n.y === checkY);
}

    
}

