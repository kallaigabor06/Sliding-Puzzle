import { Number } from './number.js';

const gridSize: number = 10;
const numbers: Number[] = [];

initializeGrid(gridSize);
placeRandomNumbers();

function initializeGrid(size: number): void {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.height = `calc(90vh / ${size})`;
        gridItem.style.fontSize = `calc(90vh / ${size} * 0.8)`;
        gridContainer.appendChild(gridItem);
    }

    document.body?.appendChild(gridContainer);
}

function placeRandomNumbers(): void {
    for (let i = 1; i < gridSize * gridSize; i++) {
        const num = new Number(i, numbers, gridSize);
        numbers.push(num);

        let x: number, y: number;
        do {
            x = Math.floor(Math.random() * gridSize);
            y = Math.floor(Math.random() * gridSize);
        } while (!isPositionFree(x, y));

        num.setPosition(x, y);
    }
}

function isPositionFree(x: number, y: number): boolean {
    const index = y * gridSize + x + 1;
    const gridItem = document.querySelector(`div.grid-item:nth-of-type(${index})`);
    return gridItem ? gridItem.innerHTML === '' : false;
}
