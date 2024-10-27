import { BasicAttack } from "@/attack/BasicAttack";
import Champion from "../champion";
import PassiveAbility from "@/abilities/PassiveAbilityDescriptor";
import { CastAbilityDescriptor, InstantCastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";
import AbilityCost from "@/abilities/AbilityCost";
import { DamageEffect, IncreaseStatEffect, RecoverStatEffect } from "@/effects/StatEffect";
import { PermanentEffect, SemiImmediateEffect } from "@/effects/EffectDescriptor";
import { EffectBehavior, EffectTargetType } from "@/effects/Effect";
import { StatType } from "@/creatures/stats";
import { SingleTargetInRangeAbilityTargetDescription } from "@/abilities/AbilityTargetDescription";
import { ConditionalEffectDescriptor, SamePositionConditional } from "@/effects/ConditionalEffectBehavior";

class NecromancyEffect implements EffectBehavior {
    type = "necromancy";
}

const SoulHarvest = new PassiveAbility([
    new PermanentEffect(new IncreaseStatEffect(StatType.energy, 1), EffectTargetType.self),
    new PermanentEffect(new IncreaseStatEffect(StatType.health, 1), EffectTargetType.self),
])

const SoulDrain = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 2 }),
    effects: [
        new SemiImmediateEffect(new DamageEffect(1), EffectTargetType.enemy),
        new ConditionalEffectDescriptor({
            condition: SamePositionConditional,
            truthyEffect: new SemiImmediateEffect(new RecoverStatEffect(StatType.health, 3), EffectTargetType.self),
            falsyEffect: new SemiImmediateEffect(new RecoverStatEffect(StatType.health, 1), EffectTargetType.self),
        })
    ],
    target: new SingleTargetInRangeAbilityTargetDescription(1),
});

const ReapersStrike = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 4, health: 1 }),
    effects: [new SemiImmediateEffect(new DamageEffect(4), EffectTargetType.enemy)],
    target: new SingleTargetInRangeAbilityTargetDescription(1),
});

// TODO
const Necromancy = new InstantCastAbilityDescriptor({
    cost: new AbilityCost({ energy: 5, health: 2 }),
    effects: [
        new SemiImmediateEffect(new NecromancyEffect(), EffectTargetType.enemy),
    ],
});

class Nocthar extends Champion {
    constructor(team: number) {
        super({
            name: 'Nocthar',
            team,
            health: 7,
            energy: 4,
            shield: 0,
            strength: 3,
            abilities: [SoulHarvest, SoulDrain, ReapersStrike, Necromancy],
            basicAttack: new BasicAttack({ range: 1 })
        });
    }
}

export default Nocthar;