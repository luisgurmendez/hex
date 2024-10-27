import { BasicAttack } from "@/attack/BasicAttack";
import Champion from "../champion";
import PassiveAbility from "@/abilities/PassiveAbilityDescriptor";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";
import { SemiImmediateEffect, PermanentEffect } from "@/effects/EffectDescriptor";
import AbilityCost from "@/abilities/AbilityCost";
import { DamageEffect, IncreaseStatEffect } from "@/effects/StatEffect";

import { IncreaseMovementStepEffect } from "@/effects/MovementEffects";
import {
    NextBasicAttackPoisonEnhancementEffect,
    NextBasicAttackRangeEnhancementEffect
} from "@/effects/BasicAttackEnhancementEffect";
import { EffectTargetType } from "@/effects/Effect";
import { StraightLineAreaEffectAbilityTargetDescription } from "@/abilities/AbilityTargetDescription";
import JungleCreature from "../jungle-creature";
import { StatType } from "../stats";
import PassiveAbilityDescriptor from "@/abilities/PassiveAbilityDescriptor";

const PoisonousBasicAttack = new PassiveAbilityDescriptor([new SemiImmediateEffect(new NextBasicAttackPoisonEnhancementEffect(2), EffectTargetType.self)]);
const IncreaseEnergyReward = new PermanentEffect(new IncreaseStatEffect(StatType.energy, 2), EffectTargetType.self);

class BigPoisonousToad extends JungleCreature {
    constructor() {
        super({
            name: 'Big Poisonous Toad',
            health: 4,
            strength: 3,
            abilities: [PoisonousBasicAttack],
            rewards: [IncreaseEnergyReward],
            basicAttack: new BasicAttack({ range: 0 })
        });
    }
}

export default BigPoisonousToad;