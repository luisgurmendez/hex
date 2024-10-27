import { Creature } from "../creatures/creatures";
import GameMap, { GameTile } from "../core/game-map";
import { EffectTargetType } from "./Effect";
import { TileSide } from "@/map/map";
import JungleCreature from "@/creatures/jungle-creature";
import Champion from "@/creatures/champion";

export abstract class EffectTarget {
    abstract canBeResolved(map: GameMap): boolean;
    abstract getAffectedCreatures(map: GameMap, caster: Creature): Creature[];
}

export class SingleDirectEffectTarget extends EffectTarget {
    getAffectedCreatures(map: GameMap, caster: Creature): Creature[] {
        return [this.creature];
    }

    canBeResolved(map: GameMap): boolean {
        return true;
    }

    constructor(public creature: Creature) {
        super();
    }
}

export class SingleInRangeEffectTarget extends EffectTarget {
    getAffectedCreatures(map: GameMap): Creature[] {
        if (this.canBeResolved(map)) {
            return [this.creature];
        }
        return [];
    }

    canBeResolved(map: GameMap): boolean {
        const targetCreaturePosition = map.getTileByCreature(this.creature);
        if (!targetCreaturePosition) {
            return false;
        }
        return map.distance(targetCreaturePosition, this.castedFrom) <= this.range;
    }

    constructor(public range: number, public castedFrom: GameTile, public creature: Creature) {
        super();
    }
}

export class AllInAreaEffectTarget extends EffectTarget {
    getAffectedCreatures(map: GameMap, caster: Creature): Creature[] {
        const creatures = map.getCreaturesInTiles(this.positions);
        return creatures.filter(filterByTargetTypeBuilder(caster, this.targetTypes))
    }

    canBeResolved(map: GameMap): boolean {
        return true;
    }

    private constructor(public positions: GameTile[], public targetTypes: EffectTargetType) {
        super();
    }

    static circle(
        radius: number,
        center: GameTile,
        targetTypes: EffectTargetType,
        map: GameMap
    ): AllInAreaEffectTarget {
        const positions = map.getAllTilesWithinRadius(center, radius);
        return new AllInAreaEffectTarget(positions, targetTypes);
    }

    static forwardStraightLine(
        range: number,
        from: GameTile,
        direction: TileSide,
        targetTypes: EffectTargetType,
        map: GameMap
    ): AllInAreaEffectTarget {
        const positions = map.getAllTilesFromAStraightLine(from, direction, range);
        return new AllInAreaEffectTarget(positions, targetTypes);
    }
}


function filterByTargetTypeBuilder(caster: Creature, targetType: EffectTargetType): (creature: Creature) => boolean {
    return (creature: Creature) => {
        if (caster instanceof Champion) {
            if (creature instanceof JungleCreature) {
                return filterByTargetTypeWhenJgCreature(caster, targetType)(creature);
            } else if (creature instanceof Champion) {
                return filterByTargetTypeWhenChampion(caster, targetType)(creature);
            }
        }
        return false;
    }
}


function filterByTargetTypeWhenChampion(caster: Champion, targetType: EffectTargetType): (creature: Champion) => boolean {
    return (champion: Champion) => {
        switch (targetType) {
            case EffectTargetType.all:
                return true;
            case EffectTargetType.allExceptSelf:
                return caster !== champion;
            case EffectTargetType.self:
                return caster === champion;
            case EffectTargetType.ally:
            case EffectTargetType.allAllies:
                return caster.team === champion.team;
            case EffectTargetType.allAlliesExceptSelf:
                return caster.team === champion.team && caster !== champion;
            case EffectTargetType.enemy:
            case EffectTargetType.allEnemies:
                return caster.team !== champion.team;
        }
    }
}


function filterByTargetTypeWhenJgCreature(caster: Creature, targetType: EffectTargetType): (creature: Creature) => boolean {
    return () => {
        if (targetType === EffectTargetType.all) {
            return true;
        }

        if (targetType === EffectTargetType.ally || targetType === EffectTargetType.allAllies || targetType === EffectTargetType.allAlliesExceptSelf) {
            return false
        }

        if (targetType === EffectTargetType.enemy || targetType === EffectTargetType.allEnemies) {
            return true
        }
        return false;
    }
}

