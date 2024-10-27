import { Creature } from "@/creatures/creatures";
import { TargetedEffect } from "../../effects/Effect";
import GameMap from "@/core/game-map";


class EffectsController {
    creature: Creature;
    constructor(creature: Creature) {
        this.creature = creature;
    }
    async performInitialEffects() { }
    async performEndOfTurnEffects() { }

    static createController(creature: Creature) {
        return new EffectsController(creature);
    }

    resolveEffects(effectsQueue: TargetedEffect[], map: GameMap) {
        for (const effect of effectsQueue) {
            if (effect.target.canBeResolved(map)) {
                const affectedCreatures = effect.target.getAffectedCreatures(map, this.creature);
                effect.resolve(affectedCreatures);
            }
        }
    }
}

export default EffectsController;