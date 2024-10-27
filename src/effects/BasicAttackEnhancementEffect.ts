import { EffectBehavior } from "./Effect";

export class NextBasicAttackPiercingEnhancementEffect implements EffectBehavior {
    type = 'basic-attack-piercing-enhancement'
}

export class NextBasicAttackFreezeEnhancementEffect implements EffectBehavior {
    type = 'basic-attack-freeze-enhancement'
}

export class NextBasicAttackPoisonEnhancementEffect implements EffectBehavior {
    type = 'basic-attack-poison-enhancement'
    poisonDamage: number;

    constructor(poisonDamage: number) {
        this.poisonDamage = poisonDamage;
    }
}

export class NextBasicAttackRangeEnhancementEffect implements EffectBehavior {
    type = 'next-basic-attack-range-enhancement'
    range: number;
    constructor(range: number) {
        this.range = range;
    }
}


type NextBasicAttackEnhancementEffect = NextBasicAttackPiercingEnhancementEffect | NextBasicAttackPoisonEnhancementEffect | NextBasicAttackFreezeEnhancementEffect | NextBasicAttackRangeEnhancementEffect;
type BasicAttackEnhancementEffect = NextBasicAttackEnhancementEffect;


export default BasicAttackEnhancementEffect;