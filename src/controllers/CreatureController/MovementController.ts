import GameMap, { GameTile } from "@/core/game-map";
import { Creature } from "@/creatures/creatures";

const DEFAULT_MOVEMENTS = 1;

class MovementController {

    constructor(private movementsLeftThisTurn: number = DEFAULT_MOVEMENTS) { }

    move(creature: Creature, to: GameTile, map: GameMap) {
        if (this.canMove()) {
            map.moveCreature(creature, to);
            this.movementsLeftThisTurn--;
        }
    }

    static createController() {
        return new MovementController();
    }

    canMove(): boolean {
        return this.movementsLeftThisTurn > 0;
    };

    reset() {
        this.movementsLeftThisTurn = DEFAULT_MOVEMENTS;
    }
}

export default MovementController;
