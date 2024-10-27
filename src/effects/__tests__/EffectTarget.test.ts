import GameMap, { GameTile } from "@/core/game-map";
import { Creature } from "@/creatures/creatures";
import { TileSide } from "@/map/map";
import { EffectTargetType } from "../Effect";
import Jorik from "@/creatures/champions/Jorik";
import { AllInAreaEffectTarget, SingleDirectEffectTarget, SingleInRangeEffectTarget } from "../EffectTarget";
import Elora from "@/creatures/champions/Elora";
import Uruk from "@/creatures/champions/Uruk";
import Champion from "@/creatures/champion";
import Nocthar from "@/creatures/champions/Nocthar";

describe('EffectTarget', () => {
    let map: GameMap;
    let caster: Champion;
    let enemies: Creature[];
    let allies: Creature[];
    let center: GameTile;
    let from: GameTile;
    let allCreatures: Creature[];

    beforeEach(() => {
        function initializeMapWithCreatures() {
            // Creates a radius 3 map with a caster champ at 1 tile South of center
            // and 1 ally and 2 enemies at 1 tile North of center

            map = new GameMap(3);
            caster = new Jorik(1);
            allies = [new Nocthar(1)];
            enemies = [new Uruk(2), new Elora(2)];
            center = map.getCenter();
            // a tile south from center
            from = map.getAdjacentTile(center, TileSide.S)!;
            enemies.forEach(enemy => {
                map.moveCreature(enemy, map.getAdjacentTile(center, TileSide.N)!);
            });
            allies.forEach(ally => {
                map.moveCreature(ally, map.getAdjacentTile(center, TileSide.N)!);
            });

            allCreatures = [...allies, ...enemies, caster];
            map.moveCreature(caster, from);
        }

        initializeMapWithCreatures();

    });

    describe('AllInAreaEffectTarget', () => {
        describe('getAffectedCreatures', () => {

            it('should return all enemies that stepped into the affected area', () => {
                let tileOutsideCenterCircle = map.getAdjacentTile(map.getAdjacentTile(center, TileSide.N)!, TileSide.N)!;
                enemies.forEach(enemy => {
                    map.moveCreature(enemy, tileOutsideCenterCircle);
                });
                let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.allEnemies, map);
                // Enemies steppes into the affected area
                map.moveCreature(enemies[0], center);
                let result = effectTarget.getAffectedCreatures(map, caster);
                expect(result).toEqual([enemies[0]]);
            });

            it('should return all enemies in a forward straight line', () => {
                let effectTarget = AllInAreaEffectTarget.forwardStraightLine(3, map.getTileByCreature(caster)!, TileSide.N, EffectTargetType.allEnemies, map);
                let result = effectTarget.getAffectedCreatures(map, caster);
                expect(result).toEqual(enemies);
            })


            describe('by target types', () => {
                it('should return all enemies', () => {
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.allEnemies, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual(enemies);
                });

                it('should return all allies except self', () => {
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.allAlliesExceptSelf, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual(allies);
                });

                it('should return all allies including self', () => {
                    const allAllies = [...allies, caster];
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.allAllies, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual(allAllies);
                    expect(allAllies).toEqual(result);
                });

                it('should return all creatures', () => {
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.all, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual(expect.arrayContaining(allCreatures));
                    expect(allCreatures).toEqual(expect.arrayContaining(result));
                });

                it('should return self', () => {
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.self, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual([caster]);
                });

                it('should return all except self', () => {
                    const allExceptSelf = allCreatures.filter(creature => creature !== caster);
                    let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.allExceptSelf, map);
                    let result = effectTarget.getAffectedCreatures(map, caster);
                    expect(result).toEqual(expect.arrayContaining(allExceptSelf));
                    expect(allExceptSelf).toEqual(expect.arrayContaining(result));
                });
            });
        })

        describe('canBeResolved', () => {
            it('should return true for all in area effect target', () => {
                let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.all, map);
                let result = effectTarget.canBeResolved(map);
                expect(result).toEqual(true);
            });
        });

        describe('circle constructor', () => {
            it('should return all creatures in a circle', () => {
                let effectTarget = AllInAreaEffectTarget.circle(1, center, EffectTargetType.all, map);
                expect(effectTarget.positions.length).toEqual(7);
            });
        })
    });

    describe('SingleDirectEffectTarget', () => {
        describe('getAffectedCreatures', () => {
            // trivial case
            it('should return a specific ally', () => {
                const specificAlly = allies[0];
                let effectTarget = new SingleDirectEffectTarget(specificAlly);
                let result = effectTarget.getAffectedCreatures(map, caster);
                expect(result).toEqual([specificAlly]);
            })
            // trivial case
            it('should return a specific enemy', () => {
                const specific = enemies[0];
                let effectTarget = new SingleDirectEffectTarget(specific);
                let result = effectTarget.getAffectedCreatures(map, caster);
                expect(result).toEqual([specific]);
            })
        })
    });


    describe('SingleInRangeEffectTarget', () => {

        describe('canBeResolved', () => {
            it('should return true for single in range enemy', () => {
                const castedFrom = map.getTileByCreature(caster)!;
                const targetEnemy = enemies[0];
                const initialDistanceBetweenCreatures = map.distanceBetweenCreatures(caster, targetEnemy);
                let effectTarget = new SingleInRangeEffectTarget(initialDistanceBetweenCreatures, castedFrom, targetEnemy);
                let result = effectTarget.canBeResolved(map);
                expect(result).toEqual(true);
            });

            it('should return false for enemy that has moved outside range', () => {
                const castedFrom = map.getTileByCreature(caster)!;
                const targetEnemy = enemies[0];
                const targetEnemyPosition = map.getTileByCreature(targetEnemy)!;
                const initialDistanceBetweenCreatures = map.distanceBetweenCreatures(caster, targetEnemy);
                let effectTarget = new SingleInRangeEffectTarget(initialDistanceBetweenCreatures, castedFrom, enemies[0]);
                // move creature outside range
                map.moveCreature(targetEnemy, map.getAdjacentTile(targetEnemyPosition, TileSide.N)!);
                let result = effectTarget.canBeResolved(map);
                expect(result).toEqual(false);
            });
        })

        describe('getAffectedCreatures', () => {
            it('should return the targeted enemy', () => {
                const castedFrom = map.getTileByCreature(caster)!;
                const targetEnemy = enemies[0];
                const initialDistanceBetweenCreatures = map.distanceBetweenCreatures(caster, targetEnemy);
                let effectTarget = new SingleInRangeEffectTarget(initialDistanceBetweenCreatures, castedFrom, targetEnemy);
                let result = effectTarget.getAffectedCreatures(map);
                expect(result).toEqual([targetEnemy]);
            });

            it('should return an empty array since enemy moved outside range', () => {
                const castedFrom = map.getTileByCreature(caster)!;
                const targetEnemy = enemies[0];
                const targetEnemyPosition = map.getTileByCreature(targetEnemy)!;
                const initialDistanceBetweenCreatures = map.distanceBetweenCreatures(caster, targetEnemy);
                let effectTarget = new SingleInRangeEffectTarget(initialDistanceBetweenCreatures, castedFrom, enemies[0]);
                // move creature outside range
                map.moveCreature(targetEnemy, map.getAdjacentTile(targetEnemyPosition, TileSide.N)!);
                let result = effectTarget.getAffectedCreatures(map);
                expect(result).toEqual([]);
            });
        })
    });
});