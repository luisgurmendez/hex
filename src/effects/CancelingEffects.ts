import { EffectBehavior } from "./Effect";

export class BasicAttackDamageAbsorptionEffect implements EffectBehavior {
    type = 'basic-attack-damage-absorption';
    absorbs: number;

    constructor(absorbs: number) {
        this.absorbs = absorbs;
    }
}

export class PoisonCancelingEffect implements EffectBehavior {
    type = 'poison-canceling';
}

type CancelingEffects = BasicAttackDamageAbsorptionEffect | PoisonCancelingEffect;

export default CancelingEffects;
