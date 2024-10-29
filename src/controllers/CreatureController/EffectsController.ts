import { Creature } from "@/creatures/creatures";
import { GameState } from "../GameController/GameController";
import { TargetedEffect } from "@/effects/Effect";

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

    resolveEffects(state: GameState) {
        const effectsQueue = state.effectsQueue;
        while (effectsQueue.queue.length > 0) {
            const effect = effectsQueue.queue.shift()!;
            this.resolveEffect(effect, state);
        }
    }


    private resolveEffect(effect: TargetedEffect, state: GameState) {
        const map = state.map;
        if (effect.target.canBeResolved(map)) {
            const affectedCreatures = effect.target.getAffectedCreatures(map, this.creature);
            effect.resolve(affectedCreatures);
        }
    }
}

export default EffectsController;