import { EffectDescriptor } from "../effects/EffectDescriptor";

class PassiveAbilityDescriptor {
    effects: EffectDescriptor[];
    constructor(effects: EffectDescriptor[]) {
        this.effects = effects;
    }
}

export default PassiveAbilityDescriptor;
