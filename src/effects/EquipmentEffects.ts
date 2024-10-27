import { Equipment } from "../equipments/equipment";
import { EffectBehavior, EffectTargetType } from "./Effect";

class IncreaseEquipmentSlotEffect implements EffectBehavior {
    type = 'increase-equipment-slot';
    target: EffectTargetType;
    value: number;

    constructor(value: number, target: EffectTargetType) {
        this.value = value;
        this.target = target;
    }
}

class DecreaseEquipmentSlotEffect implements EffectBehavior {
    type = 'decrease-equipment-slot';
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

type EquipmentSlotEffect = IncreaseEquipmentSlotEffect | DecreaseEquipmentSlotEffect;

class DestroyEquipmentEffect implements EffectBehavior {
    type = 'increase-equipment-slot';
    equipment: Equipment;

    constructor(equipment: Equipment) {
        this.equipment = equipment;
    }
}

class UnequipEquipmentEffect implements EffectBehavior {
    type = 'unequip-equipment';
    equipment: Equipment;

    constructor(equipment: Equipment) {
        this.equipment = equipment;
    }
}

type EquipmentEffect = EquipmentSlotEffect | DestroyEquipmentEffect | UnequipEquipmentEffect;

export default EquipmentEffect;