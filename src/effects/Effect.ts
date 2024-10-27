import { Creature } from "@/creatures/creatures";
import BasicAttackEffect from "./BasicAttackEffect";
import CancelingEffects from "./CancelingEffects";
import { EffectTarget } from "./EffectTarget";
import EquipmentEffect from "./EquipmentEffects";
import MovementEffect from "./MovementEffects";
import StatEffect from "./StatEffect";

export enum EffectTargetType {
    all,
    allExceptSelf,
    self,
    ally,
    allAllies,
    allAlliesExceptSelf,
    enemy,
    allEnemies,
}

export interface EffectBehavior {
    type: string;
}

type Effect = StatEffect | MovementEffect | EquipmentEffect | CancelingEffects | BasicAttackEffect;

export class TargetedEffect {
    constructor(public target: EffectTarget, public effect: Effect) { }

    resolve(affectedCreatures: Creature[]) {
        console.log('Resolving effect ', this.effect, ' on creatures', affectedCreatures);
    }
}

export default Effect;

