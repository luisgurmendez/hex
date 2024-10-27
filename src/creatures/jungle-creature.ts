import PassiveAbility from "../abilities/PassiveAbilityDescriptor";
import { Creature } from "./creatures";
import { EffectDescriptor } from "../effects/EffectDescriptor";
import { FixedStat, RecoverableStat } from "./stats";
import { BasicAttack } from "@/attack/BasicAttack";

type RewardAction = 'draw-card';

export type Reward = RewardAction | EffectDescriptor;

interface JungleCreatureOpts {
    health: number;
    strength: number;
    abilities: PassiveAbility[];
    basicAttack: BasicAttack;
    name: string;
    rewards: Reward[];
}


class JungleCreature extends Creature {
    basicAttack: BasicAttack;
    name: string;
    health: RecoverableStat;
    strength: FixedStat;
    abilities: PassiveAbility[];
    rewards: Reward[];

    constructor({ name, health, rewards, strength, abilities, basicAttack }: JungleCreatureOpts) {
        super();
        this.name = name;
        this.health = new RecoverableStat(health);
        this.strength = new FixedStat(strength);
        this.abilities = abilities;
        this.basicAttack = basicAttack
        this.rewards = rewards;
    }
}

export default JungleCreature;
