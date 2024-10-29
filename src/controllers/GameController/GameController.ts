import GameMap from "@/core/game-map";
import AbilitiesAndEquipmentsDeck from "../../cards/abilities-and-equipments/deck";
import JungleDeck from "../../cards/jungle/deck";
import Champion from "../../creatures/champion";
import { TargetedEffect } from "../../effects/Effect";
import CreatureController from "../CreatureController/CreatureController";
import TurnAssignmentController from "../TurnAssignmentController";
import CreatureControllers from "./CreatureControllers";

export class GameState {
    constructor(
        public map: GameMap,
        public abilitiesAndEquipmentsDeck: AbilitiesAndEquipmentsDeck,
        public jungleDeck: JungleDeck,
        public creatures: CreatureControllers,
        public effectsQueue: EffectsQueue,
    ) { }
}


class GameController {
    map = new GameMap(2);
    abilitiesAndEquipmentsDeck = new AbilitiesAndEquipmentsDeck();
    jungleDeck = new JungleDeck();
    creatureControllers: CreatureControllers = new CreatureControllers();
    turnController: TurnAssignmentController<CreatureController> = new TurnAssignmentController<CreatureController>(this.creatureControllers.controllers);
    currentPlayingPlayer: CreatureController = this.turnController.getCurrentTurn();
    effectsQueue = new EffectsQueue();

    addPlayer(creature: Champion, team: number) {
        const gameStateBuilder = this.buildGameState;
        this.creatureControllers.addCreature(new CreatureController(creature, team, new GameContext(gameStateBuilder)));
    }

    removePlayer(controller: CreatureController) {
        if (this.creatureControllers.length === 1) {
            this.endGame();
            throw new Error('Game already ended');
        }

        if (this.currentPlayingPlayer === controller) {
            this.nextTurn();
        }

        this.creatureControllers.removeCreature(controller);
        this.turnController.removeTurn(controller);

        if (this.checkWinCondition()) {
            this.endGame();
        }
    }

    nextTurn() {
        this.turnController.nextTurn();
        this.currentPlayingPlayer = this.turnController.getCurrentTurn();
        this.playTurn();
    }

    checkWinCondition() {
        return this.creatureControllers.length === 1;
    }

    startGame() {
        this.creatureControllers.forEach(controller => controller.initGame());
        this.playTurn();
    }

    endGame() {
        console.log('Game ended');
    }

    async playTurn() {
        await this.currentPlayingPlayer.playTurn();
        this.nextTurn();
    }

    private buildGameState() {
        return new GameState(
            this.map,
            this.abilitiesAndEquipmentsDeck,
            this.jungleDeck,
            this.creatureControllers,
            this.effectsQueue,
        );
    }
}


export default GameController;


export class GameContext {
    getGameState: () => GameState;
    constructor(buildGameState: () => GameState) {
        this.getGameState = buildGameState;
    }
}

export class EffectsQueue {
    public queue: TargetedEffect[] = [];

    push(...effects: TargetedEffect[]) {
        this.queue.push(...effects);
    }

    pop() {
        return this.queue.pop();
    }
}
