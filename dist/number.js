export class Tile {
    label;
    allTiles;
    col;
    row;
    boardSize;
    constructor(label, allTiles, boardSize) {
        this.label = label;
        this.allTiles = allTiles;
        this.boardSize = boardSize;
    }
    moveTo(col, row) {
        if (this.col !== undefined && this.row !== undefined) {
            const oldIndex = this.row * this.boardSize + this.col + 1;
            const oldCell = document.querySelector(`div.grid-item:nth-of-type(${oldIndex})`);
            if (oldCell) {
                oldCell.innerHTML = '';
            }
        }
        const tileElement = this.createTileElement();
        const newIndex = row * this.boardSize + col + 1;
        const newCell = document.querySelector(`div.grid-item:nth-of-type(${newIndex})`);
        if (newCell) {
            newCell.appendChild(tileElement);
        }
        this.col = col;
        this.row = row;
    }
    createTileElement() {
        const tile = document.createElement('div');
        tile.className = 'number';
        tile.textContent = this.label.toString();
        tile.number = this.label; // típushiba elkerülése
        tile.addEventListener('click', () => {
            const available = this.getEmptyNeighbor();
            if (available !== null) {
                this.moveTo(available.col, available.row);
            }
        });
        return tile;
    }
    getEmptyNeighbor() {
        if (this.col === undefined || this.row === undefined)
            return null;
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 },
        ];
        for (const { dx, dy } of directions) {
            const newCol = this.col + dx;
            const newRow = this.row + dy;
            if (newCol >= 0 && newCol < this.boardSize &&
                newRow >= 0 && newRow < this.boardSize &&
                this.isCellEmpty(newCol, newRow)) {
                return { col: newCol, row: newRow };
            }
        }
        return null;
    }
    isCellEmpty(col, row) {
        return !this.allTiles.some(tile => tile.col === col && tile.row === row);
    }
}
