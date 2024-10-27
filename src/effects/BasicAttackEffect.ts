import { EffectBehavior } from "./Effect";

interface AttackEffectOpts {
    damage: number;
    poison?: number;
    piercing?: boolean;
    freeze?: boolean;
}

class BasicAttackEffect implements EffectBehavior {
    type = 'basic-attack';
    damage: number;
    poison: number;
    piercing: boolean;
    freeze: boolean;

    constructor({ damage, poison, piercing, freeze }: AttackEffectOpts) {
        this.damage = damage;
        this.poison = poison ?? 0;
        this.piercing = piercing ?? false;
        this.freeze = freeze ?? false;
    }
}

export default BasicAttackEffect;
