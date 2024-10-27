import { BasicAttack } from "@/attack/BasicAttack";
import Champion from "../champion";
import PassiveAbility from "@/abilities/PassiveAbilityDescriptor";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";
import { SemiImmediateEffect, PermanentEffect } from "@/effects/EffectDescriptor";
import AbilityCost from "@/abilities/AbilityCost";
import { DamageEffect } from "@/effects/StatEffect";

import { IncreaseMovementStepEffect } from "@/effects/MovementEffects";
import {
    NextBasicAttackPoisonEnhancementEffect,
    NextBasicAttackRangeEnhancementEffect
} from "@/effects/BasicAttackEnhancementEffect";
import { EffectTargetType } from "@/effects/Effect";
import { StraightLineAreaEffectAbilityTargetDescription } from "@/abilities/AbilityTargetDescription";


const ProficientArcher = new PassiveAbility([
    new PermanentEffect(new NextBasicAttackRangeEnhancementEffect(2), EffectTargetType.self),
])

const PoisonArrow = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 2 }),
    effects: [new SemiImmediateEffect(new NextBasicAttackPoisonEnhancementEffect(2), EffectTargetType.self)],
});

const Dexterity = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 3 }),
    effects: [new SemiImmediateEffect(new IncreaseMovementStepEffect(1), EffectTargetType.self)],
});

const ArrowBarrage = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 6 }),
    effects: [
        new SemiImmediateEffect(new DamageEffect(3), EffectTargetType.enemy),
    ],
    target: new StraightLineAreaEffectAbilityTargetDescription(Infinity),
});


class Elora extends Champion {
    constructor(team: number) {
        super({
            team,
            name: 'Elora',
            health: 9,
            energy: 4,
            shield: 0,
            strength: 1,
            abilities: [ProficientArcher, PoisonArrow, Dexterity, ArrowBarrage],
            basicAttack: new BasicAttack({ range: 2 })
        });
    }
}

export default Elora;