import { Tile } from "./tile.js";

function startApp() {
    const gridTiles = generateTiles();
    buildBoardHTML();
    updateBoard(gridTiles);
}

function buildBoardHTML() {
    document.body.innerHTML = `<div class="content">
        ${Array.from({ length: 10 }, (_, rowIdx) => `
            <div class="row-${rowIdx}">
                ${Array.from({ length: 10 }, (_, colIdx) => `
                    <div class="tile-${colIdx} tile row-${rowIdx}"></div>
                `).join('')}
            </div>
        `).join('')}
    </div>`;
}

function getRandomNumber(): number {
    return Math.floor(Math.random() * 100);
}

function generateTiles() {
    const tileList = new Array<Tile>();
    const generatedNumbers: number[] = [];

    for (let i = 0; i < 100; i++) {
        let candidate = getRandomNumber();

        if (generatedNumbers.includes(candidate)) {
            i--;
            continue;
        }

        generatedNumbers.push(candidate);
        tileList.push(new Tile(i, candidate));
    }

    return tileList;
}

function updateBoard(tileArray: Tile[]) {
    for (let tile of tileArray) {
        tile.element = document.getElementsByClassName(`row-${tile.position.row} tile-${tile.position.tile}`)[0] as HTMLElement;

        tile.element.onclick = () => {
            tile.moveTile(tileArray);
            updateBoard(tileArray);
        };

        tile.element.innerHTML = `${tile.number}`;
        if (tile.number === 0) {
            tile.element.innerHTML = ``;
            tile.element.classList.add("empty");
        }
    }
}

startApp();
