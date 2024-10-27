import { Creature } from "@/creatures/creatures";
import { TargetedEffect } from "../../effects/Effect";
import { Equipment } from "../../equipments/equipment";

import AbilitiesController from "./AbilitiesController";
import EquipmentController from "./EquipmentController";
import { GameContext, GameState } from "../GameController";
import MovementController from "./MovementController";
import { GameTile } from "@/core/game-map";
import { SingleInRangeEffectTarget } from "@/effects/EffectTarget";

class CreatureActionsController {
    creature: Creature;

    constructor(creature: Creature) {
        this.creature = creature;
    }

    static createController(creature: Creature) {
        return new CreatureActionsController(creature);
    }

    getNextAction(state: GameState): Promise<PlayerCreatureAction> {
        return new Promise(() => new EndOfTurnAction());
    }
}

export default CreatureActionsController;

export enum PlayerCreatureActionType {
    basicAttack = 'basicAttack',
    ability = 'ability',
    instantAbility = 'instantAbility',
    equip = 'equip',
    unequip = 'unequip',
    movement = 'movement',
    endOfTurn = 'endOfTurn'
}


export abstract class PlayerCreatureAction {
    type: PlayerCreatureActionType;
    constructor(type: PlayerCreatureActionType) {
        this.type = type;
    }
}

export class BasicAttackAction extends PlayerCreatureAction {
    constructor(public target: Creature) {
        super(PlayerCreatureActionType.basicAttack);
    }
}

export class AbilityAction extends PlayerCreatureAction {
    constructor(public target: Creature) {
        super(PlayerCreatureActionType.ability);
    }
}

export class InstantAbilityAction extends PlayerCreatureAction {
    constructor(public target: Creature) {
        super(PlayerCreatureActionType.instantAbility);
    }
}

export class EquipAction extends PlayerCreatureAction {
    constructor(public equipment: Equipment) {
        super(PlayerCreatureActionType.equip);
    }
}

export class UnequipAction extends PlayerCreatureAction {
    constructor(public equipment: Equipment) {
        super(PlayerCreatureActionType.unequip);
    }
}

export class MovementAction extends PlayerCreatureAction {
    constructor(public to: GameTile) {
        super(PlayerCreatureActionType.movement);
    }
}

export class EndOfTurnAction extends PlayerCreatureAction {
    constructor() {
        super(PlayerCreatureActionType.endOfTurn);
    }
}


export class CreatureActionsResolverController {
    constructor(
        public abilitiesController: AbilitiesController,
        public equipmentController: EquipmentController,
        public movementController: MovementController,
        public context: GameContext
    ) { }

    resolve(action: PlayerCreatureAction, creature: Creature): TargetedEffect[] {
        const state = this.context.getGameState();

        switch (action.type) {
            case PlayerCreatureActionType.basicAttack:
                const basicAttackEffect = this.abilitiesController.basicAttack(creature);
                // At this point, when the basic attack effect is resolve, the effect might be null
                // if the creature is not able to attack
                const targetPosition = state.map.getTileByCreature((action as BasicAttackAction).target);
                if (!basicAttackEffect || !targetPosition) {
                    return [];
                }
                const singleTarget = new SingleInRangeEffectTarget(0, targetPosition, (action as BasicAttackAction).target);
                const targetedEffect = new TargetedEffect(singleTarget, basicAttackEffect);
                return [targetedEffect];
            case PlayerCreatureActionType.ability:
                // this.abilitiesController.ability(creature, (action as AbilityAction).target);
                break;
            case PlayerCreatureActionType.instantAbility:
                break;
            case PlayerCreatureActionType.equip:
                // TODO: return targeted effects
                this.equipmentController.equip((action as EquipAction).equipment);
                break;
            case PlayerCreatureActionType.unequip:
                // TODO: return targeted effects
                this.equipmentController.unequip((action as EquipAction).equipment);
                break;
            case PlayerCreatureActionType.movement:
                this.movementController.move(creature, (action as MovementAction).to, state.map);
                break;
            case PlayerCreatureActionType.endOfTurn:
                break;
        }
        return [];
    }
}





