import { Creature } from "../creatures/creatures";
import FlatTopHexagonMap, { Tile } from "../map/map";

enum GameTileType {
    jungle,
    revealedJungle,
    land,
}

export class GameTileData {
    constructor(public type: GameTileType, public creatures: Set<Creature> = new Set<Creature>()) { }
}

export type GameTile = Tile<GameTileData>;

class GameMap extends FlatTopHexagonMap<GameTileData> {

    constructor(radius: number) {
        super(radius);
        this.forEach(tile => {
            tile.data = new GameTileData(GameTileType.land);
        });
    }

    moveCreature(creature: Creature, to: GameTile) {
        const from = this.getTileByCreature(creature);
        if (from) {
            from.data!.creatures.delete(creature);
        }
        to.data!.creatures.add(creature);
    }

    getTileByCreature(creature: Creature): GameTile | null {
        const tile = this.tiles.find(tile => tile.data?.creatures.has(creature));
        return tile || null;
    }

    getCreaturesInTiles(tiles: GameTile[]): Creature[] {
        return tiles.reduce((creatures, tile) => {
            return [...creatures, ...Array.from(tile.data!.creatures)];
        }, [] as Creature[]);
    }

    distance(from: GameTile, to: GameTile): number {
        return this.getDistanceBetweenTiles(from, to);
    }

    distanceBetweenCreatures(creature1: Creature, creature2: Creature): number {
        const tile1 = this.getTileByCreature(creature1);
        const tile2 = this.getTileByCreature(creature2);
        if (!tile1 || !tile2) {
            return Infinity;
        }
        return this.distance(tile1, tile2);
    }

    getCenter(): GameTile {
        return this.getTile(0, 0)!;
    }
}

export default GameMap;
