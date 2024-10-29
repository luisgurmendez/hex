import { Creature } from "@/creatures/creatures";
import CreatureController from "../CreatureController/CreatureController";

class CreatureControllers {
    controllers: CreatureController[]
    constructor() {
        this.controllers = [];
    }

    addCreature(controller: CreatureController) {
        this.controllers.push(controller);
    }

    removeCreature(controller: CreatureController) {
        this.controllers = this.controllers.filter(c => c !== controller);
    }

    getByCreature(creature: Creature) {
        return this.controllers.find(c => c.champion === creature);
    }

    getByTeam(team: number) {
        return this.controllers.filter(c => c.team === team);
    }

    getOpponents(team: number) {
        return this.controllers.filter(c => c.team !== team);
    }

    forEach(callback: (controller: CreatureController) => void) {
        this.controllers.forEach(callback);
    }

    get length() {
        return this.controllers.length;
    }
}

export default CreatureControllers;
