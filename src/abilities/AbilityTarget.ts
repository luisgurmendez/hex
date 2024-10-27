import { GameTile } from "@/core/game-map";
import { Creature } from "@/creatures/creatures";
import { TileSide } from "@/map/map";

export class AbilityTarget { }

export class SingleCreatureTargetInRangeAbilityTarget extends AbilityTarget {
    constructor(readonly caster: Creature, readonly from: GameTile, readonly to: Creature) {
        super();
    }
}

export class CircularAreaEffectAbilityTarget extends AbilityTarget {
    constructor(readonly radius: number, readonly center: GameTile) {
        super();
    }
}

export class StraightForwardLineAreaEffectAbilityTarget extends AbilityTarget {
    constructor(readonly from: GameTile, readonly length: number, readonly side: TileSide) {
        super();
    }
}

