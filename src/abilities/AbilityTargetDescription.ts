export class SingleTargetInRangeAbilityTargetDescription {
    range: number;
    constructor(range: number) {
        this.range = range;
    }
}

export class CircularAreaEffectAbilityTargetDescription {
    radius: number;
    constructor(radius: number) {
        this.radius = radius;
    }
}

export class StraightForwardLineAreaEffectAbilityTargetDescription {
    length: number;
    constructor(length: number) {
        this.length = length;
    }
}

export class StraightLineAreaEffectAbilityTargetDescription {
    length: number;

    constructor(length: number) {
        this.length = length;
    }
}

type AreaOfEffectAbilityTargetDescription = CircularAreaEffectAbilityTargetDescription | StraightForwardLineAreaEffectAbilityTargetDescription | StraightLineAreaEffectAbilityTargetDescription;

export type AbilityTargetDescription = SingleTargetInRangeAbilityTargetDescription | AreaOfEffectAbilityTargetDescription;
