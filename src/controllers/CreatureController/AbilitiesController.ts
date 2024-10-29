import { Creature } from "@/creatures/creatures";
import { SingleTargetInRangeAbilityTargetDescription } from "../../abilities/AbilityTargetDescription";
import { CastAbilityDescriptor } from "../../abilities/CastAbilityDescriptor";
import { BasicAttackAdditionalDamageDecorator, BasicAttackDecorator, BasicAttackIncreaseRangeDecorator, BasicAttackPiercingDecorator, BasicAttackPoisonDecorator, IBasicAttack } from "../../attack/BasicAttack";
import Champion from "../../creatures/champion";
import JungleCreature from "../../creatures/jungle-creature";
import Effect from "../../effects/Effect";
import { AllInAreaEffectTarget, EffectTarget, SingleInRangeEffectTarget } from "../../effects/EffectTarget";
import { GameContext } from "../GameController/GameController";
import { AbilityTarget, SingleCreatureTargetInRangeAbilityTarget } from "@/abilities/AbilityTarget";

interface BasicAttackEnhancement {
    strength: number;
    withPeircing: boolean;
    withPoison: number;
    range: number;
}

abstract class AbilitiesController {
    abstract creature: Creature;
    abstract context: GameContext;
    abstract basicAttackAbilityController: BasicAttackAbilityController;

    cast(ability: CastAbilityDescriptor, target: AbilityTarget): void {
        if (this.canCast(ability, target)) {

        }
    };

    reset(): void { };

    enhanceBasicAttack(enhance: BasicAttackEnhancement): void {
        this.basicAttackAbilityController.enhanceBasicAttack(enhance);
    };

    basicAttack(target: Creature): Effect | null {
        return this.basicAttackAbilityController.basicAttack(target);
    };

    static createController(creature: Creature, context: GameContext): AbilitiesController {
        // Decides implementation based on creature type
        if (creature instanceof JungleCreature) {
            return new JungleCreatureAbilitiesController(creature, context);
        } else if (creature instanceof Champion) {
            return new ChampionAbilitiesController(creature, context);
        } else {
            throw new Error('Invalid creature type');
        }
    }

    canCast(ability: CastAbilityDescriptor, target?: AbilityTarget): boolean {
        if (this.creature instanceof JungleCreature) {
            // Jungle creatures can't cast abilities
            return false;
        }

        const caster = this.creature as Champion;

        if (caster.energy.value < ability.cost.energy || caster.health.value <= ability.cost.health) {
            return false;
        }

        if (ability.target instanceof SingleTargetInRangeAbilityTargetDescription) {
            if (target instanceof SingleCreatureTargetInRangeAbilityTarget) {
                const range = ability.target.range;

                const distance = this.context.getGameState().map.distanceBetweenCreatures(caster, target.to);
                if (distance > range) {
                    return false;
                }
            } else {
                // can't cast single target in range ability without target
                return false;
            }
        }

        // Area of effect abilities can always be casted regardless if there is a target within range
        return true;
    };
}


class JungleCreatureAbilitiesController extends AbilitiesController {
    creature: JungleCreature;
    basicAttackAbilityController: BasicAttackAbilityController;
    context: GameContext;
    constructor(creature: JungleCreature, context: GameContext) {
        super();
        this.creature = creature;
        this.context = context;
        this.basicAttackAbilityController = new BasicAttackAbilityController(creature, context, Infinity);
    }
}

class ChampionAbilitiesController extends AbilitiesController {
    creature: Champion;
    context: GameContext;
    basicAttackAbilityController: BasicAttackAbilityController;

    constructor(creature: Champion, context: GameContext) {
        super();
        this.creature = creature;
        this.context = context;
        this.basicAttackAbilityController = new BasicAttackAbilityController(creature, context);
    }

    cast(ability: CastAbilityDescriptor, target?: AbilityTarget): EffectTarget[] {
        if (this.canCast(ability, target)) {
            if (target instanceof SingleInRangeEffectTarget) {
                // ability.perform(this.creature, target);
            }

            if (target instanceof AllInAreaEffectTarget) {
                // ability.perform(this.creature, target);
            }
        }

        return []
    };
}

export default AbilitiesController;

class BasicAttackAbilityController {
    creature: Creature;
    context: GameContext;
    private nextBasicAttackEnhancement: BasicAttackEnhancement[] = [];
    private basicAttacksLeftThisTurn: number;
    private defaultBasicAttacksLeft: number;

    constructor(creature: Creature, context: GameContext, defaultBasicAttacksLeft: number = 1) {
        this.creature = creature;
        this.context = context;
        this.basicAttacksLeftThisTurn = defaultBasicAttacksLeft;
        this.defaultBasicAttacksLeft = defaultBasicAttacksLeft;
    }

    enhanceBasicAttack(enhance: BasicAttackEnhancement): void {
        this.nextBasicAttackEnhancement.push(enhance);
    };

    basicAttack(target: Creature): Effect | null {
        if (!this.canBasicAttack(target)) {
            return null;
        }
        let basicAttack: IBasicAttack = this.creature.basicAttack;
        for (const enhancement of this.nextBasicAttackEnhancement) {
            basicAttack = this.decorateBasicAttack(basicAttack, enhancement);
        }
        this.basicAttacksLeftThisTurn--;
        return basicAttack.perform(this.creature.strength.value);
    };

    canBasicAttack(target: Creature): boolean {
        return this.basicAttacksLeftThisTurn > 0 && this.isTargetInRange(target);
    }

    reset() {
        this.basicAttacksLeftThisTurn = this.defaultBasicAttacksLeft;
        this.nextBasicAttackEnhancement = [];
    }

    isTargetInRange(target: Creature): boolean {
        const state = this.context.getGameState();
        const decoratedBasicAttack = this.resolveBasicAttackDecorators(this.creature.basicAttack)
        const distance = state.map.distanceBetweenCreatures(this.creature, target);
        return distance <= decoratedBasicAttack.getRange();
    }

    private resolveBasicAttackDecorators(basicAttack: IBasicAttack): IBasicAttack {
        for (const enhancement of this.nextBasicAttackEnhancement) {
            basicAttack = this.decorateBasicAttack(basicAttack, enhancement);
        }
        return basicAttack;
    }

    private decorateBasicAttack(basicAttack: IBasicAttack, enhancement: BasicAttackEnhancement): IBasicAttack {
        let decoratedBasicAttack = new BasicAttackDecorator(basicAttack);

        if (enhancement.withPeircing) {
            decoratedBasicAttack = new BasicAttackPiercingDecorator(basicAttack);
        }

        if (enhancement.withPoison > 0) {
            decoratedBasicAttack = new BasicAttackPoisonDecorator(basicAttack, enhancement.withPoison);
        }

        if (enhancement.strength !== 0) {
            decoratedBasicAttack = new BasicAttackAdditionalDamageDecorator(basicAttack, enhancement.strength);
        }

        if (enhancement.range !== 0) {
            decoratedBasicAttack = new BasicAttackIncreaseRangeDecorator(basicAttack, enhancement.range);
        }

        return decoratedBasicAttack;
    }
}