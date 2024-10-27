import { Ability } from "../abilities/abilities";
import { BasicAttack } from "../attack/BasicAttack";
import { Creature } from "./creatures";
import { FixedStat, RecoverableStat } from "./stats";

interface ChampionOpts {
    health: number;
    energy: number;
    shield: number;
    strength: number;
    abilities: Ability[];
    basicAttack: BasicAttack;
    name: string;
    team: number;
}

class Champion extends Creature {
    team: number;
    name: string;
    health: RecoverableStat;
    strength: FixedStat;
    energy: RecoverableStat;
    shield: FixedStat;
    basicAttack: BasicAttack;
    abilities: Ability[];

    constructor({ name, team, health, energy, shield, strength, abilities, basicAttack }: ChampionOpts) {
        super();
        this.health = new RecoverableStat(health);
        this.energy = new RecoverableStat(energy);
        this.shield = new FixedStat(shield);
        this.strength = new FixedStat(strength);
        this.abilities = abilities;
        this.basicAttack = basicAttack
        this.name = name;
        this.team = team;
    }
}




export default Champion;
