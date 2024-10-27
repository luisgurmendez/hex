
interface IAbilityCost {
    health: number;
    energy: number;
}

class AbilityCost {
    health: number;
    energy: number;

    constructor({ health, energy }: Partial<IAbilityCost>) {
        console.assert(health !== undefined || energy !== undefined, 'AbilityCost must have at least one cost');
        this.health = health ?? 0;
        this.energy = energy ?? 0;
    }
}

export default AbilityCost;