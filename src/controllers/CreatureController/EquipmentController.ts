import { Creature } from "@/creatures/creatures";
import Champion from "../../creatures/champion";
import { EffectDescriptor } from "../../effects/EffectDescriptor";
import { Equipment } from "../../equipments/equipment";

const DEFAULT_EQUIPMENTS_PER_TURN = 1;

class EquipmentController {
    private slots: number;
    private equipments: Equipment[];
    private equipmentsLeft: number = DEFAULT_EQUIPMENTS_PER_TURN;

    constructor(slots: number) {
        this.equipments = [];
        this.slots = slots;
    }

    static createController(creature: Creature) {
        if (creature instanceof Champion) {
            return new EquipmentController(2);
        } else {
            return new EquipmentController(0);
        }
    }

    canEquip(): boolean {
        return this.slots > this.equipments.length && this.equipmentsLeft > 0;
    }

    equip(equipment: Equipment): EffectDescriptor[] {
        if (this.canEquip()) {
            this.equipments.push(equipment);
            return equipment.onEquipedEffects;
        }
        return [];
    }

    unequip(equipment: Equipment): EffectDescriptor[] {
        this.equipments = this.equipments.filter(e => e !== equipment);
        return equipment.onUnequipedEffects;
    }

    reset() {
        this.equipmentsLeft = DEFAULT_EQUIPMENTS_PER_TURN;
    }
}

export default EquipmentController;

