import { Tile } from './number.js';

const boardSize = 10;
const tileList: Tile[] = [];

initializeBoard(boardSize);
spawnRandomTiles();

function initializeBoard(size: number): void {
    const board = document.createElement('div');
    board.className = 'grid-container';
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-item';
        cell.style.height = `calc(90vh / ${size})`;
        cell.style.fontSize = `calc(90vh / ${size} * 0.8)`;
        board.appendChild(cell);
    }

    const body = document.querySelector('body');
    if (body) body.appendChild(board);
}

function spawnRandomTiles(): void {
    for (let i = 1; i <= boardSize * boardSize - 1; i++) {
        const tile = new Tile(i, tileList, boardSize);
        tileList.push(tile);

        let col = Math.floor(Math.random() * boardSize);
        let row = Math.floor(Math.random() * boardSize);

        while (!isSlotFree(col, row)) {
            col = Math.floor(Math.random() * boardSize);
            row = Math.floor(Math.random() * boardSize);
        }

        tile.moveTo(col, row);
    }
}

function isSlotFree(col: number, row: number): boolean {
    const index = row * boardSize + col + 1;
    const cell = document.querySelector(`div.grid-item:nth-of-type(${index})`);
    return cell ? cell.innerHTML === '' : false;
}
