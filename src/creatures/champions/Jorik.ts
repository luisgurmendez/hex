import { BasicAttack } from "@/attack/BasicAttack";
import Champion from "../champion";
import PassiveAbility from "@/abilities/PassiveAbilityDescriptor";
import AbilityCost from "@/abilities/AbilityCost";
import { DamageEffect, IncreaseStatEffect } from "@/effects/StatEffect";
import { BasicAttackDamageAbsorptionEffect } from "@/effects/CancelingEffects";
import { PermanentEffect, SemiImmediateEffect } from "@/effects/EffectDescriptor";
import { EffectTargetType } from "@/effects/Effect";
import { StatType } from "@/creatures/stats";
import { CircularAreaEffectAbilityTargetDescription } from "@/abilities/AbilityTargetDescription";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";


const SteelSkin = new PassiveAbility([
    new PermanentEffect(new BasicAttackDamageAbsorptionEffect(1), EffectTargetType.self),
])

const CruchingBlow = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 4 }),
    effects: [new SemiImmediateEffect(new DamageEffect(2), EffectTargetType.enemy)],
    target: new CircularAreaEffectAbilityTargetDescription(1),
});

const IronShield = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 2 }),
    effects: [new SemiImmediateEffect(new IncreaseStatEffect(StatType.shield, 2), EffectTargetType.self)],
});

const GoldenReinforcement = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 7 }),
    effects: [new SemiImmediateEffect(new IncreaseStatEffect(StatType.strength, 1), EffectTargetType.self)],
});

class Jorik extends Champion {
    constructor(team: number) {
        super({
            team,
            name: 'Jorik',
            health: 9,
            energy: 4,
            shield: 0,
            strength: 3,
            abilities: [SteelSkin, CruchingBlow, IronShield, GoldenReinforcement],
            basicAttack: new BasicAttack({ range: 1 })
        });
    }
}

export default Jorik;