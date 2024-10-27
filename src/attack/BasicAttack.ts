import AttackEffect from "../effects/BasicAttackEffect";

export interface IBasicAttack {
    perform(strength: number): AttackEffect;
    getRange(): number;
}

interface BasicAttackOpts {
    range: number;
}

export class BasicAttack implements IBasicAttack {
    protected range: number;

    constructor({ range }: BasicAttackOpts) {
        this.range = range;
    }

    getRange(): number {
        return this.range;
    }

    perform(strength: number): AttackEffect {
        return new AttackEffect({ damage: strength });
    }
}

export class BasicAttackDecorator implements IBasicAttack {
    protected decoratedAttack: IBasicAttack;

    constructor(attack: IBasicAttack) {
        this.decoratedAttack = attack;
    }

    getRange(): number {
        return this.decoratedAttack.getRange();
    }

    perform(strength: number): AttackEffect {
        return this.decoratedAttack.perform(strength);
    }
}

export class BasicAttackAdditionalDamageDecorator extends BasicAttackDecorator {
    private additionalDamage: number;

    constructor(attack: IBasicAttack, additionalDamage: number) {
        super(attack);
        this.additionalDamage = additionalDamage;
    }

    perform(strength: number): AttackEffect {
        const attackEffect = this.decoratedAttack.perform(strength);
        attackEffect.damage += this.additionalDamage;
        return attackEffect;
    }
}


export class BasicAttackPoisonDecorator extends BasicAttackDecorator {
    private poisonDamage: number;

    constructor(attack: IBasicAttack, poisonDamage: number) {
        super(attack);
        this.poisonDamage = poisonDamage;
    }

    perform(strength: number): AttackEffect {
        const attackEffect = this.decoratedAttack.perform(strength);
        attackEffect.poison += this.poisonDamage;
        return attackEffect;
    }
}


export class BasicAttackPiercingDecorator extends BasicAttackDecorator {
    constructor(attack: IBasicAttack) {
        super(attack);
    }

    perform(strength: number): AttackEffect {
        const attackEffect = this.decoratedAttack.perform(strength);
        attackEffect.piercing = true;
        return attackEffect;
    }
}


export class BasicAttackFreezeDecorator extends BasicAttackDecorator {
    constructor(attack: IBasicAttack) {
        super(attack);
    }

    perform(strength: number): AttackEffect {
        const attackEffect = this.decoratedAttack.perform(strength);
        attackEffect.freeze = true;
        return attackEffect;
    }
}


export class BasicAttackIncreaseRangeDecorator extends BasicAttackDecorator {
    private rangeIncrease: number;

    constructor(attack: IBasicAttack, rangeIncrease: number) {
        super(attack);
        this.rangeIncrease = rangeIncrease;
    }

    getRange(): number {
        return this.decoratedAttack.getRange() + this.rangeIncrease;
    }
}