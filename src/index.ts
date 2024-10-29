import AbilitiesAndEquipmentsDeck from "./cards/abilities-and-equipments/deck";
import JungleDeck from "./cards/jungle/deck";
import CreatureActionsController, { BasicAttackAction, EndOfTurnAction, MovementAction, PlayerCreatureAction } from "./controllers/CreatureController/CreatureActionsController";
import CreatureController from "./controllers/CreatureController/CreatureController";
import CreatureControllers from "./controllers/GameController/CreatureControllers";
import { EffectsQueue, GameContext, GameState } from "./controllers/GameController/GameController";
import CanvasGenerator from "./core/canvas";
import GameMap, { GameTileData, GameTileType } from "./core/game-map";
import Champion from "./creatures/champion";
import Elora from "./creatures/champions/Elora";
import Jorik from "./creatures/champions/Jorik";
import { renderGameMapOnCanvas } from "./render/map";
import { wait } from "./utils/async";


const gameState = (() => {
  const map = new GameMap(4);
  map.getTile(1, 1)!.data = new GameTileData(GameTileType.jungle);
  const abilitiesAndEquipmentsDeck = new AbilitiesAndEquipmentsDeck();
  const jungleDeck = new JungleDeck();
  const players: CreatureControllers = new CreatureControllers();
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
const elora = new Elora(BLUE_TEAM);

// in center;
gameContext.getGameState().map.moveCreature(jorik, gameContext.getGameState().map.getTile(0, 0)!);
gameContext.getGameState().map.moveCreature(elora, gameContext.getGameState().map.getTile(0, 0)!);

class NoActionsController extends CreatureActionsController {
  async getNextAction(state: GameState): Promise<PlayerCreatureAction> {
    return new EndOfTurnAction();
  }

  static createController(creature: Champion) {
    return new NoActionsController(creature);
  }
}


class PlaygroundJorikActionsController extends CreatureActionsController {
  private actionIndex = 0;
  async getNextAction(state: GameState): Promise<PlayerCreatureAction> {
    renderGameMapOnCanvas(document.getElementById("hexMapCanvas") as HTMLCanvasElement, gameState.map);
    await wait(1);
    if (this.actionIndex === 0) {
      this.actionIndex++;
      return new BasicAttackAction(elora);
    }

    if (this.actionIndex === 1) {
      this.actionIndex++;
      return new MovementAction(gameContext.getGameState().map.getTile(0, 1)!);
    }

    return new EndOfTurnAction();
  }

  static createController(creature: Jorik) {
    return new PlaygroundJorikActionsController(creature);
  }
}


async function playJorikTurn() {

  const jorikController = new CreatureController(jorik, jorik.team, gameContext, {
    ActionsController: PlaygroundJorikActionsController
  });

  const eloraController = new CreatureController(elora, elora.team, gameContext, {
    ActionsController: NoActionsController
  });

  gameContext.getGameState().creatures.addCreature(jorikController);
  gameContext.getGameState().creatures.addCreature(eloraController);
  await jorikController.playTurn();

}

CanvasGenerator.generateCanvas();

playJorikTurn();


