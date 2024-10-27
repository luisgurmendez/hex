
export enum StatType {
    health = 'health',
    energy = 'energy',
    shield = 'shield',
    strength = 'strength'
}

interface IFixedStat {
    value: number
}

interface IRecoverableStat {
    max: number;
    current: number;
}

type Stat = IFixedStat | IRecoverableStat;

class RecoverableStat implements IRecoverableStat {
    max: number;
    current: number;

    constructor(max: number) {
        this.max = max;
        this.current = max;
    }

    increase(value: number): void {
        this.current += value;
        if (this.current > this.max) {
            this.current = this.max;
        }
    }

    decrease(value: number): void {
        this.current -= value;
        if (this.current < 0) {
            this.current = 0;
        }
    }

    recover(value: number): void {
        this.max += value;
    }

    lose(value: number): void {
        this.current -= value;
    }

    get value(): number {
        return this.current;
    }
}

class FixedStat implements IFixedStat {
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}


export { Stat, RecoverableStat, FixedStat }