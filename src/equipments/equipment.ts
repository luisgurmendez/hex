import { Ability } from "../abilities/abilities";
import AbilityCost from "../abilities/AbilityCost";
import { EffectDescriptor } from "../effects/EffectDescriptor";

interface EquipmentOpts {
    abilities: Ability[];
    onEquipedEffects: EffectDescriptor[];
    onUnequipedEffects: EffectDescriptor[];
    equipmentCost: AbilityCost | null;
}

export class Equipment {
    abilities: Ability[];
    equipmentCost: AbilityCost | null;
    onEquipedEffects: EffectDescriptor[];
    onUnequipedEffects: EffectDescriptor[];
    constructor({ abilities, onEquipedEffects, onUnequipedEffects, equipmentCost }: EquipmentOpts) {
        this.abilities = abilities;
        this.onEquipedEffects = onEquipedEffects;
        this.onUnequipedEffects = onUnequipedEffects;
        this.equipmentCost = equipmentCost;
    }
}
