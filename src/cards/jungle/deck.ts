import { Equipment } from "@/equipments/equipment";
import { Card } from "../deck";
import JungleCreature from "@/creatures/jungle-creature";
import { CastAbilityDescriptor } from "@/abilities/CastAbilityDescriptor";

// TODO
class JungleLand { }

export abstract class JungleCard extends Card { }

export class JungleAbilityCard extends JungleCard {
    ability: CastAbilityDescriptor;
    constructor(ability: CastAbilityDescriptor) {
        super();
        this.ability = ability;
    }
}

export class JungleLandCard extends JungleCard {
    land: JungleLand;
    constructor(land: JungleLand) {
        super();
        this.land = land;
    }
}


export class JungleCreatureCard extends JungleCard {
    creature: JungleCreature;
    constructor(creature: JungleCreature) {
        super();
        this.creature = creature;
    }
}

class JungleDeck {
    cards: JungleCard[];
    constructor() {
        this.cards = [];
    }
    drawCard(): JungleCard {
        const randomIndex = Math.floor(Math.random() * this.cards.length);
        return this.cards[randomIndex];
    }
}

export default JungleDeck;
