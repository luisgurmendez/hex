import Effect, { EffectTargetType } from "./Effect";

enum EffectApplicationPhase {
    Initial,
    EndOfTurn,
    SemiImmediate,
    Permanent
}

export abstract class EffectDescriptor {
    effect: Effect;
    target: EffectTargetType;
    phase: EffectApplicationPhase;

    constructor(effect: Effect, target: EffectTargetType, phase: EffectApplicationPhase) {
        this.effect = effect;
        this.target = target;
        this.phase = phase;
    }
}

export class InitialEffect extends EffectDescriptor {
    constructor(effect: Effect, target: EffectTargetType) {
        super(effect, target, EffectApplicationPhase.Initial);
    }
}
export class EndOfTurnEffect extends EffectDescriptor {
    constructor(effect: Effect, target: EffectTargetType) {
        super(effect, target, EffectApplicationPhase.EndOfTurn);
    }
}
export class SemiImmediateEffect extends EffectDescriptor {
    constructor(effect: Effect, target: EffectTargetType) {
        super(effect, target, EffectApplicationPhase.SemiImmediate);
    }
}
export class PermanentEffect extends EffectDescriptor {
    constructor(effect: Effect, target: EffectTargetType) {
        super(effect, target, EffectApplicationPhase.Permanent);
    }
}
