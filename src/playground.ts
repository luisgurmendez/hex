import AbilitiesAndEquipmentsDeck from "./cards/abilities-and-equipments/deck";
import JungleDeck from "./cards/jungle/deck";
import CreatureActionsController, { BasicAttackAction, EndOfTurnAction, MovementAction, PlayerCreatureAction } from "./controllers/CreatureController/CreatureActionsController";
import CreatureController from "./controllers/CreatureController/CreatureController";
import { EffectsQueue, GameContext, GameState } from "./controllers/GameController";
import GameMap from "./core/game-map";
import Elora from "./creatures/champions/Elora";
import Jorik from "./creatures/champions/Jorik";


const gameState = (() => {
    const map = new GameMap(3);
    const abilitiesAndEquipmentsDeck = new AbilitiesAndEquipmentsDeck();
    const jungleDeck = new JungleDeck();
    const players: CreatureController[] = [];
    const effectsQueue = new EffectsQueue();
    const gameState = new GameState(
        map,
        abilitiesAndEquipmentsDeck,
        jungleDeck,
        players,
        effectsQueue,
    );
    return gameState;
})()


const gameContext = new GameContext(
    () => gameState
);

const RED_TEAM = 1;
const BLUE_TEAM = 2;

const jorik = new Jorik(RED_TEAM);
const enemy = new Elora(BLUE_TEAM);

// in center;
gameContext.getGameState().map.moveCreature(jorik, gameContext.getGameState().map.getTile(0, 0)!);
gameContext.getGameState().map.moveCreature(enemy, gameContext.getGameState().map.getTile(0, 0)!);


class PlaygroundJorikActionsController extends CreatureActionsController {
    private actionIndex = 0;
    async getNextAction(state: GameState): Promise<PlayerCreatureAction> {
        if (this.actionIndex === 0) {
            this.actionIndex++;
            return new BasicAttackAction(enemy);
        }

        if (this.actionIndex === 1) {
            this.actionIndex++;
            return new MovementAction(gameContext.getGameState().map.getTile(0, 1)!);
        }

        return new EndOfTurnAction();
    }

    createController(creature: Jorik) {
        return new PlaygroundJorikActionsController(creature);
    }
}


async function playJorikTurn() {

    const jorikController = new CreatureController(jorik, jorik.team, gameContext, {
        ActionsController: PlaygroundJorikActionsController
    });
    await jorikController.playTurn();

}

playJorikTurn();
