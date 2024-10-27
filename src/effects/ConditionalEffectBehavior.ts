import { EffectDescriptor } from "./EffectDescriptor";

export class ConditionalEffectCondition { }

export class SamePositionConditional extends ConditionalEffectCondition { }

interface ConditionalEffectConditionOpts {
    condition: ConditionalEffectCondition;
    truthyEffect: EffectDescriptor;
    falsyEffect?: EffectDescriptor;
}

export class ConditionalEffectDescriptor {
    condition: ConditionalEffectCondition;
    truthyEffect: EffectDescriptor;
    falsyEffect?: EffectDescriptor;

    constructor({ truthyEffect, condition, falsyEffect }: ConditionalEffectConditionOpts) {
        this.condition = condition;
        this.truthyEffect = truthyEffect;
        this.falsyEffect = falsyEffect;
    }
}
