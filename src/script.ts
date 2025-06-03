import { Number } from './number.js';

const size: number = 10;
createGrid(size);
const numbers: Number[] = [];
randomizeNumbers();

function createGrid(size: number): void {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for(let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        gridItem.style.height = `calc(90vh/${size})`;
        gridItem.style.fontSize = `calc(90vh / ${size} * 0.8)`;

        gridContainer.appendChild(gridItem);
    }

    const body = document.querySelector('body');
    if (body) {
        body.appendChild(gridContainer);
    }
}

function randomizeNumbers(): void {
    for (let i = 1; i <= size * size - 1; i++) {
        numbers.push(new Number(i, numbers, size));

        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        while (!isFree(x, y)) {
            x = Math.floor(Math.random() * size);
            y = Math.floor(Math.random() * size);
        }
        numbers[i - 1].setPosition(x, y);
    }
}

function isFree(x: number, y: number): boolean {
    const n = y * size + x + 1;
    const gridItem = document.querySelector(`div.grid-item:nth-of-type(${n})`);
    return gridItem ? gridItem.innerHTML === '' : false;
    
}