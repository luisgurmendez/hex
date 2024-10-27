import GameMap, { AdjacentTilesOffset, TileSide } from '../map';

describe('GameMap', () => {
    let map: GameMap<unknown>;

    beforeEach(() => {
        map = new GameMap(3);  // Create a map with a radius of 3 for testing
    });

    test('should generate the correct number of tiles within a given radius', () => {
        const totalTiles = map.tiles.length;
        const expectedTiles = 37; // For radius 3, the total number of tiles is 37
        expect(totalTiles).toBe(expectedTiles);
    });

    test('should return the correct tile for given q, r coordinates', () => {
        const tile = map.getTile(0, 0);
        expect(tile).toEqual({ q: 0, r: 0 });
    });

    test('should return undefined for non-existent tiles', () => {
        const tile = map.getTile(10, 10);
        expect(tile).toBeNull();
    });

    test('should return adjacent tile in the correct direction', () => {
        const tile = { q: 0, r: 0 };
        const adjacentTile = map.getAdjacentTile(tile, TileSide.N);
        expect(adjacentTile).toEqual({ q: 0, r: -1 });
    });

    test('should return all tiles within a certain radius', () => {
        const centerTile = { q: 0, r: 0 };
        const tilesWithinRadius = map.getAllTilesWithinRadius(centerTile, 2);
        expect(tilesWithinRadius.length).toBe(19);  // For radius 2, there are 19 tiles
    });

    test('should return all tiles within a certain radius that dont overflow the map boundaries', () => {
        const southestTile = { q: 0, r: 3 };
        const tilesWithinRadius = map.getAllTilesWithinRadius(southestTile, 1);
        expect(tilesWithinRadius.length).toBe(4);  // For radius 1 of the southest tile
        expect(tilesWithinRadius).toEqual(expect.arrayContaining([
            southestTile,
            { q: 1, r: 2 },
            { q: 0, r: 2 },
            { q: -1, r: 3 },
            { q: 0, r: 3 },
        ]));
    });

    test('should return all tiles within a 1 radius', () => {
        const centerTile = { q: 0, r: 0 };
        const tilesWithinRadius = map.getAllTilesWithinRadius(centerTile, 1);
        expect(tilesWithinRadius.length).toBe(7);
        expect(tilesWithinRadius).toEqual(expect.arrayContaining([
            { q: 0, r: 0 },
            AdjacentTilesOffset[TileSide.N],
            AdjacentTilesOffset[TileSide.NE],
            AdjacentTilesOffset[TileSide.NW],
            AdjacentTilesOffset[TileSide.SW],
            AdjacentTilesOffset[TileSide.SE],
            AdjacentTilesOffset[TileSide.S],
        ]));
    });


    test('should return all tiles from a straight line clipped if the map goes out of bounds', () => {
        const centerTile = { q: 0, r: 0 };
        const tilesFromStraightLine = map.getAllTilesFromAStraightLine(centerTile, TileSide.N, 4);
        expect(tilesFromStraightLine.length).toBe(3);
        expect(tilesFromStraightLine).toEqual(expect.arrayContaining([
            { q: 0, r: -1 },
            { q: 0, r: -2 },
            { q: 0, r: -3 },
        ]));
    });


    test('should return all tiles from a straight line', () => {
        // The most southest Tile of a 3 radius Map,
        const southTile = { q: 0, r: 3 };
        const tilesFromStraightLine = map.getAllTilesFromAStraightLine(southTile, TileSide.N, 4);
        expect(tilesFromStraightLine.length).toBe(4);
        expect(tilesFromStraightLine).toEqual(expect.arrayContaining([
            { q: 0, r: 2 },
            { q: 0, r: 1 },
            { q: 0, r: 0 },
            { q: 0, r: -1 },
        ]));
    });

    test('should return all tiles from a infinite straight line', () => {
        // The most southest Tile of a 3 radius Map,
        const southTile = { q: 0, r: 3 };
        const tilesFromStraightLine = map.getAllTilesFromAStraightLine(southTile, TileSide.N, Infinity);
        expect(tilesFromStraightLine.length).toBe(6);
        expect(tilesFromStraightLine).toEqual(expect.arrayContaining([
            { q: 0, r: 2 },
            { q: 0, r: 1 },
            { q: 0, r: 0 },
            { q: 0, r: -1 },
            { q: 0, r: -2 },
            { q: 0, r: -3 },
        ]));
    });


    test('should return all tiles of a single ring of 1 radius', () => {
        const centerTile = { q: 0, r: 0 };
        const tilesWithinRadius = map.getAllTilesOfSingleRing(centerTile, 1);
        expect(tilesWithinRadius.length).toBe(6);
        expect(tilesWithinRadius).toEqual(expect.arrayContaining([
            AdjacentTilesOffset[TileSide.N],
            AdjacentTilesOffset[TileSide.NE],
            AdjacentTilesOffset[TileSide.NW],
            AdjacentTilesOffset[TileSide.SW],
            AdjacentTilesOffset[TileSide.SE],
            AdjacentTilesOffset[TileSide.S],
        ]));
    });

    test('should return all tiles of a single ring of 2 radius', () => {
        const centerTile = { q: 0, r: 0 };
        const tilesWithinRadius = map.getAllTilesOfSingleRing(centerTile, 2);
        expect(tilesWithinRadius.length).toBe(12);
        expect(tilesWithinRadius).toEqual(expect.arrayContaining([
            // TileSide.N, 
            { q: 1, r: 1 },
            { q: 2, r: 0 },
            // TileSide.N
            { q: 2, r: -1 },
            { q: 2, r: -2 },
            // TileSide.NW
            { q: 1, r: -2 },
            { q: 0, r: -2 },
            // TileSide.SW
            { q: -1, r: -1 },
            { q: -2, r: 0 },
            // TileSide.S
            { q: -2, r: 1 },
            { q: -2, r: 2 },
            // TileSide.SE
            { q: -1, r: 2 },
            { q: 0, r: 2 },
        ]));
    });

    test('should return all tiles of a single ring of 1 radius that are actually in the map boundaries', () => {
        const southestTile = { q: 0, r: 3 };
        const tilesWithinRadius = map.getAllTilesOfSingleRing(southestTile, 1);
        expect(tilesWithinRadius.length).toBe(3);
        expect(tilesWithinRadius).toEqual(expect.arrayContaining([
            { q: 1, r: 2 },
            { q: 0, r: 2 },
            { q: -1, r: 3 },
        ]));
    });
});
