import { BasicAttack } from "../attack/BasicAttack";
import { FixedStat, RecoverableStat } from "./stats";


export abstract class Creature {
    abstract name: string;
    abstract health: RecoverableStat;
    abstract strength: FixedStat;
    abstract basicAttack: BasicAttack;
}


// export type Creature = Champion | JungleCreature // TODO | ResurrectedCreature;