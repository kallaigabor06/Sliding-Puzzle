import { Number } from './number.js';

const size: number = 10;
createGrid(size);
const numbers: Number[] = [];
randomizeNumbers();

function createGrid(size: number): void {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        const unit = `calc(90vh / ${size})`;
        gridItem.style.height = unit;
        gridItem.style.fontSize = `calc(${unit} * 0.8)`;
        gridContainer.appendChild(gridItem);
    }

    document.body?.appendChild(gridContainer);
}

function randomizeNumbers(): void {
    for (let i = 1; i < size * size; i++) {
        numbers.push(new Number(i, numbers, size));
        const [x, y] = getRandomCoordinates(size);
        numbers[numbers.length - 1].setPosition(x, y);
    }
}

function getRandomCoordinates(size: number): [number, number] {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    return [x, y];
}
