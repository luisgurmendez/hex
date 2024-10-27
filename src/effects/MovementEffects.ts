import { GameTile } from "../core/game-map";
import { EffectBehavior } from "./Effect";

export class IncreaseMovementStepEffect implements EffectBehavior {
    type = 'increase-movement';
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

export class DisableMovementEffect implements EffectBehavior {
    type = 'disabled-movement';
}

export class MoveEffect implements EffectBehavior {
    type = 'move';
    position: GameTile

    constructor(position: GameTile) {
        this.position = position;
    }
}

export class ToTargetMoveEffect implements EffectBehavior {
    type = 'to-target-move';
}

type MovementEffect = DisableMovementEffect | IncreaseMovementStepEffect | MoveEffect | ToTargetMoveEffect;

export default MovementEffect;
