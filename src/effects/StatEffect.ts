import { StatType } from "../creatures/stats";
import { EffectBehavior } from "./Effect";

export class IncreaseStatEffect implements EffectBehavior {
    type = 'increase-stat' as const;
    affects: StatType;
    value: number;

    constructor(affects: StatType, value: number) {
        this.affects = affects;
        this.value = value;
    }
}

export class RecoverStatEffect implements EffectBehavior {
    type = 'recover-stat' as const;

    affects: StatType;
    value: number;

    constructor(affects: StatType, value: number) {
        this.affects = affects;
        this.value = value;
    }
}

export class DecreaseStatEffect implements EffectBehavior {
    type = 'decrease-stat' as const;
    affects: StatType;
    value: number;

    constructor(affects: StatType, value: number) {
        this.affects = affects;
        this.value = value;
    }
}

export class LoseStatEffect implements EffectBehavior {
    type = 'lose-stat' as const;
    affects: StatType;
    value: number;

    constructor(affects: StatType, value: number) {
        this.affects = affects;
        this.value = value;
    }
}

export class DamageEffect implements EffectBehavior {
    type = 'damage' as const;
    affects: StatType;
    value: number;

    constructor(value: number) {
        this.affects = StatType.health;
        this.value = value;
    }
}

export class StrengthBasedDamageEffect implements EffectBehavior {
    type = 'strength-based-damage' as const;
    affects: StatType;
    value: number;

    constructor(value: number) {
        this.affects = StatType.health;
        this.value = value;
    }
}


type StatEffect = IncreaseStatEffect | RecoverStatEffect | DecreaseStatEffect | DamageEffect | StrengthBasedDamageEffect;

export default StatEffect;