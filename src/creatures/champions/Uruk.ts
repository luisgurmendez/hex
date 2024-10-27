import { BasicAttack } from "@/attack/BasicAttack";
import Champion from "../champion";
import PassiveAbility from "@/abilities/PassiveAbilityDescriptor";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";
import AbilityCost from "@/abilities/AbilityCost";
import { DamageEffect, StrengthBasedDamageEffect } from "@/effects/StatEffect";
import { PoisonCancelingEffect } from "@/effects/CancelingEffects";

import { ToTargetMoveEffect } from "@/effects/MovementEffects";
import { NextBasicAttackPiercingEnhancementEffect } from "@/effects/BasicAttackEnhancementEffect";
import { PermanentEffect, SemiImmediateEffect } from "@/effects/EffectDescriptor";
import { EffectTargetType } from "@/effects/Effect";
import { SingleTargetInRangeAbilityTargetDescription } from "@/abilities/AbilityTargetDescription";


const Dragonblood = new PassiveAbility([
    new PermanentEffect(new PoisonCancelingEffect(), EffectTargetType.self),
])

const SpearPoke = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 3 }),
    effects: [new SemiImmediateEffect(new DamageEffect(2), EffectTargetType.enemy)],

});

const Chambering = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 4 }),
    effects: [new SemiImmediateEffect(new NextBasicAttackPiercingEnhancementEffect(), EffectTargetType.self)],
});

const FatalStrike = new CastAbilityDescriptor({
    cost: new AbilityCost({ energy: 5 }),
    effects: [
        new SemiImmediateEffect(new ToTargetMoveEffect(), EffectTargetType.self),
        new SemiImmediateEffect(new StrengthBasedDamageEffect(3), EffectTargetType.enemy),
    ],
    target: new SingleTargetInRangeAbilityTargetDescription(1),
});


class Uruk extends Champion {
    constructor(team: number) {
        super({
            team,
            name: 'Urûk',
            health: 10,
            energy: 4,
            shield: 0,
            strength: 2,
            abilities: [Dragonblood, SpearPoke, Chambering, FatalStrike],
            basicAttack: new BasicAttack({ range: 1 })
        });
    }
}

export default Uruk;