import EffectsController from "@/controllers/CreatureController/EffectsController";
import { BasicAttack } from "@/attack/BasicAttack";
import GameMap from "@/core/game-map";
import { Creature } from "@/creatures/creatures";
import { RecoverableStat, FixedStat } from "@/creatures/stats";

class TestCreature extends Creature {
    name: string = "test";
    health: RecoverableStat = new RecoverableStat(100);
    strength: FixedStat = new FixedStat(10);
    basicAttack: BasicAttack = new BasicAttack({ range: 1 });
    constructor() {
        super();
    }
}

describe('EffectsController', () => {
    let creature: Creature;
    let effectsController: EffectsController;
    let map: GameMap;

    beforeEach(() => {
        creature = new TestCreature();
        effectsController = new EffectsController(creature);
        map = new GameMap(2);
    });

    test('constructor sets creature property', () => {
        expect(effectsController.creature).toBe(creature);
    });

    test('performInitialEffects is callable', async () => {
        await expect(effectsController.performInitialEffects()).resolves.toBeUndefined();
    });

    test('performEndOfTurnEffects is callable', async () => {
        await expect(effectsController.performEndOfTurnEffects()).resolves.toBeUndefined();
    });

    test('resolveEffects processes effects queue correctly', () => {

    });
});