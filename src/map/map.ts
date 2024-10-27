
// Define the six directions as an enum for easy reference
export enum TileSide {
    N = 'North',
    NE = 'Northeast',
    NW = 'Northwest',
    SW = 'Southwest',
    SE = 'Southeast',
    S = 'South'

}

export const AdjacentTilesOffset: Record<TileSide, { q: number; r: number }> = {
    [TileSide.N]: { q: 0, r: -1 },
    [TileSide.NW]: { q: -1, r: 0 },
    [TileSide.NE]: { q: 1, r: -1 },
    [TileSide.SE]: { q: 1, r: 0 },
    [TileSide.SW]: { q: -1, r: 1 },
    [TileSide.S]: { q: 0, r: 1 }
};


export interface Tile<D> {
    q: number;
    r: number;
    data?: D;
}

class FlatTopHexagonMap<D> {
    tiles: Tile<D>[] = [];

    constructor(private radius: number) {
        this.generateMap();
    }

    generateMap() {
        for (let q = -this.radius; q <= this.radius; q++) {
            const r1 = Math.max(-this.radius, -q - this.radius);
            const r2 = Math.min(this.radius, -q + this.radius);
            for (let r = r1; r <= r2; r++) {
                this.tiles.push({ q, r });
            }
        }
    }

    getTile(q: number, r: number): Tile<D> | null {
        const tile = this.tiles.find(tile => tile.q === q && tile.r === r)
        if (tile) {
            return tile;
        }
        return null;
    }

    getAdjacentTile(tile: Tile<D>, side: TileSide): Tile<D> | null {
        const offset = AdjacentTilesOffset[side];
        return this.getTile(tile.q + offset.q, tile.r + offset.r);
    }

    // Function to get all tiles within a certain radius from a given tile
    getAllTilesWithinRadius(centerTile: Tile<D>, radius: number): Tile<D>[] {
        const result: Tile<D>[] = [];

        for (let dq = -radius; dq <= radius; dq++) {
            for (let dr = Math.max(-radius, -dq - radius); dr <= Math.min(radius, -dq + radius); dr++) {
                const tile = this.getTile(centerTile.q + dq, centerTile.r + dr);
                if (tile) {
                    result.push(tile);
                }
            }
        }
        return result;
    }

    getAllTilesOfSingleRing(centerTile: Tile<D>, distance: number): Tile<D>[] {
        const ringTiles: Tile<D>[] = [];

        // Start at southest position from center inside the ring
        const mostSouthestTileInsideRing = { q: centerTile.q, r: centerTile.r + distance };
        let currentTile = mostSouthestTileInsideRing;

        // Starting from south, we will go anti-clockwise in each direction
        // NOTE: The order of directions is important (anti-clockwise)
        const directions: TileSide[] = [
            TileSide.NE, TileSide.N, TileSide.NW, TileSide.SW, TileSide.S, TileSide.SE
        ];

        for (const direction of directions) {
            for (let i = 0; i < distance; i++) {
                // Only add valid tiles within the map bounds
                const tile = this.getTile(currentTile.q, currentTile.r);
                if (tile) {
                    ringTiles.push(tile);
                }

                // Move to the next tile in the current direction
                const offset = AdjacentTilesOffset[direction];
                currentTile = {
                    q: currentTile.q + offset.q,
                    r: currentTile.r + offset.r
                };
            }
        }

        return ringTiles;
    }

    getAllTilesFromAStraightLine(centerTile: Tile<D>, direction: TileSide, distance: number): Tile<D>[] {
        const result: Tile<D>[] = [];
        let currentTile = centerTile;
        for (let i = 0; i < distance; i++) {
            const nextTile = this.getAdjacentTile(currentTile, direction);
            if (nextTile) {
                result.push(nextTile);
                currentTile = nextTile;
            } else {
                break;
            }
        }
        return result;
    }

    getDistanceBetweenTiles(tile1: Tile<D>, tile2: Tile<D>): number {
        return (Math.abs(tile1.q - tile2.q) + Math.abs(tile1.q + tile1.r - tile2.q - tile2.r) + Math.abs(tile1.r - tile2.r)) / 2;
    }

    forEach(callback: (tile: Tile<D>) => void) {
        this.tiles.forEach(callback);
    }

}


export default FlatTopHexagonMap;