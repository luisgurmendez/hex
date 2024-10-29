import AbilitiesAndEquipmentsDeck, { AbilityOrEquipmentCard } from "../../cards/abilities-and-equipments/deck";
import Champion from "../../creatures/champion";
import { TargetedEffect } from "../../effects/Effect";
import AbilitiesController from "./AbilitiesController";
import CreatureActionsController, { CreatureActionsResolverController, PlayerCreatureAction, PlayerCreatureActionType } from "./CreatureActionsController";
import EffectsController from "./EffectsController";
import EquipmentController from "./EquipmentController";
import { GameContext, GameState } from "../GameController/GameController";
import MovementController from "./MovementController";
import GameMap from "@/core/game-map";


interface CreateControllerInjections {
    AbilitiesController?: typeof AbilitiesController;
    EquipmentController?: typeof EquipmentController;
    MovementController?: typeof MovementController;
    EffectsController?: typeof EffectsController;
    ActionsController?: typeof CreatureActionsController;
}

// TODO: Make this abstract Champ and Jg should inherit
class AbstractCreatureController {
    team: number;
    hand: AbilityOrEquipmentCard[] = [];
    champion: Champion;
    context: GameContext;

    effectsController: EffectsController;
    actionsController: CreatureActionsController;

    abilitiesController: AbilitiesController;
    equipmentController: EquipmentController
    movementController: MovementController;

    constructor(champion: Champion, team: number, context: GameContext, injections?: CreateControllerInjections) {
        this.team = team;
        this.champion = champion;
        this.context = context;

        const abilitiesFactory = injections?.AbilitiesController?.createController ?? AbilitiesController.createController;
        const equipmentFactory = injections?.EquipmentController?.createController ?? EquipmentController.createController;
        const movementFactory = injections?.MovementController?.createController ?? MovementController.createController;
        const effectsFactory = injections?.EffectsController?.createController ?? EffectsController.createController;
        const actionsFactory = injections?.ActionsController?.createController ?? CreatureActionsController.createController;

        this.abilitiesController = abilitiesFactory(champion, context);
        this.equipmentController = equipmentFactory(champion)
        this.movementController = movementFactory()
        this.effectsController = effectsFactory(champion)
        this.actionsController = actionsFactory(champion)
    }

    async playTurn() {
        const state = this.context.getGameState();
        const effectsQueue = state.effectsQueue
        this.resetControllers();

        await this.effectsController.performInitialEffects();
        this.drawCard();
        let action: PlayerCreatureAction;
        do {
            console.log(state);
            action = await this.actionsController.getNextAction(state);
            const effects = this.performAction(action);
            effectsQueue.push(...effects);

            await this.performInstantAbilities(state, this);
            this.resolveEffects(state);
        } while (action.type !== PlayerCreatureActionType.endOfTurn);
        this.effectsController.performEndOfTurnEffects();
    }

    async castInstantAbility(): Promise<TargetedEffect[]> {
        return [];
    };

    init() { }

    private resetControllers() {
        this.abilitiesController.reset();
        this.equipmentController.reset();
        this.movementController.reset();
    }

    private performAction(action: PlayerCreatureAction): TargetedEffect[] {
        const resolver = new CreatureActionsResolverController(
            this.abilitiesController,
            this.equipmentController,
            this.movementController,
            this.context,
        );
        return resolver.resolve(action, this.champion);
    }

    private async performInstantAbilities(state: GameState, lastActionPlayedBy: AbstractCreatureController) {
        const restOfPlayers = state.creatures.controllers.filter(controller => controller !== lastActionPlayedBy);
        for (const player of restOfPlayers) {
            const effects = await player.castInstantAbility();
            state.effectsQueue.push(...effects);
            if (effects.length > 0) {
                await this.performInstantAbilities(state, player);
            }
        }
    }

    private resolveEffects(state: GameState) {
        this.effectsController.resolveEffects(state);
    }

    private drawCard() { }

}

export default AbstractCreatureController;
