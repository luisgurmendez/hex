import { Equipment } from "@/equipments/equipment";
import { Card } from "../deck";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";


export abstract class AbilityOrEquipmentCard extends Card { }

export class AbilityCard extends AbilityOrEquipmentCard {
    ability: CastAbilityDescriptor;
    constructor(ability: CastAbilityDescriptor) {
        super();
        this.ability = ability;
    }
}

export class EquipmentCard extends AbilityOrEquipmentCard {
    equipment: Equipment;
    constructor(equipment: Equipment) {
        super();
        this.equipment = equipment;
    }
}

class AbilitiesAndEquipmentsDeck {
    cards: AbilityOrEquipmentCard[];
    constructor() {
        this.cards = [];
    }
    drawCard(): AbilityOrEquipmentCard {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards[randomIndex];
    }
}

export default AbilitiesAndEquipmentsDeck;
