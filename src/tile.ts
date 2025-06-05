export class Tile {
    position: { tile: number; row: number } = { tile: 0, row: 0 };
    number: number;
    element: HTMLElement | undefined;

    constructor(index: number, value: number) {
        this.position.row = Math.floor(index / 10);
        this.position.tile = index % 10;
        this.number = value;
    }

    findEmptyNeighbor(tileList: Tile[]) {
        const empty = tileList.find(t => t.number === 0)!;
        const distance = Math.sqrt(
            Math.pow(empty.position.tile - this.position.tile, 2) +
            Math.pow(empty.position.row - this.position.row, 2)
        );
        return distance === 1 ? empty : undefined;
    }

    moveTile(tileList: Tile[]) {
        const empty = this.findEmptyNeighbor(tileList);
        if (!empty) return;

        empty.element!.classList.remove("empty");
        [this.number, empty.number] = [empty.number, this.number];
    }
}