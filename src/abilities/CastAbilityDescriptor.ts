import { ConditionalEffectDescriptor } from "../effects/ConditionalEffectBehavior";
import { EffectDescriptor } from "../effects/EffectDescriptor";
import AbilityCost from "./AbilityCost";
import { AbilityTargetDescription, SingleTargetInRangeAbilityTargetDescription } from "./AbilityTargetDescription";

type EffectDescription = (EffectDescriptor | ConditionalEffectDescriptor);

interface CastAbilityDescriptorOpts {
    cost: AbilityCost;
    effects: EffectDescription[];
    target?: AbilityTargetDescription;
}

export class CastAbilityDescriptor {
    cost: AbilityCost;
    effects: EffectDescription[];
    target: AbilityTargetDescription;

    constructor({ cost, effects, target }: CastAbilityDescriptorOpts) {
        this.cost = cost;
        this.effects = effects;
        this.target = target || new SingleTargetInRangeAbilityTargetDescription(0);
    }

}

export class InstantCastAbilityDescriptor extends CastAbilityDescriptor {
    constructor({ cost, effects, target }: CastAbilityDescriptorOpts) {
        super({ cost, effects, target });
    }
}

